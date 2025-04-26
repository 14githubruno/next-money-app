import { type ReactNode } from "react";
import { grabUser } from "@/lib/utils";
import Sidenav from "@/components/navigation/sidenav";

type Props = {
  children: ReactNode;
};

export default async function Layout({ children }: Props) {
  const user = await grabUser();

  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <Sidenav user={user} />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}
