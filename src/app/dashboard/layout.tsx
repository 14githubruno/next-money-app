import clsx from "clsx";
import { type ReactNode } from "react";
import { getUser } from "@/lib/utils";
import Sidenav from "@/components/navigation/sidenav";

type Props = {
  children: ReactNode;
};

export default async function Layout({ children }: Props) {
  const { user } = await getUser();

  return (
    <div
      className={clsx(
        "flex h-screen flex-col",
        "lg:flex-row lg:overflow-hidden"
      )}
    >
      <div className={clsx("w-full flex-none", "lg:w-72")}>
        <Sidenav user={user} />
      </div>
      <div className={clsx("grow p-6", "lg:overflow-y-auto lg:px-12")}>
        {children}
      </div>
    </div>
  );
}
