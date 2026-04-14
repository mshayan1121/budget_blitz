"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { Scenario } from "@/lib/scenarios";
import { TimerBar } from "./TimerBar";
import { ScenarioCard } from "./ScenarioCard";

interface GameScreenProps {
  scenario: Scenario;
  round: number;
  totalRounds: number;
  score: number;
  timeLeft: number;
  maxTime: number;
  feedbackState: {
    isSmartChoice: boolean;
    feedback: string;
    scoreEarned: number;
  } | null;
  onChoice: (choice: "buy" | "skip") => void;
}

export function GameScreen({
  scenario,
  round,
  totalRounds,
  score,
  timeLeft,
  maxTime,
  feedbackState,
  onChoice,
}: GameScreenProps) {
  const disabled = feedbackState !== null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col h-full py-4 px-1"
    >
      {/* Top bar */}
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm font-semibold text-gray-500">
          Round {round} of {totalRounds}
        </span>
        <span className="text-sm font-bold text-accent">{score} pts</span>
      </div>

      {/* Timer */}
      <TimerBar timeLeft={timeLeft} maxTime={maxTime} />

      {/* Scenario card area */}
      <div className="flex-1 flex items-center justify-center py-4">
        <div className="w-full">
          <AnimatePresence mode="wait">
            <ScenarioCard
              key={scenario.id}
              scenario={scenario}
              feedbackState={feedbackState}
            />
          </AnimatePresence>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-3 mt-4">
        <motion.button
          whileTap={disabled ? undefined : { scale: 0.95 }}
          onClick={() => onChoice("buy")}
          disabled={disabled}
          className="flex-1 bg-buy text-white font-semibold text-lg py-4 rounded-xl cursor-pointer transition-colors hover:bg-buy/90 focus:outline-none focus:ring-2 focus:ring-buy focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Buy
        </motion.button>
        <motion.button
          whileTap={disabled ? undefined : { scale: 0.95 }}
          onClick={() => onChoice("skip")}
          disabled={disabled}
          className="flex-1 bg-skip text-white font-semibold text-lg py-4 rounded-xl cursor-pointer transition-colors hover:bg-skip/90 focus:outline-none focus:ring-2 focus:ring-skip focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Skip
        </motion.button>
      </div>
    </motion.div>
  );
}
