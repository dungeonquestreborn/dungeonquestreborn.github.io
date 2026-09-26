"use client";

import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { siteConfig } from "@/config/site";
import type { InternalLink } from "@/config/types";
import { assetPath, routePath } from "@/lib/urls";

const linkClass =
  "whitespace-nowrap rounded-md px-2 py-1.5 text-[11px] font-bold text-muted-foreground transition hover:bg-secondary hover:text-foreground";

function NavItem({ link, onNavigate }: { link: InternalLink; onNavigate: () => void }) {
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const children = link.children ?? [];

  if (!children.length) {
    return (
      <Link href={routePath(link.slug)} className={linkClass} onClick={onNavigate}>
        {link.label}
      </Link>
    );
  }

  const menuClass = `${submenuOpen ? "flex" : "hidden"} ml-3 mt-1 flex-col gap-1 xl:absolute xl:top-full xl:z-50 xl:ml-0 xl:mt-0 xl:min-w-[11rem] xl:rounded-lg xl:border xl:border-border xl:bg-background xl:p-1 xl:shadow-theme xl:group-hover:flex xl:group-focus-within:flex ${link.menuOnly ? "xl:right-0 xl:left-auto" : "xl:left-0"}`;

  return (
    <div className="group relative">
      {link.menuOnly ? (
        <button
          type="button"
          className={`${linkClass} inline-flex items-center`}
          aria-expanded={submenuOpen}
          aria-haspopup="true"
          onClick={() => setSubmenuOpen((value) => !value)}
        >
          {link.label}
          <ChevronDown size={14} />
        </button>
      ) : (
        <div className="flex items-center">
          <Link href={routePath(link.slug)} className={linkClass} onClick={onNavigate}>
            {link.label}
          </Link>
          <button
            type="button"
            className="rounded-md p-1 text-muted-foreground transition hover:bg-secondary hover:text-foreground"
            aria-expanded={submenuOpen}
            aria-haspopup="true"
            aria-label={`Open ${link.label} submenu`}
            onClick={() => setSubmenuOpen((value) => !value)}
          >
            <ChevronDown size={14} />
          </button>
        </div>
      )}
      <ul className={menuClass}>
        {children.map((child) => (
          <li key={child.slug}>
            <Link
              href={routePath(child.slug)}
              className="block rounded-md px-3 py-2 text-[11px] font-bold text-muted-foreground transition hover:bg-secondary hover:text-foreground"
              onClick={() => {
                setSubmenuOpen(false);
                onNavigate();
              }}
            >
              {child.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteHeader({ links }: { links: InternalLink[] }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/90 backdrop-blur-xl">
      <div className="site-container flex h-14 items-center justify-between gap-3">
        <Link href="/" className="flex shrink-0 items-center gap-2" onClick={() => setOpen(false)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={assetPath(siteConfig.assets.logo)} alt="" className="h-7 w-7 rounded-lg" />
          <span className="text-[13px] font-black tracking-tight text-foreground">
            {siteConfig.shortName}
          </span>
        </Link>

        <button
          type="button"
          className="rounded-lg border border-border p-2 text-foreground xl:hidden"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>

        <nav
          aria-label="Primary navigation"
          className={`${open ? "flex" : "hidden"} absolute inset-x-0 top-14 flex-col gap-1 border-b border-border bg-background p-3 shadow-theme xl:static xl:flex xl:flex-row xl:flex-nowrap xl:items-center xl:gap-0 xl:border-0 xl:bg-transparent xl:p-0 xl:shadow-none`}
        >
          {links.map((link) => (
            <NavItem key={link.slug} link={link} onNavigate={() => setOpen(false)} />
          ))}
        </nav>
      </div>
    </header>
  );
}
