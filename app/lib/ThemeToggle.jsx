"use client";
import { useState, useEffect } from "react";
import { theme } from "./theme";

export default function ThemeToggle() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const colors = dark ? theme.colors.dark : theme.colors.light;
    const root = document.documentElement;
    root.setAttribute("data-theme", dark ? "dark" : "light");
    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(
        `--${key.replace(/([A-Z])/g, "-$1").toLowerCase()}`,
        value
      );
    });
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "100px",
        padding: "6px 14px",
        cursor: "pointer",
        fontSize: "13px",
        color: "var(--text-muted)",
        fontFamily: "var(--font-dm)",
        transition: "all 0.2s ease",
        display: "flex",
        alignItems: "center",
        gap: "6px",
      }}
    >
      {dark ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
}