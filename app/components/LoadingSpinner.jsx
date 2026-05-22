export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center gap-4 py-8">
      <div
        style={{
          width: "36px",
          height: "36px",
          border: "2px solid var(--border)",
          borderTopColor: "var(--accent)",
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite",
        }}
      />
      <p
        style={{
          fontSize: "14px",
          color: "var(--text-muted)",
          animation: "pulse 1.5s ease infinite",
          fontFamily: "var(--font-dm)",
        }}
      >
        Analyzing your food...
      </p>
    </div>
  );
}