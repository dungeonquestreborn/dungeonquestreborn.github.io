"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

type BannerConfig = {
  key: string;
  scriptUrl: string;
  width: 728 | 320;
  height: 90 | 50;
};

declare global {
  interface Window {
    atOptions?: {
      key: string;
      format: "iframe";
      height: number;
      width: number;
      params: Record<string, never>;
    };
  }
}

export function ResponsiveBannerClient({ desktop, mobile }: { desktop: BannerConfig; mobile: BannerConfig }) {
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);
  const [isFilled, setIsFilled] = useState(false);
  const hostRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const updateViewport = () => setIsDesktop(mediaQuery.matches);
    updateViewport();
    mediaQuery.addEventListener("change", updateViewport);
    return () => mediaQuery.removeEventListener("change", updateViewport);
  }, []);

  const banner = isDesktop === null ? null : isDesktop ? desktop : mobile;

  useEffect(() => {
    if (!banner) return;

    const host = hostRef.current;
    if (!host) return;

    setIsFilled(false);
    host.replaceChildren();
    const showWhenCreativeArrives = () => {
      if (host.querySelector("iframe")) setIsFilled(true);
    };
    const observer = new MutationObserver(showWhenCreativeArrives);
    observer.observe(host, { childList: true, subtree: true });

    window.atOptions = {
      key: banner.key,
      format: "iframe",
      height: banner.height,
      width: banner.width,
      params: {},
    };

    const script = document.createElement("script");
    script.async = true;
    script.src = banner.scriptUrl;
    script.dataset.adsterraBanner = banner.key;
    script.addEventListener("load", showWhenCreativeArrives);
    host.appendChild(script);

    return () => {
      observer.disconnect();
      host.replaceChildren();
    };
  }, [banner]);

  return (
    <section
      aria-label="Advertisement"
      className={`responsive-banner-slot ${isFilled ? "responsive-banner-slot--filled" : "responsive-banner-slot--empty"} ${isDesktop ? "responsive-banner-slot--desktop" : "responsive-banner-slot--mobile"}`}
    >
      {isFilled ? <p className="responsive-banner-slot__label">Advertisement</p> : null}
      <div ref={hostRef} data-responsive-banner-slot />
    </section>
  );
}
