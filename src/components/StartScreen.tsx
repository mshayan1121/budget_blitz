"use client";

import { motion } from "framer-motion";

interface StartScreenProps {
  onStart: () => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center text-center py-12 px-4"
    >
      <motion.div
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 12 }}
        className="text-7xl mb-6"
      >
        💰
      </motion.div>

      <h1 className="text-4xl font-bold text-gray-900 mb-3">Budget Blitz</h1>

      <p className="text-gray-500 text-lg mb-8 max-w-xs">
        Make smart spending decisions before the timer runs out
      </p>

      <div className="flex items-center gap-4 text-sm text-gray-400 mb-10">
        <span className="bg-gray-100 px-3 py-1.5 rounded-full font-medium">
          5 Rounds
        </span>
        <span className="bg-gray-100 px-3 py-1.5 rounded-full font-medium">
          15 Seconds
        </span>
        <span className="bg-gray-100 px-3 py-1.5 rounded-full font-medium">
          Up to 80 pts
        </span>
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onStart}
        className="w-full max-w-xs bg-accent text-white font-semibold text-lg py-4 px-8 rounded-2xl cursor-pointer transition-colors hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
      >
        Play Now
      </motion.button>
    </motion.div>
  );
}
