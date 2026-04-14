"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { Scenario } from "@/lib/scenarios";

interface FeedbackState {
  isSmartChoice: boolean;
  feedback: string;
  scoreEarned: number;
}

interface ScenarioCardProps {
  scenario: Scenario;
  feedbackState: FeedbackState | null;
}

export function ScenarioCard({ scenario, feedbackState }: ScenarioCardProps) {
  const isFeedback = feedbackState !== null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={
        isFeedback
          ? feedbackState.isSmartChoice
            ? { opacity: 1, y: [0, -10, 0], x: 0 }
            : { opacity: 1, x: [-10, 10, -10, 10, 0], y: 0 }
          : { opacity: 1, y: 0, x: 0 }
      }
      exit={{ opacity: 0, x: -80 }}
      transition={
        isFeedback
          ? feedbackState.isSmartChoice
            ? { y: { duration: 0.4 } }
            : { x: { duration: 0.4 } }
          : { type: "spring", stiffness: 300, damping: 25 }
      }
      className={`rounded-2xl shadow-lg border p-6 w-full transition-colors duration-300 ${
        isFeedback
          ? feedbackState.isSmartChoice
            ? "bg-buy-light border-buy/20"
            : "bg-warn-light border-warn/20"
          : "bg-white border-gray-100"
      }`}
    >
      <div className="flex flex-col items-center text-center min-h-[160px] justify-center">
        <span className="text-5xl mb-4">{scenario.emoji}</span>

        <AnimatePresence mode="wait">
          {!isFeedback ? (
            <motion.div
              key="scenario"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex flex-col items-center"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-1">
                {scenario.item}
              </h2>
              <p className="text-2xl font-bold text-accent mb-3">
                {scenario.price} AED
              </p>
              <p className="text-sm text-gray-500">{scenario.context}</p>
            </motion.div>
          ) : (
            <motion.div
              key="feedback"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex flex-col items-center"
            >
              <p
                className={`text-lg font-bold mb-2 ${
                  feedbackState.isSmartChoice ? "text-buy" : "text-warn"
                }`}
              >
                {feedbackState.isSmartChoice ? "Smart Choice ✅" : "Think Twice ⚠️"}
              </p>
              <p className="text-sm text-gray-600 mb-3">
                {feedbackState.feedback}
              </p>
              <motion.p
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className={`text-xl font-bold ${
                  feedbackState.scoreEarned > 0 ? "text-buy" : "text-warn"
                }`}
              >
                +{feedbackState.scoreEarned} pts
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
