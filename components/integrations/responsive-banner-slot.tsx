import { integrations } from "@/config/integrations";
import { ResponsiveBannerClient } from "./responsive-banner-client";

export function ResponsiveBannerSlot() {
  if (integrations.banner.provider !== "adsterra-banner") return null;

  return <ResponsiveBannerClient desktop={integrations.banner.desktop} mobile={integrations.banner.mobile} />;
}
