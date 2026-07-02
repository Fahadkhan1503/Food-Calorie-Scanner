"use client";
import { Lightbulb } from "lucide-react";
const confidenceColor = {
  high: "#c8f135",
  medium: "#f5c518",
  low: "#ff6b6b",
};

const healthLabel = (score) => {
  if (score >= 8) return { label: "Very Healthy", color: "#c8f135" };
  if (score >= 6) return { label: "Healthy", color: "#7ed56f" };
  if (score >= 4) return { label: "Moderate", color: "#f5c518" };
  return { label: "Indulgent", color: "#ff6b6b" };
};

const macros = (data) => [
  { label: "Protein", value: data.protein, color: "#7ed56f" },
  { label: "Carbs", value: data.carbs, color: "#60a5fa" },
  { label: "Fat", value: data.fat, color: "#f97316" },
  { label: "Fiber", value: data.fiber, color: "#a78bfa" },
];

export default function ResultCard({ result, imageUrl }) {
  const health = healthLabel(result.healthScore);

  return (
    <div style={{
      background: "var(--surface)",
      border: "1px solid var(--border)",
      borderRadius: "16px",
      overflow: "hidden",
      animation: "fadeUp 0.4s ease both",
    }}>

      {/* Header */}
      <div className="flex gap-4 p-5 items-start">
        {imageUrl && (
          <img
            src={imageUrl}
            alt={result.foodName}
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "12px",
              objectFit: "cover",
              border: "1px solid var(--border)",
              flexShrink: 0,
            }}
          />
        )}
        <div className="flex flex-col gap-1">
          <div className="flex gap-3 flex-wrap">
            <span style={{ fontSize: "11px", color: confidenceColor[result.confidence], textTransform: "uppercase", letterSpacing: "0.06em" }}>
              ● {result.confidence} confidence
            </span>
            <span style={{ fontSize: "11px", color: health.color, textTransform: "uppercase", letterSpacing: "0.06em" }}>
              {health.label}
            </span>
          </div>
          <h2 style={{
            fontFamily: "var(--font-syne)",
            fontSize: "22px",
            fontWeight: "700",
            color: "var(--text)",
            lineHeight: "1.2",
          }}>
            {result.foodName}
          </h2>
          <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>
            Serving: {result.servingSize}
          </p>
        </div>
      </div>

      {/* Calories */}
      <div className="flex items-baseline gap-2 px-5 pb-5"
        style={{ borderBottom: "1px solid var(--border)" }}>
        <span style={{
          fontFamily: "var(--font-syne)",
          fontSize: "72px",
          fontWeight: "800",
          color: "var(--accent)",
          lineHeight: "1",
          letterSpacing: "-2px",
        }}>
          {result.calories}
        </span>
        <span style={{ fontSize: "18px", color: "var(--text-muted)", fontWeight: "300" }}>
          kcal
        </span>
      </div>

      {/* Macros */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        borderBottom: "1px solid var(--border)",
      }}>
        {macros(result.macros).map((m, i) => (
          <div key={m.label} style={{
            padding: "16px 12px",
            textAlign: "center",
            borderRight: i < 3 ? "1px solid var(--border)" : "none",
          }}>
            <div style={{
              fontFamily: "var(--font-syne)",
              fontSize: "22px",
              fontWeight: "700",
              color: m.color,
              lineHeight: "1",
              marginBottom: "4px",
            }}>
              {m.value}<span style={{ fontSize: "12px", opacity: 0.7 }}>g</span>
            </div>
            <div style={{
              fontSize: "10px",
              color: "var(--text-muted)",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              marginBottom: "8px",
            }}>
              {m.label}
            </div>
            <div style={{ height: "2px", background: "var(--border)", borderRadius: "1px" }}>
              <div style={{
                height: "100%",
                width: `${Math.min((m.value / 100) * 100, 100)}%`,
                background: m.color,
                borderRadius: "1px",
                transition: "width 0.8s ease",
              }} />
            </div>
          </div>
        ))}
      </div>

      {/* Ingredients */}
      {result.ingredients?.length > 0 && (
        <div className="px-5 py-4" style={{ borderBottom: "1px solid var(--border)" }}>
          <p style={{
            fontSize: "11px",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "var(--text-muted)",
            marginBottom: "10px",
          }}>
            Detected Ingredients
          </p>
          <div className="flex flex-wrap gap-2">
            {result.ingredients.map((ing, i) => (
              <span key={i} style={{
                fontSize: "12px",
                background: "var(--surface2)",
                border: "1px solid var(--border)",
                color: "var(--text)",
                padding: "4px 12px",
                borderRadius: "100px",
              }}>
                {ing}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Tip */}
      {result.tip && (
        <div className="flex gap-3 px-5 py-4 items-start"
          style={{ borderBottom: "1px solid var(--border)", background: "rgba(200, 241, 53, 0.03)" }}>
          <span style={{ fontSize: "16px", flexShrink: 0 }}><Lightbulb size={16} color="var(--accent)" />
</span>
          <p style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: "1.6" }}>
            {result.tip}
          </p>
        </div>
      )}

      {/* Disclaimer */}
      <p style={{
        fontSize: "11px",
        color: "var(--accent)",
        // color: "var(--text-dim)",
        padding: "12px 20px",
        textAlign: "center",
      }}>
        * Values are estimates based on visual analysis. Actual nutrition may vary.
      </p>
    </div>
  );
}