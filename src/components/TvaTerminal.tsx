import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ChatMessage } from '../types';
import { 
  Bot, 
  Send, 
  Terminal, 
  Trash2, 
  Copy, 
  Check, 
  ShieldAlert, 
  Radio, 
  CornerDownLeft,
  Flame,
  Layers
} from 'lucide-react';
import { soundEngine } from '../utils/audio';

export const TvaTerminal: React.FC = () => {
  const { triggerSFX } = useApp();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-tva',
      role: 'assistant',
      content: `### [TVA CHRONOLOGY TERMINAL // SECTOR 616 LOGGED]

**Time Variance Authority & Latverian Intelligence Online.**

I am your **TVA Chronologist & Multiverse Intelligence Unit**. I can declassify temporal anomalies, calculate incursion risks, break down Jonathan Hickman's *Secret Wars* comic canon, explain Anchor Beings, or analyze Victor von Doom's multiversal strategy for *Avengers: Doomsday*.

*What temporal query requires analysis, Operative?*`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      model: 'TVA-Chronos-Subsystem'
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    'Explain how an Incursion destroys a universe',
    'What is the connection between Doctor Doom and the Council of Reeds?',
    'Why is Robert Downey Jr. playing Doctor Doom instead of Tony Stark?',
    'What happens when an Anchor Being dies (Deadpool & Wolverine connection)?',
    'Explain God Emperor Doom and Battleworld from Hickman\'s Secret Wars'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (queryText?: string) => {
    const textToSend = queryText || inputQuery;
    if (!textToSend.trim() || isLoading) return;

    soundEngine.playClick();

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputQuery('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/tva-chronologist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: textToSend.trim(),
          conversationHistory: messages.map((m) => ({ role: m.role, content: m.content }))
        })
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      soundEngine.playTvaBeep();
      triggerSFX({ text: 'ZAAAAP!', color: 'cyan', scale: 1.15 });

      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: data.response || 'Temporal signal interrupted. Please resubmit query.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        model: data.model,
        isOfflineFallback: data.isOfflineFallback
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      soundEngine.playIncursionAlarm();
      const errorMessage: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'assistant',
        content: `### [TVA TRANSMISSION ERROR]
Could not establish direct nexus handshake with server. Using local temporal archive:
Incursions occur when two universe boundaries buckle, leaving an 8-hour window before mutual universal annihilation unless one Earth is destroyed. Victor von Doom seeks to synthesize these collapsing fragments into Battleworld under his absolute rule.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isOfflineFallback: true
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    soundEngine.playClick();
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const clearChat = () => {
    soundEngine.playClick();
    setMessages([
      {
        id: `clear-${Date.now()}`,
        role: 'assistant',
        content: `### [TVA CHRONOLOGY BUFFER PURGED]
Terminal reset to baseline. Standby for new temporal inquiries.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <div className="space-y-4 animate-fadeIn font-mono">
      {/* Terminal Top Info Bar in Comic Style */}
      <div className="rounded bg-[#080d08] border-2 border-[#1a2e1a] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 doom-glow shadow-[4px_4px_0px_#000] bg-comic-dots">
        <div className="flex items-center space-x-3">
          
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="font-comic text-2xl text-white flex items-center gap-2 uppercase comic-title-stroke tracking-wide">
                TVA AI Chronologist
              </h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#1a2e1a] text-[#22c55e] border-2 border-[#22c55e] uppercase tracking-wider shadow-[2px_2px_0px_#000]">
                GEMINI 3.7 FLASH
              </span>
            </div>
            <p className="text-xs text-[#e0e7e0]/70">
              Interactive Multiverse & Latverian Lore Terminal // Clearance: Epsilon
            </p>
          </div>
        </div>

        <button
          id="btn-clear-tva-chat"
          onClick={clearChat}
          className="self-start sm:self-auto px-3 py-1.5 rounded text-xs text-[#e0e7e0]/60 hover:text-red-400 hover:bg-red-950/40 border border-[#1a2e1a] transition-colors flex items-center gap-1.5 uppercase font-bold tracking-wider"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Purge Terminal</span>
        </button>
      </div>

      {/* Main Terminal Window */}
      <div className="rounded border border-[#1a2e1a] bg-[#020402] flex flex-col h-[580px] sm:h-[620px] shadow-2xl overflow-hidden relative doom-glow">
        {/* CRT Scanline Overlay Effect */}
        <div className="absolute inset-0 bg-tva-scanline opacity-15 pointer-events-none z-10" />

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 text-xs sm:text-sm">
          {messages.map((msg) => {
            const isUser = msg.role === 'user';
            const isCopied = copiedId === msg.id;

            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-1`}
              >
                <div className="flex items-center space-x-2 text-[10px] text-[#e0e7e0]/50 px-1">
                  <span>{isUser ? 'OPERATIVE 616' : 'TVA CHRONOLOGIST'}</span>
                  <span>•</span>
                  <span>{msg.timestamp}</span>
                  {msg.model && (
                    <span className="text-[#22c55e]">[{msg.model}]</span>
                  )}
                </div>

                <div
                  className={`max-w-[92%] sm:max-w-[85%] rounded p-3.5 sm:p-4.5 border transition-all ${
                    isUser
                      ? 'bg-[#1a2e1a] border-[#22c55e]/50 text-white rounded-br-sm'
                      : 'bg-[#080d08] border-[#1a2e1a] text-[#e0e7e0] rounded-bl-sm space-y-2'
                  }`}
                >
                  <div className="whitespace-pre-wrap leading-relaxed">
                    {msg.content}
                  </div>

                  {!isUser && (
                    <div className="flex items-center justify-end pt-2 border-t border-[#1a2e1a] mt-2">
                      <button
                        onClick={() => copyToClipboard(msg.content, msg.id)}
                        className="text-[11px] text-[#e0e7e0]/60 hover:text-[#22c55e] flex items-center gap-1 transition-colors uppercase font-bold tracking-wider"
                        title="Copy record"
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3 h-3 text-[#22c55e]" />
                            <span className="text-[#22c55e]">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy Intel</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex flex-col items-start space-y-1">
              <div className="text-[10px] text-[#22c55e] flex items-center gap-1.5 px-1 font-bold uppercase tracking-wider">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22c55e] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22c55e]"></span>
                </span>
                <span>TVA SCANNING MULTIVERSE STRANDS...</span>
              </div>
              <div className="rounded p-4 bg-[#080d08] border border-[#22c55e]/30 text-[#e0e7e0] flex items-center space-x-2">
                <div className="w-2 h-2 bg-[#22c55e] rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-[#22c55e] rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="w-2 h-2 bg-[#22c55e] rounded-full animate-bounce [animation-delay:0.4s]" />
                <span className="text-xs text-[#e0e7e0]/60 ml-2">
                  Decoding Jonathan Hickman timeline archives & Doom defense protocols...
                </span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-4 py-2 bg-[#020402] border-t border-[#1a2e1a] flex items-center space-x-2 overflow-x-auto scrollbar-none">
          <span className="text-[10px] text-[#e0e7e0]/50 uppercase tracking-wider shrink-0 font-bold">
            Suggested:
          </span>
          {quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              id={`quick-prompt-${idx}`}
              onClick={() => handleSendMessage(prompt)}
              disabled={isLoading}
              className="px-2.5 py-1 rounded text-[11px] bg-[#080d08] hover:bg-[#1a2e1a] hover:text-[#22c55e] border border-[#1a2e1a] text-[#e0e7e0]/70 whitespace-nowrap transition-colors shrink-0 disabled:opacity-50 font-medium"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-[#080d08] border-t border-[#1a2e1a] relative z-20">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center space-x-2"
          >
            <div className="relative flex-1">
              <input
                id="tva-terminal-input"
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder="Ask the TVA Chronologist anything about Doomsday, Incursions, Doom, or Hickman's Secret Wars..."
                disabled={isLoading}
                className="w-full pl-4 pr-10 py-2.5 text-xs sm:text-sm bg-[#020402] border border-[#1a2e1a] rounded text-white placeholder-[#e0e7e0]/40 focus:outline-none focus:border-[#22c55e]"
              />
            </div>

            <button
              id="btn-send-tva-query"
              type="submit"
              disabled={isLoading || !inputQuery.trim()}
              className="px-4 py-2.5 rounded text-xs font-bold uppercase tracking-wider bg-[#22c55e] text-black hover:bg-[#22c55e]/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-1.5 shrink-0 shadow-lg shadow-[#22c55e]/20"
            >
              <span>Transmit</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
