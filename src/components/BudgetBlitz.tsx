"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import { SCENARIOS } from "@/lib/scenarios";
import { shuffleAndPick, evaluateChoice, type RoundResult } from "@/lib/gameUtils";
import { StartScreen } from "./StartScreen";
import { GameScreen } from "./GameScreen";
import { EndScreen } from "./EndScreen";

type Phase = "start" | "playing" | "feedback" | "end";

const TOTAL_ROUNDS = 5;
const MAX_TIME = 15;

export function BudgetBlitz() {
  const [phase, setPhase] = useState<Phase>("start");
  const [scenarios, setScenarios] = useState(SCENARIOS.slice(0, TOTAL_ROUNDS));
  const [currentRound, setCurrentRound] = useState(0);
  const [score, setScore] = useState(0);
  const [roundResults, setRoundResults] = useState<RoundResult[]>([]);
  const [timeLeft, setTimeLeft] = useState(MAX_TIME);
  const [feedbackState, setFeedbackState] = useState<{
    isSmartChoice: boolean;
    feedback: string;
    scoreEarned: number;
  } | null>(null);

  // Use ref to track round start time for drift-proof timer
  const roundStartRef = useRef(Date.now());
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Timer effect
  useEffect(() => {
    if (phase !== "playing") {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    roundStartRef.current = Date.now();
    setTimeLeft(MAX_TIME);

    timerRef.current = setInterval(() => {
      const elapsed = Math.floor((Date.now() - roundStartRef.current) / 1000);
      const remaining = MAX_TIME - elapsed;
      if (remaining <= 0) {
        setTimeLeft(0);
      } else {
        setTimeLeft(remaining);
      }
    }, 200);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [phase, currentRound]);

  // Handle timeout
  useEffect(() => {
    if (phase === "playing" && timeLeft === 0) {
      handleChoice("timeout");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, phase]);

  const handleChoice = useCallback(
    (choice: "buy" | "skip" | "timeout") => {
      if (phase !== "playing") return;

      const scenario = scenarios[currentRound];
      const { score: earned, isSmartChoice } = evaluateChoice(scenario, choice);

      const result: RoundResult = {
        scenario,
        choice,
        score: earned,
        isSmartChoice,
      };

      setRoundResults((prev) => [...prev, result]);
      setScore((prev) => prev + earned);

      const feedback =
        choice === "timeout"
          ? "Time's up! No decision was made."
          : isSmartChoice
          ? scenario.smartFeedback
          : scenario.poorFeedback;

      setFeedbackState({ isSmartChoice, feedback, scoreEarned: earned });
      setPhase("feedback");
    },
    [phase, scenarios, currentRound]
  );

  // Feedback timeout — advance to next round or end
  useEffect(() => {
    if (phase !== "feedback") return;

    const timer = setTimeout(() => {
      setFeedbackState(null);
      if (currentRound >= TOTAL_ROUNDS - 1) {
        setPhase("end");
      } else {
        setCurrentRound((prev) => prev + 1);
        setPhase("playing");
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [phase, currentRound]);

  const handleStart = useCallback(() => {
    const picked = shuffleAndPick(SCENARIOS, TOTAL_ROUNDS);
    setScenarios(picked);
    setCurrentRound(0);
    setScore(0);
    setRoundResults([]);
    setFeedbackState(null);
    setPhase("playing");
  }, []);

  const handleRestart = useCallback(() => {
    setPhase("start");
  }, []);

  return (
    <div className="flex-1 flex flex-col">
      <AnimatePresence mode="wait">
        {phase === "start" && <StartScreen key="start" onStart={handleStart} />}
        {(phase === "playing" || phase === "feedback") && (
          <GameScreen
            key="game"
            scenario={scenarios[currentRound]}
            round={currentRound + 1}
            totalRounds={TOTAL_ROUNDS}
            score={score}
            timeLeft={timeLeft}
            maxTime={MAX_TIME}
            feedbackState={feedbackState}
            onChoice={(choice) => handleChoice(choice)}
          />
        )}
        {phase === "end" && (
          <div key="end" className="flex-1 flex flex-col">
            <EndScreen
              results={roundResults}
              score={score}
              onRestart={handleRestart}
            />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
