"use client";

import * as React from "react";
import { ChevronDown, ChevronRight, Activity } from "lucide-react";

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
} from "@/components/ui/sidebar";
import { useDashboard } from "@/contexts/DashboardContext";

export default function AppSidebar() {
  const { setSelectedSubCategory } = useDashboard();
  const [expandedId, setExpandedId] = React.useState<string | null>(null);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b">
        <div className="flex items-center gap-2 px-2 py-2">
          <Activity className="h-4 w-4" />
          <span className="text-sm font-semibold tracking-wide uppercase">
            Industry Matrix
          </span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {industries.map((industry) => {
                const isExpanded = expandedId === industry.id;

                return (
                  <SidebarMenuItem key={industry.id}>
                    <SidebarMenuButton
                      onClick={() =>
                        setExpandedId(isExpanded ? null : industry.id)
                      }
                      className="w-full justify-between"
                    >
                      <span>{industry.name}</span>
                      {isExpanded ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </SidebarMenuButton>

                    {isExpanded && (
                      <div className="ml-4 mt-1 border-l pl-2">
                        <SidebarMenu className="gap-1">
                          {industry.subCategories.map((sub) => (
                            <SidebarMenuItem key={sub.id}>
                              <button
                                onClick={() => setSelectedSubCategory(sub)}
                                className="
                                  flex w-full items-center rounded-md px-2 py-2
                                  text-left text-sm transition-colors
                                  hover:bg-accent hover:text-accent-foreground
                                "
                              >
                                {sub.name}
                              </button>
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
            <div className="flex items-center gap-3 px-3 py-2">
              {/* <UserButton /> */}
              <span className="text-sm font-medium text-[var(--ink)] truncate">
                User Profile BUtton
              </span>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}