import { ReactNode } from "react";
import styles from "./SectionHeading.module.css";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  as: Tag = "h2",
  className = "",
}: SectionHeadingProps) {
  return (
    <header
      className={`${styles.heading} ${align === "center" ? styles.alignCenter : styles.alignLeft} ${className}`.trim()}
    >
      {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
      <div className={styles.rule} aria-hidden="true" />
      <Tag className={styles.title}>{title}</Tag>
      {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
    </header>
  );
}
