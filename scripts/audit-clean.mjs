import { readFileSync, readdirSync, statSync } from "node:fs";
import { extname, join, relative } from "node:path";

const root = process.cwd();
const skippedDirs = new Set([".git", ".agent", ".next", "node_modules", "out", ".playwright-cli"]);
const skippedFiles = new Set(["package-lock.json", "audit-clean.mjs"]);
const textExtensions = new Set([".ts", ".tsx", ".js", ".mjs", ".json", ".md", ".css", ".html", ".txt", ".yml", ".yaml"]);
const allowedAdContainerIds = new Set(["container-69d1a785cc0ea35358a41e782f197b4f"]);
const legacyLabels = [
  ["Scary", "Shawarma"].join(" "),
  ["Crazy", "Cattle"].join(" "),
  ["Steal", "An", "Egg"].join(" "),
  ["Ab", "solum"].join(""),
];
const findings = [];

function walk(directory) {
  for (const name of readdirSync(directory)) {
    if (skippedDirs.has(name)) continue;
    const path = join(directory, name);
    const stat = statSync(path);
    if (stat.isDirectory()) walk(path);
    else if (textExtensions.has(extname(name)) && !skippedFiles.has(name)) inspect(path);
  }
}

function inspect(path) {
  const text = readFileSync(path, "utf8");
  const displayPath = relative(root, path);
  for (const label of legacyLabels) {
    if (text.toLowerCase().includes(label.toLowerCase())) findings.push(`${displayPath}: legacy identity '${label}'`);
  }
  const emails = text.match(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi) ?? [];
  for (const email of emails) findings.push(`${displayPath}: hardcoded email '${email}'`);
  const publisherIds = text.match(/\bca-pub-\d{8,}\b/gi) ?? [];
  for (const id of publisherIds) findings.push(`${displayPath}: hardcoded advertising publisher ID '${id}'`);
  if (/data-code=["'][A-Za-z0-9_-]{16,}["']/.test(text)) findings.push(`${displayPath}: hardcoded analytics code`);
  const adContainerIds = text.match(/container-[a-f0-9]{24,}/gi) ?? [];
  for (const id of adContainerIds) {
    if (!allowedAdContainerIds.has(id.toLowerCase())) {
      findings.push(`${displayPath}: hardcoded advertising container ID`);
    }
  }
}

walk(root);

if (findings.length) {
  console.error("Cleanliness audit failed:\n" + findings.map((item) => `- ${item}`).join("\n"));
  process.exit(1);
}

console.log("Cleanliness audit passed: no legacy identity, real email or embedded third-party ID found.");
