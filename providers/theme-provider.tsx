"use client";

import { setThemeCookie } from "@/lib/actions/theme-actions";
import { ThemeProvider as NextThemeProvider } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Listen for theme changes and save to cookie
    const handleThemeChange = () => {
      const theme = localStorage.getItem('theme');
      if (theme) {
        setThemeCookie(theme);
      }
    };
    
    window.addEventListener('storage', handleThemeChange);
    return () => window.removeEventListener('storage', handleThemeChange);
  }, []);

  return (
    <NextThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
      storageKey="theme"
    >
      {mounted ? children : <div style={{ visibility: 'hidden' }}>{children}</div>}
    </NextThemeProvider>
  );
}