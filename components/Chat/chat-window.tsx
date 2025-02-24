"use client";

import { useState, useRef, useEffect } from 'react';
import { useChat } from '@/context/chat-context';
import { useUser } from '@clerk/nextjs';
import { Send, X, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ChatWindow() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [mounted, setMounted] = useState(false);
  const { messages, sendMessage, isConnected } = useChat();
  const { user, isLoaded } = useUser();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      try {
        sendMessage(message);
        setMessage('');
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  if (!mounted || !isLoaded) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <div className="p-4 bg-primary text-primary-foreground rounded-full">
          <Loader2 className="w-6 h-6 animate-spin" />
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Don't render chat if user is not authenticated
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-primary text-primary-foreground p-4 rounded-full shadow-lg hover:opacity-90 transition-opacity"
      >
        {isOpen ? <X size={24} /> : <span className="text-xl">💬</span>}
      </button>

      {/* Chat Window */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 w-80 bg-background rounded-lg shadow-xl border border-primary/10"
          >
            {/* Header */}
            <div className="p-4 bg-primary text-primary-foreground rounded-t-lg flex justify-between items-center">
              <h3 className="font-semibold">Chat with Driver</h3>
              <span 
                className={`h-2 w-2 rounded-full ${
                  isConnected ? 'bg-green-400' : 'bg-red-400'
                }`} 
                title={isConnected ? 'Connected' : 'Disconnected'}
              />
            </div>

            {/* Messages */}
            <div className="h-96 overflow-y-auto p-4 space-y-4 bg-background">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.senderId === user?.id ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      msg.senderId === user?.id
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-accent dark:bg-accent/50'
                    }`}
                  >
                    <p className="text-sm font-medium">{msg.senderName}</p>
                    <p className="break-words">{msg.text}</p>
                    <p className="text-xs opacity-75 mt-1">
                      {new Date(msg.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form 
              onSubmit={handleSubmit} 
              className="p-4 border-t border-border bg-background/95 rounded-b-lg"
            >
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 p-2 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                  type="submit"
                  className="bg-primary text-primary-foreground p-2 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
                  disabled={!message.trim()}
                >
                  <Send size={20} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 