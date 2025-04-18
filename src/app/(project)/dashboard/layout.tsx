import { AppSidebar } from "@/_components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/_components/ui/sidebar";
import { auth } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  if (!session) {
    redirect("/auth/login");
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session?.user?.id,
    },
  });

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" user={user!} />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
