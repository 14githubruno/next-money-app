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
import { useActionState, useRef } from "react";
import { type CategoryTypes } from "@/lib/validations/schemas";
import { categoryFormInitialState as initState } from "@/lib/utils";
import { Input } from "@/components/inputs/input/input";
import { Label } from "@/components/inputs/label/label";
import { useFormToast } from "@/hooks/toast/use-form-toast";

type CategoryFormProps = {
  userId: string;
  category?: CategoryTypes | null;
  isEditing?: boolean;
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

  // if action is successful, close drawer and toast success,
  // otherwise keep drawer open and toast errors
  useFormToast(state, closeButtonRef);

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
          <Button variant="base">
            <Plus className="mr-2 h-4 w-4" />
            {isEditing ? "Update category" : "Add category"}
          </Button>
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
              </div>
            </form>
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
            <Button
              onClick={fireForm}
              type="submit"
              disabled={pending}
              isLoading={pending}
              variant="base"
            >
              {pending
                ? "Saving..."
                : isEditing
                  ? "Update Category"
                  : "Create Category"}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
