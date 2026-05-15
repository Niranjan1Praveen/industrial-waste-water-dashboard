import { useState } from 'react';

export function useDashboard() {
  const [selectedSubCategory, setSelectedSubCategory] = useState<any>(null);
  const [parameters, setParameters] = useState({ bod: 0, cod: 0, tss: 0, tds: 0, ph: 7 });

  const handleSelect = (sub: any) => {
    setSelectedSubCategory(sub);
    // This looks for Claude's parameter data, but safely falls back to zeros if not found
    setParameters(sub.typicalValues || sub.parameters || { bod: 0, cod: 0, tss: 0, tds: 0, ph: 7 });
  };

  const handleParameterChange = (key: string, value: number) => {
    setParameters(prev => ({ ...prev, [key]: value }));
  };

  return {
    selectedSubCategory,
    setSelectedSubCategory: handleSelect,
    parameters,
    handleParameterChange
  };
}