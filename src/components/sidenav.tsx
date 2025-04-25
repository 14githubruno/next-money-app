import NavLinks from "./nav-links";
import SignOut from "./sign-out";

export default function SideNav() {
  return (
    <div className="flex h-full flex-col border-r border-green-800 px-3 py-4 md:px-2">
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-y-2 md:space-x-0">
        <NavLinks />
        <div className="hidden h-auto w-full grow bg-gray-50 md:block"></div>
        <SignOut />
      </div>
    </div>
  );
}
