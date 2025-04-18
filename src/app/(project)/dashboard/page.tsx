import { ChartAreaInteractive } from "@/_components/chart-area-interactive";
import { DataTable } from "@/_components/data-table";
import { SectionCards } from "@/_components/section-cards";
import { SiteHeader } from "@/_components/site-header";
import { auth } from "@/app/lib/auth";
import { redirect } from "next/navigation";

import data from "./data.json";
import { prisma } from "@/app/lib/prisma";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/auth/login");
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session?.user?.id,
    },
  });

  if (!user) {
    redirect("/auth/login");
  }

  if (user.status === "inactive") {
    redirect("/payments?inactiveSubscription=true");
  }

  return (
    <>
      <SiteHeader />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <SectionCards />
            <div className="px-4 lg:px-6">
              <ChartAreaInteractive />
            </div>
            <DataTable data={data} />
          </div>
        </div>
      </div>
    </>
  );
}
