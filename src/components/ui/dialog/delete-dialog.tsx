"use client";

import type { CategoryTypes, ExpenseTypes } from "@/lib/validations/schemas";
import { Fragment } from "react";
import { Button } from "../button/button";
import { Trash } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from ".";
import { textInBrackets } from "@/lib/utils";

type DialogDescriptionContentProps = {
  itemKind: "category" | "expense";
  itemData: CategoryTypes | ExpenseTypes;
};

type DeleteDialogProps = {
  deleteAction: () => void;
  isPending: boolean;
  isDefaultCategory?: boolean;
} & DialogDescriptionContentProps;

/**
 *
 * @note Dynamically render description based on item and its data (category or expense)
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
                  {textInBrackets(expense.category.name)}
                </span>
                .
              </span>
            )}
          </span>
          {descEnd}
        </Fragment>
      );
  }
}

export default function DeleteDialog({
  deleteAction,
  isPending,
  isDefaultCategory = false,
  itemKind,
  itemData,
}: DeleteDialogProps) {
  return (
    <div className="flex justify-center">
      <Dialog>
        <DialogTrigger asChild>
          <button
            className="cursor-pointer"
            disabled={isDefaultCategory}
            aria-label={`Delete ${itemKind}`}
          >
            <Trash
              className={`h-4 w-4 ${isDefaultCategory ? "opacity-65" : ""}`}
            />
          </button>
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
