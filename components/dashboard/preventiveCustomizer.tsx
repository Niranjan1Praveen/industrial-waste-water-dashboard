"use client";

import React, { useState } from "react";
import { Play, RotateCcw, Settings, Activity, ArrowLeft, Server, AlertTriangle } from "lucide-react";
import ParameterSlider from "@/components/ui/ParameterSlider";
import { EquipmentNode } from "@/types";

// Generate some initial mock data for 10 Pumps and 2 Blowers
const generateInitialEquipment = (): EquipmentNode[] => {
  const equipment: EquipmentNode[] = [];
  for (let i = 1; i <= 10; i++) {
    equipment.push({
      id: `pump-${i}`,
      name: `Feed Pump ${i}`,
      type: "Pump",
      location: `Zone ${Math.ceil(i / 3)}`,
      status: i === 4 ? "Warning" : i === 7 ? "Critical" : "Healthy",
      parameters: {
        sound: i === 4 ? 88 : i === 7 ? 95 : 72 + Math.random() * 5,
        vibration: i === 4 ? 5.2 : i === 7 ? 8.5 : 2.0 + Math.random(),
        temperature: i === 4 ? 75 : i === 7 ? 90 : 45 + Math.random() * 5,
      },
    });
  }
  equipment.push({
    id: `blower-1`, name: `Aeration Blower Primary`, type: "Blower", location: "Aeration Basin",
    status: "Healthy", parameters: { sound: 92, vibration: 3.1, temperature: 60 }
  });
  equipment.push({
    id: `blower-2`, name: `Aeration Blower Standby`, type: "Blower", location: "Aeration Basin",
    status: "Healthy", parameters: { sound: 89, vibration: 2.8, temperature: 58 }
  });
  return equipment;
};

interface PreventiveCustomizerProps {
  industryId: string;
  industryName: string;
  initialEquipment?: any[];
  onAnalyze: (mode: "collective" | "individual", data: any) => void;
  isAnalyzing?: boolean;
}

function rosterToEquipmentNodes(roster: any[]): EquipmentNode[] {
  return roster.map((eq) => ({
    id: eq.id,
    name: eq.name,
    type: eq.type as "Pump" | "Blower",
    location: eq.location,
    status: "Healthy" as const,
    parameters: eq.default_parameters ?? { sound: 72, vibration: 2.1, temperature: 48 },
  }));
}

