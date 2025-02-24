"use client";

import { useSearchParams, useRouter } from 'next/navigation';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { motion } from 'framer-motion';
import { CheckCircle2, MapPin, Clock, MessageCircle } from 'lucide-react';

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const paymentMethod = searchParams.get('paymentMethod');
  const rideId = searchParams.get('rideId') || 'test-ride';
  const router = useRouter();

  const handleBackToHome = () => {
    router.push('/');
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Success Animation */}
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 260,
              damping: 20 
            }}
            className="flex justify-center"
          >
            <div className="w-24 h-24 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-8">
              <CheckCircle2 className="w-12 h-12 text-green-500 dark:text-green-400" />
            </div>
          </motion.div>

          {/* Success Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {paymentMethod === 'cash' ? 'Booking Confirmed!' : 'Payment Successful!'}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {paymentMethod === 'cash' 
                ? 'Your ride has been booked. Please pay cash to the driver.'
                : 'Your ride has been confirmed and your driver is on the way'}
            </p>
          </motion.div>

          {/* Ride Details Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Estimated Time */}
              <div className="flex items-center space-x-4 p-4 bg-blue-50 dark:bg-gray-700 rounded-lg">
                <Clock className="w-8 h-8 text-blue-500 dark:text-blue-400" />
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Estimated Time</h3>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">10-15 mins</p>
                </div>
              </div>

              {/* Driver Status */}
              <div className="flex items-center space-x-4 p-4 bg-green-50 dark:bg-gray-700 rounded-lg">
                <MapPin className="w-8 h-8 text-green-500 dark:text-green-400" />
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Driver Status</h3>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">On the way</p>
                </div>
              </div>

              {/* Support Info */}
              <div className="flex items-center space-x-4 p-4 bg-purple-50 dark:bg-gray-700 rounded-lg">
                <MessageCircle className="w-8 h-8 text-purple-500 dark:text-purple-400" />
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">OTP</h3>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">2309</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Back to Home Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-8 text-center"
          >
            <motion.button
              onClick={handleBackToHome}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative inline-flex items-center justify-center px-8 py-3 
                text-lg font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 
                rounded-md shadow-lg hover:from-blue-700 hover:to-blue-800 
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 
                transition-all duration-200 ease-in-out overflow-hidden"
            >
              <span className="relative flex items-center gap-2">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 transform transition-transform group-hover:-translate-x-1" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M10 19l-7-7m0 0l7-7m-7 7h18" 
                  />
                </svg>
                Back to Home
              </span>
              <div className="absolute inset-0 w-3 bg-gradient-to-r from-white/0 via-white/20 to-white/0 
                transform -skew-x-[20deg] translate-x-[-200%] group-hover:translate-x-[200%] 
                transition-transform duration-1000 ease-in-out">
              </div>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </ErrorBoundary>
  );
} 