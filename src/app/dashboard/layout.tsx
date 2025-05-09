import clsx from "clsx";
import { type ReactNode } from "react";
import { getUser } from "@/lib/utils/server-only-utils";
import Sidenav from "@/components/navigation/sidenav";

type Props = {
  children: ReactNode;
};

export default async function Layout({ children }: Props) {
  const { user } = await getUser();

  return (
    <div
      className={clsx(
        "mt-[var(--height-mobile-nav)] flex h-screen flex-col",
        "lg:mt-0 lg:flex-row lg:overflow-hidden"
      )}
    >
      <div className={clsx("w-full flex-none", "lg:w-sidebar")}>
        <Sidenav user={user} />
      </div>
      <div className={clsx("grow p-6", "lg:overflow-y-auto lg:px-12")}>
        {children}
      </div>
    </div>
  );
}