export default function PreventiveCustomizer({
  initialEquipment,
  onAnalyze,
  isAnalyzing = false,
}: PreventiveCustomizerProps) {
  const [equipmentList, setEquipmentList] = useState<EquipmentNode[]>(
    initialEquipment ? rosterToEquipmentNodes(initialEquipment) : generateInitialEquipment()
  );
  const [selectedEqId, setSelectedEqId] = useState<string | null>(null);
  const [hasChanges, setHasChanges] = useState(false);

  // When the API roster arrives (after initial render), seed the equipment list
  React.useEffect(() => {
    if (initialEquipment) {
      setEquipmentList(rosterToEquipmentNodes(initialEquipment));
      setSelectedEqId(null);
      setHasChanges(false);
    }
  }, [initialEquipment]);

  // Get the currently selected equipment object
  const selectedEq = equipmentList.find((eq) => eq.id === selectedEqId);

  const handleParameterChange = (param: string, value: number) => {
    if (!selectedEqId) return;
    setEquipmentList((prev) =>
      prev.map((eq) =>
        eq.id === selectedEqId
          ? { ...eq, parameters: { ...eq.parameters, [param]: value } }
          : eq
      )
    );
    setHasChanges(true);
  };

  const handleReset = () => {
    setEquipmentList(initialEquipment ? rosterToEquipmentNodes(initialEquipment) : generateInitialEquipment());
    setSelectedEqId(null);
    setHasChanges(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Critical": return "bg-red-100 border-red-300 text-red-700";
      case "Warning": return "bg-yellow-100 border-yellow-300 text-yellow-700";
      default: return "bg-green-50 border-green-200 text-green-700";
    }
  };

  return (
    <div className="border border-border rounded-lg bg-card overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-border bg-muted/10">
        <div className="flex items-center gap-3">
          {selectedEqId ? (
            <button
              onClick={() => setSelectedEqId(null)}
              className="p-1.5 hover:bg-muted rounded-md transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-muted-foreground" />
            </button>
          ) : (
            <Server className="w-5 h-5 text-primary" />
          )}
          <div>
            <h3 className="text-lg font-bold text-foreground">
              {selectedEqId ? selectedEq?.name : "Fleet Status Overview"}
            </h3>
            <p className="text-xs text-muted-foreground">
              {selectedEqId ? `Zone: ${selectedEq?.location}` : "10 Pumps | 2 Blowers active"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {hasChanges && <span className="text-xs text-muted-foreground hidden sm:inline">Values modified</span>}
          <button
            onClick={handleReset}
            className="px-3 py-1.5 text-xs border border-border rounded-lg text-muted-foreground hover:text-foreground hover:border-primary transition-colors flex items-center gap-1"
            disabled={isAnalyzing}
          >
            <RotateCcw className="w-3 h-3" /> Reset
          </button>
        </div>
      </div>

      <div className="p-6">
        {/* VIEW 1: COLLECTIVE GRID */}
        {!selectedEqId && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {equipmentList.map((eq) => (
                <button
                  key={eq.id}
                  onClick={() => setSelectedEqId(eq.id)}
                  className={`flex flex-col items-center justify-center p-4 border rounded-xl transition-all hover:shadow-md ${getStatusColor(eq.status)}`}
                >
                  {eq.status === "Critical" || eq.status === "Warning" ? (
                    <AlertTriangle className="w-6 h-6 mb-2" />
                  ) : (
                    <Activity className="w-6 h-6 mb-2 opacity-70" />
                  )}
                  <span className="text-xs font-bold text-center">{eq.name}</span>
                  <span className="text-[10px] uppercase tracking-wider mt-1 opacity-70">{eq.status}</span>
                </button>
              ))}
            </div>
            <button
              onClick={() => onAnalyze("collective", equipmentList)}
              disabled={isAnalyzing}
              className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
            >
              {isAnalyzing ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Play className="w-4 h-4" />}
              Run Collective System Analysis
            </button>
          </div>
        )}

        {/* VIEW 2: INDIVIDUAL DEEP DIVE */}
        {selectedEqId && selectedEq && (
          <div className="space-y-5">
            <ParameterSlider
              label="Acoustic Emissions (Sound)"
              value={selectedEq.parameters.sound}
              min={40} max={120} step={0.5} unit="dB"
              onChange={(val) => handleParameterChange("sound", val)}
              disabled={isAnalyzing}
            />
            <ParameterSlider
              label="Vibration Velocity"
              value={selectedEq.parameters.vibration}
              min={0} max={15} step={0.1} unit="mm/s"
              onChange={(val) => handleParameterChange("vibration", val)}
              disabled={isAnalyzing}
            />
            <ParameterSlider
              label="Casing/Bearing Temperature"
              value={selectedEq.parameters.temperature}
              min={20} max={120} step={0.5} unit="°C"
              onChange={(val) => handleParameterChange("temperature", val)}
              disabled={isAnalyzing}
            />
            
            <button
              onClick={() => onAnalyze("individual", selectedEq)}
              disabled={isAnalyzing}
              className="w-full mt-4 py-3 bg-slate-800 text-white rounded-lg font-medium hover:bg-slate-700 transition-colors flex items-center justify-center gap-2"
            >
              {isAnalyzing ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Play className="w-4 h-4" />}
              Analyze {selectedEq.name} Individually
            </button>
          </div>
        )}
      </div>
    </div>
  );
}