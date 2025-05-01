import { useEffect } from "react";
import { useToast } from "./use-toast";
import type { ExpenseFormState, CategoryFormState } from "@/lib/types";

type stateTypes = ExpenseFormState | CategoryFormState;

export function useFormToast(
  state: stateTypes,
  closeButtonRef: React.RefObject<HTMLButtonElement | null>
) {
  const { toast } = useToast();

  useEffect(() => {
    if (state.success && closeButtonRef.current !== null) {
      closeButtonRef.current.click();
      toast({
        description: state.message,
        variant: "success",
      });
    }

    if (!state.success && state.errors) {
      Object.values(state.errors)
        .flat()
        .forEach((msg) => {
          return toast({
            description: msg,
            variant: "error",
          });
        });
    }

    if (!state.success && state.message && !state.errors) {
      toast({
        description: state.message,
        variant: "error",
      });
    }
  }, [state, closeButtonRef, toast]);
}
