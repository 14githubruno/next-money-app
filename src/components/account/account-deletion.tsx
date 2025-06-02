"use client";

import { useTransition } from "react";
import DeleteDialog from "../delete-dialog";
import { deleteAccount } from "@/lib/actions/auth";

type AccountDeletionProps = {
  userName: string;
};

export default function AccountDeletion({ userName }: AccountDeletionProps) {
  const [isPending, startTransition] = useTransition();

  const deleteAccountAction = () => {
    startTransition(async () => {
      await deleteAccount();
    });
  };

  return (
    <DeleteDialog
      deleteAction={deleteAccountAction}
      isPending={isPending}
      itemKind="account"
      itemData={userName}
    />
  );
}
