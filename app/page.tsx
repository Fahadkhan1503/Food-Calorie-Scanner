"use client";
import { useState } from "react";
import ImageUploader from "./components/ImageUploader";
import ResultCard from "./components/ResultCard";
import ThemeToggle from "./lib/ThemeToggle";

export default function Home() {
  const [result, setResult] = useState<any>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

const handleImageSelect = async (file: File) => {
    setResult(null);
    setError(null);
    setImageUrl(URL.createObjectURL(file));
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.error) {
        setError(data.error);
      } else {
        setResult(data);
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setImageUrl(null);
    setError(null);
  };

  return (
    <main style={{ minHeight: "100vh", paddingBottom: "60px" }}>

      {/* Background glow */}
      <div style={{
        position: "fixed",
        top: "-200px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "600px",
        height: "600px",
        background: "radial-gradient(ellipse, rgba(200, 241, 53, 0.06) 0%, transparent 70%)",
        pointerEvents: "none",
        zIndex: 0,
      }} />

      <div style={{
        maxWidth: "680px",
        margin: "0 auto",
        padding: "0 20px",
        position: "relative",
        zIndex: 1,
      }}>

        {/* Header */}
        <header style={{ padding: "48px 0 32px", animation: "fadeUp 0.5s ease both" }}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span style={{ fontSize: "24px", color: "var(--accent)" }}>◎</span>
              <span style={{
                fontFamily: "var(--font-syne)",
                fontSize: "22px",
                fontWeight: "800",
                color: "var(--text)",
                letterSpacing: "-0.5px",
              }}>
                CalorieLens
              </span>
            </div>
            <ThemeToggle />
          </div>
          <p style={{ fontSize: "14px", color: "var(--text-muted)", lineHeight: "1.5" }}>
            Scan any food. Get instant nutrition breakdown.
          </p>
        </header>

        {/* Uploader */}
        <div style={{ marginBottom: "20px", animation: "fadeUp 0.5s ease both" }}>
          <ImageUploader onImageSelect={handleImageSelect} isLoading={isLoading} />
        </div>

        {/* Error */}
        {error && (
          <div className="flex items-center gap-3" style={{
            background: "rgba(255, 68, 68, 0.08)",
            border: "1px solid rgba(255, 68, 68, 0.2)",
            borderRadius: "8px",
            padding: "14px 16px",
            marginBottom: "20px",
            color: "#ff6b6b",
            fontSize: "13px",
          }}>
            <span>⚠</span>
            <p>{error}</p>
          </div>
        )}

        {/* Result */}
        {result && (
          <div style={{ marginBottom: "20px", animation: "fadeUp 0.5s ease both" }}>
            <ResultCard result={result} imageUrl={imageUrl} />
            <button
              onClick={handleReset}
              style={{
                display: "block",
                width: "100%",
                marginTop: "12px",
                padding: "14px",
                background: "transparent",
                border: "1px solid var(--border)",
                borderRadius: "8px",
                color: "var(--text-muted)",
                fontSize: "14px",
                cursor: "pointer",
                fontFamily: "var(--font-dm)",
                transition: "all 0.2s ease",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = "var(--accent)";
                e.currentTarget.style.color = "var(--accent)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.color = "var(--text-muted)";
              }}
            >
              Scan another food
            </button>
          </div>
        )}

        {/* Footer */}
        <footer style={{
          textAlign: "center",
          padding: "32px 0",
          fontSize: "11px",
          color: "var(--text-dim)",
          letterSpacing: "0.04em",
        }}>
          Powered by Gemini Vision · Built with Next.js
        </footer>

      </div>
    </main>
  );
}