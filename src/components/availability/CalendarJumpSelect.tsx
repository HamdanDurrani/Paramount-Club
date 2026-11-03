"use client";

import {
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { createPortal } from "react-dom";
import styles from "./AvailabilityCalendar.module.css";

export interface JumpOption {
  value: number;
  label: string;
  disabled?: boolean;
}

interface CalendarJumpSelectProps {
  label: string;
  value: number;
  options: readonly JumpOption[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onChange: (value: number) => void;
}

const MENU_GAP = 6;
const VIEWPORT_PAD = 8;
const PREFERRED_HEIGHT = 264;
const FLIP_THRESHOLD = 96;

function menuPosition(trigger: DOMRect): CSSProperties {
  const left = Math.max(
    VIEWPORT_PAD,
    Math.min(trigger.left, window.innerWidth - trigger.width - VIEWPORT_PAD),
  );
  const spaceBelow = window.innerHeight - trigger.bottom - MENU_GAP - VIEWPORT_PAD;
  const spaceAbove = trigger.top - MENU_GAP - VIEWPORT_PAD;

  // Prefer opening under the field. Only flip up when below is clearly unusable
  // and above has meaningfully more room.
  const openDown =
    spaceBelow >= FLIP_THRESHOLD || spaceBelow >= spaceAbove * 0.75;

  const available = openDown ? spaceBelow : spaceAbove;
  const maxHeight = Math.max(
    72,
    Math.min(PREFERRED_HEIGHT, Math.max(0, available)),
  );

  const base: CSSProperties = {
    position: "fixed",
    left,
    width: trigger.width,
    maxHeight,
    zIndex: 1000,
    backgroundColor: "#000000",
    color: "#ffffff",
  };

  if (openDown) {
    return {
      ...base,
      top: trigger.bottom + MENU_GAP,
      bottom: "auto",
    };
  }

  return {
    ...base,
    top: "auto",
    bottom: window.innerHeight - trigger.top + MENU_GAP,
  };
}

export function CalendarJumpSelect({
  label,
  value,
  options,
  open,
  onOpenChange,
  onChange,
}: CalendarJumpSelectProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);
  const scrolledToActiveRef = useRef(false);
  const listId = useId();
  const selected = options.find((option) => option.value === value);
  const [menuStyle, setMenuStyle] = useState<CSSProperties | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useLayoutEffect(() => {
    if (!open) {
      setMenuStyle(null);
      scrolledToActiveRef.current = false;
      return;
    }

    const trigger = triggerRef.current;
    if (!trigger) return;

    // Bring the field into view so the menu can sit under it.
    trigger.scrollIntoView({ block: "nearest", inline: "nearest" });

    const updatePosition = (event?: Event) => {
      // Ignore scrolls inside the menu — those must not reset list scroll.
      if (
        event?.target instanceof Node &&
        menuRef.current &&
        (event.target === menuRef.current ||
          menuRef.current.contains(event.target))
      ) {
        return;
      }
      const rect = triggerRef.current?.getBoundingClientRect();
      if (!rect) return;
      setMenuStyle(menuPosition(rect));
    };

    updatePosition();
    // Re-measure after scrollIntoView settles.
    const raf = window.requestAnimationFrame(() => updatePosition());

    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);
    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [open]);

  useLayoutEffect(() => {
    if (!open || !menuStyle || !menuRef.current || scrolledToActiveRef.current) {
      return;
    }

    const menu = menuRef.current;
    const active = menu.querySelector<HTMLElement>('[aria-selected="true"]');
    if (!active) return;

    // Scroll only the listbox (never the page), once per open.
    const menuRect = menu.getBoundingClientRect();
    const activeRect = active.getBoundingClientRect();
    const delta =
      activeRect.top -
      menuRect.top -
      menuRect.height / 2 +
      activeRect.height / 2;
    menu.scrollTop += delta;
    scrolledToActiveRef.current = true;
  }, [open, menuStyle]);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        rootRef.current?.contains(target) ||
        menuRef.current?.contains(target)
      ) {
        return;
      }
      onOpenChange(false);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onOpenChange(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onOpenChange]);

  const menu =
    mounted && open && menuStyle
      ? createPortal(
          <ul
            ref={menuRef}
            id={listId}
            className={styles.jumpMenu}
            role="listbox"
            aria-label={label}
            style={menuStyle}
          >
            {options.map((option) => {
              const active = option.value === value;
              return (
                <li key={option.value} className={styles.jumpOptionItem}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={active}
                    disabled={option.disabled}
                    className={`${styles.jumpOption} ${active ? styles.jumpOptionActive : ""}`}
                    style={{
                      backgroundColor: active ? "#262626" : "#000000",
                      color: option.disabled
                        ? "rgba(255,255,255,0.5)"
                        : "#ffffff",
                      fontFamily:
                        'var(--font-sans), "Manrope", system-ui, sans-serif',
                    }}
                    onClick={() => {
                      if (option.disabled) return;
                      onChange(option.value);
                      onOpenChange(false);
                    }}
                  >
                    {option.label}
                  </button>
                </li>
              );
            })}
          </ul>,
          document.body,
        )
      : null;

  return (
    <div className={styles.jumpField} ref={rootRef}>
      <span className={styles.jumpLabel}>{label}</span>
      <button
        ref={triggerRef}
        type="button"
        className={`${styles.jumpTrigger} ${open ? styles.jumpTriggerOpen : ""}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-label={`${label}: ${selected?.label ?? "Select"}`}
        onClick={() => onOpenChange(!open)}
      >
        <span className={styles.jumpValue}>{selected?.label ?? "Select"}</span>
        <span className={styles.jumpCaret} aria-hidden="true" />
      </button>
      {menu}
    </div>
  );
}
