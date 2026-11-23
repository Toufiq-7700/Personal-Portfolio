'use client';

import { useEffect, useState } from 'react';

export default function Splash() {
  const [mounted, setMounted] = useState(false);
  const [show, setShow] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Show splash once per session
    const seen = sessionStorage.getItem('splash_seen');
    if (!seen) {
      setShow(true);
      const timer1 = setTimeout(() => {
        setExiting(true);
        const timer2 = setTimeout(() => {
          setShow(false);
          sessionStorage.setItem('splash_seen', '1');
        }, 750);
        return () => clearTimeout(timer2);
      }, 1400);

      return () => clearTimeout(timer1);
    }
  }, []);

  if (!mounted || !show) return null;

  return (
    <div
      id="splash"
      className={exiting ? 'splash--exit' : ''}
      role="status"
      aria-label="Loading"
    >
      <span className="splash__label">Welcome</span>
      <p className="splash__name">
        TOUFIQ<span className="dot">.</span>
      </p>
    </div>
  );
}
