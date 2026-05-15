"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "./appSidebar";
import AppNavbar from "./appNavbar";
import AppFooter from "./appFooter";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen" suppressHydrationWarning>
      <SidebarProvider>
        <AppSidebar />
        <main className="flex-1 flex flex-col w-full">
          <AppNavbar />
          <div className="flex-1 px-4 md:px-6 py-4">{children}</div>
          <AppFooter
            description="Industrial wastewater parameter analysis and treatment optimization dashboard. Monitor effluent quality and implement effective treatment strategies."
            showStatusIndicators={true}
            showAdminLinks={false}
          />
        </main>
      </SidebarProvider>
    </div>
  );
}