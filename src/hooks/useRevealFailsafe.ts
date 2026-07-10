import { useEffect, useRef } from 'react';

export function useRevealFailsafe(timeoutMs = 3500) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const timer = setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'none';
      el.style.visibility = 'visible';
    }, timeoutMs);

    return () => clearTimeout(timer);
  }, [timeoutMs]);

  return ref;
}
