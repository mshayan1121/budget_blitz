"use client";

import { motion } from "framer-motion";

interface TimerBarProps {
  timeLeft: number;
  maxTime: number;
}

export function TimerBar({ timeLeft, maxTime }: TimerBarProps) {
  const percentage = (timeLeft / maxTime) * 100;
  const isWarning = timeLeft <= 5;
  const isCritical = timeLeft <= 3;

  const barColor = isWarning ? "#EF4444" : timeLeft <= 7 ? "#F59E0B" : "#22C55E";

  return (
    <div className="w-full mb-4">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-xs font-medium text-gray-400">Time Left</span>
        <span
          className={`text-sm font-bold tabular-nums ${
            isWarning ? "text-warn" : "text-gray-600"
          }`}
        >
          {timeLeft}s
        </span>
      </div>
      <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          animate={{
            width: `${percentage}%`,
            backgroundColor: barColor,
            scale: isCritical ? [1, 1.05, 1] : 1,
          }}
          transition={{
            width: { duration: 0.5, ease: "linear" },
            backgroundColor: { duration: 0.3 },
            scale: isCritical
              ? { repeat: Infinity, duration: 0.5 }
              : { duration: 0 },
          }}
        />
      </div>
    </div>
  );
}
