import clsx from "clsx";
import { redirect, notFound } from "next/navigation";
import { formatDate } from "@/lib/utils";
import { getUser } from "@/lib/utils/server-only-utils";
import { getUserDB } from "@/lib/queries/auth";
import { PAGES_TITLES } from "@/lib/constants";
import UserIconFigure from "@/components/account/user-icon-figure";
import Heading from "@/components/ui/heading";
import Paragraph from "@/components/ui/paragraph";
import AccountDeletion from "@/components/account/account-deletion";

export default async function Account() {
  const { userId, user } = await getUser();
  if (!userId || !user) {
    redirect("sign-in");
  }

  const userDB = await getUserDB(userId);
  if (!userDB) {
    return notFound();
  }

  const userName = user?.name;

  return (
    <div className="flex flex-col gap-16">
      <UserIconFigure />
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Heading level={1} text={PAGES_TITLES.h1.dashboardAccount} />
          <div
            className={clsx(
              "flex flex-col gap-2",
              "lg:flex-row lg:justify-between"
            )}
          >
            <Paragraph
              text={`Your account has been created at: ${formatDate(new Date(userDB?.createdAt))}`}
            />
            {userName && <AccountDeletion userName={userName} />}
          </div>
        </div>
      </div>
    </div>
  );
}
