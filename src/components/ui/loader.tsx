import { LoaderCircle } from "lucide-react";

type LoaderProps = {
  height: string;
};

/**
 *
 * @note Fallback component used during DB queries.
 * @note For simplicty, only its `height` should change
 */
export default function Loader({ height }: LoaderProps) {
  return (
    <div
      style={{ height }}
      className="flex items-center justify-center rounded-md bg-gray-50 shadow-md dark:bg-neutral-900"
    >
      <LoaderCircle className="size-8 shrink-0 animate-spin text-gray-300 dark:text-neutral-500" />
    </div>
  );
}
