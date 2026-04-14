"use client";

import { motion } from "framer-motion";

interface FeedbackOverlayProps {
  isSmartChoice: boolean;
  feedback: string;
  scoreEarned: number;
}

export function FeedbackOverlay({
  isSmartChoice,
  feedback,
  scoreEarned,
}: FeedbackOverlayProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl"
    >
      <div
        className={`absolute inset-0 rounded-2xl ${
          isSmartChoice ? "bg-buy/10" : "bg-warn/10"
        }`}
      />
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{
          scale: 1,
          opacity: 1,
          ...(isSmartChoice
            ? { y: [0, -10, 0] }
            : { x: [-10, 10, -10, 10, 0] }),
        }}
        transition={{
          scale: { type: "spring", stiffness: 300, damping: 15 },
          ...(isSmartChoice
            ? { y: { delay: 0.1, duration: 0.4 } }
            : { x: { delay: 0.1, duration: 0.4 } }),
        }}
        className="relative z-10 text-center px-6"
      >
        <div
          className={`text-lg font-bold mb-2 ${
            isSmartChoice ? "text-buy" : "text-warn"
          }`}
        >
          {isSmartChoice ? "Smart Choice ✅" : "Think Twice ⚠️"}
        </div>
        <p className="text-sm text-gray-600 mb-3">{feedback}</p>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className={`text-xl font-bold ${
            scoreEarned > 0 ? "text-buy" : "text-warn"
          }`}
        >
          +{scoreEarned} pts
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
