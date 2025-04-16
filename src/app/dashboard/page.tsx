import Link from "next/link";
import { MoveRight } from "lucide-react";
import { Suspense } from "react";
import PendingExpenses from "@/components/expenses/pending-expenses";
import ConfirmedExpenses from "@/components/expenses/confirmed-expenses";
import ExpensesAmount from "@/components/expenses/expenses-amount";

export default async function Dashboard() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-lg">Dashboard</h1>
      <div className="grid grid-cols-6 gap-6">
        <div className="col-start-1 col-end-5 grid grid-cols-1 gap-6">
          <Suspense fallback={<p>Loading...</p>}>
            <PendingExpenses />
          </Suspense>
          <Suspense fallback={<p>Loading...</p>}>
            <ConfirmedExpenses />
          </Suspense>
        </div>
        <div className="col-start-5 col-end-7 flex flex-col items-center justify-center gap-6 rounded-sm bg-green-50">
          <Suspense fallback={<p>Loading...</p>}>
            <ExpensesAmount />
          </Suspense>
          <Link
            className="flex w-1/2 justify-between rounded-md bg-[#8659c6] px-4 py-2 text-center text-white focus:ring-2 focus:ring-black focus:ring-offset-2 focus:outline-none"
            href={"/dashboard/categories/create"}
          >
            <span className="inline-flex">Create a category</span>{" "}
            <MoveRight size={20} />
          </Link>
          <Link
            className="flex w-1/2 items-center justify-between rounded-md bg-[#8659c6] px-4 py-2 text-white focus:ring-2 focus:ring-black focus:ring-offset-2 focus:outline-none"
            href={"/dashboard/expenses/create"}
          >
            <span className="inline-flex">Create an expense</span>{" "}
            <MoveRight size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
}
