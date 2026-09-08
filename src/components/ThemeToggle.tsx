'use client';

import { useEffect, useState } from 'react';

/** Paper by default; dark on request. Remembered in localStorage. */
export default function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    let saved: string | null = null;
    try { saved = localStorage.getItem('hn-theme'); } catch {}
    const isDark = saved === 'dark';
    setDark(isDark);
    document.documentElement.toggleAttribute('data-theme', isDark);
    if (isDark) document.documentElement.setAttribute('data-theme', 'dark');
  }, []);
  const toggle = () => {
    const next = !dark;
    setDark(next);
    if (next) document.documentElement.setAttribute('data-theme', 'dark');
    else document.documentElement.removeAttribute('data-theme');
    try { localStorage.setItem('hn-theme', next ? 'dark' : 'light'); } catch {}
  };
  return (
    <button type="button" className="theme-btn" onClick={toggle} aria-label={dark ? 'Switch to paper theme' : 'Switch to dark theme'} title={dark ? 'Paper' : 'Dark'}>
      {dark ? (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></svg>
      )}
    </button>
  );
}
