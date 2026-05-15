'use client';
import React from 'react';

interface ParameterSliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  unit: string;
  onChange: (val: number) => void;
}

export default function ParameterSlider({ label, value, min, max, unit, onChange }: ParameterSliderProps) {
  return (
    <div className="bg-[#0D233A] p-4 rounded-lg border border-teal-900/30 transition-all hover:border-teal-700/50">
      <div className="flex justify-between items-center mb-4">
        <label className="text-slate-300 font-ibm-sans text-sm font-medium">{label}</label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className="bg-[#060B13] border border-cyan-800/50 text-cyan-400 font-data text-right w-24 px-2 py-1 rounded text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-500/50 transition-all"
          />
          <span className="text-slate-500 text-xs w-8">{unit}</span>
        </div>
      </div>
      
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
      />
      <div className="flex justify-between mt-2 text-[10px] text-slate-500 font-data">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}