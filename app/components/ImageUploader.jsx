"use client";
import { useRef, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";

export default function ImageUploader({ onImageSelect, isLoading }) {
  const inputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFile = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    onImageSelect(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files[0]);
  };

  return (
    <div
      onClick={() => !isLoading && inputRef.current.click()}
      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
      style={{
        border: `1.5px dashed ${dragOver ? "var(--accent)" : "var(--border)"}`,
        borderRadius: "16px",
        padding: "56px 24px",
        textAlign: "center",
        cursor: isLoading ? "default" : "pointer",
        background: dragOver ? "rgba(200, 241, 53, 0.03)" : "var(--surface)",
        transition: "all 0.25s ease",
        position: "relative",
      }}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        // capture="environment"
        onChange={(e) => handleFile(e.target.files[0])}
        style={{ display: "none" }}
      />

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="flex flex-col items-center gap-3">
          {/* Camera icon */}
          <div style={{ color: "var(--accent)" }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="1.5">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
              <circle cx="12" cy="13" r="4" />
            </svg>
          </div>

          <p style={{
            fontFamily: "var(--font-syne)",
            fontSize: "18px",
            fontWeight: "600",
            color: "var(--text)",
          }}>
            Snap or upload food
          </p>

          <p style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: "1.5" }}>
            Tap to open camera or choose from gallery
          </p>

          <span style={{
            fontSize: "11px",
            color: "var(--text-dim)",
            background: "var(--surface2)",
            border: "1px solid var(--border)",
            padding: "4px 12px",
            borderRadius: "100px",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}>
            JPG · PNG · WEBP
          </span>
        </div>
      )}
    </div>
  );
}