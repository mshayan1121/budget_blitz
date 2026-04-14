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

  const smartChoices = results.filter((r) => r.score > 0).length;
  const poorChoices = results.length - smartChoices;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-between text-center flex-1 py-6 px-4"
    >
      <div className="flex flex-col items-center gap-4 w-full">
        {/* Score circle */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 12 }}
          className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center"
        >
          <div>
            <div className="text-3xl font-bold text-accent">{displayScore}</div>
            <div className="text-[10px] text-gray-400 font-medium">out of 80</div>
          </div>
        </motion.div>

        {/* Personality badge */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 12 }}
        >
          <div className="text-4xl mb-1">{personality.emoji}</div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">
            {personality.title}
          </h2>
          <p className="text-sm text-gray-500 max-w-xs">{personality.description}</p>
        </motion.div>

        {/* Summary line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-sm font-medium text-gray-600 bg-gray-50 rounded-xl px-4 py-2"
        >
          ✅ {smartChoices} smart {smartChoices === 1 ? "choice" : "choices"} · ❌ {poorChoices} poor {poorChoices === 1 ? "choice" : "choices"}
        </motion.div>
      </div>

      {/* Play again */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
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
