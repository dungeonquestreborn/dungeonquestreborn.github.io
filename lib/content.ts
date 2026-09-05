import type { HomePageDefinition, PageSection, SeoPageDefinition } from "@/config/types";

function sectionText(section: PageSection) {
  const parts = [section.heading, section.intro, ...(section.paragraphs ?? [])];
  for (const subsection of section.subsections ?? []) {
    parts.push(subsection.heading, ...subsection.paragraphs, ...(subsection.bullets ?? []));
    if (subsection.table) parts.push(subsection.table.caption, ...subsection.table.columns, ...subsection.table.rows.flat());
  }
  for (const step of section.steps ?? []) parts.push(step.heading, step.description);
  for (const link of section.links ?? []) parts.push(link.label, link.description ?? "");
  for (const link of section.externalLinks ?? []) parts.push(link.label, link.description ?? "");
  if (section.table) parts.push(section.table.caption, ...section.table.columns, ...section.table.rows.flat());
  return parts.filter(Boolean).join("\n");
}

export function pagePlainText(page: HomePageDefinition | SeoPageDefinition) {
  const heroLead = page.hero.lead;
  const quickAnswers =
    "quickAnswers" in page.hero
      ? (page.hero.quickAnswers ?? []).flatMap((item) => [item.question, item.answer])
      : [];
  const sections = page.sections.map(sectionText);
  const faq = (page.faq ?? []).flatMap((item) => [item.question, item.answer]);
  return [page.title, page.description, page.hero.heading, heroLead, ...quickAnswers, ...sections, ...faq].join("\n");
}

export function wordCount(text: string) {
  return text.toLowerCase().match(/[a-z0-9]+(?:['-][a-z0-9]+)*/g)?.length ?? 0;
}

export function termCount(text: string, term: string) {
  const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return (text.match(new RegExp(`\\b${escaped}\\b`, "gi")) ?? []).length;
}
