'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const closeMenu = () => setIsOpen(false);
  const isActive = (path: string) => pathname === path;

  return (
    <header>
      <nav className="nav is-visible" aria-label="Main navigation">
        <Link href="/" className="nav__logo" onClick={closeMenu}>
          TOUFIQ<span className="dot">.</span>
        </Link>

        <ul className={`nav__links ${isOpen ? 'is-open' : ''}`} role="list">
          <li>
            <Link
              href="/"
              className={`nav__link ${isActive('/') ? 'is-active' : ''}`}
              onClick={closeMenu}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className={`nav__link ${isActive('/about') ? 'is-active' : ''}`}
              onClick={closeMenu}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/skills"
              className={`nav__link ${isActive('/skills') ? 'is-active' : ''}`}
              onClick={closeMenu}
            >
              Skills
            </Link>
          </li>
          <li>
            <Link
              href="/projects"
              className={`nav__link ${isActive('/projects') ? 'is-active' : ''}`}
              onClick={closeMenu}
            >
              Projects
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className={`nav__link ${isActive('/contact') ? 'is-active' : ''}`}
              onClick={closeMenu}
            >
              Contact
            </Link>
          </li>
        </ul>

        <div className="nav__right">
          <Link href="/contact" className="nav__cta" onClick={closeMenu}>
            Hire Me
          </Link>
          <button
            className={`nav__toggle ${isOpen ? 'is-open' : ''}`}
            aria-label="Toggle navigation"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>
    </header>
  );
}
