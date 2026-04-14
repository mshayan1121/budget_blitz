export interface Scenario {
  id: number;
  emoji: string;
  item: string;
  price: number;
  context: string;
  smartChoice: "buy" | "skip";
  smartFeedback: string;
  poorFeedback: string;
}

export const SCENARIOS: Scenario[] = [
  {
    id: 1,
    emoji: "🎧",
    item: "AirPods Pro",
    price: 349,
    context: "You already have working earphones",
    smartChoice: "skip",
    smartFeedback: "Smart! No need to upgrade what already works.",
    poorFeedback: "Your current earphones work fine — save that money!",
  },
  {
    id: 2,
    emoji: "🍕",
    item: "Pizza with friends",
    price: 45,
    context: "It's a Friday treat with your friends",
    smartChoice: "buy",
    smartFeedback: "Great call! Spending on experiences with friends is worth it.",
    poorFeedback: "Social experiences matter — this was a smart spend!",
  },
  {
    id: 3,
    emoji: "👟",
    item: "Limited edition sneakers",
    price: 599,
    context: "Your current shoes are fine",
    smartChoice: "skip",
    smartFeedback: "Nice self-control! Hype doesn't equal value.",
    poorFeedback: "Your shoes are fine — don't fall for limited edition FOMO!",
  },
  {
    id: 4,
    emoji: "📚",
    item: "IELTS prep book",
    price: 85,
    context: "Your exam is in 6 weeks",
    smartChoice: "buy",
    smartFeedback: "Investing in education always pays off!",
    poorFeedback: "Your exam is soon — this book could boost your score!",
  },
  {
    id: 5,
    emoji: "🎮",
    item: "In-game skin",
    price: 120,
    context: "Purely cosmetic, no gameplay benefit",
    smartChoice: "skip",
    smartFeedback: "Smart move! Cosmetic items don't add real value.",
    poorFeedback: "It's just cosmetic — 120 AED for pixels isn't worth it!",
  },
  {
    id: 6,
    emoji: "🚕",
    item: "Taxi instead of metro",
    price: 35,
    context: "You're running 5 minutes late",
    smartChoice: "buy",
    smartFeedback: "Sometimes convenience is worth the cost!",
    poorFeedback: "Being on time matters — this was a reasonable expense!",
  },
  {
    id: 7,
    emoji: "💳",
    item: "Monthly subscription",
    price: 79,
    context: "You've used it twice in 3 months",
    smartChoice: "skip",
    smartFeedback: "Good call! Cancel subscriptions you barely use.",
    poorFeedback: "Twice in 3 months? That's money down the drain!",
  },
  {
    id: 8,
    emoji: "🎂",
    item: "Birthday gift for best friend",
    price: 60,
    context: "Their birthday is tomorrow",
    smartChoice: "buy",
    smartFeedback: "Thoughtful! Gifts for close friends are meaningful spending.",
    poorFeedback: "Your best friend's birthday is tomorrow — this matters!",
  },
  {
    id: 9,
    emoji: "🧃",
    item: "Daily café drink",
    price: 25,
    context: "Every day for a month = 750 AED",
    smartChoice: "skip",
    smartFeedback: "Smart! Small daily costs add up fast.",
    poorFeedback: "25 AED × 30 days = 750 AED/month. That adds up!",
  },
  {
    id: 10,
    emoji: "🏋️",
    item: "Gym membership",
    price: 150,
    context: "You've been saying you'll start for 2 months",
    smartChoice: "skip",
    smartFeedback: "Honest with yourself! Start with free workouts first.",
    poorFeedback: "2 months of 'I'll start soon' — try free workouts first!",
  },
];
