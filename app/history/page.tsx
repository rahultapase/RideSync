"use client";

import dynamic from 'next/dynamic';
import { Suspense } from "react";
import { LoadingSpinner } from "@/components/UI/loading-spinner";
import { pageTransition } from "@/lib/animations";
import { motion } from "framer-motion";
import { Calendar, MapPin, Users, Clock, DollarSign, IndianRupee } from "lucide-react";
import { useState } from "react";
import Footer from "@/components/UI/footer";

// Lazy load icons
const MapPinIcon = dynamic(() => import('lucide-react').then(mod => mod.MapPin));
const CalendarIcon = dynamic(() => import('lucide-react').then(mod => mod.Calendar));
const ClockIcon = dynamic(() => import('lucide-react').then(mod => mod.Clock));

// Add a utility function for consistent date formatting
function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
}

interface RideHistory {
  id: string;
  date: string;
  from: string;
  to: string;
  amount: string;
  status: "completed" | "cancelled";
  carType: string;
  isShared: boolean;
  duration?: string;
  distance?: string;
}

export default function HistoryPage() {
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterDate, setFilterDate] = useState("");

  const allRideHistory: RideHistory[] = [
    {
      id: "1",
      date: "2025-03-10 14:30",
      from: "Kharghar, Navi Mumbai",
      to: "Pimpri-Chinchwad, Maharashtra",
      amount: "₹582.50",
      status: "completed",
      carType: "Economy",
      isShared: false,
      duration: "45 mins",
      distance: "32 km"
    },
    {
      id: "2",
      date: "2025-02-25 09:15",
      from: "Vashi, Navi Mumbai",
      to: "Bandra, Mumbai",
      amount: "₹873.74",
      status: "completed",
      carType: "Comfort",
      isShared: true,
      duration: "35 mins",
      distance: "28 km"
    },
    {
      id: "3",
      date: "2025-02-18 18:45",
      from: "Andheri, Mumbai",
      to: "Thane, Maharashtra",
      amount: "₹1048.49",
      status: "cancelled",
      carType: "XL Car",
      isShared: false,
      duration: "50 mins",
      distance: "40 km"
    },
    {
      id: "4",
      date: "2025-03-07 10:30",
      from: "Dadar, Mumbai",
      to: "Pune Airport, Maharashtra",
      amount: "₹1562.30",
      status: "completed",
      carType: "Luxury",
      isShared: true,
      duration: "120 mins",
      distance: "150 km"
    },
    {
      id: "5",
      date: "2025-03-06 16:20",
      from: "Powai, Mumbai",
      to: "Juhu Beach, Mumbai",
      amount: "₹456.80",
      status: "cancelled",
      carType: "Economy",
      isShared: true,
      duration: "25 mins",
      distance: "15 km"
    },
    {
      id: "6",
      date: "2025-03-05 08:45",
      from: "CST, Mumbai",
      to: "BKC, Mumbai",
      amount: "₹325.60",
      status: "completed",
      carType: "Auto",
      isShared: false,
      duration: "30 mins",
      distance: "12 km"
    }
  ];

  // Filter rides based on status and date
  const filteredRides = allRideHistory.filter(ride => {
    const matchesStatus = 
      filterStatus === "all" ? true :
      filterStatus === "shared" ? ride.isShared :
      ride.status === filterStatus;

    const matchesDate = 
      !filterDate ? true :
      new Date(ride.date).toISOString().split('T')[0] === filterDate;

    return matchesStatus && matchesDate;
  });

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1">
        <motion.div 
          className="min-h-[calc(100vh-65px)] overflow-y-auto scrollbar-hide bg-background dark:bg-gray-900"
          {...pageTransition}
        >
          <div className="container mx-auto px-4 py-8 max-w-5xl scrollbar-hide">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <motion.h1 
                className="text-3xl font-bold text-foreground"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Ride History
              </motion.h1>
              
              <motion.div 
                className="flex gap-2 mt-4 md:mt-0"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <select 
                  className="px-3 py-2 rounded-md border border-gray-200 dark:border-gray-700 bg-background text-foreground dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">All Rides</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="shared">Shared Rides</option>
                </select>
                
                <input 
                  type="date" 
                  className="px-3 py-2 rounded-md border border-gray-200 dark:border-gray-700 bg-background text-foreground dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                />
              </motion.div>
            </div>

            <div className="space-y-4">
              {filteredRides.map((ride, index) => (
                <motion.div
                  key={ride.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-background dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all p-6 border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-3">
                        <CalendarIcon className="w-4 h-4" />
                        <span className="text-sm">{formatDate(ride.date)}</span>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="flex flex-col items-center gap-1">
                            <div className="w-3 h-3 rounded-full bg-blue-500" />
                            <div className="w-0.5 h-12 bg-gray-200 dark:bg-gray-600" />
                            <div className="w-3 h-3 rounded-full bg-green-500" />
                          </div>
                          
                          <div className="space-y-4 flex-1">
                            <div>
                              <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                                <MapPinIcon className="w-4 h-4" /> From
                              </p>
                              <p className="text-sm font-medium text-foreground">{ride.from}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                                <MapPinIcon className="w-4 h-4" /> To
                              </p>
                              <p className="text-sm font-medium text-foreground">{ride.to}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col md:items-end gap-3 border-t md:border-t-0 dark:border-gray-700 pt-4 md:pt-0">
                      <div className="flex items-center gap-4 md:justify-end">
                        <span className="text-xl font-bold text-foreground">{ride.amount}</span>
                        <span 
                          className={`px-3 py-1 text-xs rounded-full font-medium ${
                            ride.status === "completed" 
                              ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100" 
                              : "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100"
                          }`}
                        >
                          {ride.status.charAt(0).toUpperCase() + ride.status.slice(1)}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                          <ClockIcon className="w-4 h-4" />
                          <span>{ride.duration}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                          <DollarSign className="w-4 h-4" />
                          <span>{ride.carType}</span>
                        </div>
                        {ride.isShared && (
                          <div className="flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/50 px-2 py-1 rounded-full">
                            <Users className="w-4 h-4" />
                            <span>Shared</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredRides.length === 0 && (
              <motion.div 
                className="text-center py-12 bg-background dark:bg-gray-800 rounded-xl shadow-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-gray-500 dark:text-gray-400">No rides found for the selected filters</p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
} 