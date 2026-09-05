"use client";

import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { siteConfig } from "@/config/site";
import type { InternalLink } from "@/config/types";
import { assetPath, routePath } from "@/lib/urls";

const linkClass =
  "whitespace-nowrap rounded-md px-2 py-1.5 text-xs font-bold text-muted-foreground transition hover:bg-secondary hover:text-foreground";

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

  return (
    <div className="relative lg:group">
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
      <ul
        className={`${submenuOpen ? "flex" : "hidden"} ml-3 mt-1 flex-col gap-1 lg:absolute lg:left-0 lg:top-full lg:z-50 lg:ml-0 lg:mt-0 lg:min-w-[11rem] lg:rounded-lg lg:border lg:border-border lg:bg-background lg:p-1 lg:shadow-theme lg:group-hover:flex lg:group-focus-within:flex`}
      >
        {children.map((child) => (
          <li key={child.slug}>
            <Link
              href={routePath(child.slug)}
              className="block rounded-md px-3 py-2 text-xs font-bold text-muted-foreground transition hover:bg-secondary hover:text-foreground"
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
        <Link href="/" className="flex min-w-0 items-center gap-2" onClick={() => setOpen(false)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={assetPath(siteConfig.assets.logo)} alt="" className="h-7 w-7 rounded-lg" />
          <span className="truncate text-sm font-black tracking-tight text-foreground">
            {siteConfig.shortName}
          </span>
        </Link>

        <button
          type="button"
          className="rounded-lg border border-border p-2 text-foreground lg:hidden"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>

        <nav
          aria-label="Primary navigation"
          className={`${open ? "flex" : "hidden"} absolute inset-x-0 top-14 flex-col gap-1 border-b border-border bg-background p-3 shadow-theme lg:static lg:flex lg:flex-row lg:flex-nowrap lg:items-center lg:gap-0.5 lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none`}
        >
          {links.map((link) => (
            <NavItem key={link.slug} link={link} onNavigate={() => setOpen(false)} />
          ))}
        </nav>
      </div>
    </header>
  );
}
