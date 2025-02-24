"use client";

import dynamic from 'next/dynamic';
import { Suspense } from "react";
import { LoadingSpinner } from "@/components/UI/loading-spinner";
import { pageTransition } from "@/lib/animations";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { ThemeToggle } from "./UI/theme-toggle";

// Lazy load UserButton
const UserButton = dynamic(() => import('@clerk/nextjs').then(mod => mod.UserButton), {
  loading: () => <LoadingSpinner />
});

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Ride History", path: "/history" },
    { label: "Feedback", path: "/feedback" },
    { label: "About Us", path: "/about" },
  ];

  return (
    <motion.nav {...pageTransition}>
      <div className="sticky top-0 z-50 w-full transition-all duration-300">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Cleaned up Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <Link 
                href="/" 
                className="flex items-center space-x-1 group relative py-2"
              >
                <div className="relative">
                  <span className="text-3xl md:text-4xl font-black tracking-tighter flex items-center">
                    <motion.span
                      className="bg-gradient-to-br from-blue-600 via-blue-500 to-blue-400 bg-clip-text text-transparent 
                               group-hover:from-blue-500 group-hover:via-blue-400 group-hover:to-blue-300 
                               transition-all duration-500 relative"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      Ride
                    </motion.span>
                    <motion.span
                      className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent 
                               group-hover:from-gray-800 group-hover:via-gray-700 group-hover:to-gray-600
                               transition-all duration-500"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      Sync
                    </motion.span>
                  </span>
                  
                  {/* Animated underline */}
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                
                {/* Decorative glow */}
                <motion.div
                  className="absolute -inset-2 bg-gradient-to-r from-blue-600/10 via-transparent to-blue-600/10 rounded-lg
                           opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500"
                  initial={{ scale: 0.8 }}
                  whileHover={{ scale: 1.2 }}
                />
                
                {/* Shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent
                           translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                />
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    pathname === item.path ? "text-primary" : "text-foreground/60"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-md hover:bg-gray-100 transition-colors"
              >
                <div className="w-6 h-5 flex flex-col justify-between">
                  <span className={`h-0.5 w-full bg-gray-600 transform transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
                  <span className={`h-0.5 w-full bg-gray-600 transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
                  <span className={`h-0.5 w-full bg-gray-600 transform transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                </div>
              </button>
            </div>

            {/* Mobile Menu */}
            <motion.div 
              className={`md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg ${isOpen ? 'block' : 'hidden'}`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : -20 }}
              transition={{ duration: 0.3 }}
            >
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 text-sm font-medium transition-colors
                    ${pathname === item.path 
                      ? "text-blue-600 bg-blue-50" 
                      : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
                    }`}
                >
                  {item.label}
                </Link>
              ))}
            </motion.div>

            {/* Right Side: Theme Toggle and Account */}
            <div className="flex items-center space-x-6">
              <ThemeToggle />
              <Suspense fallback={<LoadingSpinner />}>
                <UserButton
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox: "w-10 h-10",
                      userButtonPopoverCard: "dark:bg-gray-900",
                    },
                  }}
                />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
      
      {/* Alternative Modern Divider */}
      <div className="relative w-full h-[1px] overflow-hidden">
        {/* Base line */}
        <div className="absolute inset-0 bg-gradient-to-r 
          from-transparent 
          via-gray-200 
          to-transparent" 
        />
        
        {/* Floating particles */}
        <div className="relative h-full">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-1 w-1 rounded-full bg-blue-500/50 blur-[1px]"
              animate={{
                x: ["0%", "100%"],
                y: [-1, 1],
              }}
              transition={{
                x: {
                  duration: 10,
                  repeat: Infinity,
                  delay: i * 3,
                },
                y: {
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: i * 1,
                }
              }}
              style={{
                left: `${i * 33}%`,
              }}
            />
          ))}
        </div>
        
        {/* Shimmer effect */}
        <motion.div 
          className="absolute inset-0 w-1/4 bg-gradient-to-r 
            from-transparent 
            via-blue-400/30 
            to-transparent"
          animate={{
            x: ["-200%", "200%"],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </motion.nav>
  );
}
