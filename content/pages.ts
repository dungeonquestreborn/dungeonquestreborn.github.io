import type { SeoPageDefinition } from "@/config/types";
import rawPages from "./generated/pages.json";
import pirateIsland from "./drops/pirate-island.json";
import enchantedForest from "./drops/enchanted-forest.json";
import winterOutpost from "./drops/winter-outpost.json";
import volcanicChambers from "./drops/volcanic-chambers.json";
import orbitalOutpost from "./drops/orbital-outpost.json";
import innervate from "./entities/innervate.json";
import eldenbark from "./entities/eldenbark.json";
import desertFury from "./entities/desert-fury.json";
import rendingSlice from "./entities/rending-slice.json";
import levelRequirements from "./guides/level-requirements.json";
import ultimates from "./guides/ultimates.json";
import northernLands from "./drops/northern-lands.json";
import eirEif from "./entities/eir-eif.json";
import pot from "./guides/pot.json";
import holyBarrier from "./entities/holy-barrier.json";

export const corePages = [
  ...rawPages,
  pirateIsland,
  enchantedForest,
  winterOutpost,
  volcanicChambers,
  orbitalOutpost,
  innervate,
  eldenbark,
  desertFury,
  rendingSlice,
  levelRequirements,
  ultimates,
  northernLands,
  eirEif,
  pot,
  holyBarrier,
] as SeoPageDefinition[];
