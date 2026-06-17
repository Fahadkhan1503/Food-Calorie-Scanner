"use client";
import { useRouter, usePathname } from "next/navigation";
import ThemeToggle from "../lib/ThemeToggle";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const isBMI = pathname === "/bmi";

  return (
    <nav style={{
      borderBottom: "1px solid var(--border)",
      padding: "16px 32px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      position: "sticky",
      top: 0,
      background: "var(--bg)",
      zIndex: 10,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <span style={{ fontSize: "20px", color: "var(--accent)" }}>◎</span>
        <span style={{
          fontFamily: "var(--font-syne)",
          fontSize: "18px",
          fontWeight: "700",
          color: "var(--text)",
          letterSpacing: "-0.5px",
        }}>CalorieLens</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
  <button
  onClick={() => router.push(isBMI ? "/" : "/bmi")}
  style={{
    background: "transparent",
    border: "1px solid var(--border)",
    borderRadius: "100px",
    padding: "6px 12px",
    cursor: "pointer",
    fontSize: "12px",
    color: "var(--text)",
    fontFamily: "var(--font-dm)",
    fontWeight: "500",
    transition: "all 0.2s ease",
    whiteSpace: "nowrap",
  }}
>
  <span className="hidden sm:inline">{isBMI ? "Calorie Scanner" : "BMI Calculator"}</span>
  <span className="inline sm:hidden">{isBMI ? "Scanner" : "BMI"}</span>
</button>
  <ThemeToggle />
</div>
    </nav>
  );
}