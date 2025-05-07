import clsx from "clsx";
import Link from "next/link";
import { Tooltip } from "../tremor-raw/ui/tooltip";
import { Bird } from "lucide-react";

type LogoProps = {
  isMobile: boolean;
};

export default function Logo({ isMobile }: LogoProps) {
  const link = (
    <Link
      className={clsx(
        "flex w-fit items-center rounded-full p-[0.45rem]",
        "border border-gray-300 dark:border-gray-800"
      )}
      aria-label="link-to-home"
      href={"/"}
    >
      <Bird className="size-6 overflow-hidden" aria-hidden="true" />
    </Link>
  );

  return isMobile ? (
    link
  ) : (
    <Tooltip asChild side="right" content={"home chip chip"}>
      {link}
    </Tooltip>
  );
}
