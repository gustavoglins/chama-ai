'use client';

import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;

    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    setTheme(initialTheme);

    if (initialTheme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);

    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    localStorage.setItem('theme', newTheme);
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-muted">
        <div className="h-3.5 w-3.5" />
      </div>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="inline-flex h-7 w-7 items-center justify-center rounded-full transition-all duration-300 ease-in-out focus:outline-none cursor-pointer shadow-sm"
      style={{
        backgroundColor: theme === 'dark' ? '#1e293b' : '#fef3c7',
      }}
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <Sun
          className="h-4 w-4 transition-all duration-300"
          style={{ color: '#fe9a00' }}
          fill="#fe9a00"
          strokeWidth={1.5}
        />
      ) : (
        <Moon
          className="h-3.5 w-3.5 transition-all duration-300"
          style={{ color: '#60a5fa' }}
          fill="#60a5fa"
        />
      )}
    </button>
  );
}
