import type { CSSProperties, ReactNode } from "react";
import { Analytics } from "@/components/integrations/analytics";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { siteConfig } from "@/config/site";
import { themes } from "@/config/themes";
import { visibleCorePages, visibleLegalPages } from "@/content/registry";
import { rootMetadata } from "@/lib/seo";
import "./globals.css";

export const metadata = rootMetadata();

const navLinks = visibleCorePages.map((page) => ({ label: page.navLabel, slug: page.slug }));
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
        <SiteHeader links={navLinks} />
        <div id="main-content">{children}</div>
        <SiteFooter coreLinks={navLinks} legalLinks={legalLinks} />
      </body>
    </html>
  );
}
