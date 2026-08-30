import type { IntegrationConfig } from "./types";

const pirschCode = process.env.NEXT_PUBLIC_PIRSCH_CODE?.trim();
const googleAnalyticsId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID?.trim() || "G-VYQS2Q5PDT";
const adScriptUrl = process.env.NEXT_PUBLIC_ADSTERRA_NATIVE_SCRIPT_URL?.trim();
const adContainerId = process.env.NEXT_PUBLIC_ADSTERRA_NATIVE_CONTAINER_ID?.trim();

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
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION?.trim() || null,
    bing: process.env.BING_SITE_VERIFICATION?.trim() || null,
  },
};
