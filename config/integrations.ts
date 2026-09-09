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
  banner: {
    provider: "adsterra-banner",
    desktop: {
      key: "51c10b915a7249f696e78491840770a8",
      scriptUrl: "https://www.highrevenueformat.com/51c10b915a7249f696e78491840770a8/invoke.js",
      width: 728,
      height: 90,
    },
    mobile: {
      key: "16db69ce55fafca1d5ac7e61300f4f6f",
      scriptUrl: "https://www.highrevenueformat.com/16db69ce55fafca1d5ac7e61300f4f6f/invoke.js",
      width: 320,
      height: 50,
    },
  },
  socialBar: socialBarScriptUrl
    ? { provider: "adsterra-social-bar", scriptUrl: socialBarScriptUrl }
    : { provider: "none" },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION?.trim() || null,
    bing: process.env.BING_SITE_VERIFICATION?.trim() || null,
  },
};
