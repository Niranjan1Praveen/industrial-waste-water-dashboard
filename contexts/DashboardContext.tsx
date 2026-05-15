"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type SubCategory = {
  id: string;
  name: string;
  challenges: string[];
  // ... other properties
};

type Parameters = {
  bod: number;
  cod: number;
  tss: number;
  tds: number;
  ph: number;
};

type DashboardContextType = {
  selectedSubCategory: SubCategory | null;
  setSelectedSubCategory: (category: SubCategory | null) => void;
  parameters: Parameters;
  handleParameterChange: (key: keyof Parameters, value: number) => void;
};

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [selectedSubCategory, setSelectedSubCategory] = useState<SubCategory | null>(null);
  const [parameters, setParameters] = useState<Parameters>({
    bod: 500,
    cod: 1000,
    tss: 300,
    tds: 2000,
    ph: 7,
  });

  const handleParameterChange = (key: keyof Parameters, value: number) => {
    setParameters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <DashboardContext.Provider
      value={{
        selectedSubCategory,
        setSelectedSubCategory,
        parameters,
        handleParameterChange,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
}