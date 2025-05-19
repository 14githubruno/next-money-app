import { ExpenseTypes } from "@/lib/validations/schemas";
import {
  Table,
  TableBody,
  TableCell,
  TableRoot,
  TableRow,
} from "../tremor-raw/ui/table";
import { formatPriceWithCurrency, formatDate } from "@/lib/utils";
import { Badge } from "../tremor-raw/ui/badge";

type ConfirmedExpensesTableProps = {
  expenses: ExpenseTypes[];
  count: number;
  currency: string | undefined;
};

export default function ConfirmedExpensesTable({
  expenses,
  count,
  currency,
}: ConfirmedExpensesTableProps) {
  if (count === 0) {
    return (
      <div className="flex h-full items-center justify-center rounded-md bg-gray-50 dark:bg-neutral-900">
        <p className="text-gray-500 dark:text-white">
          No confirmed expenses found
        </p>
      </div>
    );
  }

  return (
    <TableRoot>
      <Table className="opacity-50">
        <TableBody>
          {expenses.map((expense) => {
            return (
              <TableRow key={expense.id}>
                <TableCell>{expense.category.name}</TableCell>
                <TableCell>
                  {formatPriceWithCurrency(expense.amount, currency)}
                </TableCell>
                <TableCell>
                  {formatDate(new Date(expense.expenseDate))}
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
