import { ExpenseTypes } from "@/lib/validations/schemas";

type ConfirmedExpensesTableProps = {
  expenses: ExpenseTypes[];
};

export default function ConfirmedExpensesTable({
  expenses,
}: ConfirmedExpensesTableProps) {
  return expenses.length === 0 ? (
    <div className="rounded-lg bg-gray-50 py-8 text-center">
      <p className="text-gray-500">No unconfirmed expenses found.</p>
    </div>
  ) : (
    <div className="overflow-x-auto rounded-sm border border-purple-100">
      <table className="min-w-full divide-y divide-gray-200">
        <tbody className="divide-y divide-gray-200 bg-white">
          {expenses.map((expense) => (
            <tr key={expense.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {expense.category.name}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  ${expense.amount.toFixed(2)}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">
                  {new Date(expense.expenseDate).toLocaleDateString()}
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="max-w-xs truncate text-sm text-gray-500">
                  {expense.note || "-"}
                </div>
              </td>
              <td className="px-6 py-4 text-right text-sm font-medium whitespace-nowrap">
                <div>confirmed</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
