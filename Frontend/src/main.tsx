import React from "react";
import ReactDOM from "react-dom/client";

import {
  ThemeProvider,
  CssBaseline,
} from "@mui/material";

import App from "./App";
import getTheme from "./theme";

import {
  ThemeProviderWrapper,
  useThemeContext,
} from "./context/ThemeContext";

function AppTheme() {
  const { mode } =
    useThemeContext();

  return (
    <ThemeProvider
      theme={getTheme(
        mode as "light" | "dark",
      )}
    >
      <CssBaseline />
      <App />
    </ThemeProvider>
  );
}

ReactDOM.createRoot(
  document.getElementById("root")!,
).render(
  <React.StrictMode>
    <ThemeProviderWrapper>
      <AppTheme />
    </ThemeProviderWrapper>
  </React.StrictMode>,
);