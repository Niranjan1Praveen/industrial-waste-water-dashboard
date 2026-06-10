import { FlowDiagramData } from "@/types";
import { createEdges } from "../helpers/flowHelpers";

export const electroplatingFlows: Record<string, FlowDiagramData> = {
    // Electroplating Operations - Ultra Detailed
    "electroplating-ops": {
        nodes: [
            { id: '1', position: { x: 250, y: 30 }, data: { label: 'Electroplating Effluent', description: 'Cyanide: 50-200 mg/L | Cr⁶⁺: 20-100 mg/L | Ni²⁺: 30-150 mg/L | Zn²⁺: 50-200 mg/L | Cu²⁺: 20-80 mg/L | pH: 2-12 (batch dependent) | TDS: 5,000-15,000 mg/L' }, type: 'input' },
            { id: '2', position: { x: 250, y: 110 }, data: { label: 'Segregated Collection Tanks', description: 'Cyanide-bearing waste | Chromium waste | Acid/Alkali waste | Separate storage prevents toxic gas (HCN) formation | HRT: 8-12 hours' } },
            { id: '3', position: { x: 250, y: 190 }, data: { label: 'Equalization Tank', description: 'Flow: 5-50 m³/day | HRT: 12-24 hours | Uniform mixing of segregated streams | pH adjustment to 8-9 (interim) | Tanks: PP/FRP lined' } },
            { id: '4', position: { x: 250, y: 270 }, data: { label: 'Cyanide Destruction - Alkaline Chlorination', description: 'Stage 1 (CN⁻ → CNO⁻): pH 10.5-11, ORP: 300-350 mV, NaOCl: 8-10 kg/kg CN⁻, Temp: 25-40°C | Stage 2 (CNO⁻ → N₂+CO₂): pH 7.5-8.5, ORP: 600-650 mV, Reaction Time: 30-60 min | Residual CN⁻: <0.1 mg/L' } },
            { id: '5', position: { x: 250, y: 350 }, data: { label: 'Hexavalent Chromium Reduction', description: 'Cr⁶⁺ + 3e⁻ → Cr³⁺ | Reducing Agents: SO₂ (2.5-3 kg/kg Cr⁶⁺) or NaHSO₃ (4-5 kg/kg) or FeSO₄ (15-20 kg/kg) | pH: 2.5-3.0 (H₂SO₄) | ORP: 250-300 mV | Reaction Time: 15-30 min | Residual Cr⁶⁺: <0.05 mg/L' } },
            { id: '6', position: { x: 250, y: 430 }, data: { label: 'Heavy Metal Precipitation', description: 'M⁺ + OH⁻ → M(OH)₂↓ | pH: 8.5-9.5 (NaOH/Caustic) | Lime: 2-5 kg/m³ | Retention Time: 20-30 min | Metal Removal: 98-99.5% | Individual pH optima: Ni (9.0-9.5), Zn (8.5-9.0), Cu (8.0-8.5)' } },
            { id: '7', position: { x: 250, y: 510 }, data: { label: 'Coagulation & Flocculation', description: 'Coagulants: Alum (50-150 mg/L) or FeCl₃ (30-100 mg/L) | Flocculant: Anionic Polymer (1-5 mg/L) | Flash Mixer: G=300-500 s⁻¹ (1-2 min) | Flocculator: G=20-80 s⁻¹ (15-20 min) | Floc Size: 1-5 mm' } },
            { id: '8', position: { x: 250, y: 590 }, data: { label: 'Lamella / Tube Settler', description: 'Surface Overflow Rate: 20-40 m³/m²/day | Solids Loading: 50-100 kg/m²/day | Sludge Thickening: Gravity (3-5% solids) | Overflow TSS: <30 mg/L | Underflow: 2-4% solids' } },
            { id: '9', position: { x: 250, y: 670 }, data: { label: 'Multi-Media Filtration', description: 'Media: Anthracite (0.8-1.2m) + Sand (0.3-0.5m) + Gravel (0.15-0.3m) | Filtration Rate: 10-20 m³/m²/hr | Backwash: 15 min every 8-12 hours | Effluent TSS: <5 mg/L | SDI: <3 for RO feed' } },
            { id: '10', position: { x: 250, y: 750 }, data: { label: 'Final Discharge / Reuse', description: 'CPCB Standards: Cr⁶⁺ <0.1 mg/L | CN⁻ <0.2 mg/L | Ni <3 mg/L | Zn <5 mg/L | Cu <3 mg/L | pH 6.5-8.5 | TDS <2,100 mg/L | Option: RO for Zero Discharge' }, type: 'output' },
            { id: '11', position: { x: 550, y: 590 }, data: { label: 'Sludge Thickener', description: 'Gravity Thickener | HRT: 12-24 hours | Solids Loading: 30-60 kg/m²/day | Underflow Solids: 3-6% | Overflow TSS: <200 mg/L (return to headworks)' } },
            { id: '12', position: { x: 550, y: 670 }, data: { label: 'Filter Press / Centrifuge', description: 'Filter Press: 15 bar, Cycle Time: 2-4 hours, Cake Solids: 30-40% | Centrifuge: 2,000-3,000 G, P-50-100, Cake Solids: 25-35% | Polymer Dosing: 3-7 kg/ton dry solids | Filtrate: Return to EQ tank' } },
            { id: '13', position: { x: 550, y: 750 }, data: { label: 'Hazardous Sludge Disposal', description: 'Classification: Schedule I (Hazardous Waste) | TSDF Authorized Facility | Landfill Disposal (Secured Landfill Class-I) | Sludge Generation: 2-5% of influent flow | Heavy Metal Leachate Monitoring' }, type: 'output' },
            { id: '14', position: { x: 550, y: 270 }, data: { label: 'Cyanide Recovery (Optional)', description: 'Acidification + Air Stripping → HCN gas absorption in NaOH → NaCN reuse in plating bath | Recovery Rate: 80-90% | Economic for large volumes (>100 kg CN⁻/month)' }, type: 'output' },
            { id: '15', position: { x: 550, y: 350 }, data: { label: 'Chrome Recovery (Optional)', description: 'Cation Exchange Resin: Strong Acid Cation (SAC) | Regeneration: H₂SO₄/NaOH | Recovered Cr⁶⁺ concentrated to 10-20 g/L | RO reject concentration | ROI: 18-24 months for >50 kg Cr/month' }, type: 'output' },
            { id: '16', position: { x: 550, y: 510 }, data: { label: 'Chemicals Storage', description: 'NaOCl (15% solution) | SO₂ cylinders | NaOH (48%) | Polymer Emulsion | Lime Slurry (10-20%) | Acid (H₂SO₄ 98%) | Storage: Double containment berm | Spill kit available' } }
        ],
        edges: [
            { id: 'e1-2', source: '1', target: '2', animated: true, label: 'Segregated streams' },
            { id: 'e2-3', source: '2', target: '3', animated: true },
            { id: 'e3-4', source: '3', target: '4', animated: true },
            { id: 'e4-5', source: '4', target: '5', animated: true, label: 'CN⁻ <0.1 mg/L' },
            { id: 'e5-6', source: '5', target: '6', animated: true, label: 'Cr⁶⁺ <0.05 mg/L' },
            { id: 'e6-7', source: '6', target: '7', animated: true },
            { id: 'e7-8', source: '7', target: '8', animated: true, label: 'Flocculated water' },
            { id: 'e8-9', source: '8', target: '9', animated: true, label: 'Clarified effluent' },
            { id: 'e9-10', source: '9', target: '10', animated: true },
            { id: 'e8-11', source: '8', target: '11', animated: true, label: 'Underflow sludge', style: { stroke: '#8b5cf6', strokeWidth: 2 } },
            { id: 'e11-12', source: '11', target: '12', animated: true, style: { stroke: '#8b5cf6', strokeWidth: 2 } },
            { id: 'e12-13', source: '12', target: '13', animated: true, style: { stroke: '#8b5cf6', strokeWidth: 2 } },
            { id: 'e4-14', source: '4', target: '14', animated: true, label: 'For >100 kg CN⁻/month', style: { stroke: '#10b981', strokeWidth: 2, strokeDasharray: '5,5' } },
            { id: 'e5-15', source: '5', target: '15', animated: true, label: 'For >50 kg Cr/month', style: { stroke: '#10b981', strokeWidth: 2, strokeDasharray: '5,5' } },
            { id: 'e11-16', source: '11', target: '16', animated: true, label: 'Chemical dosing', style: { stroke: '#f59e0b', strokeWidth: 2, strokeDasharray: '3,3' } },
            { id: 'e12-3', source: '12', target: '3', animated: true, label: 'Filtrate return', style: { stroke: '#3b82f6', strokeWidth: 2, strokeDasharray: '5,5' } },
            { id: 'e9-11', source: '9', target: '11', animated: true, label: 'Backwash reject', style: { stroke: '#8b5cf6', strokeWidth: 2, strokeDasharray: '5,5' } }
        ],
        layout: "vertical",
        title: "Electroplating Wastewater Treatment - Complete Process",
    },

    // Acid Pickling & Etching - Ultra Detailed
    "acid-pickling-etching": {
        nodes: [
            { id: '1', position: { x: 50, y: 30 }, data: { label: 'Acid Pickling Effluent', description: 'HCl: 5-15% or H₂SO₄: 10-20% | Fe²⁺/Fe³⁺: 30-100 g/L | Other metals (Cr, Ni, Zn): 50-500 mg/L | pH: 0.5-2.0 | TDS: 20,000-80,000 mg/L | Flow: 1-10 m³/day per pickling line' }, type: 'input' },
            { id: '2', position: { x: 50, y: 110 }, data: { label: 'Acid Regeneration (Optional - Hydrochloric)', description: 'Spray Roaster / Fluid Bed Process | 2HCl + FeCl₂ + ½O₂ → Fe₂O₃ + 4HCl | Recovery: 99% HCl | Iron Oxide: High-purity pigment (red/black) | Energy: 800-1,000 kWh/ton HCl | ROI: 2-3 years for >500 m³/month' }, type: 'output' },
            { id: '3', position: { x: 230, y: 30 }, data: { label: 'Equalization Tank', description: 'HRT: 12-24 hours | Acid concentration balancing | Cooling to <40°C (if required) | Tank lining: Acid-resistant brick or rubber | Capacity: 1-2 days flow' } },
            { id: '4', position: { x: 230, y: 110 }, data: { label: 'Two-Stage Neutralization', description: 'Stage 1 (pH 4-5): Lime slurry (5-10% Ca(OH)₂) - 100-300 kg/m³ | Stage 2 (pH 8.5-9.5): NaOH (48%) - 5-15 L/m³ | Reaction: H⁺ + OH⁻ → H₂O | Retention: 20-30 min per stage | Gypsum formation: CaSO₄·2H₂O precipitate' } },
            { id: '5', position: { x: 410, y: 30 }, data: { label: 'Iron & Metal Hydroxide Precipitation', description: 'Fe³⁺ + 3OH⁻ → Fe(OH)₃↓ (pH 4.0-5.0) | Fe²⁺ + 2OH⁻ → Fe(OH)₂↓ (pH 8.5-9.5) | M²⁺ + 2OH⁻ → M(OH)₂↓ (pH 8.5-9.5) | Fe²⁺ oxidation: Air sparging (20-30 min) | Oxidation potential: DO >2 mg/L' } },
            { id: '6', position: { x: 590, y: 30 }, data: { label: 'Coagulation & Flocculation', description: 'Coagulant: Alum (50-150 mg/L) or FeCl₃ (30-100 mg/L) | Flocculant: Anionic/Cationic polymer (2-10 mg/L) | Flash mixing: G=300-500 s⁻¹ (1-2 min) | Flocculation: G=20-80 s⁻¹ (15-30 min) | pH optimized for polymer' } },
            { id: '7', position: { x: 770, y: 30 }, data: { label: 'High-Rate Clarifier', description: 'Upflow Solids Contact Clarifier | Surface Overflow: 30-50 m³/m²/day | Solids Loading: 80-150 kg/m²/day | Sludge Recirculation: 30-50% | Overflow TSS: <50 mg/L | Underflow Solids: 2-5%' } },
            { id: '8', position: { x: 950, y: 30 }, data: { label: 'Pressure Sand Filter', description: 'Media: Uniform sand (0.6-1.2 mm) | Bed Depth: 0.8-1.2 m | Filtration Rate: 15-25 m³/m²/hr | Backwash: 20-30 min every 12-24 hours | Air scouring: 50 m³/m²/hr for 2-3 min | Effluent TSS: <10 mg/L' } },
            { id: '9', position: { x: 1130, y: 30 }, data: { label: 'Final Discharge', description: 'CPCB Standards: pH 6.5-8.5 | TSS <100 mg/L | Iron <3 mg/L | Oil & Grease <10 mg/L | COD <250 mg/L | For reuse: Sand filter effluent to Reverse Osmosis (RO)' }, type: 'output' },
            { id: '10', position: { x: 590, y: 150 }, data: { label: 'Gypsum Sludge (Primary)', description: 'CaSO₄·2H₂O content: 40-60% | Fe(OH)₃ content: 20-30% | Metals: 5-10% | Solids concentration: 2-5% | Settling rate: Slow (gypsum colloidal)' } },
            { id: '11', position: { x: 770, y: 150 }, data: { label: 'Thickener', description: 'Diameter: 3-10 m | Sidewall depth: 2-3 m | Solids loading: 40-80 kg/m²/day | Underflow Solids: 8-12% | Overflow TSS: <200 mg/L (return to EQ)' } },
            { id: '12', position: { x: 950, y: 150 }, data: { label: 'Filter Press', description: 'Recessed plate type (1.5m x 1.5m) | Cycle time: 4-8 hours | Filtration pressure: 10-15 kg/cm² | Cake thickness: 25-35 mm | Cake Solids: 35-45% | Washing: 2-3 cycles per day' } },
            { id: '13', position: { x: 1130, y: 150 }, data: { label: 'Sludge Disposal', description: 'Classification: Non-hazardous (if TCLP passes) | Iron Sludge reuse: Cement industry (10-15% replacement) | Gypsum reuse: Cement retarder | Landfill: Class II landfill' }, type: 'output' }
        ],
        edges: [
            { id: 'e1-3', source: '1', target: '3', animated: true, label: 'Raw spent acid' },
            { id: 'e1-2', source: '1', target: '2', animated: true, label: 'Regeneration option', style: { stroke: '#10b981', strokeWidth: 2, strokeDasharray: '5,5' } },
            { id: 'e3-4', source: '3', target: '4', animated: true },
            { id: 'e4-5', source: '4', target: '5', animated: true, label: 'pH 8.5-9.5' },
            { id: 'e5-6', source: '5', target: '6', animated: true },
            { id: 'e6-7', source: '6', target: '7', animated: true },
            { id: 'e7-8', source: '7', target: '8', animated: true },
            { id: 'e8-9', source: '8', target: '9', animated: true },
            { id: 'e7-10', source: '7', target: '10', animated: true, label: 'Primary sludge', style: { stroke: '#8b5cf6', strokeWidth: 2 } },
            { id: 'e10-11', source: '10', target: '11', animated: true, style: { stroke: '#8b5cf6', strokeWidth: 2 } },
            { id: 'e11-12', source: '11', target: '12', animated: true, style: { stroke: '#8b5cf6', strokeWidth: 2 } },
            { id: 'e12-13', source: '12', target: '13', animated: true, style: { stroke: '#8b5cf6', strokeWidth: 2 } },
            { id: 'e11-3', source: '11', target: '3', animated: true, label: 'Supernatant return', style: { stroke: '#3b82f6', strokeWidth: 2, strokeDasharray: '5,5' } }
        ],
        layout: "vertical",
        title: "Acid Pickling Wastewater Treatment - Complete Process",
    },

    // Surface Finishing - Ultra Detailed
    "surface-finishing": {
        nodes: [
            { id: '1', position: { x: 50, y: 30 }, data: { label: 'Surface Finishing Effluent', description: 'Oil & Grease: 500-5,000 mg/L | TSS: 2,000-10,000 mg/L (abrasives) | Heavy metals: 50-200 mg/L | Surfactants: 100-500 mg/L | COD: 5,000-20,000 mg/L | pH: 8.0-10.5 (alkaline cleaners)' }, type: 'input' },
            { id: '2', position: { x: 230, y: 30 }, data: { label: 'Screening & Grit Chamber', description: 'Bar screen: 5-10 mm opening | Flow: 100-500 m³/day | Grit removal: 0.2 mm particle size | Aerated grit chamber: 3-5 min HRT | Removes: Abrasives >200 microns (sanding dust, polishing compounds)' } },
            { id: '3', position: { x: 410, y: 30 }, data: { label: 'API Oil/Water Separator', description: 'Flow rate: 100-500 m³/day | vertical flow | Coalescing plates (CPI) | Oil removal: 99% of free oil (>150 microns) | Effluent oil: <50 mg/L | Sludge: Heavy solids at bottom (cleaning every 6 months)' } },
            { id: '4', position: { x: 590, y: 30 }, data: { label: 'Equalization Tank', description: 'HRT: 8-12 hours | Coarse bubble aeration: 0.5-1 m³/m²/hr | pH adjustment (interim to 7-8) | Surfactant foam control: Spray nozzles | Pre-neutralization (if pH extreme)' } },
            { id: '5', position: { x: 770, y: 30 }, data: { label: 'Chemical Treatment', description: 'Coagulant: Alum (100-300 mg/L) or PAC (50-150 mg/L) | pH adjustment to 6.5-7.5 | Flocculant: Cationic Polymer (2-8 mg/L) | Detergent destabilization | Surfactant removal: 80-90%' } },
            { id: '6', position: { x: 950, y: 30 }, data: { label: 'Dissolved Air Flotation (DAF)', description: 'Recycle rate: 30-50% | Air pressure: 4-6 bar | Surface loading: 5-15 m³/m²/hr | Solids loading: 50-150 kg/m²/day | Oil & TSS removal: 90-98% | Floated solids: 3-6% | Polymer: 5-15 mg/L' } },
            { id: '7', position: { x: 1130, y: 30 }, data: { label: 'Multi-Media Filter', description: 'Media: Anthracite (0.8-1.2m) + Sand (0.3-0.5m) | Filtration rate: 15-25 m³/m²/hr | Backwash: 15-20 min every 12 hours | Effluent TSS: <10 mg/L | SDI: <5' } },
            { id: '8', position: { x: 1310, y: 30 }, data: { label: 'Final Discharge / Reuse', description: 'Irrigation / Cooling tower makeup | Optional: UF/RO for high purity reuse | CPCB Standards: TSS <100 mg/L | Oil & Grease <10 mg/L | COD <250 mg/L | Metals as per IS 2490' }, type: 'output' },
            { id: '9', position: { x: 950, y: 150 }, data: { label: 'DAF Float Solids', description: 'Oil + Grease + Surfactant sludge | Solids: 3-6% | Oil content: 30-50% dry basis | Volume: 2-5% of influent flow' } },
            { id: '10', position: { x: 1130, y: 150 }, data: { label: 'Sludge Dewatering (Centrifuge)', description: 'Decanter centrifuge: 2,500-3,500 rpm | P-50-150 | Polymer: 5-10 kg/ton dry solids | Cake solids: 25-35% | Centrate solids: <500 mg/L (return to DAF)' } },
            { id: '11', position: { x: 1310, y: 150 }, data: { label: 'Waste Oil Disposal', description: 'Hazardous waste (Schedule I) | Authorized incineration (cement kiln) | Alternative: Fuel blending (if calorific value >4,000 kcal/kg) | Avoid landfill disposal' }, type: 'output' },
            { id: '12', position: { x: 590, y: 150 }, data: { label: 'Sludge from EQ/Screening', description: 'Grit + Heavy solids (abrasives) | Settled solids: 1-3% of flow | Dewatering: Drying beds (if non-hazardous) | Disposal: Landfill (after toxicity testing)' }, type: 'output' }
        ],
        edges: [
            { id: 'e1-2', source: '1', target: '2', animated: true },
            { id: 'e2-3', source: '2', target: '3', animated: true },
            { id: 'e3-4', source: '3', target: '4', animated: true, label: 'Oil <50 mg/L' },
            { id: 'e4-5', source: '4', target: '5', animated: true },
            { id: 'e5-6', source: '5', target: '6', animated: true },
            { id: 'e6-7', source: '6', target: '7', animated: true, label: 'Treated water' },
            { id: 'e7-8', source: '7', target: '8', animated: true },
            { id: 'e6-9', source: '6', target: '9', animated: true, label: 'Float sludge', style: { stroke: '#8b5cf6', strokeWidth: 2 } },
            { id: 'e9-10', source: '9', target: '10', animated: true, style: { stroke: '#8b5cf6', strokeWidth: 2 } },
            { id: 'e10-11', source: '10', target: '11', animated: true, style: { stroke: '#8b5cf6', strokeWidth: 2 } },
            { id: 'e10-6', source: '10', target: '6', animated: true, label: 'Centrate return', style: { stroke: '#3b82f6', strokeWidth: 2, strokeDasharray: '5,5' } },
            { id: 'e2-12', source: '2', target: '12', animated: true, label: 'Screenings/grit', style: { stroke: '#8b5cf6', strokeWidth: 2 } },
            { id: 'e4-12', source: '4', target: '12', animated: true, label: 'Settled solids', style: { stroke: '#8b5cf6', strokeWidth: 2, strokeDasharray: '5,5' } }
        ],
        layout: "vertical",
        title: "Surface Finishing Wastewater Treatment - Complete Process",
    },
};