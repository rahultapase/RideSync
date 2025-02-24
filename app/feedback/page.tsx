"use client";

import { useState } from "react";
import { Star, Send, CheckCircle2, MapPin, Calendar, Clock, DollarSign, IndianRupee, User } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import Footer from "@/components/UI/footer";

interface FeedbackForm {
  rating: number;
  comment: string;
  driverName: string;
  rideId: string;
  categories: {
    [key: string]: number;
  };
}

interface FeedbackRide {
  id: string;
  date: string;
  from: string;
  to: string;
  duration: string;
  amount: string;
  carType: string;
  avatar?: string;
  feedbackSubmitted: boolean;
}

export default function FeedbackPage() {
  const [rating, setRating] = useState<number>(0);
  const [hoveredStar, setHoveredStar] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [selectedRide, setSelectedRide] = useState<string>("");
  const [categoryRatings, setCategoryRatings] = useState({
    punctuality: 0,
    cleanliness: 0,
    communication: 0,
    driving: 0,
  });
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterDate, setFilterDate] = useState("");

  const rides: FeedbackRide[] = [
    {
      id: "1",
      date: "2025-03-10 14:30",
      from: "Kharghar",
      to: "Pimpri-Chinchwad",
      duration: "45 mins",
      amount: "582.50",
      carType: "Economy",
      avatar: "/user.png",
      feedbackSubmitted: false
    },
    {
      id: "2",
      date: "2025-02-25 09:15",
      from: "Vashi",
      to: "Bandra",
      duration: "35 mins",
      amount: "873.74",
      carType: "Comfort",
      avatar: "/user.png",
      feedbackSubmitted: false
    },
    {
      id: "3",
      date: "2025-02-18 18:45",
      from: "Andheri",
      to: "Thane",
      duration: "50 mins",
      amount: "1048.49",
      carType: "XL Car",
      avatar: "/user.png",
      feedbackSubmitted: false
    },
    {
      id: "4",
      date: "2025-03-07 10:30",
      from: "Dadar",
      to: "Pune Airport",
      duration: "120 mins",
      amount: "1562.30",
      carType: "Luxury",
      avatar: "/user.png",
      feedbackSubmitted: false
    },
    {
      id: "5",
      date: "2025-03-06 16:20",
      from: "Powai",
      to: "Juhu Beach",
      duration: "25 mins",
      amount: "456.80",
      carType: "Economy",
      avatar: "/user.png",
      feedbackSubmitted: false
    },
    {
      id: "6",
      date: "2025-03-05 08:45",
      from: "CST",
      to: "BKC",
      duration: "30 mins",
      amount: "325.60",
      carType: "Auto",
      avatar: "/user.png",
      feedbackSubmitted: false
    }
  ];

  // Filter rides based on status and date
  const filteredRides = rides.filter(ride => {
    // Status filter
    if (filterStatus === "pending") {
      return !ride.feedbackSubmitted;
    }
    if (filterStatus === "submitted") {
      return ride.feedbackSubmitted;
    }

    // Date filter
    if (filterDate) {
      const rideDate = new Date(ride.date).toISOString().split('T')[0];
      return rideDate === filterDate;
    }

    return true;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ 
      rating, 
      comment, 
      selectedRide,
      categoryRatings 
    });
    setSubmitted(true);
    
    setTimeout(() => {
      setRating(0);
      setComment("");
      setSelectedRide("");
      setCategoryRatings({
        punctuality: 0,
        cleanliness: 0,
        communication: 0,
        driving: 0,
      });
      setSubmitted(false);
    }, 2000);
  };

  const handleCategoryRating = (category: string, value: number) => {
    setCategoryRatings(prev => ({
      ...prev,
      [category]: value
    }));
  };

  const renderRideSelection = () => (
    <div className="max-w-6xl mx-auto">
      {/* Filter Section */}
      <div className="mb-8 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="flex gap-4">
          <select 
            className="px-4 py-2 rounded-lg border bg-white dark:bg-gray-800 text-foreground dark:border-gray-700"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Rides</option>
            <option value="pending">Pending Feedback</option>
            <option value="submitted">Feedback Submitted</option>
          </select>
          <input 
            type="date" 
            className="px-4 py-2 rounded-lg border bg-white dark:bg-gray-800 text-foreground dark:border-gray-700"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          />
        </div>
        <div className="text-gray-600 dark:text-gray-400">
          {filteredRides.length} rides found
        </div>
      </div>

      {/* Rides Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredRides.map((ride, index) => (
          <motion.div
            key={ride.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white">
                {ride.avatar ? (
                  <Image 
                    src={ride.avatar} 
                    alt="Driver" 
                    width={48} 
                    height={48} 
                    className="rounded-full"
                  />
                ) : (
                  <User className="w-6 h-6" />
                )}
              </div>
              <div>
                <span className="text-foreground font-medium block">{ride.carType}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(ride.date).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Clock className="w-4 h-4" />
                <span>{new Date(ride.date).toLocaleTimeString()}</span>
              </div>

              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <MapPin className="w-4 h-4" />
                <span className="flex items-center gap-2">
                  {ride.from} 
                  <motion.div 
                    className="w-4 h-0.5 bg-gray-300 dark:bg-gray-600"
                    animate={{ width: [0, 16, 16] }}
                    transition={{ duration: 0.5 }}
                  />
                  {ride.to}
                </span>
              </div>

              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Clock className="w-4 h-4" />
                <span>{ride.duration}</span>
              </div>

              <div className="flex items-center gap-2 text-blue-500 font-medium">
                <IndianRupee className="w-4 h-4" />
                <span>₹{ride.amount}</span>
              </div>

              <motion.button
                onClick={() => setSelectedRide(ride.id)}
                className="w-full mt-4 bg-primary text-white py-2.5 rounded-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Star className="w-4 h-4" />
                Give Feedback
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* No results message */}
      {filteredRides.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 text-gray-500 dark:text-gray-400"
        >
          No rides found for the selected filters
        </motion.div>
      )}
    </div>
  );

  const renderFeedbackForm = () => (
    <motion.div
      className="bg-white rounded-xl shadow-sm p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-3">
            Overall Rating
          </label>
          <div className="flex gap-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className="focus:outline-none transition-transform hover:scale-110"
                onMouseEnter={() => setHoveredStar(star)}
                onMouseLeave={() => setHoveredStar(0)}
                onClick={() => setRating(star)}
              >
                <Star
                  className={`w-10 h-10 ${
                    star <= (hoveredStar || rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {Object.entries(categoryRatings).map(([category, value]) => (
            <div key={category}>
              <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                {category}
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className="focus:outline-none transition-transform hover:scale-110"
                    onClick={() => handleCategoryRating(category, star)}
                  >
                    <Star
                      className={`w-6 h-6 ${
                        star <= value
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Additional Comments
          </label>
          <textarea
            rows={4}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            placeholder="Share your experience with the driver..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>

        <motion.button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={rating === 0 || submitted}
        >
          {submitted ? (
            <>
              <CheckCircle2 className="w-6 h-6" />
              Thank you for your feedback!
            </>
          ) : (
            <>
              <Send className="w-6 h-6" />
              Submit Feedback
            </>
          )}
        </motion.button>
      </form>
    </motion.div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 container mx-auto px-4 py-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Ride Feedback
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Share your experience and help us improve our service
          </p>
        </motion.div>

        {selectedRide ? renderFeedbackForm() : renderRideSelection()}
      </div>
      <Footer />
    </div>
  );
}

// Simple loading component
const LoadingSpinner = () => (
  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500" />
); 