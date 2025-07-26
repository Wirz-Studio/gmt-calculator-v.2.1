import React, { useState, useCallback } from 'react';
import { streamMessage } from '../services/geminiService';
import type { Message } from '../types';
import { Sender } from '../types';
import MessageList from './MessageList';
import UserInput from './UserInput';

interface ChatWindowProps {
  onClose: () => void;
}

const LeafIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 20A7 7 0 0 1 4 13H2a10 10 0 0 0 10 10zM2 13a10 10 0 0 1 10-10 9.8 9.8 0 0 1 8 5" />
        <line x1="2" y1="13" x2="10" y2="13" />
    </svg>
);

const ChatWindow: React.FC<ChatWindowProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 'initial-ai-message', text: "Hello! I'm WirZ Assistant, specializing in PMK 136/2024. How can I help you today?", sender: Sender.AI }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = useCallback(async (text: string) => {
    if (!text.trim()) return;

    setIsLoading(true);

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text,
      sender: Sender.USER,
    };
    
    const aiMessageId = `ai-${Date.now()}`;
    const aiPlaceholderMessage: Message = { id: aiMessageId, text: '', sender: Sender.AI };

    setMessages(prev => [...prev, userMessage, aiPlaceholderMessage]);

    try {
      const stream = await streamMessage(text);
      let fullResponse = '';
      for await (const chunk of stream) {
        if (chunk.text) {
          fullResponse += chunk.text;
          setMessages(prev =>
            prev.map(msg =>
              msg.id === aiMessageId ? { ...msg, text: fullResponse } : msg
            )
          );
        }
      }
    } catch (error) {
      console.error('Failed to stream message:', error);
      setMessages(prev =>
        prev.map(msg =>
          msg.id === aiMessageId ? { ...msg, text: 'An error occurred. Please try again.' } : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="flex flex-col w-full h-full max-w-lg sm:h-[70vh] sm:max-h-[700px] bg-emerald-50/80 backdrop-blur-md rounded-t-2xl sm:rounded-2xl shadow-2xl border border-emerald-200/60 overflow-hidden">
      <header className="flex items-center justify-between p-4 border-b border-emerald-200/80 shrink-0">
        <div className="flex items-center space-x-3">
            <LeafIcon className="h-6 w-6 text-emerald-600" />
            <h2 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-700">
                WirZ Assistant
            </h2>
        </div>
        <button onClick={onClose} className="text-emerald-700 hover:text-emerald-900 transition-colors" aria-label="Close chat">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
      </header>

      <MessageList messages={messages} isLoading={isLoading} />
      <UserInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
};

export default ChatWindow;