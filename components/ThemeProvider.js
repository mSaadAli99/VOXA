"use client";

import { createContext, useContext, useEffect, useMemo } from "react";

const ThemeContext = createContext({
  theme: "orb",
  setTheme: () => {},
});

export function ThemeProvider({ children }) {
  const theme = "orb";

  useEffect(() => {
    document.documentElement.dataset.theme = "orb";
    window.localStorage.setItem("voxa-theme", "orb");
  }, []);

  const value = useMemo(() => ({ theme, setTheme: () => {} }), [theme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
