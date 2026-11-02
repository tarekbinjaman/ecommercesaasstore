import { useEffect, useRef, useState } from "react";

/**
 * Returns true when the header should be hidden (scrolling down on small screens).
 */
export function useHideOnScroll({
  threshold = 8,     // minimum px delta to trigger
  topOffset = 80,    // always show when we're this close to the top
} = {}) {
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const diff = y - lastY.current;

      // ignore tiny jitters
      if (Math.abs(diff) < threshold) return;

      if (y <= topOffset) {
        setHidden(false);
      } else if (diff > 0) {
        setHidden(true);   // scrolling down → hide
      } else {
        setHidden(false);  // scrolling up → show
      }

      lastY.current = y;
    };

    // run once so the initial state is correct on refresh
    lastY.current = window.scrollY;

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold, topOffset]);

  return hidden;
}