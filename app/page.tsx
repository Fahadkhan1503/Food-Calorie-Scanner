"use client";
import { useState } from "react";
import Image from "next/image";
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
      const res = await fetch("/api/analyze", { method: "POST", body: formData });
      const data = await res.json();
      if (data.error) setError(data.error);
      else setResult(data);
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
    <main style={{ minHeight: "100vh", background: "var(--bg)" }}>

      {/* Navbar */}
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
        <ThemeToggle />
      </nav>

      {/* Two column layout on desktop, single on mobile */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        minHeight: "calc(100vh - 57px)",
      }}
        className="max-md:grid-cols-1!"
      >

        {/* LEFT -- uploader + hero text */}
        <div style={{
          padding: "48px 40px",
          borderRight: "1px solid var(--border)",
          display: "flex",
          flexDirection: "column",
          gap: "28px",
        }}
          className="max-md:border-r-0 max-md:!padding-5"
        >
          {/* Badge
          <div style={{
            display: "inline-flex",
            width: "fit-content",
            fontSize: "11px",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "var(--accent)",
            background: "rgba(200, 241, 53, 0.08)",
            border: "1px solid rgba(200, 241, 53, 0.2)",
            padding: "4px 12px",
            borderRadius: "100px",
          }}>
            Powered by Gemini Vision
          </div> */}

          {/* Headline */}
          <div>
            <h1 style={{
              fontFamily: "var(--font-syne)",
              fontSize: "clamp(28px, 3.5vw, 48px)",
              fontWeight: "800",
              color: "var(--text)",
              lineHeight: "1.1",
              letterSpacing: "-1px",
              marginBottom: "12px",
            }}>
              Scan food.<br />
              <span style={{ color: "var(--accent)" }}>Know what</span><br />
              you eat.
            </h1>
            <p style={{
              fontSize: "14px",
              color: "var(--text-muted)",
              lineHeight: "1.7",
              maxWidth: "460px",
            }}>
              Upload or snap a photo of any food and get instant calorie and macro breakdown. Works with desi food too.
            </p>
          </div>

          {/* Uploader */}
          <ImageUploader onImageSelect={handleImageSelect} isLoading={isLoading} />
       {(result || imageUrl || error) && (
  <button
    onClick={handleReset}
    style={{
      padding: "8px 20px",
      background: "transparent",
      border: "2px solid var(--reset-border)",
      borderRadius: "100px",
      color: "var(--reset-text-color)",
      fontSize: "12px",
      fontWeight: "500",
      cursor: "pointer",
      fontFamily: "var(--font-dm)",
      transition: "all 0.2s ease",
      width: "fit-content",
    }}
    onMouseOver={(e) => {
      e.currentTarget.style.borderColor = "var(--btn-danger-hover-color)";
      e.currentTarget.style.color = "var(--btn-danger-hover-color)";
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.borderColor = "var(--reset-border)";
      e.currentTarget.style.color = "var(--reset-text-color)";
    }}
  >
    ✕ Reset
  </button>
)}
          {/* Error */}
          {error && (
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              background: "rgba(255, 68, 68, 0.08)",
              border: "1px solid rgba(255, 68, 68, 0.2)",
              borderRadius: "8px",
              padding: "14px 16px",
              color: "#ff6b6b",
              fontSize: "13px",
            }}>
              <span>⚠</span>
              <p>{error}</p>
            </div>
          )}

          {/* Stats */}
          <div style={{
            display: "flex",
            gap: "32px",
            paddingTop: "16px",
            borderTop: "1px solid var(--border)",
          }}>
            {[
              { value: "50+", label: "Cuisines" },
              { value: "Free", label: "No signup" },
              { value: "2s", label: "Avg response" },
            ].map((s) => (
              <div key={s.label}>
                <div style={{
                  fontFamily: "var(--font-syne)",
                  fontSize: "18px",
                  fontWeight: "700",
                  color: "var(--text)",
                }}>{s.value}</div>
                <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT -- result or hero image */}
        <div style={{
          padding: "48px 40px",
          background: "var(--surface)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "16px",
        }}
          className="max-md:!padding-5"
        >
          {/* No result -- show hero image */}
          {!result && !isLoading && (
            <div style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              gap: "16px",
              padding: "20px",
            }}>
              <Image
                src="/heroimage.png"
                alt="Food illustration"
                width={400}
                height={320}
                style={{
                  objectFit: "cover",
                  width: "100%",
                  height: "320px",
                  borderRadius: "16px",
                  opacity: 0.9,
                }}
              />
              <p style={{
                fontSize: "13px",
                color: "var(--text-muted)",
                textAlign: "center",
              }}>
                Your nutrition breakdown will appear here
              </p>
            </div>
          )}

          {/* Result */}
          {result && (
            <>
              <ResultCard result={result} imageUrl={imageUrl} />
              <button
                onClick={handleReset}
                style={{
                  width: "100%",
                  padding: "14px",
                  background: "transparent",
                  border: "2px solid var(--border2)",
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
                  e.currentTarget.style.borderColor = "var(--border2)";
                  e.currentTarget.style.color = "var(--text-muted)";
                }}
              >
                Scan another food
              </button>
            </>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer style={{
  textAlign: "center",
  padding: "30px 20px 20px 20px",
  fontSize: "12px",
  fontFamily: "var(--font-dm)",
  fontWeight: "500",
  color: "var(--text)",
  letterSpacing: "0.04em",
  borderTop: "1px solid var(--border)",
}}>
  Built by <a href="https://github.com/Fahadkhan1503" target="_blank" style={{ color: "var(--accent)", textDecoration: "none" }}>Muhammad Fahad</a> · Powered by Gemini Vision
</footer>
    </main>
  );
}