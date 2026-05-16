"use client";

import React from "react";
import { useDashboard } from "@/contexts/DashboardContext";
import WelcomeScreen from "@/components/dashboard/welcomeScreen";
import IndustryView from "@/components/dashboard/industryView";

export default function DashboardPage() {
  const { selectedSubCategory, parameters, handleParameterChange } =
    useDashboard();

  if (!selectedSubCategory) {
    return <WelcomeScreen />;
  }

  return (
    <div>
      <IndustryView
        selectedSubCategory={selectedSubCategory}
        parameters={parameters}
        handleParameterChange={handleParameterChange}
      />
    </div>
  );
}
