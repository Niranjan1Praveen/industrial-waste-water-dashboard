"use client";

import Reveal from "@/components/reveal";
import {
  BarChart3,
  Factory,
  Droplets,
  FileDown,
  Settings,
  Shield,
  Activity,
  Zap,
  Cpu,
  Gauge,
  Brain,
} from "lucide-react";

export default function WelcomeScreen() {
  const industriesCount = 17;
  const subCategoriesCount = 60;
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
            Comprehensive guide to industrial wastewater parameters, treatment
            technologies, regulatory compliance standards, and equipment health
            monitoring across 17+ industry sectors
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ── SECTION 1: Water Quality Parameters ── */}
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
                  Biochemical Oxygen Demand — measures organic pollution load
                </p>
                <p className="text-xs text-primary mt-2">Typical: 100–50,000 mg/L</p>
              </div>
              <div className="border border-border rounded-lg p-4 bg-card">
                <p className="text-sm font-semibold text-foreground">COD</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Chemical Oxygen Demand — total oxidizable compounds
                </p>
                <p className="text-xs text-primary mt-2">Typical: 200–150,000 mg/L</p>
              </div>
              <div className="border border-border rounded-lg p-4 bg-card">
                <p className="text-sm font-semibold text-foreground">TSS</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Total Suspended Solids — particles in wastewater
                </p>
                <p className="text-xs text-primary mt-2">Typical: 50–10,000 mg/L</p>
              </div>
              <div className="border border-border rounded-lg p-4 bg-card">
                <p className="text-sm font-semibold text-foreground">TDS</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Total Dissolved Solids — dissolved minerals & salts
                </p>
                <p className="text-xs text-primary mt-2">Typical: 500–50,000 mg/L</p>
              </div>
              <div className="border border-border rounded-lg p-4 bg-card">
                <p className="text-sm font-semibold text-foreground">pH</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Acidity / Alkalinity scale (0–14)
                </p>
                <p className="text-xs text-primary mt-2">Safe discharge: 6.5–8.5</p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ── SECTION 2: Instruments ── */}
        <Reveal delay={420}>
          <div className="mb-8">
            <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5 text-primary" />
              Common Instruments in Wastewater Treatment
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="border border-border rounded-lg p-4 bg-card">
                <p className="text-sm font-semibold text-foreground">Dissolved Oxygen Meter</p>
                <p className="text-xs text-muted-foreground mt-1">Measures oxygen levels in aeration tanks</p>
              </div>
              <div className="border border-border rounded-lg p-4 bg-card">
                <p className="text-sm font-semibold text-foreground">Turbidity Meter</p>
                <p className="text-xs text-muted-foreground mt-1">Measures water clarity & suspended particles</p>
              </div>
              <div className="border border-border rounded-lg p-4 bg-card">
                <p className="text-sm font-semibold text-foreground">pH Controller</p>
                <p className="text-xs text-muted-foreground mt-1">Automated acid/alkali dosing system</p>
              </div>
              <div className="border border-border rounded-lg p-4 bg-card">
                <p className="text-sm font-semibold text-foreground">Conductivity Meter</p>
                <p className="text-xs text-muted-foreground mt-1">Measures dissolved ionic content</p>
              </div>
              <div className="border border-border rounded-lg p-4 bg-card">
                <p className="text-sm font-semibold text-foreground">UV-VIS Spectrophotometer</p>
                <p className="text-xs text-muted-foreground mt-1">COD, nitrate, phosphate analysis</p>
              </div>
              <div className="border border-border rounded-lg p-4 bg-card">
                <p className="text-sm font-semibold text-foreground">Gas Chromatograph</p>
                <p className="text-xs text-muted-foreground mt-1">Volatile organic compound detection</p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ── SECTION 3: Parameter Guidelines ── */}
        <Reveal delay={360}>
          <div className="mb-8">
            <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              Parameter Guidelines by Industry Standard
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="border border-border rounded-lg p-4 bg-card">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="text-sm font-semibold text-foreground">Biochemical Oxygen Demand (BOD)</p>
                    <p className="text-xs text-muted-foreground">Organic pollution indicator</p>
                  </div>
                  <span className="text-xl font-bold text-primary">mg/L</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs"><span>Low</span><span>Moderate</span><span>High</span><span>Severe</span></div>
                  <div className="h-2 bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 rounded-full"></div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-1"><span>&lt;30</span><span>100–500</span><span>500–2000</span><span>&gt;5000</span></div>
                </div>
                <p className="text-xs text-muted-foreground mt-3">⚠️ Discharge limit: &lt;30 mg/L | Severe: Distillery & Molasses (45,000 mg/L)</p>
              </div>

              <div className="border border-border rounded-lg p-4 bg-card">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="text-sm font-semibold text-foreground">Chemical Oxygen Demand (COD)</p>
                    <p className="text-xs text-muted-foreground">Total oxidizable compounds</p>
                  </div>
                  <span className="text-xl font-bold text-primary">mg/L</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs"><span>Low</span><span>Moderate</span><span>High</span><span>Extreme</span></div>
                  <div className="h-2 bg-gradient-to-r from-green-500 via-yellow-500 via-orange-500 to-red-700 rounded-full"></div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-1"><span>&lt;100</span><span>250–1000</span><span>1000–10000</span><span>&gt;50000</span></div>
                </div>
                <p className="text-xs text-muted-foreground mt-3">⚠️ Discharge limit: &lt;250 mg/L | Extreme: Distillery (100,000+ mg/L)</p>
              </div>

              <div className="border border-border rounded-lg p-4 bg-card">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="text-sm font-semibold text-foreground">Total Suspended Solids (TSS)</p>
                    <p className="text-xs text-muted-foreground">Particulate matter</p>
                  </div>
                  <span className="text-xl font-bold text-primary">mg/L</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs"><span>Clear</span><span>Cloudy</span><span>Turbid</span><span>Sludgy</span></div>
                  <div className="h-2 bg-gradient-to-r from-green-500 via-yellow-500 to-orange-600 rounded-full"></div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-1"><span>&lt;50</span><span>100–300</span><span>500–2000</span><span>&gt;5000</span></div>
                </div>
                <p className="text-xs text-muted-foreground mt-3">⚠️ Discharge limit: &lt;100 mg/L | Severe: Tannery (5000+ mg/L)</p>
              </div>

              <div className="border border-border rounded-lg p-4 bg-card">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="text-sm font-semibold text-foreground">Total Dissolved Solids (TDS)</p>
                    <p className="text-xs text-muted-foreground">Dissolved salts & minerals</p>
                  </div>
                  <span className="text-xl font-bold text-primary">mg/L</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs"><span>Fresh</span><span>Brackish</span><span>Saline</span><span>Brine</span></div>
                  <div className="h-2 bg-gradient-to-r from-blue-500 via-green-500 to-purple-700 rounded-full"></div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-1"><span>&lt;500</span><span>1000–3000</span><span>5000–15000</span><span>&gt;30000</span></div>
                </div>
                <p className="text-xs text-muted-foreground mt-3">⚠️ Discharge limit: &lt;2100 mg/L | Severe: Oil Refinery (30,000+ mg/L)</p>
              </div>

              <div className="border border-border rounded-lg p-4 bg-card">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="text-sm font-semibold text-foreground">pH Scale</p>
                    <p className="text-xs text-muted-foreground">Acidity / Alkalinity</p>
                  </div>
                  <span className="text-xl font-bold text-primary">0–14</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs"><span>Acidic</span><span>Neutral</span><span>Alkaline</span></div>
                  <div className="h-2 bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-700 rounded-full"></div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-1"><span>0–6</span><span>6.5–8.5</span><span>9–14</span></div>
                </div>
                <p className="text-xs text-muted-foreground mt-3">⚠️ Safe discharge: 6.5–8.5 | Extreme: Pickling (pH 2.5) | Textile (pH 10.5)</p>
              </div>

              <div className="border border-border rounded-lg p-4 bg-card">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="text-sm font-semibold text-foreground">Temperature</p>
                    <p className="text-xs text-muted-foreground">Thermal impact on aquatic life</p>
                  </div>
                  <span className="text-xl font-bold text-primary">°C</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs"><span>Cold</span><span>Ambient</span><span>Warm</span><span>Hot</span></div>
                  <div className="h-2 bg-gradient-to-r from-blue-500 via-green-500 to-red-500 rounded-full"></div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-1"><span>&lt;20</span><span>20–30</span><span>35–45</span><span>&gt;50</span></div>
                </div>
                <p className="text-xs text-muted-foreground mt-3">⚠️ Cooling tower blowdown often exceeds ambient temperature by 10–15°C</p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ── SECTION A: How the Qualitative Analysis Tab Works ── */}
        <Reveal delay={420}>
          <div className="mb-8">
            <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <Brain className="w-5 h-5 text-primary" />
              How the Qualitative Analysis Tab Works
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="border border-border rounded-lg p-4 bg-card">
                <p className="text-sm font-semibold text-foreground mb-2">Anomaly Detection</p>
                <p className="text-xs text-muted-foreground">
                  An <span className="text-foreground font-medium">IsolationForest</span> model is trained on historical effluent data across all 8 parameters (BOD, COD, TSS, TDS, pH, Oil & Grease, Ammonia, Temperature). It assigns an anomaly score to every submitted sample.
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Score <span className="text-red-500 font-medium">&lt; 0</span> → anomalous effluent pattern detected. The more negative the score, the further the sample deviates from typical industry behaviour.
                </p>
              </div>
              <div className="border border-border rounded-lg p-4 bg-card">
                <p className="text-sm font-semibold text-foreground mb-2">Wastewater Classification</p>
                <p className="text-xs text-muted-foreground">
                  A <span className="text-foreground font-medium">Random Forest Classifier</span> maps the parameter profile to a known pollution pattern — e.g. "High Organic Load", "Heavy Metal Contamination", or "Saline Effluent".
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Trained on labelled industry CSV data across 60+ sub-categories. Outputs a predicted class with a confidence score, helping operators quickly identify the effluent type even for ambiguous samples.
                </p>
              </div>
              <div className="border border-border rounded-lg p-4 bg-card">
                <p className="text-sm font-semibold text-foreground mb-2">Gemini AI Insights</p>
                <p className="text-xs text-muted-foreground">
                  Violations (parameters outside CPCB/EPA limits) are passed to <span className="text-foreground font-medium">Google Gemini</span>, which returns structured treatment recommendations for each violation:
                </p>
                <ul className="text-xs text-muted-foreground mt-2 space-y-1 list-disc list-inside">
                  <li>Specific chemical & dosage</li>
                  <li>Treatment process steps</li>
                  <li>Expected outcome</li>
                  <li>Cost band estimate</li>
                </ul>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ── SECTION B: Preventive Equipment Monitoring ── */}
        <Reveal delay={480}>
          <div className="mb-8">
            <h3 className="text-lg font-bold text-foreground mb-1 flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              Preventive Equipment Health Monitoring
            </h3>
            <p className="text-xs text-muted-foreground mb-4">
              Each of the 17 supported industries has a pre-loaded equipment roster (pumps and blowers with realistic names and locations). Fleet analysis runs across all units simultaneously using ISO 10816 standards.
            </p>

            {/* B1 — Sensor parameter cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="border border-border rounded-lg p-4 bg-card">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-4 h-4 text-primary" />
                  <p className="text-sm font-semibold text-foreground">Sound</p>
                  <span className="text-xs text-primary ml-auto">dB</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Acoustic emissions captured from bearings, impellers, and motor housings. Elevated noise indicates mechanical wear, cavitation, or imbalance.
                </p>
                <div className="mt-3 space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Quiet</span><span>Elevated</span><span>Critical</span>
                  </div>
                  <div className="h-2 bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 rounded-full"></div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Pump &lt;80</span><span>80–90</span><span>&gt;100</span>
                  </div>
                </div>
              </div>

              <div className="border border-border rounded-lg p-4 bg-card">
                <div className="flex items-center gap-2 mb-2">
                  <Gauge className="w-4 h-4 text-primary" />
                  <p className="text-sm font-semibold text-foreground">Vibration</p>
                  <span className="text-xs text-primary ml-auto">mm/s RMS</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Mechanical vibration velocity (ISO 10816 standard). Caused by misalignment, imbalance, bearing defects, or loose mountings. Critical predictor of imminent failure.
                </p>
                <div className="mt-3 space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Smooth</span><span>Rough</span><span>Severe</span>
                  </div>
                  <div className="h-2 bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 rounded-full"></div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Pump &lt;2.8</span><span>2.8–4.5</span><span>&gt;7.1</span>
                  </div>
                </div>
              </div>

              <div className="border border-border rounded-lg p-4 bg-card">
                <div className="flex items-center gap-2 mb-2">
                  <Cpu className="w-4 h-4 text-primary" />
                  <p className="text-sm font-semibold text-foreground">Temperature</p>
                  <span className="text-xs text-primary ml-auto">°C</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Casing and bearing surface temperature. Overheating signals lubrication failure, overload, or coolant blockage. Monitored continuously for early intervention.
                </p>
                <div className="mt-3 space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Normal</span><span>Warm</span><span>Hot</span>
                  </div>
                  <div className="h-2 bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 rounded-full"></div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Pump &lt;60</span><span>60–75</span><span>&gt;90</span>
                  </div>
                </div>
              </div>
            </div>

            {/* B2 + B3 — ISO threshold table + health score sidebar */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* ISO 10816 threshold table */}
              <div className="border border-border rounded-lg p-4 bg-card lg:col-span-2">
                <h4 className="text-sm font-semibold text-foreground mb-3">ISO 10816 Vibration & Sensor Thresholds</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-muted">
                      <tr>
                        <th className="px-3 py-2 text-left text-xs font-medium text-foreground">Parameter</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-foreground">Equipment</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-green-500">Normal</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-yellow-500">Warning</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-red-500">Critical</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      <tr className="hover:bg-muted/50">
                        <td className="px-3 py-2 text-xs font-medium text-foreground">Sound (dB)</td>
                        <td className="px-3 py-2 text-xs text-muted-foreground">Pump</td>
                        <td className="px-3 py-2 text-xs text-green-500">&lt;80</td>
                        <td className="px-3 py-2 text-xs text-yellow-500">80–90</td>
                        <td className="px-3 py-2 text-xs text-red-500">&gt;100</td>
                      </tr>
                      <tr className="hover:bg-muted/50">
                        <td className="px-3 py-2 text-xs font-medium text-foreground">Sound (dB)</td>
                        <td className="px-3 py-2 text-xs text-muted-foreground">Blower</td>
                        <td className="px-3 py-2 text-xs text-green-500">&lt;88</td>
                        <td className="px-3 py-2 text-xs text-yellow-500">88–95</td>
                        <td className="px-3 py-2 text-xs text-red-500">&gt;105</td>
                      </tr>
                      <tr className="hover:bg-muted/50">
                        <td className="px-3 py-2 text-xs font-medium text-foreground">Vibration (mm/s)</td>
                        <td className="px-3 py-2 text-xs text-muted-foreground">Pump</td>
                        <td className="px-3 py-2 text-xs text-green-500">&lt;2.8</td>
                        <td className="px-3 py-2 text-xs text-yellow-500">2.8–4.5</td>
                        <td className="px-3 py-2 text-xs text-red-500">&gt;7.1</td>
                      </tr>
                      <tr className="hover:bg-muted/50">
                        <td className="px-3 py-2 text-xs font-medium text-foreground">Vibration (mm/s)</td>
                        <td className="px-3 py-2 text-xs text-muted-foreground">Blower</td>
                        <td className="px-3 py-2 text-xs text-green-500">&lt;3.5</td>
                        <td className="px-3 py-2 text-xs text-yellow-500">3.5–6.3</td>
                        <td className="px-3 py-2 text-xs text-red-500">&gt;10.0</td>
                      </tr>
                      <tr className="hover:bg-muted/50">
                        <td className="px-3 py-2 text-xs font-medium text-foreground">Temperature (°C)</td>
                        <td className="px-3 py-2 text-xs text-muted-foreground">Pump</td>
                        <td className="px-3 py-2 text-xs text-green-500">&lt;60</td>
                        <td className="px-3 py-2 text-xs text-yellow-500">60–75</td>
                        <td className="px-3 py-2 text-xs text-red-500">&gt;90</td>
                      </tr>
                      <tr className="hover:bg-muted/50">
                        <td className="px-3 py-2 text-xs font-medium text-foreground">Temperature (°C)</td>
                        <td className="px-3 py-2 text-xs text-muted-foreground">Blower</td>
                        <td className="px-3 py-2 text-xs text-green-500">&lt;65</td>
                        <td className="px-3 py-2 text-xs text-yellow-500">65–80</td>
                        <td className="px-3 py-2 text-xs text-red-500">&gt;100</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-muted-foreground mt-3 text-center">
                  Thresholds follow ISO 10816 vibration severity grades for rotating machinery
                </p>
              </div>

              {/* B3 — How the health score works */}
              <div className="border border-border rounded-lg p-4 bg-card">
                <h4 className="text-sm font-semibold text-foreground mb-3">How the Health Score Works</h4>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-medium text-foreground">ML Model</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      IsolationForest trained on 2,000 synthetic sensor readings — 70% Healthy, 20% Warning, 10% Critical — for both Pump and Blower types.
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-foreground">Anomaly Score</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Score <span className="text-green-500 font-medium">≥ 0</span> → Healthy.{" "}
                      Score <span className="text-red-500 font-medium">&lt; 0</span> → Anomalous. The more negative the score, the more severe the deviation.
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-foreground">Gemini Prescriptions</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      For each Warning or Critical unit, Gemini AI generates a structured maintenance action:
                    </p>
                    <ul className="text-xs text-muted-foreground mt-1 space-y-0.5 list-disc list-inside">
                      <li>Root cause & issue description</li>
                      <li>Recommended corrective action</li>
                      <li>Components to inspect</li>
                      <li>Urgency level & estimated downtime</li>
                      <li>Cost band (Low / Medium / High)</li>
                    </ul>
                  </div>
                  <div className="pt-2 border-t border-border">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Fleet Coverage</span>
                      <span className="font-bold text-foreground">17 Industries</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full mt-1 overflow-hidden">
                      <div className="w-full h-full bg-primary rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ── SECTION 4: Regulatory Compliance ── */}
        <Reveal delay={480}>
          <div className="mb-8">
            <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              Regulatory Compliance Standards
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="border border-border rounded-lg p-4 bg-card lg:col-span-2">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-muted">
                      <tr>
                        <th className="px-3 py-2 text-left text-xs font-medium text-foreground">Parameter</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-foreground">CPCB (India)</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-foreground">EPA (US)</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-foreground">EU Standards</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-foreground">Industry Average</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      <tr className="hover:bg-muted/50">
                        <td className="px-3 py-2 text-xs font-medium text-foreground">BOD (mg/L)</td>
                        <td className="px-3 py-2 text-xs text-muted-foreground">&lt;30</td>
                        <td className="px-3 py-2 text-xs text-muted-foreground">&lt;30</td>
                        <td className="px-3 py-2 text-xs text-muted-foreground">&lt;25</td>
                        <td className="px-3 py-2 text-xs text-red-500 font-medium">250–45,000</td>
                      </tr>
                      <tr className="hover:bg-muted/50">
                        <td className="px-3 py-2 text-xs font-medium text-foreground">COD (mg/L)</td>
                        <td className="px-3 py-2 text-xs text-muted-foreground">&lt;250</td>
                        <td className="px-3 py-2 text-xs text-muted-foreground">&lt;250</td>
                        <td className="px-3 py-2 text-xs text-muted-foreground">&lt;200</td>
                        <td className="px-3 py-2 text-xs text-red-500 font-medium">1,500–100,000</td>
                      </tr>
                      <tr className="hover:bg-muted/50">
                        <td className="px-3 py-2 text-xs font-medium text-foreground">TSS (mg/L)</td>
                        <td className="px-3 py-2 text-xs text-muted-foreground">&lt;100</td>
                        <td className="px-3 py-2 text-xs text-muted-foreground">&lt;30</td>
                        <td className="px-3 py-2 text-xs text-muted-foreground">&lt;35</td>
                        <td className="px-3 py-2 text-xs text-red-500 font-medium">500–5,000</td>
                      </tr>
                      <tr className="hover:bg-muted/50">
                        <td className="px-3 py-2 text-xs font-medium text-foreground">pH Range</td>
                        <td className="px-3 py-2 text-xs text-muted-foreground">6.5–8.5</td>
                        <td className="px-3 py-2 text-xs text-muted-foreground">6.0–9.0</td>
                        <td className="px-3 py-2 text-xs text-muted-foreground">6.5–8.5</td>
                        <td className="px-3 py-2 text-xs text-yellow-500">2.5–11.5</td>
                      </tr>
                      <tr className="hover:bg-muted/50">
                        <td className="px-3 py-2 text-xs font-medium text-foreground">TDS (mg/L)</td>
                        <td className="px-3 py-2 text-xs text-muted-foreground">&lt;2100</td>
                        <td className="px-3 py-2 text-xs text-muted-foreground">—</td>
                        <td className="px-3 py-2 text-xs text-muted-foreground">—</td>
                        <td className="px-3 py-2 text-xs text-red-500">3,000–30,000</td>
                      </tr>
                      <tr className="hover:bg-muted/50">
                        <td className="px-3 py-2 text-xs font-medium text-foreground">Oil & Grease</td>
                        <td className="px-3 py-2 text-xs text-muted-foreground">&lt;10</td>
                        <td className="px-3 py-2 text-xs text-muted-foreground">&lt;10</td>
                        <td className="px-3 py-2 text-xs text-muted-foreground">&lt;10</td>
                        <td className="px-3 py-2 text-xs text-red-500">100–2,000</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-muted-foreground mt-3 text-center">
                  Values represent maximum permissible limits | Industry average shows typical untreated effluent ranges
                </p>
              </div>

              <div className="border border-border rounded-lg p-4 bg-card">
                <h4 className="text-sm font-semibold text-foreground mb-3">Industry Compliance Status</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-foreground">Distillery</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-red-200 rounded-full overflow-hidden">
                        <div className="w-1/4 h-full bg-red-500 rounded-full"></div>
                      </div>
                      <span className="text-xs text-red-500">Critical</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-foreground">Textile</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-yellow-200 rounded-full overflow-hidden">
                        <div className="w-1/2 h-full bg-yellow-500 rounded-full"></div>
                      </div>
                      <span className="text-xs text-yellow-500">High Risk</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-foreground">Tannery</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-red-200 rounded-full overflow-hidden">
                        <div className="w-1/3 h-full bg-red-500 rounded-full"></div>
                      </div>
                      <span className="text-xs text-red-500">Critical</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-foreground">Pharmaceutical</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-yellow-200 rounded-full overflow-hidden">
                        <div className="w-2/3 h-full bg-yellow-500 rounded-full"></div>
                      </div>
                      <span className="text-xs text-yellow-500">Moderate</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-foreground">Dairy</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-green-200 rounded-full overflow-hidden">
                        <div className="w-4/5 h-full bg-green-500 rounded-full"></div>
                      </div>
                      <span className="text-xs text-green-500">Improving</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-border">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Overall Compliance Rate</span>
                    <span className="font-bold text-foreground">42%</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full mt-1 overflow-hidden">
                    <div className="w-[42%] h-full bg-primary rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

      </div>
    </div>
  );
}
