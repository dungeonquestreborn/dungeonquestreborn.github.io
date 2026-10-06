import type { CSSProperties, ReactNode } from "react";
import Script from "next/script";
import { Analytics } from "@/components/integrations/analytics";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { integrations } from "@/config/integrations";
import { siteConfig } from "@/config/site";
import { themes } from "@/config/themes";
import { visibleCorePages, visibleLegalPages } from "@/content/registry";
import { rootMetadata } from "@/lib/seo";
import "./globals.css";

export const metadata = rootMetadata();

const navLinks = visibleCorePages.map((page) => ({
  label: page.navLabel,
  slug: page.slug,
  children:
    page.slug === "drops"
      ? [
          { label: "Desert Temple", slug: "drops/desert-temple" },
          { label: "Pirate Island", slug: "drops/pirate-island" },
          { label: "Enchanted Forest", slug: "drops/enchanted-forest" },
          { label: "Winter Outpost", slug: "drops/winter-outpost" },
          { label: "Orbital Outpost", slug: "drops/orbital-outpost" },
          { label: "Volcanic Chambers", slug: "drops/volcanic-chambers" },
          { label: "Northern Lands", slug: "drops/northern-lands" },
        ]
      : undefined,
}));
const headerLinks = [
  ...navLinks,
  {
    label: "More",
    slug: "more",
    menuOnly: true,
    children: [
      { label: "Level Requirements", slug: "level-requirements" },
      { label: "Ultimates", slug: "ultimates" },
      { label: "Rending Slice", slug: "rending-slice" },
      { label: "EIR & EIF", slug: "eir-eif" },
      { label: "Pot Guide", slug: "pot" },
      { label: "Holy Barrier", slug: "holy-barrier" },
    ],
  },
];
const legalLinks = visibleLegalPages.map((page) => ({ label: page.navLabel, slug: page.slug }));

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const theme = themes[siteConfig.theme.preset];
  const style = Object.fromEntries(
    Object.entries({ ...theme.tokens, ...siteConfig.theme.overrides }).map(([key, value]) => [`--${key}`, value]),
  ) as CSSProperties;

  return (
    <html lang={siteConfig.language} data-theme={theme.name} style={style}>
      <head>
        <Analytics />
      </head>
      <body>
        <a href="#main-content" className="skip-link">Skip to content</a>
        <SiteHeader links={headerLinks} />
        <div id="main-content">{children}</div>
        <SiteFooter coreLinks={navLinks} legalLinks={legalLinks} />
        {integrations.socialBar.provider === "adsterra-social-bar" ? (
          <Script src={integrations.socialBar.scriptUrl} strategy="afterInteractive" />
        ) : null}
      </body>
    </html>
  );
}
