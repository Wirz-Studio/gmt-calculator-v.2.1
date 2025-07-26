import React from 'react';
import type { Message } from '../types';
import { Sender } from '../types';
import LoadingIndicator from './LoadingIndicator';

interface MessageBubbleProps {
  message: Message;
}

const UserAvatar: React.FC = () => (
    <div className="w-10 h-10 bg-slate-500 rounded-full flex-shrink-0 flex items-center justify-center text-white">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
    </div>
);

const AIAvatar: React.FC = () => (
    <div className="w-10 h-10 bg-emerald-200 rounded-full flex-shrink-0 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 20A7 7 0 0 1 4 13H2a10 10 0 0 0 10 10zM2 13a10 10 0 0 1 10-10 9.8 9.8 0 0 1 8 5" />
            <line x1="2" y1="13" x2="10" y2="13" />
        </svg>
    </div>
);


const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.sender === Sender.USER;

  return (
    <div className={`flex items-start gap-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && <AIAvatar />}
      <div className={`max-w-md lg:max-w-2xl px-5 py-3 rounded-2xl shadow-sm ${isUser ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-br-lg' : 'bg-white text-gray-800 rounded-bl-lg'}`}>
        {message.text ? (
          <p className="whitespace-pre-wrap">{message.text}</p>
        ) : (
          <LoadingIndicator />
        )}
      </div>
      {isUser && <UserAvatar />}
    </div>
  );
};

export default MessageBubble;