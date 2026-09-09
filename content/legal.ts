import { integrations } from "@/config/integrations";
import { siteConfig } from "@/config/site";
import type { SeoPageDefinition } from "@/config/types";

const privacyIntegrationParagraphs: string[] = [];

if (integrations.analytics.provider === "pirsch") {
  privacyIntegrationParagraphs.push(
    "Pirsch audience measurement is enabled to understand aggregate page usage. Pirsch processes visits under its own privacy terms.",
  );
}

if (integrations.analytics.provider === "google-analytics") {
  privacyIntegrationParagraphs.push(
    "Google Analytics is enabled to measure visits and understand aggregate site usage. Google may process device, browser and interaction data under its own privacy terms.",
  );
}

if (integrations.ads.provider === "adsterra-native") {
  privacyIntegrationParagraphs.push(
    "Adsterra Native advertising is enabled. Adsterra may process technical request information and applies its own privacy policy.",
  );
}

if (integrations.socialBar.provider === "adsterra-social-bar") {
  privacyIntegrationParagraphs.push(
    "Adsterra Social Bar advertising is enabled across the site. Adsterra may process technical request and interaction information under its own privacy policy.",
  );
}

export const legalPages: SeoPageDefinition[] = [
  {
    enabled: true,
    slug: "about",
    pageType: "legal",
    navLabel: "About",
    title: "About",
    description: `Learn what ${siteConfig.siteName} offers players and how to use its Dungeon Quest Reborn guides.`,
    keywords: ["about game wiki"],
    primaryKeyword: "about this game resource",
    secondaryKeywords: [],
    searchIntent: "Learn what this independent guide offers",
    priority: "P2",
    navVisible: true,
    hero: { heading: `About ${siteConfig.siteName}`, lead: "A focused fan guide for Dungeon Quest Reborn players." },
    sections: [
      { id: "purpose", heading: "What This Site Is For", paragraphs: ["This site helps players move quickly from a question to a useful answer. Its guides cover dungeon progression, notable drops, weapons, abilities, current codes status and community links without requiring players to search across several pages first."] },
      { id: "guides", heading: "What You Can Find", paragraphs: ["Start with the Wiki for an overview, use the Dungeons and Drops pages when planning a farming route, check the tier list before investing in a build, and visit the Codes page for the current redemption status."] },
      { id: "independence", heading: "Independent Fan Guide", paragraphs: ["Dungeon Quest Reborn Wiki is fan-made and is not affiliated with Roblox or Delta Quarters OG. Game names, trademarks and assets belong to their respective owners."] },
    ],
    relatedSlugs: ["privacy", "copyright"],
    lastReviewed: "2026-01-15",
  },
  {
    enabled: true,
    slug: "contact",
    pageType: "legal",
    navLabel: "Contact",
    title: "Contact",
    description: `Contact ${siteConfig.siteName} to report factual corrections, attribution concerns, copyright questions or technical site issues.`,
    keywords: ["game wiki contact"],
    primaryKeyword: "contact",
    secondaryKeywords: [],
    searchIntent: "Contact the editorial team",
    priority: "P2",
    navVisible: false,
    hero: { heading: "Contact", lead: "Current contact availability for this independent fan guide." },
    sections: [
      {
        id: "contact-method",
        heading: "How to Reach Us",
        paragraphs: siteConfig.contact.email || siteConfig.contact.url
          ? ["Use the contact link shown in the footer and include the page URL, the issue and a supporting source when possible."]
          : ["A public contact channel is not available at this time."],
      },
      { id: "useful-report", heading: "What to Include", paragraphs: ["Share the affected page, the incorrect detail, the current game version and any reliable supporting evidence."] },
    ],
    relatedSlugs: ["about", "copyright"],
    lastReviewed: "2026-01-15",
  },
  {
    enabled: true,
    slug: "privacy",
    pageType: "legal",
    navLabel: "Privacy",
    title: "Privacy Policy",
    description: `Read the privacy policy for ${siteConfig.siteName}, including enabled measurement or advertising services.`,
    keywords: ["game wiki privacy"],
    primaryKeyword: "privacy policy",
    secondaryKeywords: [],
    searchIntent: "Understand site privacy practices",
    priority: "P2",
    navVisible: true,
    hero: { heading: "Privacy Policy", lead: "A plain-language summary of the data this static site and its enabled services may process." },
    sections: [
      { id: "site-data", heading: "Data This Site Collects", paragraphs: ["The static site does not provide accounts, comments or a database for storing visitor submissions."] },
      {
        id: "integrations",
        heading: "Optional Third-Party Services",
        paragraphs: privacyIntegrationParagraphs.length
          ? privacyIntegrationParagraphs
          : ["No audience measurement or advertising integration is currently enabled."],
      },
      { id: "external-links", heading: "External Links", paragraphs: ["A link to another website is governed by that website's own terms and privacy practices."] },
      { id: "changes", heading: "Policy Changes", paragraphs: ["Changes to the site's integrations or data practices will be reflected on this page."] },
    ],
    relatedSlugs: ["terms", "about"],
    lastReviewed: "2026-01-15",
  },
  {
    enabled: true,
    slug: "terms",
    pageType: "legal",
    navLabel: "Terms",
    title: "Terms of Use",
    description: `Read the terms for using the guides and reference information on ${siteConfig.siteName}.`,
    keywords: ["game wiki terms"],
    primaryKeyword: "terms of use",
    secondaryKeywords: [],
    searchIntent: "Read site terms",
    priority: "P2",
    navVisible: true,
    hero: { heading: "Terms of Use", lead: "Conditions for using this independent guide and reference website." },
    sections: [
      { id: "informational", heading: "Informational Use", paragraphs: ["Content is provided for general game information and may change when the game is updated."] },
      { id: "accuracy", heading: "Accuracy and Availability", paragraphs: ["Reasonable care should be taken when publishing, but uninterrupted availability or complete accuracy cannot be guaranteed."] },
      { id: "acceptable-use", heading: "Acceptable Use", paragraphs: ["Do not misuse the site, interfere with access or reproduce substantial original content without permission."] },
    ],
    relatedSlugs: ["privacy", "copyright"],
    lastReviewed: "2026-01-15",
  },
  {
    enabled: true,
    slug: "copyright",
    pageType: "legal",
    navLabel: "Copyright",
    title: "Copyright and Attribution",
    description: `Review copyright, trademark, media ownership and attribution information for the independent ${siteConfig.siteName} resource.`,
    keywords: ["game wiki copyright"],
    primaryKeyword: "copyright and attribution",
    secondaryKeywords: [],
    searchIntent: "Understand rights and attribution",
    priority: "P2",
    navVisible: true,
    hero: { heading: "Copyright and Attribution", lead: "Ownership and reporting guidance for editorial content, game names and media." },
    sections: [
      { id: "editorial", heading: "Original Editorial Content", paragraphs: ["Original explanations, page organization and site design remain protected unless a separate license says otherwise."] },
      { id: "game-rights", heading: "Game and Platform Rights", paragraphs: ["Game names, trademarks, screenshots and related assets belong to their respective owners. Their use does not imply endorsement."] },
      { id: "rights", heading: "Rights and Attribution", paragraphs: ["Original site writing and design remain protected, while game names, trademarks, screenshots and related assets remain the property of their respective owners."] },
    ],
    relatedSlugs: ["about", "terms"],
    lastReviewed: "2026-01-15",
  },
];
