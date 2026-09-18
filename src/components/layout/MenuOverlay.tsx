"use client";

import Link from "next/link";
import { useEffect, useId, useRef } from "react";
import {
  FacebookIcon,
  InstagramIcon,
  YoutubeIcon,
} from "@/components/common/SocialIcons";
import {
  CONTACT,
  CTA_LINK,
  MENU_LINKS,
  SITE_NAME,
  SOCIAL,
} from "@/lib/site";
import styles from "./MenuOverlay.module.css";

type MenuOverlayProps = {
  open: boolean;
  onClose: () => void;
};

export function MenuOverlay({ open, onClose }: MenuOverlayProps) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  return (
    <>
      <button
        type="button"
        className={`${styles.backdrop} ${open ? styles.backdropOpen : ""}`}
        aria-label="Close menu"
        tabIndex={open ? 0 : -1}
        onClick={onClose}
      />

      <div
        ref={panelRef}
        id="site-menu"
        className={`${styles.panel} ${open ? styles.open : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-hidden={!open}
        inert={!open || undefined}
      >
        <div className={styles.body}>
          <aside className={styles.meta}>
            <div className={styles.flourish} aria-hidden="true">
              ✦
            </div>
            <h2 id={titleId} className="sr-only">
              Site menu
            </h2>
            <p className={styles.metaName}>{SITE_NAME}</p>
            <p className={styles.metaLine}>
              <a
                href={CONTACT.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {CONTACT.address}
              </a>
            </p>
            {CONTACT.email ? (
              <p className={styles.metaLine}>{CONTACT.email}</p>
            ) : null}
            <p className={styles.metaLine}>
              <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
            </p>

            <Link href={CTA_LINK.href} className={styles.metaCta} onClick={onClose}>
              {CTA_LINK.label}
            </Link>

            <div className={styles.socials}>
              {SOCIAL.instagram ? (
                <a
                  href={SOCIAL.instagram}
                  className={styles.social}
                  aria-label="Instagram"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <InstagramIcon />
                </a>
              ) : null}
              {SOCIAL.facebook ? (
                <a
                  href={SOCIAL.facebook}
                  className={styles.social}
                  aria-label="Facebook"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FacebookIcon />
                </a>
              ) : null}
              {SOCIAL.youtube ? (
                <a
                  href={SOCIAL.youtube}
                  className={styles.social}
                  aria-label="YouTube"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <YoutubeIcon />
                </a>
              ) : null}
            </div>
          </aside>

          <nav className={styles.nav} aria-label="Primary menu">
            <ul className={styles.list}>
              {MENU_LINKS.map((link, index) => (
                <li
                  key={link.href}
                  className={styles.item}
                  style={{
                    transitionDelay: open ? `${90 + index * 40}ms` : "0ms",
                  }}
                >
                  <Link href={link.href} className={styles.link} onClick={onClose}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
