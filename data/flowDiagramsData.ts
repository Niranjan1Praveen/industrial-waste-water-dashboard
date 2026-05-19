import { FlowDiagramData } from "@/types";

import { textileFlows } from "./industries/textile";
import { pharmaFlows } from "./industries/pharma";
import { foodFlows } from "./industries/food";
import { chemicalFlows } from "./industries/chemical";
import { heavyIndustryFlows } from "./industries/heavyIndustry";
import { leatherFlows } from "./industries/leather";
import { paperFlows } from "./industries/paper";
import { refineryFlows } from "./industries/refinery";
import { fertilizerFlows } from "./industries/fertilizer";
import { electroplatingFlows } from "./industries/electroplating";
import { powerPlantFlows } from "./industries/powerPlant";
import { sugarFlows } from "./industries/sugar";
import { slaughterhouseFlows } from "./industries/slaughterhouse";
import { miningFlows } from "./industries/mining";
import { fmcgFlows } from "./industries/fmcg";
import { distilleryFlows } from "./industries/distillery";
import { pesticideFlows } from "./industries/pesticide";

export const flowDiagramsData: Record<string, FlowDiagramData> = {
  // Textile
  ...textileFlows,

  // Pharma
  ...pharmaFlows,

  // Food & Beverage
  ...foodFlows,

  // Chemical Industries
  ...chemicalFlows,

  // Heavy Industry
  ...heavyIndustryFlows,

  // Leather Processing
  ...leatherFlows,

  // Paper & Pulp
  ...paperFlows,

  // Refinery & Petrochemical
  ...refineryFlows,

  // Fertilizer
  ...fertilizerFlows,

  // Electroplating & Metal Finishing
  ...electroplatingFlows,

  // Thermal Power Plant
  ...powerPlantFlows,

  // Sugar & Distillery
  ...sugarFlows,

  // Slaughterhouse
  ...slaughterhouseFlows,

  // Mining & Minerals
  ...miningFlows,

  // FMCG
  ...fmcgFlows,

  // Distillery
  ...distilleryFlows,

  // Pesticide & Agrochemicals
  ...pesticideFlows,
};
