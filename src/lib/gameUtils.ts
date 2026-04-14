import type { Scenario } from "./scenarios";

export interface RoundResult {
  scenario: Scenario;
  choice: "buy" | "skip" | "timeout";
  score: number;
  isSmartChoice: boolean;
}

export interface Personality {
  emoji: string;
  title: string;
  description: string;
}

export function shuffleAndPick(scenarios: Scenario[], count: number): Scenario[] {
  const arr = [...scenarios];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.slice(0, count);
}

export function evaluateChoice(
  scenario: Scenario,
  choice: "buy" | "skip" | "timeout"
): { score: number; isSmartChoice: boolean } {
  if (choice === "timeout") {
    return { score: 0, isSmartChoice: false };
  }
  const isSmartChoice = choice === scenario.smartChoice;
  return { score: isSmartChoice ? 16 : 0, isSmartChoice };
}

export function getPersonality(score: number): Personality {
  if (score >= 70) {
    return {
      emoji: "🏆",
      title: "Savvy Saver",
      description:
        "You make excellent financial decisions! You know when to spend and when to save.",
    };
  }
  if (score >= 50) {
    return {
      emoji: "⚖️",
      title: "Balanced Spender",
      description:
        "You have a good sense of spending, but there's room to sharpen your instincts.",
    };
  }
  if (score >= 30) {
    return {
      emoji: "🛍️",
      title: "Impulse Buyer",
      description:
        "You tend to spend on impulse. Try pausing before purchases — ask 'Do I really need this?'",
    };
  }
  return {
    emoji: "😬",
    title: "Budget Buster",
    description:
      "Your spending habits need work! Start tracking where your money goes each week.",
  };
}
