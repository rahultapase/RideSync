"use client";

import { convertToSubcurrency } from "@/utils/subCurrency";
import { useUser } from "@clerk/nextjs";
import {
  PaymentElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useNotification } from '@/context/notification-context';
import { motion } from 'framer-motion';
import { CreditCard, Shield, Clock } from 'lucide-react';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

function PaymentForm({ amount, user }: { readonly amount: number | undefined; readonly user: any; }) {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [elementReady, setElementReady] = useState(false);
  const { showNotification } = useNotification();

  useEffect(() => {
    if (!amount || amount <= 0) return;

    const fetchPaymentIntent = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: Math.round(amount) }),
        });

        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || "Failed to create payment intent");
        }

        setClientSecret(data.clientSecret);
      } catch (error) {
        console.error("Payment Intent Error:", error);
        setErrorMessage(error instanceof Error ? error.message : "Payment setup failed");
        showNotification("Payment setup failed", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentIntent();
  }, [amount, showNotification]);

  const handleElementChange = (event: any) => {
    setElementReady(event.complete);
    if (event.error) {
      setErrorMessage(event.error.message);
      showNotification(event.error.message, "error");
    } else {
      setErrorMessage("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements || !clientSecret) {
      return;
    }

    setLoading(true);

    try {
      const { error: submitError } = await elements.submit();
      if (submitError) {
        showNotification(submitError.message || 'Payment validation failed', 'error');
        return;
      }

      const { error } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: `${window.location.origin}/payment-success`,
        }
      });

      if (error) {
        if (error.type === 'card_error' || error.type === 'validation_error') {
          showNotification(error.message || 'Payment failed', 'error');
        } else {
          showNotification('An unexpected error occurred', 'error');
        }
      }
    } catch (err) {
      console.error('Payment error:', err);
      showNotification('Payment processing failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Left side - Payment Form */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Payment Details</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {clientSecret ? (
              <PaymentElement 
                className="payment-element"
                onChange={handleElementChange}
                options={{
                  paymentMethodOrder: ['card'],
                  defaultValues: {
                    billingDetails: {
                      name: user?.firstName || 'Anonymous',
                    }
                  }
                }}
              />
            ) : (
              <div className="flex justify-center p-6">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-e-transparent"></div>
              </div>
            )}
            {errorMessage && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 bg-red-50 dark:bg-red-900/30 p-3 rounded-lg text-sm"
              >
                {errorMessage}
              </motion.div>
            )}
            <motion.button
              type="submit"
              disabled={!stripe || !elements || loading || !elementReady}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-xl
                font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:from-gray-400 
                disabled:to-gray-500 transition-all duration-200 hover:shadow-lg"
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Processing...</span>
                </div>
              ) : (
                `Pay ₹${amount ? (amount / 100).toFixed(2) : "0.00"}`
              )}
            </motion.button>
          </form>
        </div>

        {/* Right side - Order Summary & Security Info */}
        <div className="space-y-6">
          {/* Order Summary */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Order Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-gray-600 dark:text-gray-300">
                <span>Subtotal</span>
                <span>₹{amount ? (amount / 100).toFixed(2) : "0.00"}</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-300">
                <span>Processing Fee</span>
                <span>₹0.00</span>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 pt-3 mt-3">
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>₹{amount ? (amount / 100).toFixed(2) : "0.00"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Test Card Details */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Test Card Details
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 rounded-lg">
                <span className="text-gray-600 dark:text-gray-300">Card Number</span>
                <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded font-mono">
                  4242 4242 4242 4242
                </code>
              </div>
              <div className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 rounded-lg">
                <span className="text-gray-600 dark:text-gray-300">Expiry Date</span>
                <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded font-mono">
                  Any future date
                </code>
              </div>
              <div className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 rounded-lg">
                <span className="text-gray-600 dark:text-gray-300">CVC</span>
                <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded font-mono">
                  Any 3 digits
                </code>
              </div>
            </div>
          </div>

          {/* Security Features */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Secure Payment</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
                <Shield className="w-5 h-5 text-green-500" />
                <span>256-bit SSL Encryption</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
                <CreditCard className="w-5 h-5 text-blue-500" />
                <span>End-to-end encrypted</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
                <Clock className="w-5 h-5 text-purple-500" />
                <span>24/7 Secure Processing</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckOutForm() {
  const { user, isLoaded } = useUser();
  const searchParams = useSearchParams();
  const amount = searchParams?.get("amount");
  const { showNotification } = useNotification();

  const numericAmount = amount ? parseFloat(amount) : 0;
  const stripeAmount = numericAmount > 0 ? convertToSubcurrency(numericAmount) : undefined;
  const displayAmount = numericAmount.toFixed(2);

  const options: StripeElementsOptions = {
    mode: "payment",
    amount: stripeAmount,
    currency: "inr",
    appearance: {
      theme: 'stripe',
      variables: {
        colorPrimary: '#3b82f6',
      },
      rules: {
        '.Input': {
          border: '1px solid #e2e8f0',
          borderRadius: '0.375rem',
        },
      },
    },
    loader: 'auto'
  };

  if (!stripeAmount || stripeAmount <= 0) {
    return (
      <div className="max-w-6xl mx-auto p-10 text-center">
        <h2 className="text-red-500">Invalid amount specified</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-extrabold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Welcome{isLoaded ? ", " : " "}
            {user?.firstName ?? "Valued User"} 👋
          </h1>
          <p className="text-2xl text-gray-600 dark:text-gray-300">
            Complete your payment of <span className="font-bold">₹{displayAmount}</span>
          </p>
        </motion.div>
        
        <Elements stripe={stripePromise} options={options}>
          <PaymentForm amount={stripeAmount} user={user} />
        </Elements>
      </div>
    </div>
  );
}
