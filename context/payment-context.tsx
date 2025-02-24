"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

type PaymentContextType = {
  selectedPaymentMethod: string;
  setSelectedPaymentMethod: (method: string) => void;
};

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

export function PaymentProvider({ children }: { children: ReactNode }) {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('card');

  return (
    <PaymentContext.Provider value={{ selectedPaymentMethod, setSelectedPaymentMethod }}>
      {children}
    </PaymentContext.Provider>
  );
}

export const usePayment = () => {
  const context = useContext(PaymentContext);
  if (context === undefined) {
    throw new Error('usePayment must be used within a PaymentProvider');
  }
  return context;
}; 