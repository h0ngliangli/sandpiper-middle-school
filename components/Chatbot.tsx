'use client';
import { REDIRECT_SIGNAL } from '@/lib/constants';
import { appCheck } from '@/lib/firebase';
import { getToken } from 'firebase/app-check';
import { MessageCircle, X, Send, AlertCircle } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type ConnectionStatus = 'idle' | 'checking' | 'ok' | 'error';

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

const WhatsAppIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

const WhatsAppButton: React.FC = () => (
  <a
    href="#parent-ambassadors"
    className="mt-2 flex items-center justify-center space-x-2 rounded-xl
      bg-green-500 px-3 py-2 text-sm font-medium text-white transition-colors
      hover:bg-green-600"
  >
    <WhatsAppIcon className="h-4 w-4" />
    <span>Take me to a Parent Ambassador</span>
  </a>
);

const TypingIndicator: React.FC = () => (
  <div className="flex justify-start">
    <div className="rounded-2xl rounded-bl-sm bg-slate-100 px-4 py-3">
      <div className="flex space-x-1">
        {[0, 150, 300].map((delay) => (
          <div
            key={delay}
            className="h-2 w-2 animate-bounce rounded-full bg-slate-400"
            style={{ animationDelay: `${delay}ms` }}
          />
        ))}
      </div>
    </div>
  </div>
);

