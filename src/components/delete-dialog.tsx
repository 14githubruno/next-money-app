"use client";

import clsx from "clsx";
import type { CategoryTypes, ExpenseTypes } from "@/lib/validations/schemas";
import { Fragment } from "react";
import { Button } from "./tremor-raw/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./tremor-raw/ui/dialog";
import { Trash } from "lucide-react";
import { textInBrackets } from "@/lib/utils";

/**
 * Types
 */

type DialogDescriptionContentProps = {
  itemKind: "category" | "expense" | "account";
  itemData: CategoryTypes | ExpenseTypes | string;
};

type DeleteDialogProps = {
  deleteAction: () => void;
  isPending: boolean;
} & DialogDescriptionContentProps;

/**
 * @note Dynamically render description based on item and its data (category, expense or account).
 */
function DialogDescriptionContent({
  itemKind,
  itemData,
}: DialogDescriptionContentProps) {
  const descStart = (
    <Fragment>You are about to delete the {itemKind} </Fragment>
  );
  const descEnd = <span className="block">This action is irreversible.</span>;

  switch (itemKind) {
    case "category":
      const category = itemData as CategoryTypes;
      return (
        <Fragment>
          {descStart}
          <span className="font-bold">{textInBrackets(category.name)}</span>.
          {descEnd}
        </Fragment>
      );
    case "expense":
      const expense = itemData as ExpenseTypes;
      const note = expense?.note;
      return (
        <Fragment>
          {descStart}
          <span>
            {note ? (
              <span>
                with note{" "}
                <span className="font-bold">{textInBrackets(note)}</span>.
              </span>
            ) : (
              <span>
                of category
                <span className="font-bold">
                  {" "}
                  {textInBrackets(expense.category.name as string)}
                </span>
                .
              </span>
            )}
          </span>
          {descEnd}
        </Fragment>
      );
    case "account":
      return (
        <Fragment>
          {descStart}
          <span className="font-bold">
            {textInBrackets(itemData as string)}
          </span>
          .
          <span className="block font-bold">
            By deleting your account, you will also delete all your categories
            and expenses, if any.
          </span>
          {descEnd}
        </Fragment>
      );
  }
}

/**
 * DeleteDialog component.
 * @note This component is used to delete an item (category, expense or account).
 */
export default function DeleteDialog({
  deleteAction,
  isPending,
  itemKind,
  itemData,
}: DeleteDialogProps) {
  return (
    <div className="flex justify-center">
      <Dialog>
        <DialogTrigger asChild>
          {itemKind === "account" ? (
            <Button
              variant="destructive"
              className={clsx("w-full", "lg:w-fit")}
            >
              Delete Account
            </Button>
          ) : (
            <button
              className="cursor-pointer"
              aria-label={`Delete ${itemKind}`}
            >
              <Trash className="h-4 w-4" />
            </button>
          )}
        </DialogTrigger>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {itemKind.slice(0, 1).toUpperCase() + itemKind.slice(1)} deletion
            </DialogTitle>
            <DialogDescription className="mt-1 text-sm leading-6">
              <DialogDescriptionContent
                itemData={itemData}
                itemKind={itemKind}
              />
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-6">
            <DialogClose asChild>
              <Button
                disabled={isPending}
                className="mt-2 w-full sm:mt-0 sm:w-fit"
                variant="secondary"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              variant="destructive"
              disabled={isPending}
              isLoading={isPending}
              onClick={deleteAction}
              className="w-full sm:w-fit"
            >
              {isPending ? "Deleting" : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
