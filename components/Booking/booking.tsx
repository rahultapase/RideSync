"use client";

import { useContext, useState, Suspense } from "react";
import dynamic from 'next/dynamic';
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { SelectedCarAmountContext } from "@/context/selected-car-amount-context";
import { useNotification } from '@/context/notification-context';
import { ChatProvider } from '@/context/chat-context';
import ChatWindow from '@/components/Chat/chat-window';
import { usePayment } from '@/context/payment-context';
import { LoadingSpinner } from "@/components/UI/loading-spinner";

// Define page transition animation
const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3 }
};

// Lazy load non-critical components
const BookingComponents = {
  AutocompleteAddress: dynamic(() => import('./autocomplete-address')),
  RideSharing: dynamic(() => import('./ride-sharing')),
  Cars: dynamic(() => import('./cars')),
  PaymentCards: dynamic(() => import('./payment-cards'))
};

// Preload critical components
const MapboxMap = dynamic(() => import('@/components/Map/mapbox-map'), { ssr: false });

export default function Booking() {
  const router = useRouter();
  const { carAmount } = useContext(SelectedCarAmountContext) ?? {};
  const [isSharedRide, setIsSharedRide] = useState(false);
  const [passengers, setPassengers] = useState(1);
  const { showNotification } = useNotification();
  const { selectedPaymentMethod } = usePayment();

  const handleBookClick = () => {
    if (!carAmount) {
      showNotification('Please select a car first', 'error');
      return;
    }

    if (selectedPaymentMethod === 'cash') {
      // Direct to success page for cash payments
      showNotification('Booking confirmed!', 'success');
      router.push('/payment-success?paymentMethod=cash');
    } else {
      // Redirect to payment gateway for card payments
      // showNotification('Redirecting to payment...', 'loading');
      router.push(`/payment?amount=${carAmount}&shared=${isSharedRide}`);
    }
  };

  return (
    <motion.div 
      className="p-5 bg-background"
      initial={pageTransition.initial}
      animate={pageTransition.animate}
      exit={pageTransition.exit}
      transition={pageTransition.transition}
    >
      <ChatProvider rideId="test-ride">
        <h2 className="text-[20px] font-semibold text-foreground">Book Your Ride</h2>

        <div className="border-[1px] border-border p-5 rounded-md space-y-5 h-[calc(100vh-140px)] overflow-y-auto scrollbar-hide bg-background">
          <Suspense fallback={<LoadingSpinner />}>
            <BookingComponents.AutocompleteAddress />
          </Suspense>
          <Suspense fallback={<LoadingSpinner />}>
            <BookingComponents.RideSharing 
              isSharedRide={isSharedRide} 
              setIsSharedRide={setIsSharedRide}
              passengers={passengers}
              setPassengers={setPassengers}
            />
          </Suspense>
          <Suspense fallback={<LoadingSpinner />}>
            <BookingComponents.Cars 
              isSharedRide={isSharedRide} 
              passengers={passengers}
            />
          </Suspense>
          <Suspense fallback={<LoadingSpinner />}>
            <BookingComponents.PaymentCards />
          </Suspense>
          <button
            type="submit"
            className={`w-full p-1 rounded-md mt-4 ${
              carAmount 
                ? "bg-primary text-primary-foreground hover:bg-primary/90 transition-colors" 
                : "bg-accent text-accent-foreground cursor-not-allowed"
            }`}
            disabled={!carAmount}
            onClick={handleBookClick}
          >
            {isSharedRide ? 'Book Shared Ride' : 'Book'}
          </button>
        </div>
        <ChatWindow />
      </ChatProvider>
    </motion.div>
  );
}
