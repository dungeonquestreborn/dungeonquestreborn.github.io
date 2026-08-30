# Game Wiki Template for GitHub Pages

A clean, reusable Next.js static-export template for one English-language game wiki or information site. The repository starts with indexing disabled, generic content, local placeholder assets and no analytics or advertising IDs.

## Create a new game site

1. Edit `config/site.ts` with the real site name, game entity, domain, contact method and asset paths.
2. Choose a preset in `siteConfig.theme.preset`, or add semantic token overrides. Available presets are `midnight-red`, `ocean-blue`, `forest-green` and `parchment-gold`.
3. Replace the homepage content in `content/home.ts`.
4. Replace or extend pages in `content/pages.ts`; legal pages live in `content/legal.ts`.
5. Replace every SVG in `public/images/` with owned or properly licensed media.
6. Run `npm install`, then `npm run typecheck`, `npm run lint` and `npm run build`.
7. Review the generated `out/` site, fix all audit findings and only then set `readyForLaunch: true`.
8. Commit to a new repository and enable GitHub Pages with **GitHub Actions** as the source.

Do not reuse a previous site's `.git` directory, remote, personal contact details or service IDs.

## Create a shareable ZIP

Run:

```bash
npm run package
```

The archive is written to `release/game_wiki_template_github_io.zip`. It contains the project inside a top-level folder and automatically excludes dependencies, build output, Git history, browser-test artifacts, caches, generated archives and private `.env` files. It keeps `.env.example`, `package.json` and `package-lock.json`, so the recipient can unzip it and run `npm install`.

The packaging command uses the standard `zip` utility available on macOS and most Linux environments, and does not add another npm dependency.

## Content architecture

`content/registry.ts` is the single source of truth for public subpages. An enabled page automatically participates in:

- static route generation;
- header and footer navigation;
- sitemap output;
- related-page resolution;
- `llms.txt` and `llms-full.txt`;
- SEO and broken-link audits.

Each page has one Hero H1. `PageSection.heading` renders as H2, while subsections, steps and FAQ questions render as H3. Slugs may be nested, such as `progression/speed`.

To disable or rename a page, update its definition. Do not manually edit generated SEO files.

## Hosting modes

Set deployment values as repository variables or build environment values:

| Mode | `NEXT_PUBLIC_SITE_URL` | `NEXT_PUBLIC_BASE_PATH` | `NEXT_PUBLIC_CUSTOM_DOMAIN` |
| --- | --- | --- | --- |
| Account root site | Final account Pages URL | empty | empty |
| Project site | Account Pages origin | `/repository-name` | empty |
| Custom domain | Final HTTPS domain | empty | domain without protocol |

Navigation uses Next.js base-path handling. Public images, canonical URLs, Open Graph URLs, sitemap links and generated CNAME output use the same configuration.

Copy `.env.example` to `.env.local` for local testing. Never commit `.env.local`.

## Optional integrations

All integrations are off when their environment values are empty.

- Pirsch requires `NEXT_PUBLIC_PIRSCH_CODE`.
- Native advertising requires both `NEXT_PUBLIC_ADSTERRA_NATIVE_SCRIPT_URL` and `NEXT_PUBLIC_ADSTERRA_NATIVE_CONTAINER_ID`.
- Search verification uses `GOOGLE_SITE_VERIFICATION` and `BING_SITE_VERIFICATION`.

The native ad component has no label, reserved height or fallback placeholder. The Privacy page describes only the integrations enabled for that build.

## SEO and launch safety

With `readyForLaunch: false`, page metadata is `noindex,nofollow` and `robots.txt` blocks crawling. A launch-enabled build fails if placeholder identity, domain, content, assets or contact configuration remains.

`npm run build` performs:

1. typed configuration validation;
2. repository cleanliness scanning;
3. a production static export;
4. `.nojekyll` and optional CNAME generation;
5. generated-HTML SEO auditing.

The SEO audit checks route parity, one H1 per page, H2/H3 order, unique titles, descriptions, canonical and social metadata, robots state, image alt text, internal links and homepage link coverage. Keyword density targets are reported for editorial review and never rewrite content automatically.

## Adding a page

Add a `SeoPageDefinition` to `content/pages.ts` or another file imported by `content/registry.ts`. Required fields include:

- unique normalized `slug`;
- page type, navigation label and enabled state;
- unique title and description;
- Hero H1 and lead;
- at least one H2 section;
- explicit `lastReviewed` date;
- optional FAQ, tables, screenshots, related pages and density targets.

Run the full build after every route or link change.

## GitHub Pages

The included workflow installs dependencies, type-checks, lints, validates configuration, builds the static export, audits the output and uploads `out/` to GitHub Pages. No remote is configured by this template.

Before the first deployment, confirm the repository's Pages source is set to **GitHub Actions** and add the required environment variables or repository variables for the selected hosting mode.
