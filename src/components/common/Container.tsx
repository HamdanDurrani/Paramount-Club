import { ReactNode } from "react";
import styles from "./Container.module.css";

interface ContainerProps {
  children: ReactNode;
  wide?: boolean;
  className?: string;
  as?: "div" | "section" | "article";
}

export function Container({
  children,
  wide = false,
  className = "",
  as: Tag = "div",
}: ContainerProps) {
  return (
    <Tag className={`${wide ? styles.containerWide : styles.container} ${className}`.trim()}>
      {children}
    </Tag>
  );
}
