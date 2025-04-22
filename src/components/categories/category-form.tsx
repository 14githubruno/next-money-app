"use client";

import { Button } from "../ui/button/button";
import {
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { Plus } from "lucide-react";
import { createCategory, updateCategory } from "@/lib/actions/category";
import { useActionState, useCallback, useRef, useEffect } from "react";
import { type CategoryTypes } from "@/lib/validations/schemas";
import { type CategoryFormState } from "@/lib/types";
import { Input } from "@/components/inputs/input/input";
import { Label } from "@/components/inputs/label/label";

type CategoryFormProps = {
  userId: string;
  category?: CategoryTypes | null;
  isEditing?: boolean;
};

const initState: CategoryFormState = {
  success: false,
  message: "",
  fieldValues: { name: "" },
};

export default function CategoryForm({
  userId,
  category,
  isEditing = false,
}: CategoryFormProps) {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  // Bind userId and set action state
  const createCategoryPassingUserId = createCategory.bind(null, userId);
  const updateCategoryPassingUserIdAndCategoryId = updateCategory.bind(
    null,
    userId,
    isEditing && category ? category.id : undefined
  );

  const action =
    category && isEditing
      ? updateCategoryPassingUserIdAndCategoryId
      : createCategoryPassingUserId;

  const initialState =
    category && isEditing
      ? { ...initState, fieldValues: { ...category } }
      : { ...initState };

  const [state, formAction, pending] = useActionState(action, initialState);

  // Helper function to display field errors
  const getFieldError = useCallback(
    (fieldName: string) => {
      return state?.errors && state.errors[fieldName]?.[0] ? (
        <p className="mt-1 text-red-600">{state?.errors[fieldName][0]}</p>
      ) : null;
    },
    [state]
  );

  // if action is successful, close drawer
  useEffect(() => {
    if (state.success && closeButtonRef.current !== null) {
      closeButtonRef.current.click();
    }
  }, [state, closeButtonRef]);

  // fire form
  const fireForm = () => {
    if (formRef.current !== null) {
      formRef.current.requestSubmit();
    }
  };

  return (
    <div className="flex justify-center">
      <Drawer>
        <DrawerTrigger asChild>
          {isEditing ? (
            <Button className="flex items-center rounded-md bg-[#8659c6] px-4 py-2 text-white focus:ring-2 focus:ring-black focus:ring-offset-2 focus:outline-none">
              <Plus className="mr-2 h-4 w-4" />
              Update category
            </Button>
          ) : (
            <Button className="flex items-center rounded-md bg-[#8659c6] px-4 py-2 text-white focus:ring-2 focus:ring-black focus:ring-offset-2 focus:outline-none">
              <Plus className="mr-2 h-4 w-4" />
              Add Category
            </Button>
          )}
        </DrawerTrigger>
        <DrawerContent className="sm:max-w-lg">
          <DrawerHeader>
            <DrawerTitle>
              {isEditing ? "Edit category" : "Add new category"}
            </DrawerTitle>
          </DrawerHeader>
          <DrawerBody className="py-6">
            <form
              ref={formRef}
              action={formAction}
              className="mx-auto w-full max-w-lg"
            >
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Category name"
                  defaultValue={state?.fieldValues?.name ?? ""}
                />
                {getFieldError("name")}
              </div>
            </form>
            {state?.message && !state.success && (
              <p className="mx-auto w-full max-w-lg">{state.message}</p>
            )}
          </DrawerBody>
          <DrawerFooter className="mt-6">
            <DrawerClose asChild>
              <Button
                ref={closeButtonRef}
                className="mt-2 w-full sm:mt-0 sm:w-fit"
                variant="secondary"
              >
                Go back
              </Button>
            </DrawerClose>
            <button
              onClick={fireForm}
              type="submit"
              disabled={pending}
              className="cursor-pointer rounded-md border border-transparent bg-[#8659c6] px-4 py-2 text-sm font-medium text-white shadow-sm focus:ring-2 focus:ring-black focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            >
              {pending
                ? "Saving..."
                : isEditing
                  ? "Update Category"
                  : "Create Category"}
            </button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
