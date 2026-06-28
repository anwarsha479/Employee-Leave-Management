import {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
} from "react";

const ThemeContext = createContext<any>(null);

export function ThemeProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mode, setMode] = useState(
    localStorage.getItem("theme") || "dark"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", mode);
  }, [mode]);

  const toggleTheme = () => {
    const newMode =
      mode === "dark" ? "light" : "dark";

    setMode(newMode);
    localStorage.setItem(
      "theme",
      newMode,
    );
  };

  const value = useMemo(
    () => ({
      mode,
      toggleTheme,
    }),
    [mode],
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useThemeContext = () =>
  useContext(ThemeContext);