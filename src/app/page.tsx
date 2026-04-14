import { BudgetBlitz } from "@/components/BudgetBlitz";

export default function Home() {
  return (
    <main className="min-h-dvh flex items-center justify-center p-4 bg-white">
      <div className="w-full max-w-md">
        <BudgetBlitz />
      </div>
    </main>
  );
}
