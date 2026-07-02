"use client";
import { Camera, Upload, X } from "lucide-react";

export default function ImageSourceModal({ onClose, onCapture, onUpload }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.7)",
        zIndex: 50,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "20px",
          padding: "24px",
          width: "100%",
          maxWidth: "400px",
          marginBottom: "20px",
          animation: "fadeUp 0.3s ease both",
        }}
      >
        {/* Header */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}>
          <h3 style={{
            fontFamily: "var(--font-syne)",
            fontSize: "16px",
            fontWeight: "700",
            color: "var(--text)",
          }}>
            Add Food Photo
          </h3>
          <button
            onClick={onClose}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: "var(--text-muted)",
              padding: "4px",
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Options */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <button
            onClick={onCapture}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              padding: "16px",
              background: "var(--surface2)",
              border: "1px solid var(--border)",
              borderRadius: "12px",
              cursor: "pointer",
              transition: "all 0.2s ease",
              width: "100%",
            }}
          >
            <div style={{
              width: "40px",
              height: "40px",
              borderRadius: "10px",
              background: "rgba(200, 241, 53, 0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--accent)",
              flexShrink: 0,
            }}>
              <Camera size={20} />
            </div>
            <div style={{ textAlign: "left" }}>
              <p style={{ fontSize: "14px", fontWeight: "600", color: "var(--text)", marginBottom: "2px" }}>
                Take Photo
              </p>
              <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                Open camera to capture food
              </p>
            </div>
          </button>

          <button
            onClick={onUpload}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              padding: "16px",
              background: "var(--surface2)",
              border: "1px solid var(--border)",
              borderRadius: "12px",
              cursor: "pointer",
              transition: "all 0.2s ease",
              width: "100%",
            }}
          >
            <div style={{
              width: "40px",
              height: "40px",
              borderRadius: "10px",
              background: "rgba(200, 241, 53, 0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--accent)",
              flexShrink: 0,
            }}>
              <Upload size={20} />
            </div>
            <div style={{ textAlign: "left" }}>
              <p style={{ fontSize: "14px", fontWeight: "600", color: "var(--text)", marginBottom: "2px" }}>
                Upload Photo
              </p>
              <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                Choose from your gallery
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}