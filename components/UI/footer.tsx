"use client";

import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="bg-background dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          {/* Brand Section */}
          <div className="space-y-4 flex flex-col items-center">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold">
                <span className="text-primary">Ride</span>
                <span className="text-foreground">Sync</span>
              </span>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Your trusted ride-sharing partner for safe and comfortable journeys across cities.
            </p>
            <div className="flex justify-center space-x-4">
              {[
                { icon: Facebook, href: "#" },
                { icon: Twitter, href: "#" },
                { icon: Instagram, href: "#" },
                { icon: Linkedin, href: "#" },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-semibold mb-4 text-foreground">COMPANY</h3>
            <ul className="space-y-2">
              {["About Us", "Careers", "Press", "Blog"].map((item) => (
                <li key={item}>
                  <Link 
                    href="#" 
                    className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-semibold mb-4 text-foreground">SUPPORT</h3>
            <ul className="space-y-2">
              {["Help Center", "Safety", "Terms of Service", "Privacy Policy"].map((item) => (
                <li key={item}>
                  <Link 
                    href="#" 
                    className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Cities */}
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-semibold mb-4 text-foreground">CITIES</h3>
            <ul className="space-y-2">
              {["Mumbai", "Pune", "Delhi", "Bangalore"].map((city) => (
                <li key={city}>
                  <Link 
                    href="#" 
                    className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
                  >
                    {city}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="flex items-center justify-center space-x-3 text-gray-600 dark:text-gray-400">
            <Mail className="w-5 h-5" />
            <span>support@ridesync.com</span>
          </div>
          <div className="flex items-center justify-center space-x-3 text-gray-600 dark:text-gray-400">
            <Phone className="w-5 h-5" />
            <span>+91 (800) 123-4567</span>
          </div>
          <div className="flex items-center justify-center space-x-3 text-gray-600 dark:text-gray-400">
            <MapPin className="w-5 h-5" />
            <span>Mumbai, Maharashtra, India</span>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-gray-600 dark:text-gray-400 text-sm">
          <p>© 2025 RideSync. Made with ❤️ in India</p>
        </div>
      </div>
    </footer>
  );
} 