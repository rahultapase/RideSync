import Image from "next/image";
import { useState, useContext } from "react";
import { useNotification } from '@/context/notification-context';
import { usePayment } from '@/context/payment-context';

interface PaymentMethod {
  id: number;
  name: string;
  type: 'card' | 'online' | 'cash';
  image: string;
}

const paymentMethods: PaymentMethod[] = [
  // Card Payments
  {
    id: 1,
    name: "Credit/Debit Card",
    type: "card",
    image: "/credit-card.png"
  },
  // Online Payments
  {
    id: 2,
    name: "Google Pay",
    type: "online",
    image: "/google-pay.png"
  },
  // Cash Payment
  {
    id: 3,
    name: "Cash",
    type: "cash",
    image: "/money.png"
  }
];

export default function PaymentCards() {
  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);
  const { showNotification } = useNotification();
  const { setSelectedPaymentMethod } = usePayment();

  const handlePaymentSelect = (method: PaymentMethod) => {
    setActiveIndex(method.id);
    setSelectedPaymentMethod(method.type);
    showNotification(`Selected ${method.name} as payment method`, 'success');
  };

  return (
    <div>
      <h2 className="text-[14px] font-medium mb-4">Payment Methods</h2>
      <div className="flex items-center gap-8">
        {/* Credit/Debit Cards */}
        <div>
          <h3 className="text-[12px] text-gray-500 mb-2">Credit/Debit Cards</h3>
          <button
            type="button"
            className={`w-[50px] h-[35px] border-[1px] flex items-center justify-center rounded-md cursor-pointer hover:border-blue-500 hover:scale-110 transition-all ${
              activeIndex === 1 ? "border-blue-500 border-[2px]" : "border-gray-200"
            }`}
            onClick={() => handlePaymentSelect(paymentMethods[0])}
          >
            <Image 
              src="/credit-card.png"
              alt="Credit/Debit Card"
              width={30}
              height={20}
              className="object-contain"
            />
          </button>
        </div>

        {/* Online Payments */}
        <div>
          <h3 className="text-[12px] text-gray-500 mb-2">Online Payments</h3>
          <button
            type="button"
            className={`w-[50px] h-[35px] border-[1px] flex items-center justify-center rounded-md cursor-pointer hover:border-blue-500 hover:scale-110 transition-all ${
              activeIndex === 2 ? "border-blue-500 border-[2px]" : "border-gray-200"
            }`}
            onClick={() => handlePaymentSelect(paymentMethods[1])}
          >
            <Image 
              src="/google-pay.png"
              alt="Google Pay"
              width={30}
              height={20}
              className="object-contain"
            />
          </button>
        </div>

        {/* Cash Payment */}
        <div>
          <h3 className="text-[12px] text-gray-500 mb-2">Cash Payment</h3>
          <button
            type="button"
            className={`w-[50px] h-[35px] border-[1px] flex items-center justify-center rounded-md cursor-pointer hover:border-blue-500 hover:scale-110 transition-all ${
              activeIndex === 3 ? "border-blue-500 border-[2px]" : "border-gray-200"
            }`}
            onClick={() => handlePaymentSelect(paymentMethods[2])}
          >
            <Image 
              src="/money.png"
              alt="Cash"
              width={30}
              height={20}
              className="object-contain"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
