"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <motion.button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative w-[70px] h-[36px] rounded-full transition-all duration-700"
      style={{
        backgroundColor: isDark ? '#1a1a1a' : '#e5e5e5'
      }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      {/* Background transition effect */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{
          backgroundColor: isDark ? '#1a1a1a' : '#e5e5e5',
        }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
      />

      {/* Circle with icon */}
      <motion.div
        className="absolute top-1 h-[28px] w-[28px] rounded-full bg-white dark:bg-gray-800 flex items-center justify-center"
        animate={{
          right: isDark ? "calc(100% - 32px)" : "4px",
          backgroundColor: isDark ? "#1f2937" : "#ffffff",
        }}
        transition={{ 
          type: "spring", 
          stiffness: 200, 
          damping: 20,
          duration: 0.7
        }}
      >
        <motion.div
          initial={false}
          animate={{
            rotate: isDark ? 360 : 0,
            scale: [0.7, 1],
          }}
          transition={{ 
            duration: 0.7,
            ease: "easeInOut",
          }}
        >
          {isDark ? (
            <Moon className="w-4 h-4 text-white" />
          ) : (
            <Sun className="w-4 h-4 text-gray-800" />
          )}
        </motion.div>
      </motion.div>
    </motion.button>
  );
} 