const getAppCheckHeaders = async (): Promise<Record<string, string>> => {
  if (!appCheck) return {};
  try {
    const { token } = await getToken(appCheck);
    return { 'X-Firebase-AppCheck': token };
  } catch (error) {
    console.log('Failed to get App Check token', error);
    return {};
  }
};

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [connectionStatus, setConnectionStatus] =
    useState<ConnectionStatus>('idle');
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

  // Restore focus after each assistant reply
  useEffect(() => {
    if (!isLoading && isOpen && connectionStatus === 'ok') {
      inputRef.current?.focus();
    }
  }, [isLoading, isOpen, connectionStatus]);

  // Run a one-time connection check the first time the chat is opened
  useEffect(() => {
    if (!isOpen || hasCheckedRef.current) return;
    hasCheckedRef.current = true;

    const checkConnection = async () => {
      setConnectionStatus('checking');
      try {
        const appCheckHeaders = await getAppCheckHeaders();
        const res = await fetch('/api/chat', { headers: appCheckHeaders });
        if (!res.ok) {
          setConnectionStatus('error');
          setMessages((prev: Message[]) => [
            ...prev,
            {
              id: 'api-error',
              role: 'assistant',
              content: `⚠️ Could not connect to the AI assistant (HTTP ${res.status}). You can still reach a Parent Ambassador directly via WhatsApp.`,
              showWhatsApp: true,
            },
          ]);
          return;
        }
        setConnectionStatus('ok');
      } catch (error) {
        console.log('Failed to connect to the AI assistant', error);
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
    const appCheckHeaders = await getAppCheckHeaders();
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...appCheckHeaders },
      body: JSON.stringify({ contents: history }),
    });
    if (!response.ok) throw new Error(`Chat API error: ${response.status}`);
    const data = await response.json();
    return data.text ?? REDIRECT_SIGNAL;
  };

  const handleSend = async () => {
    const text = inputValue.trim();
    if (!text || isLoading) return;

    setInputValue('');

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      role: 'user',
      content: text,
    };
    setMessages((prev: Message[]) => [...prev, userMsg]);

    const nextHistory: GeminiMessage[] = [
      ...apiHistory,
      { role: 'user', parts: [{ text }] },
    ];

    setIsLoading(true);
    try {
      const raw = await callGemini(nextHistory);
      const shouldRedirect = raw.trim().indexOf(REDIRECT_SIGNAL) !== -1;

      const assistantContent = shouldRedirect
        ? 'Our Parent Ambassadors are experienced Sandpiper parents who would be happy to help you directly!'
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

  const isInputDisabled = isLoading || connectionStatus === 'error';

  const statusLabel: Record<ConnectionStatus, string> = {
    idle: 'Ask about our school',
    checking: 'Connecting…',
    ok: 'Connected',
    error: 'AI unavailable — use WhatsApp below',
  };

  return (
    <>
      {/* ── Chat window ────────────────────────────────────────── */}
      {isOpen && (
        <div
          className="fixed bottom-24 right-4 z-50 flex flex-col overflow-hidden
            rounded-2xl border border-slate-200 bg-white shadow-2xl sm:right-6"
          style={{ width: 'min(calc(100vw - 2rem), 24rem)', maxHeight: '70vh' }}
          role="dialog"
          aria-label="School chatbot"
        >
          {/* Header */}
          <div
            className="flex flex-shrink-0 items-center justify-between
              bg-sandpiper-blue px-4 py-3"
          >
            <div className="flex items-center space-x-3">
              <div className="rounded-full bg-sandpiper-blue p-2">
                <img
                  src="/favicon.svg"
                  className="h-8 w-8"
                  alt="Sandpiper Middle School logo"
                />
              </div>
              <div>
                <p className="text-sm font-semibold leading-tight text-white">
                  Sandpiper Assistant
                </p>
                <div className="mt-0.5 flex items-center space-x-1.5">
                  {/* Status indicator */}
                  {connectionStatus === 'checking' && (
                    <span
                      className="h-2 w-2 animate-pulse rounded-full
                        bg-yellow-400"
                    />
                  )}
                  {connectionStatus === 'ok' && (
                    <span className="h-2 w-2 rounded-full bg-green-400" />
                  )}
                  {connectionStatus === 'error' && (
                    <AlertCircle className="h-3.5 w-3.5 text-red-400" />
                  )}
                  <p className="text-xs text-blue-200">
                    {statusLabel[connectionStatus]}
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded p-1 text-blue-200 transition-colors
                hover:text-white"
              aria-label="Close chat"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex
                ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className="max-w-[85%]">
                  <div
                    className={`rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'rounded-br-sm bg-sandpiper-blue text-white'
                        : 'rounded-bl-sm bg-slate-100 text-slate-800'
                    }`}
                  >
                    {msg.role === 'user' ? (
                      msg.content
                    ) : (
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          p: ({ children }) => (
                            <p className="mb-1 last:mb-0">{children}</p>
                          ),
                          ul: ({ children }) => (
                            <ul
                              className="mb-1 list-inside list-disc space-y-0.5"
                            >
                              {children}
                            </ul>
                          ),
                          ol: ({ children }) => (
                            <ol
                              className="mb-1 list-inside list-decimal
                                space-y-0.5"
                            >
                              {children}
                            </ol>
                          ),
                          li: ({ children }) => <li>{children}</li>,
                          strong: ({ children }) => (
                            <strong className="font-semibold">
                              {children}
                            </strong>
                          ),
                          a: ({ href, children }) => (
                            <a
                              href={href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-700 underline
                                hover:text-blue-900"
                            >
                              {children}
                            </a>
                          ),
                          code: ({ children }) => (
                            <code
                              className="rounded bg-slate-200 px-1 font-mono
                                text-xs"
                            >
                              {children}
                            </code>
                          ),
                        }}
                      >
                        {msg.content}
                      </ReactMarkdown>
                    )}
                  </div>
                  {msg.showWhatsApp && <WhatsAppButton />}
                </div>
              </div>
            ))}

            {isLoading && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div
            className="flex flex-shrink-0 items-center space-x-2 border-t
              border-slate-200 px-3 py-3"
          >
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
              className="flex-1 rounded-full border border-slate-200 bg-slate-50
                px-4 py-2 text-sm text-midnight focus:border-transparent
                focus:outline-none focus:ring-2 focus:ring-blue-500
                disabled:cursor-not-allowed disabled:opacity-50"
            />
            <button
              onClick={handleSend}
              disabled={!inputValue.trim() || isInputDisabled}
              className="flex h-9 w-9 flex-shrink-0 items-center justify-center
                rounded-full bg-sandpiper-blue text-white transition-colors
                hover:bg-blue-900 disabled:bg-slate-300"
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
        className="fixed bottom-6 right-4 z-50 flex h-14 w-14 items-center
          justify-center rounded-full bg-blue-800 text-white shadow-xl
          transition-all duration-200 hover:scale-110 sm:right-6"
        aria-label={isOpen ? 'Close chat' : 'Open school assistant chat'}
      >
        {!isOpen && (
          <span
            className="absolute inline-flex h-full w-full animate-ping
              rounded-full bg-blue-800 opacity-75"
          />
        )}
        {isOpen ? (
          <X className="relative h-6 w-6" />
        ) : (
          <MessageCircle className="relative h-6 w-6" />
        )}
      </button>
    </>
  );
};

export default Chatbot;
