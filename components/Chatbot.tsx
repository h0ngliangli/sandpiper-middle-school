import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, AlertCircle } from 'lucide-react';
import { FAQ_ITEMS } from './faq';

// TODO: Replace with your actual WhatsApp number, e.g. https://wa.me/16501234567
const WHATSAPP_URL = 'https://wa.me/1234567890';

const REDIRECT_SIGNAL = 'REDIRECT_TO_WHATSAPP';

type ConnectionStatus = 'idle' | 'checking' | 'ok' | 'no-key' | 'error';

function isKeyMissing(key: string | undefined): boolean {
  return !key || key === 'PLACEHOLDER_API_KEY';
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  showWhatsApp?: boolean;
}

interface GeminiMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

const SYSTEM_PROMPT = `You are a friendly and helpful assistant for Sandpiper Middle School in Redwood City, CA. You help parents find quick answers about the school.

Here is the school FAQ you should draw from:

${FAQ_ITEMS.map((item) => `Q: ${item.question}\nA: ${item.answer}`).join('\n\n')}

Rules:
1. Answer questions using only the FAQ above or well-known facts about the school (address, phone).
2. If you cannot find a relevant answer, respond with exactly the word: ${REDIRECT_SIGNAL}
3. If the parent asks to speak to a person, a parent ambassador, or a human, respond with exactly: ${REDIRECT_SIGNAL}
4. Otherwise, keep answers concise, warm, and helpful. Do not invent information not in the FAQ.`;

const WhatsAppIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

const WhatsAppButton: React.FC = () => (
  <a
    href={WHATSAPP_URL}
    target="_blank"
    rel="noopener noreferrer"
    className="mt-2 flex items-center justify-center space-x-2 bg-green-500 hover:bg-green-600 text-white text-sm font-medium px-3 py-2 rounded-xl transition-colors"
  >
    <WhatsAppIcon className="h-4 w-4" />
    <span>Chat with a Parent Ambassador</span>
  </a>
);

