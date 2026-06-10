import { FlowDiagramData } from "@/types";
import { createEdges, nodeColors } from "../helpers/flowHelpers";

export const distilleryFlows: Record<string, FlowDiagramData> = {
    // Molasses-Based Distillery - Ultra Detailed with Colors
    "molasses": {
        nodes: [
            // Primary Treatment (Brown/Treatment colors)
            { id: '1', position: { x: 250, y: 40 }, data: { label: 'Raw Spent Wash', description: 'COD: 100,000-150,000 mg/L | BOD: 45,000-60,000 mg/L | pH: 4.0-4.5 | Color: Dark Brown (Melanoidins) | TDS: 30,000-50,000 mg/L | Temperature: 70-80°C | Flow: 100-500 m³/day' }, type: 'input', style: { backgroundColor: nodeColors.input.bg, borderColor: nodeColors.input.border, borderWidth: '2px', borderRadius: '8px', padding: '12px', width: '260px' } },
            { id: '2', position: { x: 250, y: 140 }, data: { label: 'Screening & Cooling', description: 'Rotary drum screen (1-2mm) | Cooling tower to 35-40°C | Grit removal | HRT: 2-4 hours | Solids removal: 80-90%' }, style: { backgroundColor: nodeColors.treatment.bg, borderColor: nodeColors.treatment.border, borderWidth: '2px', borderRadius: '8px', padding: '12px', width: '260px' } },
            { id: '3', position: { x: 250, y: 240 }, data: { label: 'Equalization & pH Adjustment', description: 'HRT: 24-48 hours | Lime addition to pH 6.8-7.2 | Nutrient addition (N, P) for biological process | Urea/DAP dosing: COD:N:P = 100:5:1 | Cooling to 35°C' }, style: { backgroundColor: nodeColors.treatment.bg, borderColor: nodeColors.treatment.border, borderWidth: '2px', borderRadius: '8px', padding: '12px', width: '260px' } },
            
            // Anaerobic Treatment (Green/Biological colors)
            { id: '4', position: { x: 250, y: 340 }, data: { label: 'Two-Stage Anaerobic Digestion', description: 'Stage 1: Hydrolysis/Acidogenesis (pH 5.5-6.5, 35°C) | Stage 2: Methanogenesis (pH 6.8-7.2, 35-37°C) | UASB/IC Reactor | HRT: 24-48 hours | COD Reduction: 75-85% | OLR: 10-20 kg COD/m³/day | Biogas: 0.35-0.45 m³/kg COD removed' }, style: { backgroundColor: nodeColors.biological.bg, borderColor: nodeColors.biological.border, borderWidth: '2px', borderRadius: '8px', padding: '12px', width: '280px' } },
            { id: '5', position: { x: 550, y: 340 }, data: { label: 'Biogas Recovery System', description: 'CH₄: 55-65% | CO₂: 35-45% | H₂S Removal: Iron sponge/biological | Power Generation: 2-3 MW per 100 kL distillery | Boiler fuel: 30-40% steam replacement | Flare stack for excess' }, type: 'output', style: { backgroundColor: nodeColors.output.bg, borderColor: nodeColors.output.border, borderWidth: '2px', borderRadius: '8px', padding: '12px', width: '260px' } },
            
            // Aerobic Treatment (Blue/Chemical colors)
            { id: '6', position: { x: 250, y: 440 }, data: { label: 'Aerobic Treatment (SBR/MBBR)', description: 'MLSS: 3,000-5,000 mg/L | F/M Ratio: 0.15-0.3 | HRT: 24-36 hours | COD Reduction: 85-90% | Sludge Age: 15-20 days | DO: 2-3 mg/L | SBR Cycle: Fill(2h)-React(8h)-Settle(1h)-Decant(2h)-Idle(1h)' }, style: { backgroundColor: nodeColors.chemical.bg, borderColor: nodeColors.chemical.border, borderWidth: '2px', borderRadius: '8px', padding: '12px', width: '280px' } },
            { id: '7', position: { x: 250, y: 540 }, data: { label: 'Secondary Clarifier', description: 'Surface Overflow Rate: 20-30 m³/m²/day | Solids Loading: 50-100 kg/m²/day | Sludge Recirculation: 50-100% | Weir Loading: <150 m³/m/day | Overflow TSS: <50 mg/L | Underflow: 8,000-12,000 mg/L' }, style: { backgroundColor: nodeColors.filtration.bg, borderColor: nodeColors.filtration.border, borderWidth: '2px', borderRadius: '8px', padding: '12px', width: '260px' } },
            
            // Polishing & ZLD (Purple/Filtration colors)
            { id: '8', position: { x: 250, y: 640 }, data: { label: 'Multi-Effect Evaporation (MEE)', description: '3-5 Effects | Steam Economy: 3-4 kg water/kg steam | Concentrate Volume Reduction: 90-95% | Final Solids: 40-45% | Condensate: Recycled to process (TDS <500 mg/L) | Agitated thin film evaporator' }, style: { backgroundColor: nodeColors.filtration.bg, borderColor: nodeColors.filtration.border, borderWidth: '2px', borderRadius: '8px', padding: '12px', width: '280px' } },
            { id: '9', position: { x: 250, y: 740 }, data: { label: 'Reverse Osmosis (RO) Polishing', description: 'Recovery Rate: 70-75% | Rejection: 98-99% salts | Permeate TDS: <500 mg/L | Permeate: Cooling tower makeup | Reject: 25-30% (return to MEE) | Membrane cleaning: CIP every 1-3 months' }, style: { backgroundColor: nodeColors.filtration.bg, borderColor: nodeColors.filtration.border, borderWidth: '2px', borderRadius: '8px', padding: '12px', width: '280px' } },
            { id: '10', position: { x: 250, y: 840 }, data: { label: 'Final Discharge / Zero Liquid Discharge', description: 'Permeate: Recycled to cooling tower (ZLD achieved) | Concentrate: Incineration/Composting | CPCB/EPA Compliance | Zero Liquid Discharge (ZLD) certification | Water recovery: 95-98%' }, type: 'output', style: { backgroundColor: nodeColors.output.bg, borderColor: nodeColors.output.border, borderWidth: '2px', borderRadius: '8px', padding: '12px', width: '280px' } },
            
            // Sludge Treatment (Gray/Sludge colors)
            { id: '11', position: { x: 600, y: 540 }, data: { label: 'Waste Activated Sludge (WAS)', description: 'Sludge Volume: 2-5% of influent flow | MLVSS/MLSS: 0.75-0.85 | WAS solids: 8,000-12,000 mg/L | Polymer dosing: 3-5 kg/ton dry solids' }, style: { backgroundColor: nodeColors.sludge.bg, borderColor: nodeColors.sludge.border, borderWidth: '2px', borderRadius: '8px', padding: '12px', width: '260px' } },
            { id: '12', position: { x: 600, y: 640 }, data: { label: 'Sludge Thickener', description: 'Gravity Thickener | HRT: 12-24 hours | Solids Loading: 30-60 kg/m²/day | Underflow Solids: 4-6% | Overflow: Return to EQ tank' }, style: { backgroundColor: nodeColors.sludge.bg, borderColor: nodeColors.sludge.border, borderWidth: '2px', borderRadius: '8px', padding: '12px', width: '260px' } },
            { id: '13', position: { x: 600, y: 740 }, data: { label: 'Filter Press / Centrifuge', description: 'Filter Press: 15-20 bar, Cycle 3-5 hours, Cake Solids: 30-40% | Centrifuge: 2,500-3,500 rpm | Polymer: 3-7 kg/ton | Filtrate: Return to EQ tank' }, style: { backgroundColor: nodeColors.sludge.bg, borderColor: nodeColors.sludge.border, borderWidth: '2px', borderRadius: '8px', padding: '12px', width: '260px' } },
            { id: '14', position: { x: 600, y: 840 }, data: { label: 'Sludge Disposal', description: 'Cake: Composting (with pressmud/bagasse) | Land application (after composting) | Incineration: Cement kiln co-processing | Biogas from organic fraction' }, type: 'output', style: { backgroundColor: nodeColors.sludge.bg, borderColor: nodeColors.sludge.border, borderWidth: '2px', borderRadius: '8px', padding: '12px', width: '260px' } },
            
            // Return lines
            { id: '15', position: { x: 600, y: 440 }, data: { label: 'Return Activated Sludge (RAS)', description: 'Recirculation rate: 50-100% of influent flow | Maintains MLSS in aeration tank | RAS pumps: Progressive cavity or centrifugal' }, style: { backgroundColor: nodeColors.recycle.bg, borderColor: nodeColors.recycle.border, borderWidth: '2px', borderRadius: '8px', padding: '12px', width: '260px' } }
        ],
        edges: [
            // Main flow - Blue arrows
            { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: '#3b82f6', strokeWidth: 2 }, label: 'Raw effluent' },
            { id: 'e2-3', source: '2', target: '3', animated: true, style: { stroke: '#3b82f6', strokeWidth: 2 } },
            { id: 'e3-4', source: '3', target: '4', animated: true, style: { stroke: '#3b82f6', strokeWidth: 2 } },
            { id: 'e4-6', source: '4', target: '6', animated: true, style: { stroke: '#3b82f6', strokeWidth: 2 }, label: 'Digested effluent' },
            { id: 'e6-7', source: '6', target: '7', animated: true, style: { stroke: '#3b82f6', strokeWidth: 2 } },
            { id: 'e7-8', source: '7', target: '8', animated: true, style: { stroke: '#3b82f6', strokeWidth: 2 }, label: 'Clarified effluent' },
            { id: 'e8-9', source: '8', target: '9', animated: true, style: { stroke: '#3b82f6', strokeWidth: 2 }, label: 'Condensate' },
            { id: 'e9-10', source: '9', target: '10', animated: true, style: { stroke: '#3b82f6', strokeWidth: 2 }, label: 'Permeate' },
            
            // Biogas - Green
            { id: 'e4-5', source: '4', target: '5', animated: true, style: { stroke: '#10b981', strokeWidth: 2 }, label: 'Biogas (CH₄+CO₂)' },
            
            // Sludge - Purple
            { id: 'e7-11', source: '7', target: '11', animated: true, style: { stroke: '#8b5cf6', strokeWidth: 2 }, label: 'Underflow' },
            { id: 'e11-12', source: '11', target: '12', animated: true, style: { stroke: '#8b5cf6', strokeWidth: 2 } },
            { id: 'e12-13', source: '12', target: '13', animated: true, style: { stroke: '#8b5cf6', strokeWidth: 2 } },
            { id: 'e13-14', source: '13', target: '14', animated: true, style: { stroke: '#8b5cf6', strokeWidth: 2 } },
            
            // Recycle - Orange
            { id: 'e7-15', source: '7', target: '15', animated: true, style: { stroke: '#f59e0b', strokeWidth: 2, strokeDasharray: '5,5' }, label: 'RAS' },
            { id: 'e15-6', source: '15', target: '6', animated: true, style: { stroke: '#f59e0b', strokeWidth: 2, strokeDasharray: '5,5' } },
            
            // Return streams - Teal
            { id: 'e12-3', source: '12', target: '3', animated: true, style: { stroke: '#14b8a6', strokeWidth: 2, strokeDasharray: '5,5' }, label: 'Supernatant' },
            { id: 'e13-3', source: '13', target: '3', animated: true, style: { stroke: '#14b8a6', strokeWidth: 2, strokeDasharray: '5,5' }, label: 'Filtrate' }
        ],
        layout: "vertical",
        title: "Molasses Distillery Wastewater Treatment - Zero Liquid Discharge (ZLD)",
    },

    // Grain-Based Distillery - Ultra Detailed
    "grain": {
        nodes: [
            { id: '1', position: { x: 250, y: 40 }, data: { label: 'Grain Stillage', description: 'COD: 30,000-50,000 mg/L | BOD: 12,000-20,000 mg/L | pH: 4.0-4.5 | Protein: 20-30% | Fiber: 10-15% | TSS: 15,000-25,000 mg/L | Flow: 50-200 m³/day' }, type: 'input', style: { backgroundColor: nodeColors.input.bg, borderColor: nodeColors.input.border, borderWidth: '2px', borderRadius: '8px', padding: '12px', width: '260px' } },
            { id: '2', position: { x: 250, y: 140 }, data: { label: 'Screening (Vibrating Screen)', description: 'Mesh size: 0.5-1.0 mm | Removal: 85-90% of coarse solids | Screen oversize: DDGS recovery | Undersize: To EQ tank | Dewatering screw press' }, style: { backgroundColor: nodeColors.treatment.bg, borderColor: nodeColors.treatment.border, borderWidth: '2px', borderRadius: '8px', padding: '12px', width: '260px' } },
            { id: '3', position: { x: 550, y: 140 }, data: { label: 'DDGS Recovery', description: 'Dried Distillers Grains | Protein: 25-35% | Fat: 8-12% | Fiber: 30-40% | Market: Animal feed (cattle/swine/poultry) | Drying: Rotary drum dryer (10-12% moisture)' }, type: 'output', style: { backgroundColor: nodeColors.output.bg, borderColor: nodeColors.output.border, borderWidth: '2px', borderRadius: '8px', padding: '12px', width: '260px' } },
            { id: '4', position: { x: 250, y: 240 }, data: { label: 'Equalization & pH Control', description: 'HRT: 24-48 hours | Lime addition to pH 6.8-7.2 | Nutrient adjustment (N,P) | Temperature control: 35-38°C | COD:N:P = 350:5:1' }, style: { backgroundColor: nodeColors.treatment.bg, borderColor: nodeColors.treatment.border, borderWidth: '2px', borderRadius: '8px', padding: '12px', width: '260px' } },
            { id: '5', position: { x: 250, y: 340 }, data: { label: 'Anaerobic Digestion (UASB)', description: 'OLR: 8-15 kg COD/m³/day | HRT: 24-36 hours | COD Reduction: 80-85% | Biogas: 0.4-0.5 m³/kg COD removed | CH₄: 55-60% | Granular sludge: 50-100 g/L' }, style: { backgroundColor: nodeColors.biological.bg, borderColor: nodeColors.biological.border, borderWidth: '2px', borderRadius: '8px', padding: '12px', width: '260px' } },
            { id: '6', position: { x: 550, y: 340 }, data: { label: 'Biogas Utilization', description: 'CH₄: 55-60% | CO₂: 40-45% | H₂S: <1,000 ppm | Power: 0.5-1 MW | Steam: 20-30% boiler load | Flare: For excess/startup' }, type: 'output', style: { backgroundColor: nodeColors.output.bg, borderColor: nodeColors.output.border, borderWidth: '2px', borderRadius: '8px', padding: '12px', width: '260px' } },
            { id: '7', position: { x: 250, y: 440 }, data: { label: 'Aerobic Treatment (MBBR)', description: 'Carrier fill: 30-50% | HRT: 18-24 hours | COD Reduction: 85-90% | DO: 3-5 mg/L | Biofilm thickness: 100-200 microns | No sludge recycle needed' }, style: { backgroundColor: nodeColors.chemical.bg, borderColor: nodeColors.chemical.border, borderWidth: '2px', borderRadius: '8px', padding: '12px', width: '260px' } },
            { id: '8', position: { x: 250, y: 540 }, data: { label: 'Secondary Clarifier', description: 'Surface Overflow: 20-30 m³/m²/day | Solids Loading: 80-120 kg/m²/day | Overflow TSS: <30 mg/L | Underflow: 8,000-12,000 mg/L' }, style: { backgroundColor: nodeColors.filtration.bg, borderColor: nodeColors.filtration.border, borderWidth: '2px', borderRadius: '8px', padding: '12px', width: '260px' } },
            { id: '9', position: { x: 250, y: 640 }, data: { label: 'Tertiary Filtration (UF/RO)', description: 'Ultrafiltration: 0.03-0.05 microns | RO: Thin-film composite | Recovery: 75-80% | Permeate TDS: <500 mg/L | Reject: 20-25% (return to EQ)' }, style: { backgroundColor: nodeColors.filtration.bg, borderColor: nodeColors.filtration.border, borderWidth: '2px', borderRadius: '8px', padding: '12px', width: '260px' } },
            { id: '10', position: { x: 250, y: 740 }, data: { label: 'Final Discharge / Reuse', description: 'Permeate: Boiler feed (TDS <500 mg/L) | Cooling tower makeup | Irrigation (nutrient value) | Discharge compliance: CPCB standards' }, type: 'output', style: { backgroundColor: nodeColors.output.bg, borderColor: nodeColors.output.border, borderWidth: '2px', borderRadius: '8px', padding: '12px', width: '260px' } },
            { id: '11', position: { x: 600, y: 540 }, data: { label: 'WAS & Sludge Handling', description: 'Sludge yield: 0.2-0.3 kg MLSS/kg COD | MLVSS/MLSS: 0.8-0.9 | WAS volume: 2-4% of flow | Thickening: Gravity/Dissolved air' }, style: { backgroundColor: nodeColors.sludge.bg, borderColor: nodeColors.sludge.border, borderWidth: '2px', borderRadius: '8px', padding: '12px', width: '260px' } },
            { id: '12', position: { x: 600, y: 640 }, data: { label: 'Filter Press', description: 'Cycle: 4-6 hours | Pressure: 15 bar | Cake solids: 35-45% | Filtrate: Return to EQ | Polymer: 5-8 kg/ton' }, style: { backgroundColor: nodeColors.sludge.bg, borderColor: nodeColors.sludge.border, borderWidth: '2px', borderRadius: '8px', padding: '12px', width: '260px' } },
            { id: '13', position: { x: 600, y: 740 }, data: { label: 'Sludge Disposal', description: 'Composting (with DDGS fines) | Land application (organic fertilizer) | Incineration (if metals present) | Dried sludge: 30-40% solids' }, type: 'output', style: { backgroundColor: nodeColors.sludge.bg, borderColor: nodeColors.sludge.border, borderWidth: '2px', borderRadius: '8px', padding: '12px', width: '260px' } }
        ],
        edges: [
            { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: '#3b82f6', strokeWidth: 2 } },
            { id: 'e2-4', source: '2', target: '4', animated: true, style: { stroke: '#3b82f6', strokeWidth: 2 } },
            { id: 'e2-3', source: '2', target: '3', animated: true, style: { stroke: '#10b981', strokeWidth: 2 }, label: 'Wet cake' },
            { id: 'e4-5', source: '4', target: '5', animated: true, style: { stroke: '#3b82f6', strokeWidth: 2 } },
            { id: 'e5-7', source: '5', target: '7', animated: true, style: { stroke: '#3b82f6', strokeWidth: 2 } },
            { id: 'e5-6', source: '5', target: '6', animated: true, style: { stroke: '#10b981', strokeWidth: 2 }, label: 'Biogas' },
            { id: 'e7-8', source: '7', target: '8', animated: true, style: { stroke: '#3b82f6', strokeWidth: 2 } },
            { id: 'e8-9', source: '8', target: '9', animated: true, style: { stroke: '#3b82f6', strokeWidth: 2 } },
            { id: 'e9-10', source: '9', target: '10', animated: true, style: { stroke: '#3b82f6', strokeWidth: 2 } },
            { id: 'e8-11', source: '8', target: '11', animated: true, style: { stroke: '#8b5cf6', strokeWidth: 2 }, label: 'WAS' },
            { id: 'e11-12', source: '11', target: '12', animated: true, style: { stroke: '#8b5cf6', strokeWidth: 2 } },
            { id: 'e12-13', source: '12', target: '13', animated: true, style: { stroke: '#8b5cf6', strokeWidth: 2 } },
            { id: 'e11-4', source: '11', target: '4', animated: true, style: { stroke: '#14b8a6', strokeWidth: 2, strokeDasharray: '5,5' }, label: 'Supernatant' },
            { id: 'e12-4', source: '12', target: '4', animated: true, style: { stroke: '#14b8a6', strokeWidth: 2, strokeDasharray: '5,5' }, label: 'Filtrate' }
        ],
        layout: "vertical",
        title: "Grain Distillery Wastewater Treatment - DDGS Recovery",
    },

    // Wineries - Ultra Detailed
    "wineries": {
        nodes: [
            { id: '1', position: { x: 50, y: 150 }, data: { label: 'Winery Effluent', description: 'COD: 10,000-25,000 mg/L | BOD: 5,000-12,000 mg/L | pH: 3.5-4.5 (acidic) | TSS: 2,000-8,000 mg/L (skins, seeds, stems) | Flow: 10-100 m³/day | Seasonal: High during harvest (Aug-Oct)' }, type: 'input', style: { backgroundColor: nodeColors.input.bg, borderColor: nodeColors.input.border, borderWidth: '2px', borderRadius: '8px', padding: '12px', width: '280px' } },
            { id: '2', position: { x: 270, y: 150 }, data: { label: 'Screening (Rotary Drum)', description: 'Mesh size: 1-3 mm | Removal: Grape skins, seeds, stems | Removal efficiency: 90-95% | Screenings: Composting (with pomace) | Undersize: To EQ tank' }, style: { backgroundColor: nodeColors.treatment.bg, borderColor: nodeColors.treatment.border, borderWidth: '2px', borderRadius: '8px', padding: '12px', width: '260px' } },
            { id: '3', position: { x: 490, y: 150 }, data: { label: 'Equalization Tank', description: 'HRT: 24-72 hours | Harvest season: Extended capacity | pH adjustment: Lime to pH 6.5-7.5 | Cooling: To <30°C | Coarse bubble mixing | Prevents shock loads' }, style: { backgroundColor: nodeColors.treatment.bg, borderColor: nodeColors.treatment.border, borderWidth: '2px', borderRadius: '8px', padding: '12px', width: '260px' } },
            { id: '4', position: { x: 710, y: 150 }, data: { label: 'pH Neutralization', description: 'Lime slurry (10-20% Ca(OH)₂) dosing | Target pH: 6.5-7.5 | Retention time: 15-30 min | Online pH controller | Acid waste from cleaning: caustic addition' }, style: { backgroundColor: nodeColors.chemical.bg, borderColor: nodeColors.chemical.border, borderWidth: '2px', borderRadius: '8px', padding: '12px', width: '260px' } },
            { id: '5', position: { x: 930, y: 150 }, data: { label: 'Nutrient Addition', description: 'Nitrogen (Urea) + Phosphorus (DAP) | COD:N:P = 100:5:1 | Nutrient deficiency in wine effluent | Dosage: Based on influent COD | Mixing tank with agitator' }, style: { backgroundColor: nodeColors.chemical.bg, borderColor: nodeColors.chemical.border, borderWidth: '2px', borderRadius: '8px', padding: '12px', width: '260px' } },
            { id: '6', position: { x: 1150, y: 150 }, data: { label: 'Biological Treatment (SBR)', description: 'SBR Cycle: Fill(2h)-React(12-16h)-Settle(2h)-Decant(2h)-Idle(2h) | MLSS: 3,000-5,000 mg/L | COD Reduction: 90-95% | DO: 2-3 mg/L | Suitable for seasonal operation (can idle)' }, style: { backgroundColor: nodeColors.biological.bg, borderColor: nodeColors.biological.border, borderWidth: '2px', borderRadius: '8px', padding: '12px', width: '280px' } },
            { id: '7', position: { x: 1370, y: 150 }, data: { label: 'Sand Filter (Polishing)', description: 'Media: Silica sand (0.5-1.0 mm) | Bed depth: 0.8-1.2 m | Filtration rate: 10-20 m³/m²/hr | Backwash: 15-20 min every 12-24 hours | Effluent TSS: <10 mg/L' }, style: { backgroundColor: nodeColors.filtration.bg, borderColor: nodeColors.filtration.border, borderWidth: '2px', borderRadius: '8px', padding: '12px', width: '260px' } },
            { id: '8', position: { x: 1590, y: 150 }, data: { label: 'Final Discharge / Reuse', description: 'CPCB Standards: BOD <30 mg/L | COD <250 mg/L | TSS <100 mg/L | pH 6.5-8.5 | Options: Irrigation (vineyards) | Cooling tower makeup | Local river discharge' }, type: 'output', style: { backgroundColor: nodeColors.output.bg, borderColor: nodeColors.output.border, borderWidth: '2px', borderRadius: '8px', padding: '12px', width: '280px' } },
            { id: '9', position: { x: 1150, y: 350 }, data: { label: 'Waste Activated Sludge', description: 'Sludge yield: 0.3-0.5 kg MLSS/kg COD | WAS volume: 3-6% of flow | Sludge age: 20-30 days | Thickening: Gravity or DAF' }, style: { backgroundColor: nodeColors.sludge.bg, borderColor: nodeColors.sludge.border, borderWidth: '2px', borderRadius: '8px', padding: '12px', width: '260px' } },
            { id: '10', position: { x: 1370, y: 350 }, data: { label: 'Sludge Thickener', description: 'Gravity Thickener | HRT: 12-24 hours | Underflow: 4-6% solids | Overflow: Return to EQ' }, style: { backgroundColor: nodeColors.sludge.bg, borderColor: nodeColors.sludge.border, borderWidth: '2px', borderRadius: '8px', padding: '12px', width: '260px' } },
            { id: '11', position: { x: 1590, y: 350 }, data: { label: 'Filter Press', description: 'Cycle: 3-5 hours | Cake solids: 30-40% | Polymer: 5-8 kg/ton | Filtrate: Return to EQ' }, style: { backgroundColor: nodeColors.sludge.bg, borderColor: nodeColors.sludge.border, borderWidth: '2px', borderRadius: '8px', padding: '12px', width: '260px' } },
            { id: '12', position: { x: 1810, y: 350 }, data: { label: 'Composting', description: 'Mix with grape pomace | C:N ratio: 25-30:1 | Moisture: 50-60% | Turning: Weekly for 8-12 weeks | Final product: Organic soil amendment' }, type: 'output', style: { backgroundColor: nodeColors.output.bg, borderColor: nodeColors.output.border, borderWidth: '2px', borderRadius: '8px', padding: '12px', width: '260px' } },
            { id: '13', position: { x: 490, y: 350 }, data: { label: 'Pomace Composting', description: 'Grape skins, seeds, stems | C:N ratio: 40-50:1 | Mix with sludge for balance | Windrow composting | Final product: Vineyard mulch' }, type: 'output', style: { backgroundColor: nodeColors.output.bg, borderColor: nodeColors.output.border, borderWidth: '2px', borderRadius: '8px', padding: '12px', width: '260px' } }
        ],
        edges: [
            { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: '#3b82f6', strokeWidth: 2 } },
            { id: 'e2-3', source: '2', target: '3', animated: true, style: { stroke: '#3b82f6', strokeWidth: 2 } },
            { id: 'e3-4', source: '3', target: '4', animated: true, style: { stroke: '#3b82f6', strokeWidth: 2 } },
            { id: 'e4-5', source: '4', target: '5', animated: true, style: { stroke: '#3b82f6', strokeWidth: 2 } },
            { id: 'e5-6', source: '5', target: '6', animated: true, style: { stroke: '#3b82f6', strokeWidth: 2 } },
            { id: 'e6-7', source: '6', target: '7', animated: true, style: { stroke: '#3b82f6', strokeWidth: 2 }, label: 'Decant' },
            { id: 'e7-8', source: '7', target: '8', animated: true, style: { stroke: '#3b82f6', strokeWidth: 2 } },
            { id: 'e6-9', source: '6', target: '9', animated: true, style: { stroke: '#8b5cf6', strokeWidth: 2 }, label: 'WAS' },
            { id: 'e9-10', source: '9', target: '10', animated: true, style: { stroke: '#8b5cf6', strokeWidth: 2 } },
            { id: 'e10-11', source: '10', target: '11', animated: true, style: { stroke: '#8b5cf6', strokeWidth: 2 } },
            { id: 'e11-12', source: '11', target: '12', animated: true, style: { stroke: '#8b5cf6', strokeWidth: 2 } },
            { id: 'e2-13', source: '2', target: '13', animated: true, style: { stroke: '#10b981', strokeWidth: 2 }, label: 'Screenings' },
            { id: 'e10-3', source: '10', target: '3', animated: true, style: { stroke: '#14b8a6', strokeWidth: 2, strokeDasharray: '5,5' }, label: 'Supernatant' },
            { id: 'e11-3', source: '11', target: '3', animated: true, style: { stroke: '#14b8a6', strokeWidth: 2, strokeDasharray: '5,5' }, label: 'Filtrate' }
        ],
        layout: "vertical",
        title: "Winery Wastewater Treatment - Seasonal Operation",
    },
};