"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/**
 * Stable reveal hook with hysteresis.
 */
export function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let lastState = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Prevent redundant state updates
        if (entry.isIntersecting !== lastState) {
          lastState = entry.isIntersecting;
          setVisible(entry.isIntersecting);
        }
      },
      {
        threshold,
        // Less aggressive margins
        rootMargin: "0px 0px -10% 0px",
      }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

/**
 * Stable staggered reveal.
 */
export function useStaggeredReveal(
  count: number,
  delay = 120
) {
  const containerRef = useRef<HTMLDivElement>(null);

  const [visibleItems, setVisibleItems] = useState<boolean[]>(
    () => Array(count).fill(false)
  );

  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const hasAnimatedRef = useRef(false);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Animate once while entering
        if (entry.isIntersecting && !hasAnimatedRef.current) {
          hasAnimatedRef.current = true;

          clearTimers();

          for (let i = 0; i < count; i++) {
            const timer = setTimeout(() => {
              setVisibleItems((prev) => {
                // avoid unnecessary rerender
                if (prev[i]) return prev;

                const next = [...prev];
                next[i] = true;
                return next;
              });
            }, i * delay);

            timersRef.current.push(timer);
          }
        }

        // Reset only when fully out of viewport
        if (
          !entry.isIntersecting &&
          entry.boundingClientRect.top > window.innerHeight
        ) {
          hasAnimatedRef.current = false;

          clearTimers();

          setVisibleItems(Array(count).fill(false));
        }
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      clearTimers();
    };
  }, [count, delay, clearTimers]);

  return { containerRef, visibleItems };
}