const TypingIndicator: React.FC = () => (
  <div className="flex justify-start">
    <div className="bg-slate-100 px-4 py-3 rounded-2xl rounded-bl-sm">
      <div className="flex space-x-1">
        {[0, 150, 300].map((delay) => (
          <div
            key={delay}
            className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
            style={{ animationDelay: `${delay}ms` }}
          />
        ))}
      </div>
    </div>
  </div>
);

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('idle');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content:
        "Hi! I'm the Sandpiper School Assistant. I can answer common questions about our school — or connect you with a Parent Ambassador. What would you like to know?",
    },
  ]);
  const [apiHistory, setApiHistory] = useState<GeminiMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const hasCheckedRef = useRef(false);

  // Scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Focus input once the chat is open and connected
  useEffect(() => {
    if (isOpen && connectionStatus === 'ok') {
      const timer = setTimeout(() => inputRef.current?.focus(), 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen, connectionStatus]);

  // Run a one-time connection check the first time the chat is opened
  useEffect(() => {
    if (!isOpen || hasCheckedRef.current) return;
    hasCheckedRef.current = true;

    const checkConnection = async () => {
      const apiKey = process.env.API_KEY;

      // 1. Check the key is present and not the placeholder
      if (isKeyMissing(apiKey)) {
        setConnectionStatus('no-key');
        setMessages((prev: Message[]) => [
          ...prev,
          {
            id: 'cfg-error',
            role: 'assistant',
            content:
              '⚠️ The AI assistant is not configured yet (API key missing). You can still reach a Parent Ambassador directly via WhatsApp.',
            showWhatsApp: true,
          },
        ]);
        return;
      }

      // 2. Make a minimal test call to verify the key and network connectivity
      setConnectionStatus('checking');
      try {
        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ role: 'user', parts: [{ text: 'hi' }] }],
              generationConfig: { maxOutputTokens: 1 },
            }),
          }
        );

        if (res.status === 400 || res.status === 401 || res.status === 403) {
          const body = await res.json().catch(() => ({}));
          const reason = (body as { error?: { message?: string } })?.error?.message ?? `HTTP ${res.status}`;
          setConnectionStatus('error');
          setMessages((prev: Message[]) => [
            ...prev,
            {
              id: 'api-error',
              role: 'assistant',
              content: `⚠️ Could not connect to the AI assistant (${reason}). You can still reach a Parent Ambassador directly via WhatsApp.`,
              showWhatsApp: true,
            },
          ]);
          return;
        }

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        setConnectionStatus('ok');
      } catch {
        setConnectionStatus('error');
        setMessages((prev: Message[]) => [
          ...prev,
          {
            id: 'net-error',
            role: 'assistant',
            content:
              '⚠️ Could not reach the AI assistant right now (network error). You can still reach a Parent Ambassador directly via WhatsApp.',
            showWhatsApp: true,
          },
        ]);
      }
    };

    checkConnection();
  }, [isOpen]);

  const callGemini = async (history: GeminiMessage[]): Promise<string> => {
    const apiKey = process.env.API_KEY;
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent",
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' ,
          'X-Goog-Api-Key': apiKey
        },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents: history,
          generationConfig: { temperature: 0.2, maxOutputTokens: 512 },
        }),
      }
    );
    console.log('Gemini API response status:', response.status);
    if (!response.ok) throw new Error(`Gemini API error: ${response.status}`);
    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text ?? REDIRECT_SIGNAL;
  };

  const handleSend = async () => {
    const text = inputValue.trim();
    if (!text || isLoading) return;

    setInputValue('');

    const userMsg: Message = { id: `u-${Date.now()}`, role: 'user', content: text };
    setMessages((prev: Message[]) => [...prev, userMsg]);

    const nextHistory: GeminiMessage[] = [
      ...apiHistory,
      { role: 'user', parts: [{ text }] },
    ];

    setIsLoading(true);
    try {
      const raw = await callGemini(nextHistory);
      const shouldRedirect = raw.trim() === REDIRECT_SIGNAL;

      const assistantContent = shouldRedirect
        ? "I don't have a specific answer for that, but one of our Parent Ambassadors would be happy to help you directly!"
        : raw;

      const assistantMsg: Message = {
        id: `a-${Date.now()}`,
        role: 'assistant',
        content: assistantContent,
        showWhatsApp: shouldRedirect,
      };

      setMessages((prev: Message[]) => [...prev, assistantMsg]);
      setApiHistory([
        ...nextHistory,
        { role: 'model', parts: [{ text: assistantContent }] },
      ]);
    } catch {
      setMessages((prev: Message[]) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: 'assistant',
          content:
            "Sorry, I'm having trouble connecting right now. A Parent Ambassador can help you directly via WhatsApp.",
          showWhatsApp: true,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const isInputDisabled =
    isLoading || connectionStatus === 'no-key' || connectionStatus === 'error';

  const statusLabel: Record<ConnectionStatus, string> = {
    idle: 'Ask about our school',
    checking: 'Connecting…',
    ok: 'Connected',
    'no-key': 'AI unavailable — API key missing',
    error: 'AI unavailable — use WhatsApp below',
  };

  return (
    <>
      {/* ── Chat window ────────────────────────────────────────── */}
      {isOpen && (
        <div
          className="fixed bottom-24 right-4 sm:right-6 z-50 flex flex-col bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden"
          style={{ width: 'min(calc(100vw - 2rem), 24rem)', maxHeight: '70vh' }}
          role="dialog"
          aria-label="School chatbot"
        >
          {/* Header */}
          <div className="bg-sandpiper-blue px-4 py-3 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center space-x-3">
              <div className="bg-sandpiper-blue p-2 rounded-full">
                  <img src="/favicon.svg" className="h-8 w-8" alt="" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm leading-tight">Sandpiper Assistant</p>
                <div className="flex items-center space-x-1.5 mt-0.5">
                  {/* Status indicator */}
                  {connectionStatus === 'checking' && (
                    <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
                  )}
                  {connectionStatus === 'ok' && (
                    <span className="w-2 h-2 rounded-full bg-green-400" />
                  )}
                  {(connectionStatus === 'no-key' || connectionStatus === 'error') && (
                    <AlertCircle className="h-3.5 w-3.5 text-red-400" />
                  )}
                  <p className="text-blue-200 text-xs">{statusLabel[connectionStatus]}</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-blue-200 hover:text-white transition-colors p-1 rounded"
              aria-label="Close chat"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className="max-w-[85%]">
                  <div
                    className={`px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-sandpiper-blue text-white rounded-br-sm'
                        : 'bg-slate-100 text-slate-800 rounded-bl-sm'
                    }`}
                  >
                    {msg.content}
                  </div>
                  {msg.showWhatsApp && <WhatsAppButton />}
                </div>
              </div>
            ))}

            {isLoading && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>

          {/* Persistent WhatsApp shortcut */}
          <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 flex-shrink-0">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-1.5 text-green-600 hover:text-green-700 text-xs font-medium transition-colors"
            >
              <WhatsAppIcon className="h-3.5 w-3.5" />
              <span>Speak to a Parent Ambassador</span>
            </a>
          </div>

          {/* Input */}
          <div className="px-3 py-3 border-t border-slate-200 flex items-center space-x-2 flex-shrink-0">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={
                isInputDisabled && connectionStatus !== 'checking'
                  ? 'AI unavailable — use WhatsApp above'
                  : 'Type your question…'
              }
              disabled={isInputDisabled}
              className="flex-1 text-sm border border-slate-200 rounded-full px-4 py-2 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <button
              onClick={handleSend}
              disabled={!inputValue.trim() || isInputDisabled}
              className="w-9 h-9 bg-sandpiper-blue hover:bg-blue-900 disabled:bg-slate-300 text-white rounded-full flex items-center justify-center transition-colors flex-shrink-0"
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* ── Floating action button ──────────────────────────────── */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-6 right-4 sm:right-6 z-50 w-14 h-14 bg-sandpiper-blue hover:bg-blue-900 text-white rounded-full shadow-xl flex items-center justify-center transition-all duration-200 hover:scale-110"
        aria-label={isOpen ? 'Close chat' : 'Open school assistant chat'}
      >
        {!isOpen && (
          <span className="absolute inline-flex w-full h-full rounded-full bg-sandpiper-blue opacity-75 animate-ping" />
        )}
        {isOpen ? <X className="h-6 w-6 relative" /> : <MessageCircle className="h-6 w-6 relative" />}
      </button>
    </>
  );
};

export default Chatbot;
