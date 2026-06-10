import { FlowDiagramData } from "@/types";
import { createComplexEdges, nodeColors } from "../helpers/flowHelpers";

export const chemicalFlows: Record<string, FlowDiagramData> = {
    // Chlor-Alkali Industry - Detailed Process
    "chlor-alkali": {
        nodes: [
            // Primary Treatment Row
            { id: '1', position: { x: 50, y: 80 }, data: { label: 'Chlor-Alkali Effluent', type: 'input', description: 'High pH, Chlorine, Salt' }, type: 'input', style: { backgroundColor: nodeColors.input.bg, borderColor: nodeColors.input.border, borderWidth: '2px', borderRadius: '8px', padding: '10px', width: '170px', textAlign: 'center' } },
            { id: '2', position: { x: 240, y: 80 }, data: { label: 'Equalization Tank', description: 'Flow & Load Balancing', type: 'treatment' }, style: { backgroundColor: nodeColors.treatment.bg, borderColor: nodeColors.treatment.border, borderWidth: '2px', borderRadius: '8px', padding: '10px', width: '170px', textAlign: 'center' } },
            { id: '3', position: { x: 430, y: 80 }, data: { label: 'Neutralization', description: 'pH Adjustment with Acid', type: 'chemical' }, style: { backgroundColor: nodeColors.chemical.bg, borderColor: nodeColors.chemical.border, borderWidth: '2px', borderRadius: '8px', padding: '10px', width: '170px', textAlign: 'center' } },
            { id: '4', position: { x: 620, y: 80 }, data: { label: 'Dechlorination', description: 'Chlorine Removal (SO₂/NaHSO₃)', type: 'chemical' }, style: { backgroundColor: nodeColors.chemical.bg, borderColor: nodeColors.chemical.border, borderWidth: '2px', borderRadius: '8px', padding: '10px', width: '190px', textAlign: 'center' } },
            { id: '5', position: { x: 830, y: 80 }, data: { label: 'Coagulation', description: 'Alum/FeCl₃ Addition', type: 'chemical' }, style: { backgroundColor: nodeColors.chemical.bg, borderColor: nodeColors.chemical.border, borderWidth: '2px', borderRadius: '8px', padding: '10px', width: '170px', textAlign: 'center' } },
            
            // Secondary Treatment Row
            { id: '6', position: { x: 240, y: 220 }, data: { label: 'Primary Clarifier', description: 'Solids Settling', type: 'treatment' }, style: { backgroundColor: nodeColors.treatment.bg, borderColor: nodeColors.treatment.border, borderWidth: '2px', borderRadius: '8px', padding: '10px', width: '170px', textAlign: 'center' } },
            { id: '7', position: { x: 430, y: 220 }, data: { label: 'Biological Treatment', description: 'Activated Sludge Process', type: 'biological' }, style: { backgroundColor: nodeColors.biological.bg, borderColor: nodeColors.biological.border, borderWidth: '2px', borderRadius: '8px', padding: '10px', width: '190px', textAlign: 'center' } },
            { id: '8', position: { x: 620, y: 220 }, data: { label: 'Secondary Clarifier', description: 'Biomass Separation', type: 'treatment' }, style: { backgroundColor: nodeColors.treatment.bg, borderColor: nodeColors.treatment.border, borderWidth: '2px', borderRadius: '8px', padding: '10px', width: '170px', textAlign: 'center' } },
            
            // Tertiary Treatment Row
            { id: '9', position: { x: 430, y: 360 }, data: { label: 'Multi-Media Filtration', description: 'Sand & Carbon Filters', type: 'filtration' }, style: { backgroundColor: nodeColors.filtration.bg, borderColor: nodeColors.filtration.border, borderWidth: '2px', borderRadius: '8px', padding: '10px', width: '190px', textAlign: 'center' } },
            { id: '10', position: { x: 830, y: 220 }, data: { label: 'Final Discharge', type: 'output' }, type: 'output', style: { backgroundColor: nodeColors.output.bg, borderColor: nodeColors.output.border, borderWidth: '2px', borderRadius: '8px', padding: '10px', width: '150px', textAlign: 'center' } },
            { id: '11', position: { x: 830, y: 360 }, data: { label: 'Recycled Water', type: 'output' }, type: 'output', style: { backgroundColor: nodeColors.output.bg, borderColor: nodeColors.output.border, borderWidth: '2px', borderRadius: '8px', padding: '10px', width: '150px', textAlign: 'center' } },
            
            // Sludge Treatment (Right Side)
            { id: '12', position: { x: 1050, y: 80 }, data: { label: 'Sludge Thickener', type: 'sludge' }, style: { backgroundColor: nodeColors.sludge.bg, borderColor: nodeColors.sludge.border, borderWidth: '2px', borderRadius: '8px', padding: '10px', width: '150px', textAlign: 'center' } },
            { id: '13', position: { x: 1050, y: 200 }, data: { label: 'Filter Press', type: 'sludge' }, style: { backgroundColor: nodeColors.sludge.bg, borderColor: nodeColors.sludge.border, borderWidth: '2px', borderRadius: '8px', padding: '10px', width: '150px', textAlign: 'center' } },
            { id: '14', position: { x: 1050, y: 320 }, data: { label: 'Secured Landfill', type: 'sludge' }, style: { backgroundColor: nodeColors.sludge.bg, borderColor: nodeColors.sludge.border, borderWidth: '2px', borderRadius: '8px', padding: '10px', width: '150px', textAlign: 'center' } },
        ],
        edges: createComplexEdges([
            // Main treatment flow
            { source: '1', target: '2', animated: true, label: 'Raw Effluent' },
            { source: '2', target: '3', animated: true },
            { source: '3', target: '4', animated: true },
            { source: '4', target: '5', animated: true },
            { source: '5', target: '6', animated: true, label: 'Flocculated Water' },
            { source: '6', target: '7', animated: true, label: 'Supernatant' },
            { source: '7', target: '8', animated: true },
            { source: '8', target: '9', animated: true, label: 'Overflow' },
            { source: '9', target: '10', animated: true, label: 'Treated Water' },
            { source: '9', target: '11', animated: true, label: 'RO Permeate', style: { stroke: '#10b981', strokeWidth: 2 } },
            
            // Sludge lines
            { source: '6', target: '12', animated: true, label: 'Primary Sludge', style: { stroke: '#8b5cf6', strokeWidth: 2 } },
            { source: '8', target: '12', animated: true, label: 'Waste Sludge', style: { stroke: '#8b5cf6', strokeWidth: 2 } },
            { source: '12', target: '13', animated: true, style: { stroke: '#8b5cf6', strokeWidth: 2 } },
            { source: '13', target: '14', animated: true, style: { stroke: '#8b5cf6', strokeWidth: 2 } },
            
            // Return sludge recycle
            { source: '8', target: '7', animated: true, label: 'Return Sludge', style: { stroke: '#10b981', strokeWidth: 2, strokeDasharray: '5,5' } },
        ]),
        layout: "vertical",
        title: "Chlor-Alkali Wastewater Treatment Process",
        description: "Complete treatment including dechlorination, biological treatment, and sludge management"
    },

    // Acid-Alkali Industry - Detailed Process
    "acid-alkali": {
        nodes: [
            // Primary Treatment
            { id: '1', position: { x: 50, y: 100 }, data: { label: 'Acid-Alkali Effluent', type: 'input', description: 'pH 1.5-12.5' }, type: 'input', style: { backgroundColor: nodeColors.input.bg, borderColor: nodeColors.input.border, borderWidth: '2px', borderRadius: '8px', padding: '10px', width: '170px', textAlign: 'center' } },
            { id: '2', position: { x: 240, y: 100 }, data: { label: 'Collection Tank', description: 'Flow Equalization', type: 'treatment' }, style: { backgroundColor: nodeColors.treatment.bg, borderColor: nodeColors.treatment.border, borderWidth: '2px', borderRadius: '8px', padding: '10px', width: '170px', textAlign: 'center' } },
            { id: '3', position: { x: 430, y: 100 }, data: { label: 'Two-Stage Neutralization', description: 'Acid/Base Dosing', type: 'chemical' }, style: { backgroundColor: nodeColors.chemical.bg, borderColor: nodeColors.chemical.border, borderWidth: '2px', borderRadius: '8px', padding: '10px', width: '200px', textAlign: 'center' } },
            { id: '4', position: { x: 650, y: 100 }, data: { label: 'Coagulation', description: 'Metal Precipitation', type: 'chemical' }, style: { backgroundColor: nodeColors.chemical.bg, borderColor: nodeColors.chemical.border, borderWidth: '2px', borderRadius: '8px', padding: '10px', width: '170px', textAlign: 'center' } },
            
            // Secondary Treatment
            { id: '5', position: { x: 240, y: 250 }, data: { label: 'Primary Clarifier', type: 'treatment' }, style: { backgroundColor: nodeColors.treatment.bg, borderColor: nodeColors.treatment.border, borderWidth: '2px', borderRadius: '8px', padding: '10px', width: '170px', textAlign: 'center' } },
            { id: '6', position: { x: 430, y: 250 }, data: { label: 'Heavy Metals Removal', description: 'Chemical Precipitation', type: 'chemical' }, style: { backgroundColor: nodeColors.chemical.bg, borderColor: nodeColors.chemical.border, borderWidth: '2px', borderRadius: '8px', padding: '10px', width: '190px', textAlign: 'center' } },
            { id: '7', position: { x: 650, y: 250 }, data: { label: 'Polishing Pond', description: 'Final Clarification', type: 'treatment' }, style: { backgroundColor: nodeColors.treatment.bg, borderColor: nodeColors.treatment.border, borderWidth: '2px', borderRadius: '8px', padding: '10px', width: '170px', textAlign: 'center' } },
            { id: '8', position: { x: 880, y: 175 }, data: { label: 'Final Discharge', type: 'output' }, type: 'output', style: { backgroundColor: nodeColors.output.bg, borderColor: nodeColors.output.border, borderWidth: '2px', borderRadius: '8px', padding: '10px', width: '150px', textAlign: 'center' } },
            
            // Sludge Treatment
            { id: '9', position: { x: 240, y: 400 }, data: { label: 'Sludge Holding', type: 'sludge' }, style: { backgroundColor: nodeColors.sludge.bg, borderColor: nodeColors.sludge.border, borderWidth: '2px', borderRadius: '8px', padding: '10px', width: '150px', textAlign: 'center' } },
            { id: '10', position: { x: 430, y: 400 }, data: { label: 'Filter Press', type: 'sludge' }, style: { backgroundColor: nodeColors.sludge.bg, borderColor: nodeColors.sludge.border, borderWidth: '2px', borderRadius: '8px', padding: '10px', width: '150px', textAlign: 'center' } },
            { id: '11', position: { x: 620, y: 400 }, data: { label: 'Secured Landfill', type: 'sludge' }, style: { backgroundColor: nodeColors.sludge.bg, borderColor: nodeColors.sludge.border, borderWidth: '2px', borderRadius: '8px', padding: '10px', width: '160px', textAlign: 'center' } },
        ],
        edges: createComplexEdges([
            // Main flow
            { source: '1', target: '2', animated: true },
            { source: '2', target: '3', animated: true },
            { source: '3', target: '4', animated: true },
            { source: '4', target: '5', animated: true },
            { source: '5', target: '6', animated: true, label: 'Supernatant' },
            { source: '6', target: '7', animated: true },
            { source: '7', target: '8', animated: true },
            
            // Sludge lines
            { source: '5', target: '9', animated: true, label: 'Primary Sludge', style: { stroke: '#8b5cf6', strokeWidth: 2 } },
            { source: '6', target: '9', animated: true, label: 'Metal Sludge', style: { stroke: '#8b5cf6', strokeWidth: 2 } },
            { source: '9', target: '10', animated: true, style: { stroke: '#8b5cf6', strokeWidth: 2 } },
            { source: '10', target: '11', animated: true, style: { stroke: '#8b5cf6', strokeWidth: 2 } },
        ]),
        layout: "vertical",
        title: "Acid-Alkali Wastewater Treatment Process",
        description: "Complete neutralization and metals removal for acid-alkali industry"
    },

    // Dye & Pigments Industry - Detailed Process
    "dye-pigments": {
        nodes: [
            // Primary Treatment
            { id: '1', position: { x: 50, y: 100 }, data: { label: 'Dye & Pigment Effluent', type: 'input', description: 'High Color, COD' }, type: 'input', style: { backgroundColor: nodeColors.input.bg, borderColor: nodeColors.input.border, borderWidth: '2px', borderRadius: '8px', padding: '10px', width: '180px', textAlign: 'center' } },
            { id: '2', position: { x: 250, y: 100 }, data: { label: 'Screening & Equalization', description: 'Debris Removal & Flow Balancing', type: 'treatment' }, style: { backgroundColor: nodeColors.treatment.bg, borderColor: nodeColors.treatment.border, borderWidth: '2px', borderRadius: '8px', padding: '10px', width: '200px', textAlign: 'center' } },
            { id: '3', position: { x: 470, y: 100 }, data: { label: 'Chemical Coagulation', description: 'Alum/PAC Addition', type: 'chemical' }, style: { backgroundColor: nodeColors.chemical.bg, borderColor: nodeColors.chemical.border, borderWidth: '2px', borderRadius: '8px', padding: '10px', width: '180px', textAlign: 'center' } },
            { id: '4', position: { x: 670, y: 100 }, data: { label: 'Primary Clarifier', type: 'treatment' }, style: { backgroundColor: nodeColors.treatment.bg, borderColor: nodeColors.treatment.border, borderWidth: '2px', borderRadius: '8px', padding: '10px', width: '160px', textAlign: 'center' } },
            
            // Secondary Treatment (Advanced)
            { id: '5', position: { x: 150, y: 250 }, data: { label: 'Color Removal', description: 'Adsorption / Coagulation', type: 'chemical' }, style: { backgroundColor: nodeColors.chemical.bg, borderColor: nodeColors.chemical.border, borderWidth: '2px', borderRadius: '8px', padding: '10px', width: '180px', textAlign: 'center' } },
            { id: '6', position: { x: 370, y: 250 }, data: { label: 'Advanced Oxidation', description: 'Ozone/H₂O₂/UV', type: 'chemical' }, style: { backgroundColor: nodeColors.chemical.bg, borderColor: nodeColors.chemical.border, borderWidth: '2px', borderRadius: '8px', padding: '10px', width: '190px', textAlign: 'center' } },
            { id: '7', position: { x: 590, y: 250 }, data: { label: 'Biological Treatment', description: 'Activated Sludge / MBBR', type: 'biological' }, style: { backgroundColor: nodeColors.biological.bg, borderColor: nodeColors.biological.border, borderWidth: '2px', borderRadius: '8px', padding: '10px', width: '200px', textAlign: 'center' } },
            { id: '8', position: { x: 810, y: 250 }, data: { label: 'Secondary Clarifier', type: 'treatment' }, style: { backgroundColor: nodeColors.treatment.bg, borderColor: nodeColors.treatment.border, borderWidth: '2px', borderRadius: '8px', padding: '10px', width: '160px', textAlign: 'center' } },
            
            // Tertiary Treatment
            { id: '9', position: { x: 370, y: 400 }, data: { label: 'Activated Carbon Filtration', description: 'GAC Adsorption', type: 'filtration' }, style: { backgroundColor: nodeColors.filtration.bg, borderColor: nodeColors.filtration.border, borderWidth: '2px', borderRadius: '8px', padding: '10px', width: '200px', textAlign: 'center' } },
            { id: '10', position: { x: 590, y: 400 }, data: { label: 'Membrane Filtration', description: 'UF/RO System', type: 'filtration' }, style: { backgroundColor: nodeColors.filtration.bg, borderColor: nodeColors.filtration.border, borderWidth: '2px', borderRadius: '8px', padding: '10px', width: '190px', textAlign: 'center' } },
            { id: '11', position: { x: 1020, y: 175 }, data: { label: 'Final Discharge', type: 'output' }, type: 'output', style: { backgroundColor: nodeColors.output.bg, borderColor: nodeColors.output.border, borderWidth: '2px', borderRadius: '8px', padding: '10px', width: '150px', textAlign: 'center' } },
            { id: '12', position: { x: 1020, y: 325 }, data: { label: 'Recycled Water', type: 'output' }, type: 'output', style: { backgroundColor: nodeColors.output.bg, borderColor: nodeColors.output.border, borderWidth: '2px', borderRadius: '8px', padding: '10px', width: '150px', textAlign: 'center' } },
            
            // Sludge Treatment
            { id: '13', position: { x: 150, y: 400 }, data: { label: 'Sludge Thickener', type: 'sludge' }, style: { backgroundColor: nodeColors.sludge.bg, borderColor: nodeColors.sludge.border, borderWidth: '2px', borderRadius: '8px', padding: '10px', width: '160px', textAlign: 'center' } },
            { id: '14', position: { x: 150, y: 520 }, data: { label: 'Filter Press', type: 'sludge' }, style: { backgroundColor: nodeColors.sludge.bg, borderColor: nodeColors.sludge.border, borderWidth: '2px', borderRadius: '8px', padding: '10px', width: '150px', textAlign: 'center' } },
            { id: '15', position: { x: 150, y: 640 }, data: { label: 'Sludge Disposal', type: 'sludge' }, style: { backgroundColor: nodeColors.sludge.bg, borderColor: nodeColors.sludge.border, borderWidth: '2px', borderRadius: '8px', padding: '10px', width: '150px', textAlign: 'center' } },
        ],
        edges: createComplexEdges([
            // Main treatment flow
            { source: '1', target: '2', animated: true },
            { source: '2', target: '3', animated: true },
            { source: '3', target: '4', animated: true },
            { source: '4', target: '5', animated: true, label: 'Overflow' },
            { source: '5', target: '6', animated: true },
            { source: '6', target: '7', animated: true },
            { source: '7', target: '8', animated: true },
            { source: '8', target: '9', animated: true, label: 'Overflow' },
            { source: '9', target: '10', animated: true },
            { source: '10', target: '11', animated: true, label: 'Treated Water' },
            { source: '10', target: '12', animated: true, label: 'RO Permeate', style: { stroke: '#10b981', strokeWidth: 2 } },
            
            // Sludge lines
            { source: '4', target: '13', animated: true, label: 'Primary Sludge', style: { stroke: '#8b5cf6', strokeWidth: 2 } },
            { source: '8', target: '13', animated: true, label: 'Waste Sludge', style: { stroke: '#8b5cf6', strokeWidth: 2 } },
            { source: '13', target: '14', animated: true, style: { stroke: '#8b5cf6', strokeWidth: 2 } },
            { source: '14', target: '15', animated: true, style: { stroke: '#8b5cf6', strokeWidth: 2 } },
            
            // Return sludge recycle
            { source: '8', target: '7', animated: true, label: 'Return Sludge', style: { stroke: '#10b981', strokeWidth: 2, strokeDasharray: '5,5' } },
        ]),
        layout: "vertical",
        title: "Dye & Pigment Wastewater Treatment Process",
        description: "Comprehensive color removal and advanced treatment for dye industry effluent"
    },
};