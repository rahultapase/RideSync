"use client";

import Booking from "@/components/Booking/booking";
import MapboxMap from "@/components/Map/mapbox-map";
import { DestinationCoordinatesContext } from "@/context/destination-coordinates-context";
import {
  DirectionsData,
  DirectionsDataContext,
} from "@/context/directions-data-context";
import { SelectedCarAmountContext } from "@/context/selected-car-amount-context";
import {
  Coordinates,
  SourceCoordinatesContext,
} from "@/context/source-coordinates-context";
import { Location, UserLocationContext } from "@/context/user-location-context";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/UI/input";
import { Search, MapPin, Calendar, Clock, Users, Share2, DollarSign, SplitSquareHorizontal } from "lucide-react";

export default function HomePage() {
  const [userLocation, setUserLocation] = useState<Location | null>(null);
  const [sourceCoordinates, setSourceCoordinates] =
    useState<Coordinates | null>(null);
  const [destinationCoordinates, setDestinationCoordinates] =
    useState<Coordinates | null>(null);

  const [directionsData, setDirectionsData] = useState<DirectionsData | null>(
    null
  );
  const [carAmount, setCarAmount] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  
  // Add a new state for the active tab on mobile
  const [activeTab, setActiveTab] = useState('booking');

  useEffect(() => {
    fetchUserLocation();
    // Add a minimum loading time to prevent flash
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Get user location with high accuracy
  function fetchUserLocation(): void {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      (error) => console.error("Error fetching user location:", error),
      { enableHighAccuracy: true }
    );
  }

  // Use useMemo to memoize context values
  const userLocationValue = useMemo(
    () => ({ userLocation, setUserLocation }),
    [userLocation]
  );
  const sourceCoordinatesValue = useMemo(
    () => ({ sourceCoordinates, setSourceCoordinates }),
    [sourceCoordinates]
  );
  const destinationCoordinatesValue = useMemo(
    () => ({ destinationCoordinates, setDestinationCoordinates }),
    [destinationCoordinates]
  );
  const directionsDataValue = useMemo(
    () => ({ directionsData, setDirectionsData }),
    [directionsData]
  );
  const carAmountValue = useMemo(
    () => ({ carAmount, setCarAmount }),
    [carAmount]
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-64px)]">
        <div className="flex flex-col items-center space-y-4">
          <div className="text-2xl font-bold text-blue-600 tracking-wider">
            Ride<span className="text-gray-700">Sync</span>
          </div>
          <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-64px)]">
      <UserLocationContext.Provider value={userLocationValue}>
        <SourceCoordinatesContext.Provider value={sourceCoordinatesValue}>
          <DestinationCoordinatesContext.Provider
            value={destinationCoordinatesValue}
          >
            <DirectionsDataContext.Provider value={directionsDataValue}>
              <SelectedCarAmountContext.Provider value={carAmountValue}>
                {/* Mobile Tab Navigation */}
                <div className="md:hidden flex border-b">
                  <button
                    onClick={() => setActiveTab('booking')}
                    className={`flex-1 py-3 text-center font-medium ${
                      activeTab === 'booking' 
                        ? 'text-blue-600 border-b-2 border-blue-600' 
                        : 'text-gray-500'
                    }`}
                  >
                    Book Your Ride
                  </button>
                  <button
                    onClick={() => setActiveTab('map')}
                    className={`flex-1 py-3 text-center font-medium ${
                      activeTab === 'map' 
                        ? 'text-blue-600 border-b-2 border-blue-600' 
                        : 'text-gray-500'
                    }`}
                  >
                    Map
                  </button>
                </div>
                
                {/* Desktop Layout */}
                <div className="hidden md:grid md:grid-cols-3 h-full">
                  <div className="overflow-y-auto">
                    <Booking />
                  </div>
                  <div className="col-span-2 h-full">
                    <MapboxMap />
                  </div>
                </div>
                
                {/* Mobile Layout with Conditional Rendering */}
                <div className="md:hidden h-full">
                  {activeTab === 'booking' ? (
                    <div className="h-[calc(100vh-110px)] overflow-y-auto">
                      <Booking />
                    </div>
                  ) : (
                    <div className="h-[calc(100vh-110px)]">
                      <MapboxMap />
                    </div>
                  )}
                </div>
              </SelectedCarAmountContext.Provider>
            </DirectionsDataContext.Provider>
          </DestinationCoordinatesContext.Provider>
        </SourceCoordinatesContext.Provider>
      </UserLocationContext.Provider>
    </div>
  );
}

