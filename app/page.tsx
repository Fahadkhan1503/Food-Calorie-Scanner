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
    <main style={{ 
      minHeight: "100vh",
      paddingBottom: "40px",
      background: "var(--bg)",
      display: "flex",
      flexDirection: "column",
    }}>

      {/* Background glow - responsive */}
      <div style={{
        position: "fixed",
        top: "-150px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "clamp(400px, 90vw, 800px)",
        height: "clamp(400px, 90vw, 800px)",
        background: "radial-gradient(ellipse, rgba(200, 241, 53, 0.06) 0%, transparent 70%)",
        pointerEvents: "none",
        zIndex: 0,
      }} />

      {/* Main Content Container */}
      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        position: "relative",
        zIndex: 1,
        width: "100%",
      }}>
        {/* Header with responsive padding */}
        <header style={{ 
          padding: "clamp(32px, 8vw, 64px) clamp(16px, 5vw, 48px) clamp(24px, 5vw, 40px)",
          animation: "fadeUp 0.5s ease both",
          borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
        }}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span style={{ fontSize: "clamp(20px, 5vw, 28px)", color: "var(--accent)" }}>◎</span>
              <span style={{
                fontFamily: "var(--font-syne)",
                fontSize: "clamp(18px, 5vw, 26px)",
                fontWeight: "800",
                color: "var(--text)",
                letterSpacing: "-0.5px",
              }}>
                CalorieLens
              </span>
            </div>
            <ThemeToggle />
          </div>
          <p style={{ 
            fontSize: "clamp(13px, 3vw, 15px)", 
            color: "var(--text-muted)", 
            lineHeight: "1.6",
            marginTop: "8px",
            maxWidth: "400px",
          }}>
            Scan any food. Get instant nutrition breakdown.
          </p>
        </header>

        {/* Content Wrapper - optimized for all screen sizes */}
        <div style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          padding: "0 clamp(16px, 5vw, 48px)",
          maxWidth: "900px",
          width: "100%",
          margin: "0 auto",
        }}>
          {/* Uploader */}
          <div style={{ 
            marginBottom: "clamp(16px, 4vw, 28px)", 
            animation: "fadeUp 0.5s ease both",
            animationDelay: "0.1s",
          }}>
            <ImageUploader onImageSelect={handleImageSelect} isLoading={isLoading} />
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-3" style={{
              background: "rgba(255, 68, 68, 0.08)",
              border: "1px solid rgba(255, 68, 68, 0.2)",
              borderRadius: "8px",
              padding: "clamp(12px, 3vw, 16px) clamp(14px, 3vw, 20px)",
              marginBottom: "clamp(16px, 4vw, 24px)",
              color: "#ff6b6b",
              fontSize: "clamp(12px, 2.5vw, 14px)",
              animation: "fadeUp 0.5s ease both",
            }}>
              <span style={{ flexShrink: 0 }}>⚠</span>
              <p style={{ margin: 0 }}>{error}</p>
            </div>
          )}

          {/* Result */}
          {result && (
            <div style={{ 
              marginBottom: "clamp(20px, 5vw, 32px)", 
              animation: "fadeUp 0.5s ease both",
              animationDelay: "0.1s",
            }}>
              <ResultCard result={result} imageUrl={imageUrl} />
              <button
                onClick={handleReset}
                style={{
                  display: "block",
                  width: "100%",
                  marginTop: "clamp(10px, 2vw, 16px)",
                  padding: "clamp(12px, 3vw, 16px)",
                  background: "transparent",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  color: "var(--text-muted)",
                  fontSize: "clamp(13px, 2.5vw, 15px)",
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
        </div>
      </div>

      {/* Footer - sticky at bottom */}
      <footer style={{
        textAlign: "center",
        padding: "clamp(20px, 5vw, 32px) clamp(16px, 5vw, 48px)",
        fontSize: "clamp(10px, 2vw, 12px)",
        color: "var(--text-dim)",
        letterSpacing: "0.04em",
        borderTop: "1px solid rgba(255, 255, 255, 0.05)",
        marginTop: "auto",
      }}>
        Powered by Gemini Vision · Built with Next.js
      </footer>

    </main>
  );
}