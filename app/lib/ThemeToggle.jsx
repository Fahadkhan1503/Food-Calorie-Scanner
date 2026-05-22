"use client";
import { useState, useEffect } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
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