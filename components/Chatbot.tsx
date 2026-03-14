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

const ParentAmbassadorButton: React.FC = () => (
  <a
    href="#parent-ambassadors"
    className="mt-2 flex items-center justify-center space-x-2 rounded-xl
      bg-green-500 px-3 py-2 text-sm font-medium text-white transition-colors
      hover:bg-green-600"
  >
    <span>Leave a message</span>
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
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const hasCheckedRef = useRef(false);

  // Track virtual keyboard height via visualViewport API
  useEffect(() => {
    if (!isOpen || typeof window === 'undefined') return;
    const vv = window.visualViewport;
    if (!vv) return;

    const update = () => {
      const kb = Math.max(0, window.innerHeight - vv.offsetTop - vv.height);
      setKeyboardHeight(kb);
    };

    vv.addEventListener('resize', update);
    vv.addEventListener('scroll', update);
    update();

    return () => {
      vv.removeEventListener('resize', update);
      vv.removeEventListener('scroll', update);
      setKeyboardHeight(0);
    };
  }, [isOpen]);

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
          className="fixed right-4 z-50 flex flex-col overflow-hidden
            rounded-2xl border border-slate-200 bg-white shadow-2xl sm:right-6"
          style={{
            width: 'min(calc(100vw - 2rem), 24rem)',
            // Sit above the FAB (h-14=56px + bottom-6=24px + 8px gap = 88px) or above the keyboard
            bottom: keyboardHeight > 0 ? keyboardHeight + 8 : 88,
            // Fill available visible space minus bottom offset and a small top margin
            maxHeight: `calc(100dvh - ${(keyboardHeight > 0 ? keyboardHeight + 8 : 88) + 16}px)`,
          }}
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
                  {msg.showWhatsApp && <ParentAmbassadorButton />}
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
