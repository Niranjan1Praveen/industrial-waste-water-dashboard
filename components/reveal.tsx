"use client";
import { useReveal } from "@/lib/useReveal";
import type { CSSProperties, ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  /** Extra ms delay before the transition starts (stagger sibling elements) */
  delay?: number;
  /** Tailwind / custom className forwarded to the wrapper div */
  className?: string;
  /** Override the hidden transform. Default: translateY(28px) */
  from?: string;
  /** Override the visible transform. Default: translateY(0) */
  to?: string;
  /** Override the transition duration in ms. Default: 650 */
  duration?: number;
  /** Intersection threshold. Default: 0.12 */
  threshold?: number;
  style?: CSSProperties;
}

/**
 * <Reveal> — bidirectional scroll-triggered reveal wrapper.
 *
 * Animates IN when the element enters the viewport and
 * DE-animates OUT when it scrolls fully out of view again.
 *
 * Usage:
 *   <Reveal delay={100} className="col-span-2">
 *     <MyCard />
 *   </Reveal>
 */
export default function Reveal({
  children,
  delay = 0,
  className = "",
  from = "translateY(28px)",
  to = "translateY(0)",
  duration = 650,
  threshold = 0.12,
  style,
}: RevealProps) {
  const { ref, visible } = useReveal(threshold);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? to : from,
        transition: `opacity ${duration}ms ${delay}ms cubic-bezier(0.22,1,0.36,1), transform ${duration}ms ${delay}ms cubic-bezier(0.22,1,0.36,1)`,
        willChange: "opacity, transform",
        ...style,
      }}
    >
      {children}
    </div>
  );
}