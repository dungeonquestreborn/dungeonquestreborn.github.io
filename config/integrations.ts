import type { IntegrationConfig } from "./types";

const pirschCode = process.env.NEXT_PUBLIC_PIRSCH_CODE?.trim();
const googleAnalyticsId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID?.trim() || "G-VYQS2Q5PDT";
const adScriptUrl =
  process.env.NEXT_PUBLIC_ADSTERRA_NATIVE_SCRIPT_URL?.trim() ||
  "https://pl31131478.profitableratecpmnetwork.com/69d1a785cc0ea35358a41e782f197b4f/invoke.js";
const adContainerId =
  process.env.NEXT_PUBLIC_ADSTERRA_NATIVE_CONTAINER_ID?.trim() ||
  "container-69d1a785cc0ea35358a41e782f197b4f";
const socialBarScriptUrl =
  process.env.NEXT_PUBLIC_ADSTERRA_SOCIAL_BAR_SCRIPT_URL?.trim() ||
  "https://pl31167770.profitableratecpmnetwork.com/61/38/80/6138806ed4a2aefead2040228faaea23.js";

export const integrations: IntegrationConfig = {
  analytics: googleAnalyticsId
    ? { provider: "google-analytics", measurementId: googleAnalyticsId }
    : pirschCode
      ? { provider: "pirsch", code: pirschCode }
      : { provider: "none" },
  ads:
    adScriptUrl && adContainerId
      ? {
          provider: "adsterra-native",
          scriptUrl: adScriptUrl,
          containerId: adContainerId,
        }
      : { provider: "none" },
  socialBar: socialBarScriptUrl
    ? { provider: "adsterra-social-bar", scriptUrl: socialBarScriptUrl }
    : { provider: "none" },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION?.trim() || null,
    bing: process.env.BING_SITE_VERIFICATION?.trim() || null,
  },
};
