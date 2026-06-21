# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a Next.js 16 (App Router) dashboard for industrial wastewater analysis. Authenticated users select an industry sub-category, adjust wastewater parameters via sliders, submit them to the Flask AI backend (`server/`), and view anomaly detection, violation flags, treatment remedies, and natural language recommendations. A second **Preventive Maintenance** tab fetches equipment rosters from the Flask backend and runs IsolationForest + Gemini analysis on equipment sensor readings (sound, vibration, temperature).

## Commands

### Setup
```bash
npm install
```

### Development
```bash
npm run dev
```

### Build & production
```bash
npm run build
npm start
```

### Lint
```bash
npm run lint
```

## Environment Variables

Create a `.env.local` (or edit `.env`) with:
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...
CLERK_SECRET_KEY=...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
```

`API_BASE_URL` in `components/dashboard/industryView.tsx` is hardcoded to `http://127.0.0.1:5000` for local development. Change to the Render URL for production.

## Architecture

### Routing (App Router)

```
/                          → redirect to /sign-in or /dashboard
/sign-in, /sign-up         → Clerk catch-all auth pages
/dashboard                 → main analysis view (industry selector + parameter controls)
/dashboard/overview/[...] → static educational overview (parameter guidelines, regulatory tables)
```

Auth middleware is in `proxy.ts` (acts as `middleware.ts`) — uses `clerkMiddleware` to protect all routes except `/sign-in`, `/sign-up`, and static assets.

### State Management

A single React Context (`contexts/DashboardContext.tsx`) holds all interactive state:
- `selectedSubCategory` — the currently active sub-category object (or `null` → shows `WelcomeScreen`)
- `parameters` — live slider values (defaults: bod=500, cod=1000, tss=300, tds=2000, ph=7)
- `handleParameterChange(key, value)` — updates a single parameter

### Key Components

| Component | Path | Role |
|---|---|---|
| `AppSidebar` | `components/dashboard/appSidebar.tsx` | Collapsible sidebar; lists all 17 industries × sub-categories |
| `WelcomeScreen` | `components/dashboard/welcomeScreen.tsx` | Shown when no sub-category selected |
| `IndustryView` | `components/dashboard/industryView.tsx` | Main panel; hosts both Qualitative and Preventive view modes |
| `ParameterCustomizer` | `components/dashboard/parameterCustomizer.tsx` | BOD/COD/TSS/TDS/pH/Oil sliders (Qualitative mode) |
| `PreventiveCustomizer` | `components/dashboard/preventiveCustomizer.tsx` | Equipment fleet grid + per-unit drill-down (Preventive mode) |
| `ParameterSlider` | `components/ui/ParameterSlider.tsx` | Slider with 4-zone compliance gauge; bidirectional mode for pH |
| `IndustryFlowDiagram` | `components/dashboard/industryFlowDiagram.tsx` | ReactFlow process diagram per sub-category |
| `ClientLayout` | `components/dashboard/clientLayout.tsx` | Wraps sidebar + navbar + footer |

### View Modes (IndustryView)

`IndustryView` has two tab modes toggled via a button group in the header:

#### Qualitative tab (`viewMode === "qualitative"`)
- BOD/COD/TSS/pH metric cards + ReactFlow process diagram
- `ParameterCustomizer` with dynamic slider bounds (`computeSliderBounds`: max = 3× typicalValue) and CPCB compliance gauges
- 5 correlation-rule warnings shown above the Analyze button
- On submit: `POST /analyze/with-insights` → AI Insights section renders:
  - Severity header banner (critical / high / medium / low) — uses opacity-based colors for dark-mode compatibility
  - Violations quick-view grid (CRITICAL / WARNING inline badges)
  - Key Findings + What You Should Do two-column grid
  - Treatment Remedies cards (one per violated parameter — chemical, dosage, process, expected outcome, cost band)
  - Before/After comparison collapsible table (user values vs industry typicals, delta %)
  - Diagnostic Indicators (anomaly score, violation count, model confidence, treatment complexity)
  - Pattern Classification card (blue-styled, explains ML pattern vs safety compliance)

