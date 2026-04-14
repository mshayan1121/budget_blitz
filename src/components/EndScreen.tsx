"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { RoundResult } from "@/lib/gameUtils";
import { getPersonality } from "@/lib/gameUtils";

interface EndScreenProps {
  results: RoundResult[];
  score: number;
  onRestart: () => void;
}

export function EndScreen({ results, score, onRestart }: EndScreenProps) {
  const [displayScore, setDisplayScore] = useState(0);
  const personality = getPersonality(score);

  // Animated score counter
  useEffect(() => {
    if (score === 0) return;
    const duration = 1500;
    const steps = 30;
    const increment = score / steps;
    const stepDuration = duration / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= score) {
        setDisplayScore(score);
        clearInterval(timer);
      } else {
        setDisplayScore(Math.floor(current));
      }
    }, stepDuration);
    return () => clearInterval(timer);
  }, [score]);

  // Confetti
  useEffect(() => {
    if (score < 60) return;
    let cancelled = false;
    (async () => {
      const confetti = (await import("canvas-confetti")).default;
      if (cancelled) return;
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
      setTimeout(() => {
        if (!cancelled) {
          confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
        }
      }, 200);
    })();
    return () => {
      cancelled = true;
    };
  }, [score]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center text-center py-8 px-4"
    >
      {/* Score */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 12 }}
        className="w-32 h-32 rounded-full bg-accent/10 flex items-center justify-center mb-6"
      >
        <div>
          <div className="text-4xl font-bold text-accent">{displayScore}</div>
          <div className="text-xs text-gray-400 font-medium">out of 80</div>
        </div>
      </motion.div>

      {/* Personality badge */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 12 }}
        className="mb-6"
      >
        <div className="text-5xl mb-2">{personality.emoji}</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {personality.title}
        </h2>
        <p className="text-sm text-gray-500 max-w-xs">{personality.description}</p>
      </motion.div>

      {/* Round breakdown */}
      <div className="w-full max-w-xs mb-8">
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">
          Round Breakdown
        </h3>
        <div className="space-y-2">
          {results.map((result, i) => (
            <motion.div
              key={result.scenario.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + i * 0.1 }}
              className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2"
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">{result.scenario.emoji}</span>
                <span className="text-sm text-gray-700 font-medium">
                  {result.scenario.item}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    result.choice === "buy"
                      ? "bg-buy/10 text-buy"
                      : result.choice === "skip"
                      ? "bg-gray-200 text-gray-600"
                      : "bg-warn/10 text-warn"
                  }`}
                >
                  {result.choice === "timeout"
                    ? "Time's up"
                    : result.choice === "buy"
                    ? "Bought"
                    : "Skipped"}
                </span>
                <span
                  className={`text-sm font-bold ${
                    result.score > 0 ? "text-buy" : "text-warn"
                  }`}
                >
                  +{result.score}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Play again */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onRestart}
        className="w-full max-w-xs bg-accent text-white font-semibold text-lg py-4 px-8 rounded-2xl cursor-pointer transition-colors hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
      >
        Play Again
      </motion.button>
    </motion.div>
  );
}
