import Link from "next/link";
import { FacebookIcon, InstagramIcon } from "@/components/common/SocialIcons";
import { NewsletterForm } from "@/components/layout/NewsletterForm";
import {
  CONTACT,
  MENU_LINKS,
  SITE_NAME,
  SOCIAL,
} from "@/lib/site";
import styles from "./Footer.module.css";

const socialLinks = [
  {
    href: SOCIAL.facebook,
    label: "Facebook",
    Icon: FacebookIcon,
  },
  {
    href: SOCIAL.instagram,
    label: "Instagram",
    Icon: InstagramIcon,
  },
].filter((link) => Boolean(link.href));

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.shell}>
        <div className={styles.newsletter}>
          <p className={styles.eyebrow}>Join Our Community</p>
          <h2 className={styles.headline}>
            Be the first to experience {SITE_NAME} — where moments become
            memories. Get inspiration, updates and behind-the-scenes stories.
          </h2>
          <NewsletterForm />
        </div>

        <div className={styles.main}>
          <div className={styles.meta}>
            <p className={styles.metaName}>{SITE_NAME}</p>
            <p>
              <a href={CONTACT.mapUrl} target="_blank" rel="noopener noreferrer">
                {CONTACT.address}
              </a>
            </p>
            {CONTACT.email ? <p>{CONTACT.email}</p> : null}
            <p>
              <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
            </p>

            {socialLinks.length > 0 ? (
              <div className={styles.socials} aria-label="Social media">
                {socialLinks.map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    className={styles.social}
                    aria-label={label}
                    title={label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            ) : null}
          </div>

          <nav className={styles.nav} aria-label="Footer">
            <ul className={styles.linkList}>
              {MENU_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={styles.link}>
                    <span aria-hidden="true">·</span>
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/privacy" className={styles.link}>
                  <span aria-hidden="true">·</span>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className={styles.link}>
                  <span aria-hidden="true">·</span>
                  Terms and Conditions
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className={styles.bottom}>
          <p>
            All rights reserved {SITE_NAME}® · {year} ·{" "}
            <Link href="/privacy">Privacy Policy</Link> ·{" "}
            <Link href="/terms">Terms and Conditions</Link>
          </p>
          <p className={styles.credit}>Peshawar · Pakistan</p>
        </div>
      </div>
    </footer>
  );
}
