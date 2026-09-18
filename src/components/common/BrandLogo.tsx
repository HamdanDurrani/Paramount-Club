import Image from "next/image";
import { SITE_LOGO, SITE_NAME } from "@/lib/site";
import styles from "./BrandLogo.module.css";

type BrandLogoProps = {
  href?: string;
  priority?: boolean;
  className?: string;
  /** Slightly larger mark for footer */
  size?: "nav" | "footer";
};

export function BrandLogo({
  priority = false,
  className = "",
  size = "nav",
}: BrandLogoProps) {
  const isFooter = size === "footer";

  return (
    <span className={`${styles.wrap} ${styles[size]} ${className}`.trim()}>
      <Image
        src={SITE_LOGO}
        alt={`${SITE_NAME} logo`}
        width={isFooter ? 280 : 320}
        height={isFooter ? 129 : 147}
        className={styles.image}
        priority={priority}
      />
    </span>
  );
}
