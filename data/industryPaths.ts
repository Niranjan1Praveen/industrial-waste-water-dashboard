// Map sub-category IDs to their CSV file paths
export const industryPathMapping: Record<string, string> = {
  // Dairy & Food Processing
  "dairy-processing":
    "/water-characteristics-data/dairy-food-processing-datasets/dairy_processing.csv",
  "food-cleaning-cip":
    "/water-characteristics-data/dairy-food-processing-datasets/food_cleaning_cip.csv",
  "fruit-vegetable":
    "/water-characteristics-data/dairy-food-processing-datasets/fruit_vegetable_processing.csv",
  "meat-processing":
    "/water-characteristics-data/dairy-food-processing-datasets/meat_poultry_processing.csv",

  // Distilleries
  molasses:
    "/water-characteristics-data/distilleries/distillery_molasses_wastewater.csv",
  grain:
    "/water-characteristics-data/distilleries/distillery_grain_wastewater.csv",
  wineries:
    "/water-characteristics-data/distilleries/distillery_wineries_wastewater.csv",

  // Oil Refineries
  desalting:
    "/water-characteristics-data/oil-refineries-petroleum/oil_refinery_desalting_wastewater.csv",
  cracking:
    "/water-characteristics-data/oil-refineries-petroleum/oil_refinery_cracking_wastewater.csv",
  polymer:
    "/water-characteristics-data/oil-refineries-petroleum/oil_refinery_polymer_wastewater.csv",

  // Pharmaceutical
  "api-bulk":
    "/water-characteristics-data/pharmaceutical-industry/pharma_api_bulk_drug.csv",
  formulation:
    "/water-characteristics-data/pharmaceutical-industry/pharma_formulation.csv",
  biologics:
    "/water-characteristics-data/pharmaceutical-industry/pharma_biologics.csv",
  "rd-labs":
    "/water-characteristics-data/pharmaceutical-industry/pharma_rnd_labs.csv",

  // Pulp & Paper
  "chemical-pulping":
    "/water-characteristics-data/pulp-and-paper-mills/pulp_paper_chemical_pulping.csv",
  bleaching:
    "/water-characteristics-data/pulp-and-paper-mills/pulp_paper_bleaching.csv",
  recycled:
    "/water-characteristics-data/pulp-and-paper-mills/pulp_paper_recycled_paper.csv",

  // Tannery
  beamhouse:
    "/water-characteristics-data/tannery-industry-datasets/beamhouse_operations.csv",
  "chrome-tanning":
    "/water-characteristics-data/tannery-industry-datasets/chrome_tanning.csv",
  "vegetable-tanning":
    "/water-characteristics-data/tannery-industry-datasets/vegetable_tanning.csv",
  "dyeing-finishing":
    "/water-characteristics-data/tannery-industry-datasets/dyeing_finishing.csv",

  // Textile
  "cotton-processing":
    "/water-characteristics-data/textile-and-dyeing/cotton_processing.csv",
  "synthetic-processing":
    "/water-characteristics-data/textile-and-dyeing/synthetic_textile_processing.csv",
  "wool-processing":
    "/water-characteristics-data/textile-and-dyeing/wool_processing.csv",
  "denim-washing":
    "/water-characteristics-data/textile-and-dyeing/denim_garment_washing.csv",
  "textile-printing":
    "/water-characteristics-data/textile-and-dyeing/textile_printing.csv",

  // Chemicals
  "acid-alkali":
    "/water-characteristics-data/chemicals/Chemical_Acid_Alkali.csv",
  "chlor-alkali":
    "/water-characteristics-data/chemicals/Chemical_Chlor_Alkali.csv",
  "dye-pigments":
    "/water-characteristics-data/chemicals/Chemical_Dye_Pigments.csv",

  // Electroplating
  electroplating:
    "/water-characteristics-data/electroplating/Electroplating_Electroplating_Ops.csv",
  "acid-pickling":
    "/water-characteristics-data/electroplating/Electroplating_Acid_Pickling.csv",
  "surface-finishing":
    "/water-characteristics-data/electroplating/Electroplating_Surface_Finishing.csv",

  // Fertilizer
  "ammonia-urea":
    "/water-characteristics-data/fertilizer/Fertilizer_Ammonia_Urea.csv",
  "granulation-cleaning":
    "/water-characteristics-data/fertilizer/Fertilizer_Granulation_Cleaning.csv",
  "nitrate-fertilizer":
    "/water-characteristics-data/fertilizer/Fertilizer_Nitrate.csv",
  "phosphate-fertilizer":
    "/water-characteristics-data/fertilizer/Fertilizer_Phosphate.csv",

  // FMCG
  cosmetics: "/water-characteristics-data/fmcg/FMCG_Cosmetics.csv",
  "home-care": "/water-characteristics-data/fmcg/FMCG_Home_Care.csv",
  "personal-care": "/water-characteristics-data/fmcg/FMCG_Personal_Care.csv",

  // Iron & Steel
  "blast-furnace":
    "/water-characteristics-data/iron-and-steel-plant/Iron_Steel_Blast_Furnace.csv",
  "coke-oven":
    "/water-characteristics-data/iron-and-steel-plant/Iron_Steel_Coke_Oven.csv",
  "cooling-scrubbing":
    "/water-characteristics-data/iron-and-steel-plant/Iron_Steel_Cooling_Scrubbing.csv",
  pickling:
    "/water-characteristics-data/iron-and-steel-plant/Iron_Steel_Pickling.csv",
  "rolling-mill":
    "/water-characteristics-data/iron-and-steel-plant/Iron_Steel_Rolling_Mill.csv",

  // Mining
  "acid-mine-drainage":
    "/water-characteristics-data/mining-ore/Mining_Acid_Mine_Drainage.csv",
  "flotation-processing":
    "/water-characteristics-data/mining-ore/Mining_Flotation.csv",
  "ore-washing":
    "/water-characteristics-data/mining-ore/Mining_Ore_Washing.csv",
  // Thermal Power
  "ash-handling":
    "/water-characteristics-data/thermal/Thermal_Power_Ash_Handling.csv",
  "boiler-blowdown":
    "/water-characteristics-data/thermal/Thermal_Power_Boiler_Blowdown.csv",
  "cooling-tower":
    "/water-characteristics-data/thermal/Thermal_Power_Cooling_Tower.csv",

  // Slaughterhouse
  "cleaning-sanitation":
    "/water-characteristics-data/slaughterhouse/slaughterhouse_Cleaning_Sanitation.csv",
  rendering:
    "/water-characteristics-data/slaughterhouse/slaughterhouse_Rendering.csv",
  slaughtering:
    "/water-characteristics-data/slaughterhouse/slaughterhouse_Slaughtering.csv",

  // Sugar
  "cane-crushing": "/water-characteristics-data/sugar/Sugar_Cane_Crushing.csv",
  clarification: "/water-characteristics-data/sugar/Sugar_Clarification.csv",
  "distillery-integration":
    "/water-characteristics-data/sugar/Sugar_Distillery_Integration.csv",

  // Pesticides
  fungicides: "/water-characteristics-data/pesticides/Pesticide_Fungicides.csv",
  herbicides: "/water-characteristics-data/pesticides/Pesticide_Herbicides.csv",
  insecticides:
    "/water-characteristics-data/pesticides/Pesticide_Insecticides.csv",
};
