export const industries = [
  {
    id: 'pharma',
    name: 'Pharmaceutical Industry',
    subCategories: [
      { id: 'api-bulk', name: 'Bulk Drug (API)', challenges: ["Managing Refractory COD (non-biodegradable organics)", "Recovering complex solvents (Methanol/Toluene)"], typicalValues: { cod: 12000, bod: 4000, ph: 6.5, tss: 800, tds: 5000 } },
      { id: 'formulation', name: 'Formulation', challenges: ["Handling high batch variability", "Managing erratic pH shifts (sugars vs acids)"], typicalValues: { cod: 1500, bod: 400, ph: 7.2, tss: 300, tds: 1200 } },
      { id: 'biologics', name: 'Biologics', challenges: ["Maintaining sterile conditions", "Preventing wild bacteria from contaminating WTP"], typicalValues: { cod: 8000, bod: 4500, ph: 6.8, tss: 1200, tds: 2500 } },
      { id: 'rd-labs', name: 'R&D Labs', challenges: ["Dealing with unknown chemical mixtures", "Treating very small but highly concentrated toxic volumes"], typicalValues: { cod: 3000, bod: 500, ph: 7.0, tss: 200, tds: 4000 } }
    ]
  },
  {
    id: 'distillery',
    name: 'Distillery & Fermentation',
    subCategories: [
      { id: 'molasses', name: 'Molasses-Based', challenges: ["Achieving Zero Liquid Discharge (ZLD)", "Extreme COD loading and dark melanoidin color"], typicalValues: { cod: 100000, bod: 45000, ph: 4.2, tss: 4000, tds: 25000 } },
      { id: 'grain', name: 'Grain-Based', challenges: ["Separating fine suspended proteins", "Preventing mash waste from clogging biological filters"], typicalValues: { cod: 40000, bod: 18000, ph: 4.5, tss: 6000, tds: 8000 } },
      { id: 'wineries', name: 'Wineries', challenges: ["Managing extreme organic shock loads during harvest", "Maintaining plant biology while idle in off-season"], typicalValues: { cod: 15000, bod: 7500, ph: 3.8, tss: 2500, tds: 3000 } }
    ]
  },
  {
    id: 'textile',
    name: 'Textile & Dyeing',
    subCategories: [
      { id: 'cotton', name: 'Cotton Processing', challenges: ["Neutralizing extremely high pH levels from scouring", "Removing natural waxes and pectins"], typicalValues: { cod: 2000, bod: 600, ph: 9.5, tss: 400, tds: 3500 } },
      { id: 'synthetic', name: 'Synthetic Textile Processing', challenges: ["Treating disperse and reactive dyes", "Filtering out synthetic microfibers"], typicalValues: { cod: 3000, bod: 800, ph: 8.0, tss: 250, tds: 2200 } },
      { id: 'wool', name: 'Wool Processing', challenges: ["Degumming waste and heavy organics", "High lanolin, fat, and grease content"], typicalValues: { cod: 7500, bod: 3000, ph: 9.5, tss: 2000, tds: 4500 } },
      { id: 'denim', name: 'Denim & Garment Washing', challenges: ["Indigo dye removal and color stripping", "High suspended solids from pumice stone washing"], typicalValues: { cod: 2500, bod: 700, ph: 7.5, tss: 1500, tds: 3500 } },
      { id: 'printing', name: 'Textile Printing', challenges: ["Breaking down complex thickener pastes", "Heavy metal contamination from pigments"], typicalValues: { cod: 4500, bod: 1200, ph: 8.5, tss: 500, tds: 5000 } }
    ]
  },
  {
    id: 'pulp-paper',
    name: 'Pulp & Paper Mills',
    subCategories: [
      { id: 'chemical-pulping', name: 'Chemical Pulping', challenges: ["Recovering toxic Black Liquor for chemical reuse", "Preventing ecosystem collapse from lignin discharge"], typicalValues: { cod: 8000, bod: 2500, ph: 10.0, tss: 1500, tds: 4500 } },
      { id: 'bleaching', name: 'Bleaching', challenges: ["Reducing Adsorbable Organic Halides (AOX)", "Removing carcinogenic organochlorine by-products"], typicalValues: { cod: 3000, bod: 900, ph: 3.5, tss: 500, tds: 2500 } },
      { id: 'recycled', name: 'Recycled Paper', challenges: ["Managing stickies (glues and adhesives)", "Filtering out microplastics that foul membranes"], typicalValues: { cod: 4500, bod: 1800, ph: 7.2, tss: 3500, tds: 2500 } }
    ]
  },
  {
    id: 'tannery',
    name: 'Tannery & Leather Processing',
    subCategories: [
      { id: 'beamhouse', name: 'Beamhouse Operations', challenges: ["Managing lethal hydrogen sulfide gas", "Extremely high TDS from hide curing salts"], typicalValues: { cod: 6500, bod: 2800, ph: 11.0, tss: 4500, tds: 20000 } },
      { id: 'chrome', name: 'Chrome Tanning', challenges: ["High capital cost of Chrome Recovery Units", "Ensuring Hexavalent Chromium does not leak"], typicalValues: { cod: 4000, bod: 1500, ph: 3.8, tss: 2200, tds: 15000 } },
      { id: 'vegetable', name: 'Vegetable Tanning', challenges: ["High organic plant extract load", "Difficult color removal from tannins"], typicalValues: { cod: 10000, bod: 4000, ph: 5.0, tss: 3000, tds: 11000 } },
      { id: 'leather-finishing', name: 'Leather Dyeing & Finishing', challenges: ["Handling organic animal fats in suspension", "Treating synthetic polymer finishing coatings"], typicalValues: { cod: 5500, bod: 2000, ph: 8.0, tss: 1500, tds: 7500 } }
    ]
  },
  {
    id: 'oil-refinery',
    name: 'Oil Refineries & Petrochemicals',
    subCategories: [
      { id: 'desalting', name: 'Desalting', challenges: ["Removing high salt from crude oil emulsions", "Preventing severe corrosion in treatment pipes"], typicalValues: { cod: 2500, bod: 500, ph: 6.8, tss: 400, tds: 30000 } },
      { id: 'cracking', name: 'Catalytic Cracking', challenges: ["Breaking down highly stable phenolic rings", "Removing compounds strictly toxic to biological bacteria"], typicalValues: { cod: 3500, bod: 800, ph: 8.5, tss: 600, tds: 4000 } },
      { id: 'polymer', name: 'Polymer Production', challenges: ["Filtering out microscopic plastic nurdles", "Preventing synthetic polymers from reaching open water"], typicalValues: { cod: 1500, bod: 300, ph: 7.2, tss: 2000, tds: 1500 } }
    ]
  },
  {
    id: 'dairy-food',
    name: 'Dairy & Food Processing',
    subCategories: [
      { id: 'dairy', name: 'Dairy Processing', challenges: ["Preventing fat caps that physically block oxygen transfer", "Rapid anaerobic decay causing severe plant odors"], typicalValues: { cod: 4500, bod: 2500, ph: 5.5, tss: 1200, tds: 1500 } },
      { id: 'meat', name: 'Meat & Poultry Processing', challenges: ["Eliminating massive loads of nitrogen and phosphorus", "Preventing downstream eutrophication and algae growth"], typicalValues: { cod: 7000, bod: 3500, ph: 6.8, tss: 2500, tds: 2000 } },
      { id: 'fruit-veg', name: 'Fruit & Vegetable Processing', challenges: ["Dealing with highly acidic fruit juices", "Managing rapidly fermenting sugars that drop system pH"], typicalValues: { cod: 6000, bod: 3500, ph: 4.5, tss: 1800, tds: 1200 } },
      { id: 'cip', name: 'Cleaning & CIP Operations', challenges: ["Handling extreme pH swings from acid/caustic wash", "Massive surfactant and detergent loads"], typicalValues: { cod: 3500, bod: 1200, ph: 10.5, tss: 800, tds: 4500 } }
    ]
  },
  {
    id: 'fertilizer',
    name: 'Fertilizer Manufacturing',
    subCategories: [
      { id: 'ammonia', name: 'Ammonia & Urea Production', challenges: ["High energy requirements for ammonia stripping towers", "Preventing toxic ammonia discharge lethal to fish"], typicalValues: { cod: 200, bod: 50, ph: 9.5, tss: 100, tds: 3500 } },
      { id: 'phosphate', name: 'Phosphate Fertilizer Production', challenges: ["Managing massive phosphogypsum stacks", "Dealing with severe fluoride toxicity in wastewater"], typicalValues: { cod: 150, bod: 30, ph: 2.5, tss: 800, tds: 8000 } },
      { id: 'nitrate', name: 'Nitrate Fertilizer Production', challenges: ["Extreme nutrient loads promoting algal blooms", "Preventing aquatic dead zones downstream"], typicalValues: { cod: 100, bod: 25, ph: 7.0, tss: 200, tds: 5500 } },
      { id: 'granulation', name: 'Granulation & Cleaning Operations', challenges: ["High suspended solids from product dust", "Managing chemical dust runoff during rain events"], typicalValues: { cod: 400, bod: 100, ph: 8.0, tss: 2000, tds: 7000 } }
    ]
  },
  {
    id: 'iron-steel',
    name: 'Iron & Steel Plants',
    subCategories: [
      { id: 'coke-ovens', name: 'Coke Oven Operations', challenges: ["Keeping cyanide levels strictly below lethal limits", "Protecting downstream WTP microbes from total wipeout"], typicalValues: { cod: 4000, bod: 800, ph: 8.8, tss: 500, tds: 5000 } },
      { id: 'blast-furnace', name: 'Blast Furnace Operations', challenges: ["Cooling high-temperature water discharge", "Managing massive iron dust and particulate loads"], typicalValues: { cod: 250, bod: 50, ph: 7.5, tss: 3500, tds: 2000 } },
      { id: 'rolling-mill', name: 'Rolling Mill Operations', challenges: ["Separating chemically bonded emulsified oils", "Handling heavy scale and metal flakes"], typicalValues: { cod: 1000, bod: 200, ph: 7.0, tss: 1200, tds: 1500 } },
      { id: 'pickling', name: 'Pickling Operations', challenges: ["Safe disposal or regeneration of Spent Pickle Liquor", "Neutralizing massive volumes of strong industrial acids"], typicalValues: { cod: 100, bod: 0, ph: 1.5, tss: 1200, tds: 15000 } },
      { id: 'gas-scrubbing', name: 'Cooling & Gas Scrubbing', challenges: ["Treating sour water generated from gas cleaning", "Removing trace heavy metals and dissolved gases"], typicalValues: { cod: 400, bod: 100, ph: 8.5, tss: 2500, tds: 3500 } }
    ]
  },
  {
    id: 'electroplating',
    name: 'Electroplating & Metal Finishing',
    subCategories: [
      { id: 'electroplating-ops', name: 'Electroplating Operations', challenges: ["Preventing lethal Cyanide gas formation during pH adjustment", "Complete destruction of cyanide complexes before metal precipitation"], typicalValues: { cod: 250, bod: 50, ph: 8.0, tss: 500, tds: 6500 } },
      { id: 'acid-pickling-etching', name: 'Acid Pickling & Etching', challenges: ["Maintaining precise pH control loops to precipitate heavy metals", "Managing massive volumes of hazardous toxic sludge"], typicalValues: { cod: 150, bod: 20, ph: 2.0, tss: 1000, tds: 10000 } },
      { id: 'surface-finishing', name: 'Surface Finishing & Polishing', challenges: ["Managing high aluminum sludge from anodizing", "Removing fine abrasive grit and polishing compounds"], typicalValues: { cod: 500, bod: 100, ph: 8.0, tss: 2000, tds: 4000 } }
    ]
  },
  {
    id: 'thermal-power',
    name: 'Thermal Power Plants',
    subCategories: [
      { id: 'cooling-tower', name: 'Cooling Tower Blowdown', challenges: ["Meeting strict Delta-T environmental laws", "Preventing thermal shock that cooks local aquatic life"], typicalValues: { cod: 50, bod: 10, ph: 8.0, tss: 50, tds: 2500 } },
      { id: 'ash-handling', name: 'Ash Handling Systems', challenges: ["Preventing toxic heavy metals from leaching from ash ponds", "Protecting local groundwater aquifers from contamination"], typicalValues: { cod: 100, bod: 10, ph: 9.5, tss: 4000, tds: 2500 } },
      { id: 'boiler-blowdown', name: 'Boiler Blowdown', challenges: ["Removing anti-scaling chemical inhibitors", "Treating extreme high alkalinity in localized blowdown"], typicalValues: { cod: 60, bod: 15, ph: 10.5, tss: 100, tds: 3500 } }
    ]
  },
  {
    id: 'sugar',
    name: 'Sugar Industry',
    subCategories: [
      { id: 'cane-crushing', name: 'Cane Crushing', challenges: ["Preventing rapid growth of filamentous bacteria", "Stopping treatment sludge from floating instead of settling"], typicalValues: { cod: 4500, bod: 2000, ph: 5.5, tss: 1500, tds: 2000 } },
      { id: 'clarification', name: 'Clarification', challenges: ["Managing bulky Press Mud", "Handling massive volumes of wet, solid organic waste"], typicalValues: { cod: 3000, bod: 1500, ph: 6.0, tss: 2000, tds: 1800 } },
      { id: 'distillery-int', name: 'Distillery Integration', challenges: ["Balancing heat transfer between two connected plants", "Managing extreme combined organic loads (Sugar + Molasses)"], typicalValues: { cod: 65000, bod: 28000, ph: 4.8, tss: 3500, tds: 18000 } }
    ]
  },
  {
    id: 'pesticide',
    name: 'Pesticide & Agrochemicals',
    subCategories: [
      { id: 'insecticides', name: 'Insecticides', challenges: ["Total destruction of neurotoxic chemical molecules", "Ensuring active chemicals do not enter human water cycles"], typicalValues: { cod: 15000, bod: 2000, ph: 6.5, tss: 500, tds: 10000 } },
      { id: 'herbicides', name: 'Herbicides', challenges: ["Treating chemicals explicitly designed to kill plant life", "Requirement for Advanced Oxidation Processes (AOP)"], typicalValues: { cod: 12000, bod: 1500, ph: 4.5, tss: 400, tds: 8000 } },
      { id: 'fungicides', name: 'Fungicides', challenges: ["Removing heavy metal catalysts like copper", "Preventing inhibition of vital bacterial growth in WTPs"], typicalValues: { cod: 10000, bod: 1800, ph: 6.0, tss: 800, tds: 7500 } }
    ]
  },
  {
    id: 'chemical',
    name: 'Chemical & Specialty Chemicals',
    subCategories: [
      { id: 'chlor-alkali', name: 'Chlor-Alkali', challenges: ["Legacy challenge of environmental mercury remediation", "Balancing extreme salt and chlorine loading in effluent"], typicalValues: { cod: 200, bod: 0, ph: 12.5, tss: 100, tds: 45000 } },
      { id: 'acid-alkali', name: 'Acid/Alkali', challenges: ["High operational cost of continuously neutralizing chemicals", "Buying massive volumes of lime just to fight industrial acid"], typicalValues: { cod: 100, bod: 0, ph: 1.5, tss: 200, tds: 25000 } },
      { id: 'dye-pigments', name: 'Dye/Pigments', challenges: ["Reducing Chemical Oxygen Demand (COD) loaded with non-biodegradables", "Treating intense color visible even at parts-per-billion"], typicalValues: { cod: 25000, bod: 3000, ph: 7.0, tss: 1500, tds: 15000 } }
    ]
  },
  {
    id: 'slaughterhouse',
    name: 'Slaughterhouses & Rendering',
    subCategories: [
      { id: 'slaughtering', name: 'Slaughtering Operations', challenges: ["Screening out destructive solids (manure/hooves) that clog pumps", "Managing unpredictable extreme high-protein blood surges"], typicalValues: { cod: 9000, bod: 4500, ph: 7.2, tss: 3500, tds: 3000 } },
      { id: 'rendering', name: 'Rendering Operations', challenges: ["Cooling and treating high-temperature, high-fat effluent", "Preventing the system from going anaerobic and releasing putrid odors"], typicalValues: { cod: 15000, bod: 8000, ph: 6.5, tss: 5000, tds: 4000 } },
      { id: 'sanitation', name: 'Cleaning & Sanitation', challenges: ["High pathogen risk requiring stringent disinfection", "Extreme washdown surges at end of shift"], typicalValues: { cod: 3500, bod: 1500, ph: 9.0, tss: 1000, tds: 2500 } }
    ]
  },
  {
    id: 'mining',
    name: 'Mining & Ore Processing',
    subCategories: [
      { id: 'ore-washing', name: 'Ore Washing & Screening', challenges: ["Massive sediment loads causing high turbidity", "Requirement for vast settling ponds to drop out rock dust"], typicalValues: { cod: 200, bod: 30, ph: 7.5, tss: 10000, tds: 2000 } },
      { id: 'flotation', name: 'Flotation & Mineral Processing', challenges: ["Treating toxic flotation reagents (xanthates/frothers)", "Heavy metal separation from fine ore suspensions"], typicalValues: { cod: 400, bod: 50, ph: 8.5, tss: 5500, tds: 3500 } },
      { id: 'amd', name: 'Acid Mine Drainage', challenges: ["Treating highly acidic water indefinitely, long after mine closure", "High concentrations of dissolved iron turning water orange"], typicalValues: { cod: 50, bod: 0, ph: 2.5, tss: 1200, tds: 6000 } }
    ]
  },
  {
    id: 'fmcg',
    name: 'FMCG (Fast Moving Consumer Goods)',
    subCategories: [
      { id: 'personal-care', name: 'Personal Care', challenges: ["Breaking down synthetic fragrances and preservatives", "Managing massive foaming in aeration tanks due to surfactants"], typicalValues: { cod: 5000, bod: 2500, ph: 8.5, tss: 800, tds: 2000 } },
      { id: 'home-care', name: 'Home Care', challenges: ["Removing high levels of chemical phosphates", "Complying with regional bans to protect lakes from algal blooms"], typicalValues: { cod: 6500, bod: 3000, ph: 9.2, tss: 1000, tds: 4500 } },
      { id: 'cosmetics', name: 'Cosmetics', challenges: ["Filtering out waterproof waxes and synthetic oils", "Handling compounds that easily bypass standard grit separation"], typicalValues: { cod: 8000, bod: 3000, ph: 7.5, tss: 1200, tds: 2500 } }
    ]
  }
];