import { Badge } from "../ui/badge";
import { Table, TableBody, TableCell, TableRoot, TableRow } from "../ui/table";
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
    <TableRoot>
      <Table>
        <TableBody>
          {expenses.map((expense) => {
            return (
              <TableRow key={expense.id}>
                <TableCell>{expense.category.name}</TableCell>
                <TableCell>${expense.amount.toFixed(2)}</TableCell>
                <TableCell>
                  {new Date(expense.expenseDate).toLocaleDateString()}
                </TableCell>
                <TableCell>{expense.note || "-"}</TableCell>
                <TableCell>
                  <Badge variant="success">confirmed</Badge>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableRoot>
  );
}
