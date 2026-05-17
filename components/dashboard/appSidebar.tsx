"use client";

import * as React from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import {
  FaFlask,
  FaWineBottle,
  FaTshirt,
  FaIndustry,
  FaTint,
  FaFire,
  FaUtensils,
  FaLeaf,
  FaCogs,
  FaBolt,
  FaBug,
  FaMicroscope,
  FaSkull,
  FaHardHat,
  FaBox,
  FaAppleAlt,
  FaBatteryFull,
  FaAccessibleIcon,
  FaHome,
} from "react-icons/fa";
import ImageNext from "next/image";
import { industries } from "@/data/industries";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useDashboard } from "@/contexts/DashboardContext";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

// Map industry IDs to their respective icons from react-icons
const industryIcons: Record<string, React.ElementType> = {
  pharma: FaFlask,
  distillery: FaWineBottle,
  textile: FaTshirt,
  "pulp-paper": FaIndustry,
  tannery: FaTint,
  "oil-refinery": FaFire,
  "dairy-food": FaUtensils,
  fertilizer: FaLeaf,
  "iron-steel": FaCogs,
  electroplating: FaBatteryFull,
  "thermal-power": FaBolt,
  sugar: FaAppleAlt,
  pesticide: FaBug,
  chemical: FaMicroscope,
  slaughterhouse: FaSkull,
  mining: FaHardHat,
  fmcg: FaBox,
};

export default function AppSidebar() {
  const { setSelectedSubCategory } = useDashboard();
  // Change from string | null to Set or array for multiple expanded items
  const [expandedIds, setExpandedIds] = React.useState<Set<string>>(new Set());
  const { user, isLoaded } = useUser();
  const { state, setOpen } = useSidebar();
  const isCollapsed = state === "collapsed";

  const handleMenuClick = (industryId: string) => {
    // If sidebar is collapsed, expand it first
    if (isCollapsed) {
      setOpen(true);
      // Store the industry ID to expand after sidebar opens
      setExpandedIds(new Set([industryId]));
    } else {
      // Toggle the submenu without closing others
      setExpandedIds((prev) => {
        const newSet = new Set(prev);
        if (newSet.has(industryId)) {
          newSet.delete(industryId); // Close if already open
        } else {
          newSet.add(industryId); // Open without closing others
        }
        return newSet;
      });
    }
  };

  return (
    <TooltipProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader className="border-b">
          <div className="flex items-center justify-start gap-4">
            <ImageNext
              src="/images/logo/logoNew2.png"
              alt="Industry Matrix Logo"
              width={30}
              height={30}
              className="object-contain"
              loading="eager"
            />
            <span className="text-sm font-semibold tracking-wide uppercase truncate">
              Industry Matrix
            </span>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <Link href="/dashboard/overview" className="block">
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      className="w-full justify-between"
                      tooltip={isCollapsed ? "Overview" : undefined}
                    >
                      <div className="flex items-center gap-3">
                        <FaHome className="h-4 w-4 shrink-0" />
                        <span className="truncate">Overview</span>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </Link>
                {industries.map((industry) => {
                  const isExpanded = expandedIds.has(industry.id);
                  const IconComponent =
                    industryIcons[industry.id] || FaIndustry;

                  return (
                    <SidebarMenuItem key={industry.id}>
                      <SidebarMenuButton
                        onClick={() => handleMenuClick(industry.id)}
                        className="w-full justify-between"
                        tooltip={isCollapsed ? industry.name : undefined}
                      >
                        <div className="flex items-center gap-3">
                          <IconComponent className="h-4 w-4 shrink-0" />
                          <Link href={`/dashboard`}>
                            <span className="truncate">{industry.name}</span>
                          </Link>
                        </div>
                        {!isCollapsed &&
                          (isExpanded ? (
                            <ChevronDown className="h-4 w-4 shrink-0" />
                          ) : (
                            <ChevronRight className="h-4 w-4 shrink-0" />
                          ))}
                      </SidebarMenuButton>

                      {!isCollapsed && isExpanded && (
                        <div className="ml-4 mt-1 border-l pl-2">
                          <SidebarMenu className="gap-1">
                            {industry.subCategories.map((sub) => (
                              <SidebarMenuItem key={sub.id}>
                                <Link
                                  onClick={() => setSelectedSubCategory(sub)}
                                  href={`/dashboard`}
                                  className="
                                    flex w-full items-center rounded-md px-2 py-2
                                    text-left text-sm transition-colors
                                    hover:bg-accent hover:text-accent-foreground
                                  "
                                >
                                  {sub.name}
                                </Link>
                              </SidebarMenuItem>
                            ))}
                          </SidebarMenu>
                        </div>
                      )}
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent transition-colors">
                <UserButton
                  appearance={{
                    elements: {
                      userButtonAvatarBox: "w-8 h-8",
                      userButtonTrigger: "focus:shadow-none",
                    },
                  }}
                />
                {!isCollapsed && isLoaded && user && (
                  <div className="flex flex-col min-w-0">
                    <span className="text-sm font-medium truncate">
                      {user.fullName ||
                        user.username ||
                        user.emailAddresses[0]?.emailAddress?.split("@")[0]}
                    </span>
                    <span className="text-xs text-muted-foreground truncate">
                      {user.primaryEmailAddress?.emailAddress}
                    </span>
                  </div>
                )}
                {!isCollapsed && !isLoaded && (
                  <div className="flex flex-col gap-1">
                    <div className="h-4 w-24 bg-muted animate-pulse rounded" />
                    <div className="h-3 w-32 bg-muted animate-pulse rounded" />
                  </div>
                )}
              </div>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </TooltipProvider>
  );
}
