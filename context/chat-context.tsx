"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useUser } from '@clerk/nextjs';

interface Message {
  id: string;
  text: string;
  senderId: string;
  senderName: string;
  timestamp: Date;
  isDriver: boolean;
}

interface ChatContextType {
  messages: Message[];
  sendMessage: (text: string) => void;
  isConnected: boolean;
}

const ChatContext = createContext<ChatContextType | null>(null);

export function ChatProvider({ children, rideId }: { children: React.ReactNode; rideId: string }) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (!isLoaded || !user) return;

    let mounted = true;

    const newSocket = io('http://localhost:3001', {
      query: { rideId, userId: user.id },
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    newSocket.on('connect', () => {
      if (mounted) setIsConnected(true);
    });

    newSocket.on('disconnect', () => {
      if (mounted) setIsConnected(false);
    });

    newSocket.on('message', (message: Message) => {
      if (mounted) setMessages(prev => [...prev, message]);
    });

    if (mounted) setSocket(newSocket);

    return () => {
      mounted = false;
      newSocket.close();
    };
  }, [rideId, user, isLoaded]);

  const sendMessage = (text: string) => {
    if (!socket || !user) return;
    
    try {
      const message = {
        id: Math.random().toString(36).substr(2, 9),
        text,
        senderId: user.id,
        senderName: user.fullName || 'User',
        timestamp: new Date(),
        isDriver: false
      };
      socket.emit('message', message);
      setMessages(prev => [...prev, message]);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <ChatContext.Provider value={{ messages, sendMessage, isConnected }}>
      {children}
    </ChatContext.Provider>
  );
}

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}; 