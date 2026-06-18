"use client";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import Image from "next/image";

export default function BMICalculator() {
  const router = useRouter();
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const h = parseFloat(height) / 100;
    const w = parseFloat(weight);
    if (!h || !w) return;
    const bmi = w / (h * h);

    let category = "";
    let color = "";
    if (bmi < 18.5) { category = "Underweight"; color = "#60a5fa"; }
    else if (bmi < 25) { category = "Normal"; color = "#c8f135"; }
    else if (bmi < 30) { category = "Overweight"; color = "#f97316"; }
    else { category = "Obese"; color = "#ff4444"; }

    setResult({ bmi: bmi.toFixed(1), category, color });
  };

  const reset = () => {
    setHeight("");
    setWeight("");
    setAge("");
    setResult(null);
  };

  return (
    <main style={{ minHeight: "100vh", background: "var(--bg)" }}>

      {/* Navbar */}
        <Navbar />

      <div style={{
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  minHeight: "calc(100vh - 57px)",
}}
  className="max-md:grid-cols-1!"
>
  {/* LEFT -- title + form */}
  <div style={{
    padding: "48px 40px",
    borderRight: "1px solid var(--border)",
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  }}>
    <div>
      <h1 style={{
        fontFamily: "var(--font-syne)",
        fontSize: "clamp(28px, 3.5vw, 48px)",
        fontWeight: "800",
        color: "var(--text)",
        letterSpacing: "-1px",
        marginBottom: "8px",
      }}>
        BMI Calculator
      </h1>
      <p style={{ fontSize: "14px", color: "var(--text-muted)", lineHeight: "1.6" }}>
        Calculate your Body Mass Index to understand your healthy weight range.
      </p>
    </div>

    {/* Form */}
    <div style={{
      background: "var(--surface)",
      border: "1px solid var(--border)",
      borderRadius: "16px",
      padding: "24px",
      display: "flex",
      flexDirection: "column",
      gap: "16px",
    }}>
      {/* Gender */}
      <div>
        <label style={{ fontSize: "12px", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: "8px" }}>
          Gender
        </label>
        <div style={{ display: "flex", gap: "8px" }}>
          {["male", "female"].map((g) => (
            <button
              key={g}
              onClick={() => setGender(g)}
              style={{
                flex: 1,
                padding: "10px",
                borderRadius: "8px",
                border: `1px solid ${gender === g ? "var(--accent)" : "var(--border)"}`,
                background: gender === g ? "rgba(200, 241, 53, 0.08)" : "transparent",
                color: gender === g ? "var(--accent)" : "var(--text-muted)",
                cursor: "pointer",
                fontSize: "13px",
                fontFamily: "var(--font-dm)",
                textTransform: "capitalize",
                transition: "all 0.2s ease",
              }}
            >
              {g === "male" ? "Male" : "Female"}
            </button>
          ))}
        </div>
      </div>

      {/* Height */}
      <div>
        <label style={{ fontSize: "12px", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: "8px" }}>
          Height (cm)
        </label>
        <input
          type="number"
          placeholder="e.g. 175"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          style={{
            width: "100%",
            padding: "12px 16px",
            background: "var(--surface2)",
            border: "1px solid var(--border)",
            borderRadius: "8px",
            color: "var(--text)",
            fontSize: "14px",
            fontFamily: "var(--font-dm)",
            outline: "none",
          }}
        />
      </div>

      {/* Weight */}
      <div>
        <label style={{ fontSize: "12px", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: "8px" }}>
          Weight (kg)
        </label>
        <input
          type="number"
          placeholder="e.g. 70"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          style={{
            width: "100%",
            padding: "12px 16px",
            background: "var(--surface2)",
            border: "1px solid var(--border)",
            borderRadius: "8px",
            color: "var(--text)",
            fontSize: "14px",
            fontFamily: "var(--font-dm)",
            outline: "none",
          }}
        />
      </div>

      {/* Age */}
      <div>
        <label style={{ fontSize: "12px", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: "8px" }}>
          Age
        </label>
        <input
          type="number"
          placeholder="e.g. 25"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          style={{
            width: "100%",
            padding: "12px 16px",
            background: "var(--surface2)",
            border: "1px solid var(--border)",
            borderRadius: "8px",
            color: "var(--text)",
            fontSize: "14px",
            fontFamily: "var(--font-dm)",
            outline: "none",
          }}
        />
      </div>

      <button
        onClick={calculate}
        style={{
          width: "100%",
          padding: "14px",
          background: "var(--accent)",
          border: "none",
          borderRadius: "8px",
          color: "#000000",
          fontSize: "14px",
          fontWeight: "700",
          cursor: "pointer",
          fontFamily: "var(--font-dm)",
          transition: "all 0.2s ease",
        }}
      >
        Calculate BMI
      </button>
    </div>
  </div>

  {/* RIGHT -- result */}
  <div style={{
    padding: "48px 40px",
    background: "var(--surface)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: "16px",
  }}>
    {!result && (
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        gap: "16px",
        // opacity: 0.4,
      }}
        className="max-md:hidden"
      >
        
         <Image
        src="/bmi-image.png"
        alt="Food illustration"
        width={400}
        height={320}
        style={{
        objectFit: "cover",
        width: "100%",
        height: "320px",
        borderRadius: "16px",
        // opacity: 0.9,
        }}
        />
        <p style={{
          fontFamily: "var(--font-syne)",
          fontSize: "16px",
          color: "var(--text-muted)",
          textAlign: "center",
        }}>
          Your BMI result will appear here
        </p>
      </div>
    )}

    {result && (
      <div
        className="max-md:p-4!" 
        style={{
        background: "var(--bg)",
        border: `1px solid ${result.color}`,
        borderRadius: "16px",
        padding: "32px",
        textAlign: "center",
        animation: "fadeUp 0.4s ease both",
      }}>
        <p style={{ fontSize: "12px", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px" }}>
          Your BMI
        </p>
        <div
          className="max-md:text-6xl!" 
          style={{
          fontFamily: "var(--font-syne)",
          fontSize: "80px",
          fontWeight: "800",
          color: result.color,
          lineHeight: "1",
          letterSpacing: "-2px",
          marginBottom: "8px",
        }}>
          {result.bmi}
        </div>
        <div style={{
          fontSize: "20px",
          fontWeight: "600",
          color: result.color,
          marginBottom: "24px",
        }}>
          {result.category}
        </div>

        {/* BMI Scale */}
        <div style={{ marginBottom: "24px" }}>
          {[
            { label: "Underweight", range: "< 18.5", color: "#60a5fa" },
            { label: "Normal", range: "18.5 - 24.9", color: "#c8f135" },
            { label: "Overweight", range: "25 - 29.9", color: "#f97316" },
            { label: "Obese", range: "> 30", color: "#ff4444" },
          ].map((s) => (
            <div key={s.label} style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px 14px",
              borderRadius: "8px",
              background: result.category === s.label ? `${s.color}15` : "transparent",
              marginBottom: "4px",
              border: result.category === s.label ? `1px solid ${s.color}40` : "1px solid transparent",
            }}>
              <span style={{ fontSize: "13px", color: s.color, fontWeight: result.category === s.label ? "600" : "400" }}>
                {s.label}
              </span>
              <span style={{ fontSize: "13px", color: "var(--text-muted)" }}>
                {s.range}
              </span>
            </div>
          ))}
        </div>

        <button onClick={reset} className="btn-reset">
          ↺ Recalculate
        </button>
      </div>
    )}
  </div>
</div>

      {/* Footer */}
      <footer style={{
        textAlign: "center",
        padding: "20px",
        fontSize: "13px",
        fontWeight: "600",
        color: "var(--text)",
        letterSpacing: "0.04em",
        borderTop: "1px solid var(--border)",
      }}>
        Built by <a href="https://github.com/Fahadkhan1503" target="_blank" style={{ color: "var(--accent)", textDecoration: "none" }}>Muhammad Fahad</a> · Powered by Gemini Vision
      </footer>
    </main>
  );
}