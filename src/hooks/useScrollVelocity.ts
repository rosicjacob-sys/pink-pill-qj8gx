import { useEffect, useRef, useCallback } from 'react';
import { getVelocity } from '../lib/lenis-config';

export function useScrollVelocity(callback: (velocity: number) => void, deps: any[] = []) {
  const rafRef = useRef<number | null>(null);

  const loop = useCallback(() => {
    const v = getVelocity();
    callback(v);
    rafRef.current = requestAnimationFrame(loop);
  }, [callback, ...deps]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [loop]);
}
