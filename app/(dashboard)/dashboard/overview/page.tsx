"use client";

import Reveal from "@/components/reveal";
import {
  BarChart3,
  Factory,
  Droplets,
  FileDown,
  Settings,
} from "lucide-react";

export default function WelcomeScreen() {

  const industriesCount = 17;
  const subCategoriesCount = 50;
  const dataPointsCount = 500;

  return (
    <div className="min-h-screen bg-background section">
      {/* Dashboard Header */}
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1
            className="font-playfair font-black leading-[0.95] tracking-[-0.03em] text-foreground mb-3"
            style={{ fontSize: "clamp(42px, 6vw, 30px)" }}
          >
            Overview
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Industrial wastewater treatment & parameter optimization
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Water Quality Parameters Explained */}
        <Reveal delay={360}>
          <div className="mb-8">
            <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              Understanding Water Quality Parameters
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="border border-border rounded-lg p-4 bg-card">
                <p className="text-sm font-semibold text-foreground">BOD</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Biochemical Oxygen Demand - measures organic pollution load
                </p>
                <p className="text-xs text-primary mt-2">
                  Typical range: 100-50,000 mg/L
                </p>
              </div>
              <div className="border border-border rounded-lg p-4 bg-card">
                <p className="text-sm font-semibold text-foreground">COD</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Chemical Oxygen Demand - total oxidizable compounds
                </p>
                <p className="text-xs text-primary mt-2">
                  Typical range: 200-150,000 mg/L
                </p>
              </div>
              <div className="border border-border rounded-lg p-4 bg-card">
                <p className="text-sm font-semibold text-foreground">TSS</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Total Suspended Solids - particles in wastewater
                </p>
                <p className="text-xs text-primary mt-2">
                  Typical range: 50-10,000 mg/L
                </p>
              </div>
              <div className="border border-border rounded-lg p-4 bg-card">
                <p className="text-sm font-semibold text-foreground">TDS</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Total Dissolved Solids - dissolved minerals & salts
                </p>
                <p className="text-xs text-primary mt-2">
                  Typical range: 500-50,000 mg/L
                </p>
              </div>
              <div className="border border-border rounded-lg p-4 bg-card">
                <p className="text-sm font-semibold text-foreground">pH</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Acidity/Alkalinity scale (0-14)
                </p>
                <p className="text-xs text-primary mt-2">
                  Discharge range: 6.5-8.5
                </p>
              </div>
            </div>
          </div>
        </Reveal>
        {/* Industrial Instruments & Equipment */}
        <Reveal delay={420}>
          <div className="mb-8">
            <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5 text-primary" />
              Common Instruments in Wastewater Treatment
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="border border-border rounded-lg p-4 bg-card">
                <p className="text-sm font-semibold text-foreground">
                  Dissolved Oxygen Meter
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Measures oxygen levels in aeration tanks
                </p>
              </div>
              <div className="border border-border rounded-lg p-4 bg-card">
                <p className="text-sm font-semibold text-foreground">
                  Turbidity Meter
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Measures water clarity & suspended particles
                </p>
              </div>
              <div className="border border-border rounded-lg p-4 bg-card">
                <p className="text-sm font-semibold text-foreground">
                  pH Controller
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Automated acid/alkali dosing system
                </p>
              </div>
              <div className="border border-border rounded-lg p-4 bg-card">
                <p className="text-sm font-semibold text-foreground">
                  Conductivity Meter
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Measures dissolved ionic content
                </p>
              </div>
              <div className="border border-border rounded-lg p-4 bg-card">
                <p className="text-sm font-semibold text-foreground">
                  UV-VIS Spectrophotometer
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  COD, nitrate, phosphate analysis
                </p>
              </div>
              <div className="border border-border rounded-lg p-4 bg-card">
                <p className="text-sm font-semibold text-foreground">
                  Gas Chromatograph
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Volatile organic compound detection
                </p>
              </div>
            </div>
          </div>
        </Reveal>
        {/* Industrial Parameter Ranges Explained */}
        <Reveal delay={360}>
          <div className="mb-8">
            <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              Parameter Guidelines by Industry Standard
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* BOD Range */}
              <div className="border border-border rounded-lg p-4 bg-card">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      Biochemical Oxygen Demand (BOD)
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Organic pollution indicator
                    </p>
                  </div>
                  <span className="text-xl font-bold text-primary">mg/L</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span>Low</span>
                    <span>Moderate</span>
                    <span>High</span>
                    <span>Severe</span>
                  </div>
                  <div className="h-2 bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 rounded-full"></div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>&lt;30</span>
                    <span>100-500</span>
                    <span>500-2000</span>
                    <span>&gt;5000</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  ⚠️ Discharge limit: &lt;30 mg/L | Severe: Distillery &
                  Molasses (45,000 mg/L)
                </p>
              </div>

              {/* COD Range */}
              <div className="border border-border rounded-lg p-4 bg-card">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      Chemical Oxygen Demand (COD)
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Total oxidizable compounds
                    </p>
                  </div>
                  <span className="text-xl font-bold text-primary">mg/L</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span>Low</span>
                    <span>Moderate</span>
                    <span>High</span>
                    <span>Extreme</span>
                  </div>
                  <div className="h-2 bg-gradient-to-r from-green-500 via-yellow-500 via-orange-500 to-red-700 rounded-full"></div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>&lt;100</span>
                    <span>250-1000</span>
                    <span>1000-10000</span>
                    <span>&gt;50000</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  ⚠️ Discharge limit: &lt;250 mg/L | Extreme: Distillery
                  (100,000+ mg/L)
                </p>
              </div>

              {/* TSS Range */}
              <div className="border border-border rounded-lg p-4 bg-card">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      Total Suspended Solids (TSS)
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Particulate matter
                    </p>
                  </div>
                  <span className="text-xl font-bold text-primary">mg/L</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span>Clear</span>
                    <span>Cloudy</span>
                    <span>Turbid</span>
                    <span>Sludgy</span>
                  </div>
                  <div className="h-2 bg-gradient-to-r from-green-500 via-yellow-500 to-orange-600 rounded-full"></div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>&lt;50</span>
                    <span>100-300</span>
                    <span>500-2000</span>
                    <span>&gt;5000</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  ⚠️ Discharge limit: &lt;100 mg/L | Severe: Tannery (5000+
                  mg/L)
                </p>
              </div>

              {/* TDS Range */}
              <div className="border border-border rounded-lg p-4 bg-card">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      Total Dissolved Solids (TDS)
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Dissolved salts & minerals
                    </p>
                  </div>
                  <span className="text-xl font-bold text-primary">mg/L</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span>Fresh</span>
                    <span>Brackish</span>
                    <span>Saline</span>
                    <span>Brine</span>
                  </div>
                  <div className="h-2 bg-gradient-to-r from-blue-500 via-green-500 to-purple-700 rounded-full"></div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>&lt;500</span>
                    <span>1000-3000</span>
                    <span>5000-15000</span>
                    <span>&gt;30000</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  ⚠️ Discharge limit: &lt;2100 mg/L | Severe: Oil Refinery
                  (30,000+ mg/L)
                </p>
              </div>

              {/* pH Range */}
              <div className="border border-border rounded-lg p-4 bg-card">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      pH Scale
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Acidity / Alkalinity
                    </p>
                  </div>
                  <span className="text-xl font-bold text-primary">0-14</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span>Acidic</span>
                    <span>Neutral</span>
                    <span>Alkaline</span>
                  </div>
                  <div className="h-2 bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-700 rounded-full"></div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>0-6</span>
                    <span>6.5-8.5</span>
                    <span>9-14</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  ⚠️ Safe discharge: 6.5-8.5 | Extreme: Pickling (pH 2.5) |
                  Textile (pH 10.5)
                </p>
              </div>

              {/* Temperature Range */}
              <div className="border border-border rounded-lg p-4 bg-card">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      Temperature
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Thermal impact on aquatic life
                    </p>
                  </div>
                  <span className="text-xl font-bold text-primary">°C</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span>Cold</span>
                    <span>Ambient</span>
                    <span>Warm</span>
                    <span>Hot</span>
                  </div>
                  <div className="h-2 bg-gradient-to-r from-blue-500 via-green-500 to-red-500 rounded-full"></div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>&lt;20</span>
                    <span>20-30</span>
                    <span>35-45</span>
                    <span>&gt;50</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  ⚠️ Cooling tower blowdown often exceeds ambient temperature by
                  10-15°C
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
