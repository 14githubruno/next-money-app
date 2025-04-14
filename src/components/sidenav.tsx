import Link from "next/link";
import NavLinks from "./nav-links";
import { LeafIcon } from "lucide-react";
import SignOut from "./sign-out";

export default function SideNav() {
  return (
    <div className="flex h-full flex-col border-r border-green-800 px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md p-4 md:h-40"
        href="/"
      >
        <div className="w-32 md:w-40">
          <LeafIcon />
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-y-2 md:space-x-0">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <SignOut />
      </div>
    </div>
  );
}
