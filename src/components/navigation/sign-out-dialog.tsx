import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../tremor-raw/ui/dialog";
import { Button } from "../tremor-raw/ui/button";
import { DropdownMenuItem } from "../tremor-raw/inputs/dropdown-menu";
import SignOut from "@/components/navigation/sign-out";

export type SignOutDialogProps = {
  onSelect: () => void;
  onOpenChange: (open: boolean) => void;
};

export default function SignOutDialog({
  onSelect,
  onOpenChange,
}: SignOutDialogProps) {
  return (
    <Dialog onOpenChange={onOpenChange}>
      <DialogTrigger className="w-full text-left">
        <DropdownMenuItem
          onSelect={(event) => {
            event.preventDefault();
            onSelect();
          }}
        >
          Sign out
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Do you want to sign out?</DialogTitle>
        </DialogHeader>
        <DialogFooter className="mt-6">
          <DialogClose asChild>
            <Button
              className="mt-2 w-full rounded-sm sm:mt-0 sm:w-fit"
              variant="secondary"
            >
              No
            </Button>
          </DialogClose>
          <SignOut />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
