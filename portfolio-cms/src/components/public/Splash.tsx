'use client';

import { useEffect, useState, useRef } from 'react';

export default function Splash() {
  const [mounted, setMounted] = useState(false);
  const [show, setShow] = useState(false);
  const [exiting, setExiting] = useState(false);
  const timer1Ref = useRef<NodeJS.Timeout | null>(null);
  const timer2Ref = useRef<NodeJS.Timeout | null>(null);

  const startSplashSequence = () => {
    if (timer1Ref.current) clearTimeout(timer1Ref.current);
    if (timer2Ref.current) clearTimeout(timer2Ref.current);

    setShow(true);
    setExiting(false);

    timer1Ref.current = setTimeout(() => {
      setExiting(true);
      timer2Ref.current = setTimeout(() => {
        setShow(false);
        sessionStorage.setItem('splash_seen', '1');
      }, 750);
    }, 1400);
  };

  useEffect(() => {
    setMounted(true);
    // Show splash on first session visit
    const seen = sessionStorage.getItem('splash_seen');
    if (!seen) {
      startSplashSequence();
    }

    // Listen for restart request (e.g. clicking top-left logo)
    const handleRestart = () => {
      startSplashSequence();
    };

    window.addEventListener('restart-splash', handleRestart);
    return () => {
      window.removeEventListener('restart-splash', handleRestart);
      if (timer1Ref.current) clearTimeout(timer1Ref.current);
      if (timer2Ref.current) clearTimeout(timer2Ref.current);
    };
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
