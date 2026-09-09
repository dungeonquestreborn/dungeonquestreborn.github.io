import type { SeoPageDefinition } from "@/config/types";
import rawPages from "./generated/pages.json";
import pirateIsland from "./drops/pirate-island.json";
import enchantedForest from "./drops/enchanted-forest.json";
import winterOutpost from "./drops/winter-outpost.json";
import volcanicChambers from "./drops/volcanic-chambers.json";

export const corePages = [...rawPages, pirateIsland, enchantedForest, winterOutpost, volcanicChambers] as SeoPageDefinition[];
