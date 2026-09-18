"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BrandLogo } from "@/components/common/BrandLogo";
import { MenuOverlay } from "@/components/layout/MenuOverlay";
import { SITE_HEADER_TAGLINE, SITE_NAME } from "@/lib/site";
import styles from "./Navbar.module.css";

/**
 * Farmform-style header:
 * - Over hero: tagline + center logo + light MENU
 * - Past hero: center logo/tagline fade out, small left mark fades in,
 *   MENU morphs into a dark pill
 */
export function Navbar() {
  const pathname = usePathname();
  const [pastHero, setPastHero] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const hero = document.querySelector("[data-hero]");
    if (!(hero instanceof HTMLElement)) {
      // Interior pages without a cinematic hero stay in the scrolled state
      setPastHero(true);
      return;
    }

    setPastHero(false);

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Switch once the hero mostly leaves the viewport
        setPastHero(!entry.isIntersecting || entry.intersectionRatio < 0.35);
      },
      {
        threshold: [0, 0.2, 0.35, 0.5, 0.75, 1],
        rootMargin: "-8% 0px 0px 0px",
      },
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <header className={`${styles.header} ${open ? styles.headerOpen : ""} ${pastHero ? styles.pastHero : ""}`}>
        <div className={styles.inner}>
          {/* Left: slogan on hero / compact mark after hero */}
          <div className={styles.leftSlot}>
            <p
              className={`${styles.tagline} ${
                pastHero ? styles.isHidden : styles.isShown
              }`}
            >
              <span className={styles.star} aria-hidden="true">
                ✦
              </span>
              <span>{SITE_HEADER_TAGLINE}</span>
            </p>

            <Link
              href="/"
              className={`${styles.mark} ${
                pastHero ? styles.isShown : styles.isHidden
              }`}
              aria-label={`${SITE_NAME} home`}
              tabIndex={pastHero ? 0 : -1}
              aria-hidden={!pastHero}
            >
              <span className={styles.markCircle} aria-hidden="true">
                PC
              </span>
            </Link>
          </div>

          {/* Center wordmark — only over the hero */}
          <Link
            href="/"
            className={`${styles.logo} ${
              pastHero ? styles.isHidden : styles.isShown
            }`}
            aria-label={`${SITE_NAME} home`}
            tabIndex={pastHero ? -1 : 0}
            aria-hidden={pastHero}
          >
            <BrandLogo priority size="nav" />
          </Link>

          <button
            type="button"
            className={`${styles.menuButton} ${
              pastHero || open ? styles.menuDark : styles.menuLight
            } ${open ? styles.menuOpen : ""}`}
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            <span>Menu</span>
            <svg
              className={styles.icon}
              width="21"
              height="21"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                className={styles.lineTop}
                d="M3 5H21"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                className={styles.lineMidA}
                d="M3 12H21"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                className={styles.lineMidB}
                d="M3 12H21"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                className={styles.lineBottom}
                d="M3 19H21"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </header>

      <MenuOverlay open={open} onClose={() => setOpen(false)} />
    </>
  );
}
