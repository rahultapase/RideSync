"use client";

import { Button } from "@/components/UI/button";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Footer from "@/components/UI/footer";

export default function AboutPage() {
  const router = useRouter();

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const whyChooseUs = [
    {
      title: "Reliable Service",
      description: "24/7 service with real-time tracking and professional drivers",
      icon: "🚗"
    },
    {
      title: "Competitive Pricing",
      description: "Transparent fares with no hidden charges and best market rates",
      icon: "💰"
    },
    {
      title: "Safe Rides",
      description: "Verified drivers, vehicle inspections, and emergency support",
      icon: "🛡️"
    },
    {
      title: "Eco-Friendly",
      description: "Commitment to reducing carbon footprint with green initiatives",
      icon: "🌱"
    },
    {
      title: "Easy Booking",
      description: "Simple, fast booking process with multiple payment options",
      icon: "📱"
    },
    {
      title: "Customer Support",
      description: "Dedicated 24/7 support team for seamless experience",
      icon: "🎯"
    }
  ];

  const faqData = [
    {
      question: "How does RideSync work?",
      answer: "RideSync connects you with nearby drivers through our app. Simply enter your pickup location and destination, choose your preferred ride type, and confirm your booking. You can track your driver in real-time and pay seamlessly through the app."
    },
    {
      question: "Is RideSync safe?",
      answer: "Yes! Safety is our top priority. All drivers undergo thorough background checks, vehicles are regularly inspected, and rides are tracked in real-time. We also provide 24/7 customer support and emergency assistance."
    },
    {
      question: "What payment methods are accepted?",
      answer: "We accept various payment methods including credit/debit cards, digital wallets (Google Pay, Apple Pay), and cash payments. You can manage your payment options easily through the app."
    },
    {
      question: "How do I share my ride?",
      answer: "When booking your ride, simply select the 'Shared Ride' option. You can specify the number of co-passengers, and our system will match you with riders heading in the same direction, helping you save on costs."
    },
    {
      question: "What is your cancellation policy?",
      answer: "You can cancel your ride for free within 5 minutes of booking. After that, a small cancellation fee may apply to compensate the driver for their time and effort."
    },
    {
      question: "Do you offer corporate accounts?",
      answer: "Yes, we provide corporate solutions with features like centralized billing, employee ride tracking, and custom reporting. Contact our business team for more details."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background dark:bg-gray-900">
      <div className="flex-1">
        <div className="min-h-[calc(100vh-65px)] overflow-y-auto scrollbar-hide">
          <div className="flex-1 bg-gradient-to-b from-background to-gray-50 dark:from-gray-900 dark:to-gray-800 overflow-y-auto scrollbar-hide">
            <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-20">
              <motion.div 
                className="container mx-auto flex max-w-[64rem] flex-col items-center gap-6 text-center px-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="font-heading text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl text-primary">
                  About RideSync
                </h1>
                <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8 text-center">
                  Revolutionizing urban mobility with cutting-edge technology and 
                  unparalleled service. Your journey towards better transportation 
                  starts here.
                </p>
              </motion.div>
            </section>

            <section className="container space-y-8 py-12 md:py-16 lg:py-24">
              <motion.div 
                className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center"
                {...fadeInUp}
              >
                <h2 className="font-heading text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl text-foreground">
                  Our Vision & Mission
                </h2>
                <p className="max-w-[85%] leading-relaxed text-muted-foreground sm:text-lg">
                  To transform transportation by creating sustainable, accessible, and 
                  efficient mobility solutions that connect communities and enhance lives.
                </p>
              </motion.div>

              <div className="mx-auto grid justify-center gap-6 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3 mt-12">
                {[
                  {
                    title: "Safety First",
                    description: "Rigorous driver screening, real-time monitoring, and 24/7 support for your peace of mind.",
                    icon: "🛡️"
                  },
                  {
                    title: "Innovation",
                    description: "Leveraging cutting-edge technology for seamless, efficient ride experiences.",
                    icon: "💡"
                  },
                  {
                    title: "Community",
                    description: "Building stronger connections through reliable and accessible transportation.",
                    icon: "🤝"
                  }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    className="group relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-background dark:bg-gray-800 p-6 shadow-sm transition-all hover:shadow-md hover:scale-[1.02]"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="flex flex-col space-y-4">
                      <span className="text-4xl">{feature.icon}</span>
                      <h3 className="font-bold text-xl text-foreground">{feature.title}</h3>
                      <p className="text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            <section className="py-16 bg-background dark:bg-gray-800">
              <motion.div 
                className="container mx-auto max-w-7xl px-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-center mb-12">
                  <motion.h2 
                    className="text-3xl md:text-4xl font-bold mb-4 text-foreground"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    Why Choose Us
                  </motion.h2>
                  <motion.p 
                    className="text-muted-foreground max-w-2xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    Experience the perfect blend of convenience, safety, and reliability with RideSync's premium ride-sharing service.
                  </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {whyChooseUs.map((item, index) => (
                    <motion.div
                      key={index}
                      className="bg-background dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 dark:border-gray-700"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div className="flex items-start gap-4">
                        <span className="text-4xl">{item.icon}</span>
                        <div>
                          <h3 className="text-xl font-semibold mb-2 text-foreground">
                            {item.title}
                          </h3>
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.div 
                  className="mt-16 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <Button
                    size="lg"
                    onClick={() => router.push("/")}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg"
                  >
                    Start Your Journey
                  </Button>
                </motion.div>
              </motion.div>
            </section>

            <section className="py-16 bg-gray-50 dark:bg-gray-900">
              <motion.div 
                className="container mx-auto max-w-4xl px-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-center mb-12">
                  <motion.h2 
                    className="text-3xl md:text-4xl font-bold mb-4 text-foreground"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    Frequently Asked Questions
                  </motion.h2>
                  <motion.p 
                    className="text-muted-foreground max-w-2xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    Got questions? We've got answers! Here are some of the most common questions we receive.
                  </motion.p>
                </div>

                <div className="space-y-4">
                  {faqData.map((faq, index) => (
                    <motion.div
                      key={index}
                      className="bg-background dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <details className="group">
                        <summary className="flex items-center justify-between gap-3 px-4 py-3 marker:content-none hover:cursor-pointer">
                          <h3 className="font-medium text-foreground">
                            {faq.question}
                          </h3>
                          <svg
                            className="w-5 h-5 text-gray-500 dark:text-gray-400 transition group-open:rotate-180"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                            />
                          </svg>
                        </summary>
                        <div className="px-4 pb-4">
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </details>
                    </motion.div>
                  ))}
                </div>

                <motion.div 
                  className="mt-12 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <p className="text-muted-foreground">
                    Still have questions?{" "}
                    <button 
                      onClick={() => router.push("/contact")}
                      className="text-primary hover:text-primary/90 font-medium"
                    >
                      Contact our support team
                    </button>
                  </p>
                </motion.div>
              </motion.div>
            </section>

            <section className="bg-blue-50 dark:bg-blue-900/20 py-16">
              <motion.div 
                className="container mx-auto max-w-[64rem] text-center px-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center text-foreground">
                  Trusted by Thousands of Riders
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 place-items-center">
                  {[
                    { number: "10K+", label: "Active Users" },
                    { number: "500+", label: "Cities" },
                    { number: "1M+", label: "Rides Completed" },
                    { number: "4.9/5", label: "User Rating" }
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      className="flex flex-col items-center justify-center text-center w-full"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                        {stat.number}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
} 