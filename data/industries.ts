export const industries = [
  {
    id: 'pharma',
    name: 'Pharmaceutical Industry',
    subCategories: [
      {
        id: 'api-bulk',
        name: 'Bulk Drug (API)',
        challenges: [
          "Managing 'Refractory COD' (chemicals that won't break down biologically)",
          "Recovering expensive and complex solvents"
        ],
        typicalValues: { cod: 12000, bod: 4000, ph: 6.5, tss: 800, tds: 5000 }
      },
      {
        id: 'formulation',
        name: 'Formulation',
        challenges: [
          "Handling high variability of batches",
          "Managing erratic pH shifts (one day sugary, the next acidic)"
        ],
        typicalValues: { cod: 1500, bod: 400, ph: 7.2, tss: 300, tds: 1200 }
      },
      {
        id: 'biologics',
        name: 'Biologics',
        challenges: [
          "Maintaining sterile conditions to prevent contamination",
          "Preventing 'wild' bacteria from destroying treatment reactors"
        ],
        typicalValues: { cod: 8000, bod: 4500, ph: 6.8, tss: 1200, tds: 2500 }
      },
      {
        id: 'rd-labs',
        name: 'R&D Labs',
        challenges: [
          "Dealing with completely unknown chemical mixtures",
          "Treating very small but highly concentrated and toxic volumes"
        ],
        typicalValues: { cod: 3000, bod: 500, ph: 7.0, tss: 200, tds: 4000 }
      }
    ]
  },
  {
    id: 'distillery',
    name: 'Distillery & Fermentation',
    subCategories: [
      {
        id: 'molasses',
        name: 'Molasses-Based',
        challenges: [
          "Achieving 'Zero Liquid Discharge' (ZLD) due to extreme toxicity",
          "Spent wash is too concentrated to ever be discharged into natural waters"
        ],
        typicalValues: { cod: 100000, bod: 45000, ph: 4.2, tss: 4000, tds: 25000 }
      },
      {
        id: 'grain',
        name: 'Grain-Based',
        challenges: [
          "Efficiently separating fine suspended proteins",
          "Preventing mash waste from clogging standard biological filters"
        ],
        typicalValues: { cod: 40000, bod: 18000, ph: 4.5, tss: 6000, tds: 8000 }
      },
      {
        id: 'wineries',
        name: 'Wineries',
        challenges: [
          "Managing extreme organic 'shock loads' during the short harvest season",
          "Maintaining treatment plant biology while the plant sits idle the rest of the year"
        ],
        typicalValues: { cod: 15000, bod: 7500, ph: 3.8, tss: 2500, tds: 3000 }
      }
    ]
  },
{
  id: 'textile',
  name: 'Textile & Dyeing',
  subCategories: [
    {
      id: 'cotton-processing',
      name: 'Cotton Processing',
      challenges: [
        "Managing extremely high salt concentrations from reactive dyeing operations",
        "Reducing excessive freshwater consumption during repeated washing cycles"
      ],
      typicalValues: {
        cod: 2500,
        bod: 900,
        ph: 10.5,
        tss: 700,
        tds: 6000
      }
    },
    {
      id: 'synthetic-processing',
      name: 'Synthetic Textile Processing',
      challenges: [
        "Treating non-biodegradable synthetic dye compounds",
        "Removing persistent organic finishing chemicals and dye carriers"
      ],
      typicalValues: {
        cod: 4000,
        bod: 700,
        ph: 8.5,
        tss: 500,
        tds: 4500
      }
    },
    {
      id: 'wool-processing',
      name: 'Wool Processing',
      challenges: [
        "Removing lanolin-rich grease and suspended organic matter",
        "Handling extremely high biodegradable organic loads from scouring"
      ],
      typicalValues: {
        cod: 6000,
        bod: 3000,
        ph: 7.8,
        tss: 1200,
        tds: 3500
      }
    },
    {
      id: 'denim-washing',
      name: 'Denim & Garment Washing',
      challenges: [
        "Controlling indigo dye discharge into nearby water bodies",
        "Managing sludge and suspended solids from stone washing processes"
      ],
      typicalValues: {
        cod: 5000,
        bod: 1800,
        ph: 9.2,
        tss: 2000,
        tds: 5000
      }
    },
    {
      id: 'textile-printing',
      name: 'Textile Printing',
      challenges: [
        "Removing persistent pigment-based color compounds from wastewater",
        "Treating solvent-rich effluents with very high COD concentrations"
      ],
      typicalValues: {
        cod: 7000,
        bod: 2200,
        ph: 8.8,
        tss: 900,
        tds: 4000
      }
    }
  ]
},
  {
    id: 'pulp-paper',
    name: 'Pulp & Paper Mills',
    subCategories: [
      {
        id: 'chemical-pulping',
        name: 'Chemical Pulping',
        challenges: [
          "Recovering the highly toxic 'Black Liquor' for chemical reuse",
          "Preventing total aquatic ecosystem collapse from lignin discharge"
        ],
        typicalValues: { cod: 8000, bod: 2500, ph: 10.0, tss: 1500, tds: 4500 }
      },
      {
        id: 'bleaching',
        name: 'Bleaching',
        challenges: [
          "Reducing Adsorbable Organic Halides (AOX)",
          "Removing carcinogenic by-products before environmental discharge"
        ],
        typicalValues: { cod: 3000, bod: 900, ph: 3.5, tss: 500, tds: 2500 }
      },
      {
        id: 'recycled',
        name: 'Recycled Paper',
        challenges: [
          "Managing 'stickies' (glues and adhesives) from recycled products",
          "Filtering out microplastics that foul up ultra-filtration membranes"
        ],
        typicalValues: { cod: 4500, bod: 1800, ph: 7.2, tss: 3500, tds: 2500 }
      }
    ]
  },
  {
  id: 'tannery',
  name: 'Tannery & Leather Processing',
  subCategories: [
    {
      id: 'beamhouse',
      name: 'Beamhouse Operations',
      challenges: [
        "Managing extremely high sulfide concentrations from liming and unhairing",
        "Removing large volumes of suspended solids including hair, flesh, and lime sludge"
      ],
      typicalValues: {
        cod: 8000,
        bod: 3500,
        ph: 11.5,
        tss: 5000,
        tds: 12000
      }
    },
    {
      id: 'chrome-tanning',
      name: 'Chrome Tanning',
      challenges: [
        "Preventing chromium contamination in nearby water bodies",
        "Handling hazardous chromium-rich sludge generated during treatment"
      ],
      typicalValues: {
        cod: 6000,
        bod: 2500,
        ph: 4.0,
        tss: 2500,
        tds: 15000
      }
    },
    {
      id: 'vegetable-tanning',
      name: 'Vegetable Tanning',
      challenges: [
        "Treating highly colored wastewater from natural tannins",
        "Managing large organic pollution loads from plant-based tanning agents"
      ],
      typicalValues: {
        cod: 5000,
        bod: 2200,
        ph: 5.5,
        tss: 1800,
        tds: 7000
      }
    },
    {
      id: 'dyeing-finishing',
      name: 'Leather Dyeing & Finishing',
      challenges: [
        "Removing persistent solvent-based finishing chemicals",
        "Treating highly colored and non-biodegradable wastewater streams"
      ],
      typicalValues: {
        cod: 7000,
        bod: 2800,
        ph: 8.5,
        tss: 2000,
        tds: 9000
      }
    }
  ]
},
  {
    id: 'oil-refinery',
    name: 'Oil Refineries & Petrochemicals',
    subCategories: [
      {
        id: 'desalting',
        name: 'Desalting',
        challenges: [
          "Removing high salt content from crude oil emulsions",
          "Preventing severe corrosion in the metal pipes of the treatment plant"
        ],
        typicalValues: { cod: 2500, bod: 500, ph: 6.8, tss: 400, tds: 30000 }
      },
      {
        id: 'cracking',
        name: 'Catalytic Cracking',
        challenges: [
          "Breaking down highly stable phenolic chemical rings",
          "Removing compounds that are strictly toxic to biological treatment bacteria"
        ],
        typicalValues: { cod: 3500, bod: 800, ph: 8.5, tss: 600, tds: 4000 }
      },
      {
        id: 'polymer',
        name: 'Polymer Production',
        challenges: [
          "Filtering out 'nurdles' and microscopic plastic pellets",
          "Ensuring synthetic polymers do not reach open marine environments"
        ],
        typicalValues: { cod: 1500, bod: 300, ph: 7.2, tss: 2000, tds: 1500 }
      }
    ]
  },
  {
  id: 'dairy-food',
  name: 'Dairy & Food Processing',
  subCategories: [
    {
      id: 'dairy-processing',
      name: 'Dairy Processing',
      challenges: [
        "Managing extremely high organic loads from milk and whey losses",
        "Preventing fat and grease accumulation in treatment systems"
      ],
      typicalValues: {
        cod: 5000,
        bod: 2500,
        ph: 6.8,
        tss: 1200,
        tds: 3000
      }
    },
    {
      id: 'meat-processing',
      name: 'Meat & Poultry Processing',
      challenges: [
        "Handling blood-rich wastewater with extremely high BOD levels",
        "Controlling pathogens and odor generation during treatment"
      ],
      typicalValues: {
        cod: 8000,
        bod: 4000,
        ph: 7.2,
        tss: 2500,
        tds: 4500
      }
    },
    {
      id: 'fruit-vegetable',
      name: 'Fruit & Vegetable Processing',
      challenges: [
        "Treating wastewater rich in biodegradable sugars and starches",
        "Managing seasonal spikes in suspended solids and organic waste"
      ],
      typicalValues: {
        cod: 3500,
        bod: 1800,
        ph: 6.5,
        tss: 1500,
        tds: 2000
      }
    },
    {
      id: 'food-cleaning-cip',
      name: 'Cleaning & CIP Operations',
      challenges: [
        "Neutralizing highly acidic and alkaline cleaning wastewater streams",
        "Reducing chemical detergent loads before biological treatment"
      ],
      typicalValues: {
        cod: 2500,
        bod: 900,
        ph: 10.5,
        tss: 600,
        tds: 5000
      }
    }
  ]
},
  {
    id: 'fertilizer',
    name: 'Fertilizer Manufacturing',
    subCategories: [
      {
        id: 'ammonia-urea',
        name: 'Ammonia & Urea Production',
        challenges: [
          "Controlling extremely high ammonia concentrations in wastewater",
          "Preventing nitrogen-rich effluents from causing eutrophication"
        ],
        typicalValues: { cod: 2500, bod: 900, ph: 9.5, tss: 700, tds: 12000 }
      },
      {
        id: 'phosphate-fertilizer',
        name: 'Phosphate Fertilizer Production',
        challenges: [
          "Managing acidic fluoride-rich wastewater streams",
          "Handling phosphogypsum sludge generated during phosphate processing"
        ],
        typicalValues: { cod: 1800, bod: 500, ph: 3.5, tss: 1500, tds: 10000 }
      },
      {
        id: 'nitrate-fertilizer',
        name: 'Nitrate Fertilizer Production',
        challenges: [
          "Preventing nitrate contamination of groundwater resources",
          "Reducing nutrient discharge that accelerates algal bloom formation"
        ],
        typicalValues: { cod: 2200, bod: 700, ph: 4.5, tss: 900, tds: 9000 }
      },
      {
        id: 'granulation-cleaning',
        name: 'Granulation & Cleaning Operations',
        challenges: [
          "Controlling suspended particulate discharge from granulation units",
          "Treating high-salinity scrubber and wash water streams"
        ],
        typicalValues: { cod: 1200, bod: 350, ph: 7.5, tss: 1800, tds: 7000 }
      }
    ]
  },

  {
    id: 'iron-steel',
    name: 'Iron & Steel Plants',
    subCategories: [
      {
        id: 'coke-oven',
        name: 'Coke Oven Operations',
        challenges: [
          "Treating highly toxic phenol- and cyanide-rich wastewater streams",
          "Managing ammonia contamination and strong organic shock loads"
        ],
        typicalValues: { cod: 4500, bod: 1200, ph: 8.5, tss: 1800, tds: 6000 }
      },
      {
        id: 'blast-furnace',
        name: 'Blast Furnace Operations',
        challenges: [
          "Removing large quantities of suspended slag and metal particles",
          "Preventing heavy metal contamination in discharged water"
        ],
        typicalValues: { cod: 1800, bod: 500, ph: 7.8, tss: 5000, tds: 4000 }
      },
      {
        id: 'rolling-mill',
        name: 'Rolling Mill Operations',
        challenges: [
          "Separating oil and grease from scale-laden wastewater",
          "Managing sludge generation from descaling processes"
        ],
        typicalValues: { cod: 2500, bod: 700, ph: 7.2, tss: 3500, tds: 3500 }
      },
      {
        id: 'pickling',
        name: 'Pickling Operations',
        challenges: [
          "Neutralizing extremely acidic wastewater from hydrochloric and sulfuric acid baths",
          "Removing dissolved iron salts and high dissolved solids"
        ],
        typicalValues: { cod: 1200, bod: 300, ph: 2.5, tss: 1200, tds: 10000 }
      },
      {
        id: 'cooling-scrubbing',
        name: 'Cooling & Gas Scrubbing',
        challenges: [
          "Controlling recirculating water contamination from furnace gases",
          "Reducing particulate and oily contaminants before reuse or discharge"
        ],
        typicalValues: { cod: 1500, bod: 400, ph: 7.5, tss: 2000, tds: 5000 }
      }
    ]
  },

  {
    id: 'electroplating',
    name: 'Electroplating & Metal Finishing',
    subCategories: [
      {
        id: 'electroplating',
        name: 'Electroplating Operations',
        challenges: [
          "Removing toxic heavy metals like chromium, nickel, and cadmium",
          "Treating cyanide-bearing rinse water safely"
        ],
        typicalValues: { cod: 1800, bod: 250, ph: 3.5, tss: 800, tds: 7000 }
      },
      {
        id: 'acid-pickling',
        name: 'Acid Pickling & Etching',
        challenges: [
          "Neutralizing extremely acidic wastewater streams",
          "Managing dissolved metal salt contamination"
        ],
        typicalValues: { cod: 1200, bod: 150, ph: 2.2, tss: 1200, tds: 9000 }
      },
      {
        id: 'surface-finishing',
        name: 'Surface Finishing & Polishing',
        challenges: [
          "Separating oil and grease from polishing operations",
          "Removing fine metallic suspended solids"
        ],
        typicalValues: { cod: 2200, bod: 500, ph: 7.5, tss: 1800, tds: 5000 }
      }
    ]
  },

  {
    id: 'thermal-power',
    name: 'Thermal Power Plants',
    subCategories: [
      {
        id: 'cooling-tower',
        name: 'Cooling Tower Blowdown',
        challenges: [
          "Managing high dissolved solids from recirculating cooling systems",
          "Preventing thermal pollution in receiving water bodies"
        ],
        typicalValues: { cod: 500, bod: 80, ph: 8.2, tss: 300, tds: 6000 }
      },
      {
        id: 'ash-handling',
        name: 'Ash Handling Systems',
        challenges: [
          "Controlling fly ash and bottom ash slurry discharge",
          "Preventing heavy metal contamination from ash ponds"
        ],
        typicalValues: { cod: 800, bod: 120, ph: 9.5, tss: 5000, tds: 4500 }
      },
      {
        id: 'boiler-blowdown',
        name: 'Boiler Blowdown',
        challenges: [
          "Reducing high-temperature and high-salinity wastewater discharge",
          "Managing chemical treatment residues from boiler operations"
        ],
        typicalValues: { cod: 600, bod: 100, ph: 10.0, tss: 500, tds: 8000 }
      }
    ]
  },

  {
    id: 'sugar',
    name: 'Sugar Industry',
    subCategories: [
      {
        id: 'cane-washing',
        name: 'Cane Washing',
        challenges: [
          "Managing large suspended solids loads from soil and organic debris",
          "Reducing water consumption during raw material cleaning"
        ],
        typicalValues: { cod: 1800, bod: 900, ph: 7.0, tss: 2500, tds: 2000 }
      },
      {
        id: 'sugar-processing',
        name: 'Sugar Processing',
        challenges: [
          "Handling wastewater rich in sugars and biodegradable organics",
          "Preventing rapid oxygen depletion in nearby water bodies"
        ],
        typicalValues: { cod: 5000, bod: 2500, ph: 5.5, tss: 1800, tds: 3500 }
      },
      {
        id: 'distillery-effluent',
        name: 'Molasses & Distillery Effluent',
        challenges: [
          "Treating extremely concentrated spent wash with very high COD",
          "Achieving zero liquid discharge due to intense organic pollution"
        ],
        typicalValues: { cod: 100000, bod: 45000, ph: 4.2, tss: 4000, tds: 25000 }
      }
    ]
  },

  {
    id: 'pesticide',
    name: 'Pesticide & Agrochemicals',
    subCategories: [
      {
        id: 'pesticide-synthesis',
        name: 'Pesticide Synthesis',
        challenges: [
          "Treating highly toxic and non-biodegradable organic compounds",
          "Managing hazardous solvent-rich wastewater"
        ],
        typicalValues: { cod: 12000, bod: 2500, ph: 5.0, tss: 1200, tds: 8000 }
      },
      {
        id: 'formulation',
        name: 'Agrochemical Formulation',
        challenges: [
          "Removing emulsified oils and pesticide residues",
          "Preventing toxic runoff into agricultural waterways"
        ],
        typicalValues: { cod: 6000, bod: 1500, ph: 6.5, tss: 900, tds: 5000 }
      },
      {
        id: 'equipment-cleaning',
        name: 'Equipment Cleaning',
        challenges: [
          "Treating concentrated wash water containing active chemical residues",
          "Managing fluctuating toxicity levels during batch cleaning"
        ],
        typicalValues: { cod: 4000, bod: 900, ph: 8.0, tss: 700, tds: 4500 }
      }
    ]
  },

  {
    id: 'chemical',
    name: 'Chemical & Specialty Chemicals',
    subCategories: [
      {
        id: 'organic-chemicals',
        name: 'Organic Chemical Manufacturing',
        challenges: [
          "Treating high-COD solvent-rich wastewater streams",
          "Managing toxic and non-biodegradable organic compounds"
        ],
        typicalValues: { cod: 15000, bod: 3500, ph: 6.0, tss: 1800, tds: 9000 }
      },
      {
        id: 'inorganic-chemicals',
        name: 'Inorganic Chemical Manufacturing',
        challenges: [
          "Neutralizing highly acidic or alkaline wastewater streams",
          "Controlling dissolved salts and heavy metal contamination"
        ],
        typicalValues: { cod: 4000, bod: 800, ph: 2.5, tss: 1200, tds: 15000 }
      },
      {
        id: 'specialty-chemicals',
        name: 'Specialty Chemicals',
        challenges: [
          "Treating highly variable batch-process wastewater",
          "Managing complex mixtures of proprietary chemical compounds"
        ],
        typicalValues: { cod: 8000, bod: 1800, ph: 7.0, tss: 1400, tds: 7000 }
      }
    ]
  },

  {
    id: 'slaughterhouse',
    name: 'Slaughterhouses & Rendering',
    subCategories: [
      {
        id: 'slaughtering',
        name: 'Slaughtering Operations',
        challenges: [
          "Handling blood-rich wastewater with extremely high BOD",
          "Controlling pathogen contamination and foul odors"
        ],
        typicalValues: { cod: 10000, bod: 5000, ph: 7.0, tss: 3000, tds: 4000 }
      },
      {
        id: 'rendering',
        name: 'Rendering Operations',
        challenges: [
          "Separating fats, oils, and grease from wastewater streams",
          "Preventing grease accumulation in treatment infrastructure"
        ],
        typicalValues: { cod: 12000, bod: 6000, ph: 6.8, tss: 2500, tds: 5000 }
      },
      {
        id: 'cleaning-sanitation',
        name: 'Cleaning & Sanitation',
        challenges: [
          "Neutralizing disinfectant-rich cleaning wastewater",
          "Reducing organic shock loads during plant washdowns"
        ],
        typicalValues: { cod: 3500, bod: 1500, ph: 10.0, tss: 1000, tds: 4500 }
      }
    ]
  },

  {
    id: 'mining',
    name: 'Mining & Ore Processing',
    subCategories: [
      {
        id: 'ore-washing',
        name: 'Ore Washing & Screening',
        challenges: [
          "Managing extremely high suspended solids loads",
          "Preventing sediment discharge into rivers and reservoirs"
        ],
        typicalValues: { cod: 1200, bod: 300, ph: 7.5, tss: 8000, tds: 3500 }
      },
      {
        id: 'flotation-processing',
        name: 'Flotation & Mineral Processing',
        challenges: [
          "Treating reagent-rich wastewater containing flotation chemicals",
          "Controlling dissolved heavy metals in tailings water"
        ],
        typicalValues: { cod: 3500, bod: 700, ph: 9.0, tss: 5000, tds: 6000 }
      },
      {
        id: 'acid-mine-drainage',
        name: 'Acid Mine Drainage',
        challenges: [
          "Neutralizing highly acidic metal-contaminated drainage water",
          "Preventing long-term groundwater contamination"
        ],
        typicalValues: { cod: 900, bod: 150, ph: 2.8, tss: 2500, tds: 12000 }
      }
    ]
  },

  {
    id: 'fmcg',
    name: 'FMCG (Fast Moving Consumer Goods)',
    subCategories: [
      {
        id: 'personal-care',
        name: 'Personal Care Products',
        challenges: [
          "Treating surfactant-rich wastewater from shampoo and soap manufacturing",
          "Managing foaming issues in biological treatment systems"
        ],
        typicalValues: { cod: 5000, bod: 1800, ph: 8.5, tss: 900, tds: 4000 }
      },
      {
        id: 'detergent-manufacturing',
        name: 'Detergent Manufacturing',
        challenges: [
          "Removing phosphate and surfactant contamination",
          "Reducing high-foam wastewater characteristics"
        ],
        typicalValues: { cod: 7000, bod: 2200, ph: 10.5, tss: 1200, tds: 6000 }
      },
      {
        id: 'food-fmcg',
        name: 'Packaged Food FMCG',
        challenges: [
          "Managing biodegradable food-processing wastewater streams",
          "Preventing oil and grease buildup in treatment units"
        ],
        typicalValues: { cod: 4000, bod: 2000, ph: 7.0, tss: 1500, tds: 3000 }
      }
    ]
  }
];