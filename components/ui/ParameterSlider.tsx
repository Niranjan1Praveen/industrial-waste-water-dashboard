'use client';
import React from 'react';

interface ParameterSliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  unit: string;
  step?: number;
  onChange: (val: number) => void;
  disabled?: boolean;
}

export default function ParameterSlider({ 
  label, 
  value, 
  min, 
  max, 
  unit, 
  step = 1,
  onChange,
  disabled = false 
}: ParameterSliderProps) {
  return (
    <div className={`p-4 rounded-lg border border-border transition-all ${disabled ? 'opacity-50' : 'hover:border-primary/50'}`}>
      <div className="flex justify-between items-center mb-4">
        <label className="text-sm font-medium text-foreground">{label}</label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            disabled={disabled}
            className="bg-muted border border-border text-foreground text-right w-24 px-2 py-1 rounded text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all disabled:opacity-50"
          />
          <span className="text-muted-foreground text-xs w-8">{unit}</span>
        </div>
      </div>
      
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        disabled={disabled}
        className="w-full h-1 bg-muted rounded-lg appearance-none cursor-pointer accent-primary disabled:cursor-not-allowed"
      />
      <div className="flex justify-between mt-2 text-[10px] text-muted-foreground">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}