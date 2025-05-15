import { LoaderCircle } from "lucide-react";

type ComponentLoaderProps = {
  height: string;
};

/**
 * Component loader.
 * @note Fallback component used during DB queries.
 * @note For simplicty, only its `height` should change
 */
export function ComponentLoader({ height }: ComponentLoaderProps) {
  return (
    <div
      style={{ height }}
      className="flex items-center justify-center rounded-md bg-gray-50 shadow-md dark:bg-neutral-900"
    >
      <LoaderCircle className="size-8 shrink-0 animate-spin text-gray-300 dark:text-neutral-500" />
    </div>
  );
}

/**
 * Page loader used in `loading.tsx` files
 */
export function PageLoader() {
  return (
    <div className="fixed inset-0 flex h-screen w-full items-center justify-center">
      <LoaderCircle className="size-8 shrink-0 animate-spin" />
    </div>
  );
}
