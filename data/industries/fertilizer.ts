import { FlowDiagramData } from "@/types";
import { createEdges } from "../helpers/flowHelpers";

export const fertilizerFlows: Record<string, FlowDiagramData> = {
    // Ammonia & Urea - Ultra Detailed with increased spacing
    "ammonia": {
        nodes: [
            { id: '1', position: { x: 50, y: 150 }, data: { label: 'Ammonia Plant Effluent', description: 'NH₃-N: 500-5,000 mg/L | Urea: 100-1,000 mg/L | CO₂: High | pH: 9.0-11.5 | Flow: 50-500 m³/day | Temperature: 30-40°C' }, type: 'input' },
            { id: '2', position: { x: 270, y: 150 }, data: { label: 'Equalization Tank', description: 'HRT: 24-48 hours | Coarse bubble aeration: 0.5-1 m³/m²/hr | pH adjustment: Acid dosing (H₂SO₄ 98%) to pH 8.5-9.0 | Cooling to <35°C | Tank capacity: 2-3 days storage' } },
            { id: '3', position: { x: 490, y: 150 }, data: { label: 'Ammonia Stripping Tower', description: 'Packed column: Random packing (50-75mm) | Air-to-Liquid ratio: 2,000-4,000:1 | Loading rate: 30-60 m³/m²/hr | pH: 10.5-11.0 (Lime addition) | Temperature: 35-45°C | NH₃ removal: 80-95% | Stripped NH₃: H₂SO₄ absorption → (NH₄)₂SO₄ fertilizer' } },
            { id: '4', position: { x: 710, y: 150 }, data: { label: 'pH Adjustment (Neutralization)', description: 'Acid dosing: H₂SO₄ (98%) or HCl (32%) | Target pH: 7.0-8.0 | Retention time: 15-30 min | Mixing: Mechanical agitator (G=200-300 s⁻¹) | Monitoring: Online pH controller with PID loop' } },
            { id: '5', position: { x: 930, y: 150 }, data: { label: 'Biological Nitrification', description: 'Nitrification: NH₄⁺ + 1.5O₂ → NO₂⁻ + 2H⁺ + H₂O | NO₂⁻ + 0.5O₂ → NO₃⁻ | MLSS: 2,500-4,000 mg/L | SRT: 15-25 days | HRT: 24-36 hours | DO: 2-3 mg/L | Alkalinity: 7.14 kg CaCO₃/kg NH₄⁺-N (NaHCO₃ addition)' } },
            { id: '6', position: { x: 1150, y: 150 }, data: { label: 'Denitrification (Anoxic)', description: 'NO₃⁻ + Organic Carbon → N₂↑ + CO₂ + H₂O | Carbon source: Methanol (3-4 kg CH₃OH/kg NO₃⁻-N) or Acetic Acid | ORP: -50 to -150 mV | HRT: 6-12 hours | MLSS: 3,000-5,000 mg/L | DO: <0.5 mg/L | N₂ gas venting' } },
            { id: '7', position: { x: 1370, y: 150 }, data: { label: 'Secondary Clarifier', description: 'Surface Overflow Rate: 15-25 m³/m²/day | Solids Loading: 50-100 kg/m²/day | Sludge Recirculation: 50-100% | Weir Loading: <150 m³/m/day | Underflow Solids: 8,000-12,000 mg/L | Overflow TSS: <30 mg/L' } },
            { id: '8', position: { x: 1590, y: 150 }, data: { label: 'Final Discharge / Reuse', description: 'CPCB Standards: NH₃-N <10 mg/L | NO₃-N <10 mg/L | TSS <100 mg/L | pH 6.5-8.5 | COD <250 mg/L | Options: RO for boiler feed | Cooling tower makeup' }, type: 'output' },
            { id: '9', position: { x: 490, y: 350 }, data: { label: 'Ammonium Sulfate Recovery', description: '2NH₃ + H₂SO₄ → (NH₄)₂SO₄ | Concentration: 30-40% solution | Crystallization: Evaporator + Centrifuge | Product: 21-0-0-24S fertilizer | Quality: IS 1665-1977 standard | Market value: $150-200/ton' }, type: 'output' },
            { id: '10', position: { x: 1370, y: 350 }, data: { label: 'Waste Activated Sludge (WAS)', description: 'Sludge Production: 0.3-0.5 kg MLSS/kg COD removed | MLVSS/MLSS: 0.75-0.85 | Sludge Volume: 2-5% of influent flow' } },
            { id: '11', position: { x: 1590, y: 350 }, data: { label: 'Sludge Thickener', description: 'Gravity Thickener | Solids Loading: 40-80 kg/m²/day | HRT: 12-24 hours | Underflow: 3-6% solids | Overflow: Return to EQ tank' } },
            { id: '12', position: { x: 1810, y: 350 }, data: { label: 'Filter Press / Centrifuge', description: 'Filter Press: 15 bar, Cycle 3-5 hours, Cake: 25-35% | Centrifuge: 2,500 rpm, P-50-100 | Polymer: 4-8 kg/ton | Filtrate return to headworks' } },
            { id: '13', position: { x: 2030, y: 350 }, data: { label: 'Sludge Disposal', description: 'Classified: Non-hazardous (if metals pass TCLP) | Options: Land application (composted) | Incineration (if contaminated) | Landfill (Class II)' }, type: 'output' },
            { id: '14', position: { x: 1150, y: 350 }, data: { label: 'Carbon Source Storage', description: 'Methanol storage: Double wall tank (20-50 kL) | Safety: Flame arrestor, bund wall (110% capacity) | Dosing pump: Progressive cavity (1-10 L/min) | Tanks: 30-day storage' } }
        ],
        edges: [
            { id: 'e1-2', source: '1', target: '2', animated: true },
            { id: 'e2-3', source: '2', target: '3', animated: true },
            { id: 'e3-4', source: '3', target: '4', animated: true, label: 'Stripped effluent' },
            { id: 'e4-5', source: '4', target: '5', animated: true, label: 'pH 7-8' },
            { id: 'e5-6', source: '5', target: '6', animated: true, label: 'Recycle flow' },
            { id: 'e6-7', source: '6', target: '7', animated: true },
            { id: 'e7-8', source: '7', target: '8', animated: true },
            { id: 'e3-9', source: '3', target: '9', animated: true, label: 'NH₃ rich', style: { stroke: '#10b981', strokeWidth: 2 } },
            { id: 'e7-10', source: '7', target: '10', animated: true, label: 'Underflow', style: { stroke: '#8b5cf6', strokeWidth: 2 } },
            { id: 'e10-11', source: '10', target: '11', animated: true, style: { stroke: '#8b5cf6', strokeWidth: 2 } },
            { id: 'e11-12', source: '11', target: '12', animated: true, style: { stroke: '#8b5cf6', strokeWidth: 2 } },
            { id: 'e12-13', source: '12', target: '13', animated: true, style: { stroke: '#8b5cf6', strokeWidth: 2 } },
            { id: 'e11-2', source: '11', target: '2', animated: true, label: 'Supernatant return', style: { stroke: '#3b82f6', strokeWidth: 2, strokeDasharray: '5,5' } },
            { id: 'e6-14', source: '6', target: '14', animated: true, label: 'Methanol feed', style: { stroke: '#f59e0b', strokeWidth: 2, strokeDasharray: '3,3' } }
        ],
        layout: "horizontal",
        title: "Ammonia & Urea Wastewater Treatment - Complete Nutrient Removal",
    },

    // Phosphate Fertilizer - Ultra Detailed
    "phosphate": {
        nodes: [
            { id: '1', position: { x: 50, y: 150 }, data: { label: 'Phosphate Plant Effluent', description: 'PO₄³⁻: 50-500 mg/L | F⁻: 50-500 mg/L | Ca²⁺: 500-2,000 mg/L | SO₄²⁻: 1,000-5,000 mg/L | pH: 2.0-4.0 (acidic) | TSS: 500-2,000 mg/L | Flow: 100-1,000 m³/day | Phosphogypsum solids' }, type: 'input' },
            { id: '2', position: { x: 270, y: 150 }, data: { label: 'Equalization Basin', description: 'HRT: 24-72 hours | Lined pond (HDPE 2mm) | pH monitoring | Solids settling (gypsum) | Capacity: 5-10 days production | Cleanout: Every 6-12 months | Acid-resistant lining' } },
            { id: '3', position: { x: 490, y: 150 }, data: { label: 'Two-Stage Neutralization', description: 'Stage 1 (pH 4-5): Lime slurry (10-20% Ca(OH)₂) - 2-5 kg/m³ | Stage 2 (pH 6-7): NaOH (48%) - 1-3 L/m³ | Reactions: H₃PO₄ + OH⁻ → H₂PO₄⁻ + H₂O | HF + OH⁻ → F⁻ + H₂O | Retention: 30-45 min per stage' } },
            { id: '4', position: { x: 710, y: 150 }, data: { label: 'Fluoride Removal (Calcium Fluoride)', description: '2F⁻ + Ca²⁺ → CaF₂↓ (Saturation: 16 mg/L at 25°C) | Lime addition: 2.5-3 kg Ca²⁺/kg F⁻ | Reaction pH: 7.0-8.0 | Retention time: 30-60 min | Effluent F⁻: <10 mg/L (WHO drinking water: <1.5 mg/L)' } },
            { id: '5', position: { x: 930, y: 150 }, data: { label: 'Phosphate Precipitation', description: 'Ca²⁺ + HPO₄²⁻ → CaHPO₄↓ (Dicalcium phosphate) | 3Ca²⁺ + 2PO₄³⁻ → Ca₃(PO₄)₂↓ (Tricalcium phosphate) | pH: 8.0-9.5 | Lime: 1-2 kg/m³ | Retention: 20-30 min | Residual PO₄³⁻: <5 mg/L (discharge), <0.1 mg/L (sensitive water bodies)' } },
            { id: '6', position: { x: 1150, y: 150 }, data: { label: 'Coagulation & Flocculation', description: 'Coagulant: Alum (50-150 mg/L) or Ferric (30-100 mg/L) | Flocculant: Anionic polymer (1-5 mg/L) | pH: 6.5-7.5 | Flash mixing: G=400-600 s⁻¹ | Flocculation: G=20-50 s⁻¹ (20-30 min)' } },
            { id: '7', position: { x: 1370, y: 150 }, data: { label: 'High-Rate Clarifier', description: 'Solids Contact Clarifier | Surface Overflow: 30-60 m³/m²/day | Solids Loading: 80-150 kg/m²/day | Sludge Recirculation: 20-40% | Overflow TSS: <50 mg/L | Underflow: 3-8% solids' } },
            { id: '8', position: { x: 1590, y: 150 }, data: { label: 'Pressure Sand Filter', description: 'Media: Anthracite (1.2m) + Sand (0.6m) | Filtration Rate: 15-25 m³/m²/hr | Backwash: 20-30 min every 12-24 hours | Air scouring: 50-70 m³/m²/hr | Effluent TSS: <10 mg/L' } },
            { id: '9', position: { x: 1810, y: 150 }, data: { label: 'Final Discharge', description: 'CPCB Standards: PO₄³⁻ <5 mg/L | F⁻ <10 mg/L | TSS <100 mg/L | pH 6.5-8.5 | COD <250 mg/L | For reuse: Agriculture irrigation (nutrient value)' }, type: 'output' },
            { id: '10', position: { x: 1370, y: 350 }, data: { label: 'Phosphogypsum Sludge', description: 'CaSO₄·2H₂O content: 70-85% | CaF₂: 5-10% | Ca₃(PO₄)₂: 5-10% | Unreacted acid: 1-3% | Solids: 5-15% | Radioactivity: Naturally Occurring (Ra-226, 200-800 Bq/kg)' } },
            { id: '11', position: { x: 1590, y: 350 }, data: { label: 'Sludge Thickener', description: 'Diameter: 10-20 m | Sidewall: 3-4 m | Solids Loading: 30-60 kg/m²/day | Underflow: 20-30% solids | Overflow: Return to EQ basin | Retention: 12-24 hours' } },
            { id: '12', position: { x: 1810, y: 350 }, data: { label: 'Vacuum Filter / Filter Press', description: 'Rotary Vacuum Filter: 0.5-2 m² | Cake thickness: 10-20 mm | Cake Solids: 50-65% | Filtrate: Return to process | Filter cloth: Polypropylene (80-120 microns)' } },
            { id: '13', position: { x: 2030, y: 350 }, data: { label: 'Gypsum Stack Management', description: 'Storage capacity: 10-50 acres | Liner: HDPE (2mm) + Clay (0.6m) | Leachate collection: Sump + Treatment | Groundwater monitoring wells (quarterly) | Reclamation: Topsoil + vegetation' }, type: 'output' },
            { id: '14', position: { x: 490, y: 350 }, data: { label: 'Phosphoric Acid Recovery', description: 'Optional: WPA recovery | Evaporation + Crystallization | Product: 30-50% P₂O₅ | Reuse: Return to phosphoric acid plant | Economic for >100 m³/day' }, type: 'output' }
        ],
        edges: [
            { id: 'e1-2', source: '1', target: '2', animated: true },
            { id: 'e2-3', source: '2', target: '3', animated: true },
            { id: 'e3-4', source: '3', target: '4', animated: true, label: 'pH 6-7' },
            { id: 'e4-5', source: '4', target: '5', animated: true, label: 'F⁻ <10 mg/L' },
            { id: 'e5-6', source: '5', target: '6', animated: true, label: 'PO₄³⁻ <5 mg/L' },
            { id: 'e6-7', source: '6', target: '7', animated: true },
            { id: 'e7-8', source: '7', target: '8', animated: true },
            { id: 'e8-9', source: '8', target: '9', animated: true },
            { id: 'e7-10', source: '7', target: '10', animated: true, label: 'Underflow', style: { stroke: '#8b5cf6', strokeWidth: 2 } },
            { id: 'e10-11', source: '10', target: '11', animated: true, style: { stroke: '#8b5cf6', strokeWidth: 2 } },
            { id: 'e11-12', source: '11', target: '12', animated: true, style: { stroke: '#8b5cf6', strokeWidth: 2 } },
            { id: 'e12-13', source: '12', target: '13', animated: true, style: { stroke: '#8b5cf6', strokeWidth: 2 } },
            { id: 'e11-2', source: '11', target: '2', animated: true, label: 'Supernatant return', style: { stroke: '#3b82f6', strokeWidth: 2, strokeDasharray: '5,5' } },
            { id: 'e3-14', source: '3', target: '14', animated: true, label: 'Recovery option', style: { stroke: '#10b981', strokeWidth: 2, strokeDasharray: '5,5' } }
        ],
        layout: "horizontal",
        title: "Phosphate Fertilizer Wastewater Treatment - Complete Process",
    },

    // Nitrate Fertilizer - Ultra Detailed
    "nitrate": {
        nodes: [
            { id: '1', position: { x: 50, y: 150 }, data: { label: 'Nitrate Plant Effluent', description: 'NO₃⁻: 50-500 mg/L | NO₂⁻: 5-50 mg/L | NH₄⁺: 10-100 mg/L | pH: 6.0-8.0 | COD: 50-500 mg/L (low) | Flow: 50-500 m³/day | Temperature: 20-30°C' }, type: 'input' },
            { id: '2', position: { x: 270, y: 150 }, data: { label: 'Equalization Tank', description: 'HRT: 24-48 hours | Nutrient balancing | pH adjustment: Acid/Base as needed | Cooling requirement: None typically | Tank capacity: 2-3 days | Intermittent discharge management' } },
            { id: '3', position: { x: 490, y: 150 }, data: { label: 'Carbon Source Addition', description: 'External carbon for denitrification | Methanol: 3-5 kg CH₃OH/kg NO₃⁻-N | Acetic acid: 5-7 kg/kg | Glycerol: 6-8 kg/kg | Sugar: 8-10 kg/kg | Dosage control: Online NO₃⁻ analyzer | Safety: Flammable liquid storage' } },
            { id: '4', position: { x: 710, y: 150 }, data: { label: 'Anoxic Denitrification Reactor', description: 'NO₃⁻ + 1.08 CH₃OH + H⁺ → 0.065 C₅H₇NO₂ + 0.47 N₂↑ + 0.76 CO₂ + 2.44 H₂O | ORP: -100 to -200 mV | HRT: 6-12 hours | MLSS: 2,500-4,000 mg/L | DO: <0.5 mg/L | N₂ gas production: 0.35 m³/kg NO₃⁻-N removed | Covered reactor for gas collection' } },
            { id: '5', position: { x: 930, y: 150 }, data: { label: 'Post-Aeration (Reaeration)', description: 'Purpose: Remove excess carbon | Oxygen transfer: 0.5-1 kg O₂/kg COD | Fine bubble diffusers | HRT: 1-2 hours | DO: 2-3 mg/L | ORP: +100 to +200 mV | Stripping of residual N₂ gas' } },
            { id: '6', position: { x: 1150, y: 150 }, data: { label: 'Final Clarifier', description: 'Surface Overflow Rate: 15-25 m³/m²/day | Solids Loading: 50-100 kg/m²/day | Sludge Recirculation: 50-100% | Weir Loading: <150 m³/m/day | Overflow TSS: <30 mg/L | Underflow: 8,000-12,000 mg/L' } },
            { id: '7', position: { x: 1370, y: 150 }, data: { label: 'Pressure Sand Filter (Polishing)', description: 'Media: Uniform sand (0.5-1.0 mm) | Bed Depth: 0.8-1.2 m | Filtration Rate: 15-25 m³/m²/hr | Backwash: 15-20 min every 12-24 hours | Effluent TSS: <5 mg/L' } },
            { id: '8', position: { x: 1590, y: 150 }, data: { label: 'Final Discharge / Reuse', description: 'CPCB Standards: NO₃⁻ <10 mg/L | TSS <100 mg/L | COD <250 mg/L | pH 6.5-8.5 | Option: Agriculture irrigation (Nitrogen value: 4-5 kg N/1,000 m³)' }, type: 'output' },
            { id: '9', position: { x: 1150, y: 350 }, data: { label: 'Excess Biological Sludge', description: 'Sludge yield: 0.2-0.4 kg MLSS/kg COD removed | MLVSS/MLSS: 0.8-0.9 | WAS volume: 2-5% of flow | Polymer dosing: 3-6 kg/ton dry solids' } },
            { id: '10', position: { x: 1370, y: 350 }, data: { label: 'Sludge Thickener', description: 'Gravity Thickener | Solids Loading: 40-80 kg/m²/day | HRT: 12-24 hours | Underflow: 3-6% solids | Overflow: Return to EQ tank' } },
            { id: '11', position: { x: 1590, y: 350 }, data: { label: 'Centrifuge / Filter Press', description: 'Decanter Centrifuge: 2,500-3,500 rpm | P-50-150 | Polymer: 5-10 kg/ton | Cake Solids: 20-30% | Centrate solids: <500 mg/L' } },
            { id: '12', position: { x: 1810, y: 350 }, data: { label: 'Sludge Disposal', description: 'Classification: Non-hazardous (organic sludge) | Options: Land application (composted) | Incineration (if contaminated) | Landfill (Class II) | Dewatered cake: 30-40% solids' }, type: 'output' },
            { id: '13', position: { x: 490, y: 350 }, data: { label: 'Carbon Source Storage', description: 'Methanol tank: Double wall (10-30 kL) | Dike capacity: 110% | Nitrogen blanketing | Flame arrestor | Explosion-proof electricals | Spill containment berm' } }
        ],
        edges: [
            { id: 'e1-2', source: '1', target: '2', animated: true },
            { id: 'e2-3', source: '2', target: '3', animated: true },
            { id: 'e3-4', source: '3', target: '4', animated: true },
            { id: 'e4-5', source: '4', target: '5', animated: true, label: 'Denitrified' },
            { id: 'e5-6', source: '5', target: '6', animated: true },
            { id: 'e6-7', source: '6', target: '7', animated: true },
            { id: 'e7-8', source: '7', target: '8', animated: true },
            { id: 'e6-9', source: '6', target: '9', animated: true, label: 'WAS', style: { stroke: '#8b5cf6', strokeWidth: 2 } },
            { id: 'e9-10', source: '9', target: '10', animated: true, style: { stroke: '#8b5cf6', strokeWidth: 2 } },
            { id: 'e10-11', source: '10', target: '11', animated: true, style: { stroke: '#8b5cf6', strokeWidth: 2 } },
            { id: 'e11-12', source: '11', target: '12', animated: true, style: { stroke: '#8b5cf6', strokeWidth: 2 } },
            { id: 'e10-2', source: '10', target: '2', animated: true, label: 'Supernatant return', style: { stroke: '#3b82f6', strokeWidth: 2, strokeDasharray: '5,5' } },
            { id: 'e4-13', source: '4', target: '13', animated: true, label: 'Carbon feed', style: { stroke: '#f59e0b', strokeWidth: 2, strokeDasharray: '3,3' } }
        ],
        layout: "horizontal",
        title: "Nitrate Fertilizer Wastewater Treatment - Complete Denitrification",
    },

    // Granulation - Ultra Detailed
    "granulation": {
        nodes: [
            { id: '1', position: { x: 250, y: 50 }, data: { label: 'Granulation Plant Effluent', description: 'TSS: 2,000-10,000 mg/L (fertilizer dust) | COD: 500-2,000 mg/L | NH₃-N: 50-200 mg/L | pH: 7.0-9.0 | Flow: 50-200 m³/day | NPK dust: Primary contaminant' }, type: 'input' },
            { id: '2', position: { x: 250, y: 140 }, data: { label: 'Screening (Vibrating Screen)', description: 'Mesh size: 0.5-2.0 mm | Removal efficiency: 95-98% of coarse solids | Dust collection: Cyclone + Bag filter | Screen undersize: <0.5 mm to EQ tank | Screen oversize: Recycle to production (granules)' } },
            { id: '3', position: { x: 250, y: 230 }, data: { label: 'Equalization Tank', description: 'HRT: 12-24 hours | Coarse bubble mixing | pH monitoring | Capacity: 2-3 days | Underground tank (if space constraints) | Solids settling: Periodic cleaning' } },
            { id: '4', position: { x: 250, y: 320 }, data: { label: 'Chemical Treatment (Coagulation)', description: 'Coagulant: Alum (100-200 mg/L) or Ferric (50-100 mg/L) | Flocculant: Anionic polymer (2-8 mg/L) | pH adjustment to 6.5-7.5 | Flash mixing: G=400-600 s⁻¹ (1-2 min) | Detergent/NPK destabilization' } },
            { id: '5', position: { x: 250, y: 410 }, data: { label: 'Clarifier (Lamella Settler)', description: 'Surface Overflow: 20-40 m³/m²/day | Solids Loading: 50-100 kg/m²/day | Lamella spacing: 50-80 mm | Inclined plates (55-60°) | Overflow TSS: <100 mg/L | Underflow: 3-8% solids' } },
            { id: '6', position: { x: 250, y: 500 }, data: { label: 'Pressure Sand Filter', description: 'Media: Anthracite (1.0m) + Sand (0.5m) | Filtration Rate: 15-25 m³/m²/hr | Backwash: 15-20 min every 12-24 hours | Air scouring: 50 m³/m²/hr | Effluent TSS: <10 mg/L' } },
            { id: '7', position: { x: 250, y: 590 }, data: { label: 'Final Discharge / Reuse', description: 'Reuse: Cooling tower makeup | Process water (if TDS <2,000 mg/L) | Discharge: CPCB standards (TSS <100 mg/L, COD <250 mg/L)' }, type: 'output' },
            { id: '8', position: { x: 550, y: 410 }, data: { label: 'Dust Sludge', description: 'Fertilizer dust (NPK) | Solids: 5-15% | NPK value: 10-20% | Moisture: 80-95%' } },
            { id: '9', position: { x: 550, y: 500 }, data: { label: 'Sludge Thickener', description: 'Gravity Thickener | HRT: 12-24 hours | Underflow: 15-25% solids | Overflow: Return to EQ tank' } },
            { id: '10', position: { x: 550, y: 590 }, data: { label: 'Sludge Return to Production', description: 'Recycle to granulation drum | NPK value recovery | Reduces raw material consumption | Sludge pump: Progressive cavity | Feed rate: 5-10% of production' }, type: 'output' },
            { id: '11', position: { x: 550, y: 320 }, data: { label: 'Filter Press (Optional)', description: 'For dewatering before disposal | Cake solids: 30-40% | Filtrate: Return to EQ tank | Cycle time: 3-5 hours | Polymer: 2-5 kg/ton' }, type: 'output' }
        ],
        edges: [
            { id: 'e1-2', source: '1', target: '2', animated: true },
            { id: 'e2-3', source: '2', target: '3', animated: true, label: 'Fines (<0.5mm)' },
            { id: 'e3-4', source: '3', target: '4', animated: true },
            { id: 'e4-5', source: '4', target: '5', animated: true },
            { id: 'e5-6', source: '5', target: '6', animated: true, label: 'Overflow' },
            { id: 'e6-7', source: '6', target: '7', animated: true },
            { id: 'e5-8', source: '5', target: '8', animated: true, label: 'Underflow', style: { stroke: '#8b5cf6', strokeWidth: 2 } },
            { id: 'e8-9', source: '8', target: '9', animated: true, style: { stroke: '#8b5cf6', strokeWidth: 2 } },
            { id: 'e9-10', source: '9', target: '10', animated: true, style: { stroke: '#10b981', strokeWidth: 2 } },
            { id: 'e9-11', source: '9', target: '11', animated: true, style: { stroke: '#8b5cf6', strokeWidth: 2, strokeDasharray: '5,5' } },
            { id: 'e9-3', source: '9', target: '3', animated: true, label: 'Supernatant return', style: { stroke: '#3b82f6', strokeWidth: 2, strokeDasharray: '5,5' } }
        ],
        layout: "vertical",
        title: "Granulation Wastewater Treatment - NPK Dust Recovery",
    },
};