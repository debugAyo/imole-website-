import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Message, MessageRole } from '../types';
import { User, Sparkles, Copy, Check } from 'lucide-react';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.role === MessageRole.User;
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`flex w-full mb-8 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex max-w-3xl w-full gap-4 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        
        {/* Avatar */}
        <div className={`
          w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center border
          ${isUser ? 'bg-white border-gray-200' : 'bg-black border-black'}
        `}>
          {isUser ? (
            <User size={14} className="text-gray-600" />
          ) : (
            <Sparkles size={14} className="text-white" />
          )}
        </div>

        {/* Content */}
        <div className={`flex-1 min-w-0 ${isUser ? 'text-right' : 'text-left'}`}>
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-sm font-semibold ${isUser ? 'ml-auto' : ''} text-gray-900`}>
              {isUser ? 'You' : 'Lumina'}
            </span>
            <span className="text-xs text-gray-400">
              {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>

          <div className={`
            prose prose-sm md:prose-base max-w-none
            ${isUser ? 'text-gray-800' : 'text-gray-800'}
            prose-headings:font-semibold prose-headings:text-gray-900 prose-headings:tracking-tight
            prose-p:leading-relaxed prose-p:text-gray-700
            prose-a:text-slate-600 prose-a:no-underline hover:prose-a:underline
            prose-code:text-gray-800 prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
            prose-pre:bg-gray-50 prose-pre:border prose-pre:border-gray-200 prose-pre:text-gray-800
            prose-strong:font-semibold prose-strong:text-gray-900
          `}>
             <ReactMarkdown>
                {message.content + (message.isStreaming ? ' ●' : '')}
             </ReactMarkdown>
          </div>

          {!isUser && !message.isStreaming && (
            <div className="mt-2 flex items-center space-x-2">
              <button 
                onClick={handleCopy}
                className="flex items-center space-x-1 text-xs text-gray-400 hover:text-gray-700 transition-colors p-1 -ml-1"
              >
                {copied ? <Check size={12} /> : <Copy size={12} />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