#### Preventive tab (`viewMode === "preventive"`)
- 3 reference metric cards (ISO 10816 baseline: 75 dB, 2.5 mm/s, 45°C)
- `PreventiveCustomizer` — seeded from `GET /preventive/equipment/<industry_id>` roster
  - Equipment list shows industry-specific names (e.g. "Mash Transfer Pump 1" for molasses distillery)
  - Sliders per unit: sound (dB), vibration (mm/s), temperature (°C)
  - "Run Fleet Analysis" / "Analyze This Unit" calls `POST /preventive/analyze`
- Results section renders:
  - Fleet header banner (fleet_health + shutdown_risk) — opacity-based colors
  - 4 summary stat cards (Total Units, Anomalies, Critical, Warning)
  - Maintenance Action cards per Warning/Critical unit (issue, action, components chips, urgency badge, cost pill, downtime)
  - Unit Health Overview table (all units, sensor readings, health status)

Switching view mode or sub-category resets both `analysisData` and `preventiveData` states.

### Backend API Calls

#### Qualitative
```
POST /analyze/with-insights
Body: { sample: { Sample_ID, "BOD (mg/L)", "COD (mg/L)", "TSS (mg/L)", "TDS (mg/L)", "pH", "Oil & Grease (mg/L)" }, industry_id }
Response: { analysis: { anomaly_score, is_anomaly, predicted_class, class_confidence, violations[] }, insights: { summary, key_findings[], recommendations[], severity_level, parameter_treatments[] } }
```

#### Preventive — Roster fetch
```
GET /preventive/equipment/<industry_id>
Response: { industry_id, equipment: [{ id, name, type, location, default_parameters: { sound, vibration, temperature } }] }
```

#### Preventive — Analysis
```
POST /preventive/analyze
Body: { industry_id, mode: "collective"|"individual", equipment: [{ id, name, type, location, parameters: { sound, vibration, temperature } }] }
Response: { fleet_health, anomaly_count, critical_count, warning_count, equipment_results[], insights: { fleet_summary, critical_units[], maintenance_actions[], overall_recommendation, shutdown_risk } }
```

### Theming

- Tailwind CSS v4 with CSS-variable-based colors
- Dark/light toggle via `next-themes`; **default is `"dark"`**
- All severity/health status backgrounds use **opacity-based colors** (`bg-red-500/10`, `bg-yellow-500/10`, etc.) so they work in both dark and light mode. Never use fixed Tailwind light backgrounds (`bg-red-50`, `bg-yellow-50`) for status badges — they make text invisible in dark mode.
- Fonts: **Playfair Display** (headings) + **DM Sans** (body)

### Types (`types/index.ts`)

Key interfaces:
- `ParameterTreatment` — `{ parameter, current_value, issue, chemical, dosage, process, expected_outcome, cost_band }`
- `EquipmentNode` — `{ id, name, type: "Pump"|"Blower", location, status, parameters: { sound, vibration, temperature } }`
- `PreventiveParameters`, `PreventiveAnalysisResult`, `HealthStatus`

### Industry & Flow Diagram Data

- **`data/industries.ts`** — All 17 industries × 60+ sub-categories with `typicalValues`, `challenges`, `severityLevel`, `treatmentMethods`
- **`data/industryPaths.ts`** — Maps sub-category IDs to CSV paths for file download
- **`data/flowDiagramsData.ts`** — ReactFlow node/edge specs keyed by sub-category ID
- **`data/helpers/flowHelpers.ts`** — Builder functions for ReactFlow layouts

When adding a new sub-category: update all four above + `config/mappings.py` on the Flask side.

## Deployment

Deployed on Vercel. Flask backend separately on Render at `https://heepl-ai-agents.onrender.com`.
