import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { DashboardProvider } from "@/contexts/DashboardContext";
import ClientLayout from "@/components/dashboard/clientLayout";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();
  
  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <DashboardProvider>
      <ClientLayout>{children}</ClientLayout>
    </DashboardProvider>
  );
}