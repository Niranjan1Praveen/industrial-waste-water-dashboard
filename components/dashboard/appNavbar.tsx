"use client";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AnimatedThemeToggler } from "../ui/animated-theme-toggler";

const AppNavbar: React.FC = () => {
  return (
    <nav className="p-4 flex items-center justify-between z-10">
      {/* LEFT */}
      <SidebarTrigger />
      {/* RIGHT */}
      <div className="flex items-center gap-4">
        {/* USER MENU */}
        <div className="flex space-x-3 items-center uppercase text-[11px]">
          <AnimatedThemeToggler className="cursor-pointer"/>
        </div>
      </div>
    </nav>
  );
};

export default AppNavbar;