export function BookingForm() {
  const [selectedCar, setSelectedCar] = useState('Auto');
  const [selectedPayment, setSelectedPayment] = useState('');
  const [isSharedRide, setIsSharedRide] = useState(false);
  const [passengers, setPassengers] = useState(1);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const cars = [
    { id: 'Auto', name: 'Auto', image: '/auto.png', price: '₹10/km', eta: '3 mins' },
    { id: 'Economy', name: 'Economy', image: '/economy.png', price: '₹12/km', eta: '5 mins' },
    { id: 'Comfort', name: 'Comfort', image: '/comfort.png', price: '₹15/km', eta: '4 mins' },
    { id: 'XL', name: 'XL Car', image: '/xl.png', price: '₹18/km', eta: '7 mins' },
    { id: 'Luxury', name: 'Luxury', image: '/luxury.png', price: '₹25/km', eta: '10 mins' },
  ];

  const paymentMethods = [
    { id: 'mastercard', image: '/mastercard.png', alt: 'Mastercard' },
    { id: 'visa', image: '/visa.png', alt: 'Visa' },
    { id: 'applepay', image: '/apple-pay.png', alt: 'Apple Pay' },
    { id: 'googlepay', image: '/google-pay.png', alt: 'Google Pay' },
    { id: 'cash', image: '/cash.png', alt: 'Cash' },
  ];

  // Calculate estimated savings based on shared ride
  const calculateSavings = () => {
    const basePrice = 100; // Example base price
    return isSharedRide ? (basePrice * 0.4).toFixed(2) : 0; // 40% savings on shared rides
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 p-4">Book Your Ride</h1>
      
      <div className="bg-white rounded-lg p-6 border space-y-6 mx-4">
        {/* Existing Location Fields */}
        <div className="space-y-4">
          <div>
            <Input 
              type="text"
              placeholder="Enter pick-up location?"
              className="w-full"
            />
          </div>

          <div>
            <Input 
              type="text"
              placeholder="Destination"
              className="w-full"
            />
          </div>
        </div>

        {/* New Ride Sharing Section */}
        <div className="border rounded-lg p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Share2 className="h-5 w-5 text-blue-500" />
              <span className="font-medium">Share Ride & Save 40%</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setIsSharedRide(false)}
                className={`px-3 py-1 rounded text-sm ${
                  !isSharedRide 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100'
                }`}
              >
                Private
              </button>
              <button
                onClick={() => setIsSharedRide(true)}
                className={`px-3 py-1 rounded text-sm ${
                  isSharedRide 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100'
                }`}
              >
                Shared
              </button>
            </div>
          </div>

          {isSharedRide && (
            <div className="space-y-3">
              <div className="flex items-center justify-between bg-gray-50 p-2 rounded">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">Passengers</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPassengers(Math.max(1, passengers - 1))}
                    className="w-6 h-6 rounded bg-white border flex items-center justify-center text-sm"
                  >-</button>
                  <span className="w-6 text-center text-sm">{passengers}</span>
                  <button
                    onClick={() => setPassengers(Math.min(4, passengers + 1))}
                    className="w-6 h-6 rounded bg-white border flex items-center justify-center text-sm"
                  >+</button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Existing Select Car Section */}
        <div>
          <h2 className="text-lg font-medium mb-4">Select Car</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {cars.map((car) => (
              <motion.div
                key={car.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedCar(car.id)}
                className={`cursor-pointer p-4 rounded-xl border-2 bg-white transition-all
                  ${selectedCar === car.id 
                    ? 'border-blue-500 shadow-lg shadow-blue-100' 
                    : 'border-transparent hover:border-blue-200'}`}
              >
                <div className="aspect-square relative mb-2">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="object-contain w-full h-full"
                  />
                </div>
                <div className="text-center space-y-1">
                  <h3 className="font-medium text-gray-800">{car.name}</h3>
                  <p className="text-sm font-medium text-blue-600">{car.price}</p>
                  <p className="text-xs text-gray-500">ETA: {car.eta}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Existing Payment Methods Section */}
        <div>
          <h2 className="text-lg font-medium mb-4">Payment Methods</h2>
          <div className="flex gap-4 flex-wrap">
            {paymentMethods.map((method) => (
              <motion.div
                key={method.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedPayment(method.id)}
                className={`w-20 h-20 flex items-center justify-center rounded-xl transition-all
                  ${selectedPayment === method.id 
                    ? 'bg-blue-50 border-2 border-blue-500' 
                    : 'bg-white border border-gray-200 hover:border-blue-300'}`}
              >
                <img
                  src={method.image}
                  alt={method.alt}
                  className="w-12 h-12 object-contain"
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Existing Book Button */}
        <button className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium">
          {isSharedRide ? 'Book Shared Ride' : 'Book Private Ride'}
        </button>
      </div>
    </div>
  );
}