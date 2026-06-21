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

  // Unidirectional params (BOD, COD, TSS, TDS, Oil & Grease)
  // 4 zones: GREEN(0→normalLimit) | YELLOW(normalLimit→warningLimit) | ORANGE(warningLimit→criticalLimit) | RED(criticalLimit→max)
  normalLimit?: number;     // CPCB permissible discharge limit (e.g. BOD: 30)
  warningLimit?: number;    // Warning threshold (e.g. BOD: 100)
  criticalLimit?: number;   // Critical threshold (e.g. BOD: 500)

  // Bidirectional pH gauge
  isBidirectional?: boolean;
  // pH zone boundaries (all explicit, no reuse of unidirectional props)
  phCriticalLow?: number;  // 5.5
  phWarningLow?: number;   // 6.0
  phNormalLow?: number;    // 6.5
  phNormalHigh?: number;   // 8.5
  phWarningHigh?: number;  // 9.0
  phCriticalHigh?: number; // 9.5
}

export default function ParameterSlider({
  label,
  value,
  min,
  max,
  unit,
  step = 1,
  onChange,
  disabled = false,
  normalLimit,
  warningLimit,
  criticalLimit,
  isBidirectional = false,
  phCriticalLow  = 5.5,
  phWarningLow   = 6.0,
  phNormalLow    = 6.5,
  phNormalHigh   = 8.5,
  phWarningHigh  = 9.0,
  phCriticalHigh = 9.5,
}: ParameterSliderProps) {
  const hasGauge = isBidirectional || normalLimit !== undefined || warningLimit !== undefined;

  const pct = (v: number) =>
    `${Math.min(100, Math.max(0, ((v - min) / (max - min)) * 100)).toFixed(2)}%`;

  // Detect zone for current value (used to color the needle label)
  const getZoneColor = () => {
    if (isBidirectional) {
      if (value <= phCriticalLow  || value >= phCriticalHigh) return 'text-red-500';
      if (value <= phWarningLow   || value >= phWarningHigh)  return 'text-orange-400';
      if (value <= phNormalLow    || value >= phNormalHigh)   return 'text-yellow-400';
      return 'text-green-500';
    }
    if (criticalLimit !== undefined && value >= criticalLimit) return 'text-red-500';
    if (warningLimit  !== undefined && value >= warningLimit)  return 'text-orange-400';
    if (normalLimit   !== undefined && value > normalLimit)    return 'text-yellow-400';
    return 'text-green-500';
  };

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
            className={`bg-muted border border-border text-right w-24 px-2 py-1 rounded text-sm font-semibold focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all disabled:opacity-50 ${getZoneColor()}`}
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
      <div className="flex justify-between mt-1 text-[10px] text-muted-foreground">
        <span>{min}</span>
        <span>{max.toLocaleString()}</span>
      </div>

      {hasGauge && (
        <div className="mt-3">
          {/* Zone band */}
          <div className="relative h-2 rounded-full overflow-hidden bg-muted/50">
            {isBidirectional ? (
              <>
                {/* RED: 0 → phCriticalLow */}
                <div className="absolute top-0 left-0 h-full bg-red-500"
                  style={{ width: pct(phCriticalLow) }} />
                {/* YELLOW: phCriticalLow → phNormalLow */}
                <div className="absolute top-0 h-full bg-yellow-400"
                  style={{ left: pct(phCriticalLow), width: `calc(${pct(phNormalLow)} - ${pct(phCriticalLow)})` }} />
                {/* GREEN: phNormalLow → phNormalHigh */}
                <div className="absolute top-0 h-full bg-green-500"
                  style={{ left: pct(phNormalLow), width: `calc(${pct(phNormalHigh)} - ${pct(phNormalLow)})` }} />
                {/* YELLOW: phNormalHigh → phWarningHigh */}
                <div className="absolute top-0 h-full bg-yellow-400"
                  style={{ left: pct(phNormalHigh), width: `calc(${pct(phWarningHigh)} - ${pct(phNormalHigh)})` }} />
                {/* RED: phWarningHigh → 14 */}
                <div className="absolute top-0 h-full bg-red-500"
                  style={{ left: pct(phWarningHigh), right: '0%' }} />
              </>
            ) : (
              <>
                {/* GREEN: 0 → normalLimit */}
                {normalLimit !== undefined && (
                  <div className="absolute top-0 left-0 h-full bg-green-500"
                    style={{ width: pct(normalLimit) }} />
                )}
                {/* YELLOW: normalLimit → warningLimit */}
                {normalLimit !== undefined && warningLimit !== undefined && (
                  <div className="absolute top-0 h-full bg-yellow-400"
                    style={{ left: pct(normalLimit), width: `calc(${pct(warningLimit)} - ${pct(normalLimit)})` }} />
                )}
                {/* ORANGE: warningLimit → criticalLimit */}
                {warningLimit !== undefined && criticalLimit !== undefined && (
                  <div className="absolute top-0 h-full bg-orange-400"
                    style={{ left: pct(warningLimit), width: `calc(${pct(criticalLimit)} - ${pct(warningLimit)})` }} />
                )}
                {/* RED: criticalLimit → max */}
                {criticalLimit !== undefined && (
                  <div className="absolute top-0 h-full bg-red-500"
                    style={{ left: pct(criticalLimit), right: '0%' }} />
                )}
                {/* If only normalLimit+warningLimit (no criticalLimit): red from warningLimit */}
                {warningLimit !== undefined && criticalLimit === undefined && (
                  <div className="absolute top-0 h-full bg-red-500"
                    style={{ left: pct(warningLimit), right: '0%' }} />
                )}
              </>
            )}
            {/* Value needle */}
            <div
              className="absolute top-0 w-0.5 h-full bg-white/90 z-10 shadow-sm"
              style={{ left: pct(value) }}
            />
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-1.5 text-[10px] text-muted-foreground">
            {isBidirectional ? (
              <>
                <span className="flex items-center gap-1"><span className="inline-block w-2 h-2 rounded-full bg-green-500" />Safe: {phNormalLow}–{phNormalHigh} {unit}</span>
                <span className="flex items-center gap-1"><span className="inline-block w-2 h-2 rounded-full bg-yellow-400" />Warning: &lt;{phWarningLow} or &gt;{phWarningHigh}</span>
                <span className="flex items-center gap-1"><span className="inline-block w-2 h-2 rounded-full bg-red-500" />Critical: &lt;{phCriticalLow} or &gt;{phCriticalHigh}</span>
              </>
            ) : (
              <>
                {normalLimit   !== undefined && <span className="flex items-center gap-1"><span className="inline-block w-2 h-2 rounded-full bg-green-500" />Safe: ≤{normalLimit.toLocaleString()}</span>}
                {warningLimit  !== undefined && <span className="flex items-center gap-1"><span className="inline-block w-2 h-2 rounded-full bg-yellow-400" />Warning: &gt;{normalLimit?.toLocaleString()}</span>}
                {criticalLimit !== undefined && <span className="flex items-center gap-1"><span className="inline-block w-2 h-2 rounded-full bg-orange-400" />High: &gt;{warningLimit?.toLocaleString()}</span>}
                {criticalLimit !== undefined && <span className="flex items-center gap-1"><span className="inline-block w-2 h-2 rounded-full bg-red-500" />Critical: &gt;{criticalLimit.toLocaleString()}</span>}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
