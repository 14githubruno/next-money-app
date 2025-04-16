"use client";

import { useRouter } from "next/navigation";
import { createCategory, updateCategory } from "@/lib/actions/category";
import { Fragment, useActionState, useCallback } from "react";
import { type CategoryTypes } from "@/lib/validations/schemas";
import { type CategoryFormState } from "@/lib/types";

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

export function CategoryForm({
  userId,
  category,
  isEditing = false,
}: CategoryFormProps) {
  const router = useRouter();

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

  return (
    <Fragment>
      <form action={formAction} className="mx-auto w-full max-w-lg">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">
            {isEditing ? "Edit Category" : "Add New Category"}
          </h2>

          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Category name"
              defaultValue={state?.fieldValues?.name ?? ""}
              className={`w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-offset-2 focus:outline-none`}
            />
            {getFieldError("name")}
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-black focus:ring-offset-2 focus:outline-none"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={pending}
              className="rounded-md border border-transparent bg-[#8659c6] px-4 py-2 text-sm font-medium text-white shadow-sm focus:ring-2 focus:ring-black focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            >
              {pending
                ? "Saving..."
                : isEditing
                  ? "Update Category"
                  : "Create Category"}
            </button>
          </div>
        </div>
      </form>
      {state?.message && !state.success && (
        <p className="mx-auto w-full max-w-lg">{state.message}</p>
      )}
    </Fragment>
  );
}
