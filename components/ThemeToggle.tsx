'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-10 h-10"></div>;
  }

  const currentTheme = theme === 'system' ? resolvedTheme : theme;

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-circle btn-ghost m-1">
        {currentTheme === 'dark' ? (
          <Moon className="h-5 w-5 transition-all duration-500 hover:scale-110" />
        ) : currentTheme === 'light' ? (
          <Sun className="h-5 w-5 transition-transform duration-500 rotate-0 hover:rotate-90" />
        ) : (
          <Monitor className="h-5 w-5" />
        )}
      </div>
      <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-200 rounded-box w-52 mt-4">
        <li>
          <button 
            onClick={() => setTheme('light')}
            className={`flex items-center gap-2 ${currentTheme === 'light' ? 'active' : ''}`}
          >
            <Sun className="h-4 w-4" />
            Light
          </button>
        </li>
        <li>
          <button 
            onClick={() => setTheme('dark')}
            className={`flex items-center gap-2 ${currentTheme === 'dark' ? 'active' : ''}`}
          >
            <Moon className="h-4 w-4" />
            Dark
          </button>
        </li>
        <li>
          <button 
            onClick={() => setTheme('system')}
            className={`flex items-center gap-2 ${theme === 'system' ? 'active' : ''}`}
          >
            <Monitor className="h-4 w-4" />
            System
          </button>
        </li>
      </ul>
    </div>
  );
}