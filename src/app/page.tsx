import { BudgetBlitz } from "@/components/BudgetBlitz";

export default function Home() {
  return (
    <main className="h-dvh overflow-hidden flex items-center justify-center bg-white">
      <div className="w-full max-w-md h-full flex flex-col">
        <BudgetBlitz />
      </div>
    </main>
  );
}
