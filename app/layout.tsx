import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CalorieLens",
  description: "Scan any food and get instant calorie & macro breakdown",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
     <body style={{
  background: "var(--bg)",
  color: "var(--text)",
  fontFamily: "var(--font-dm)",
  minHeight: "100vh",
}}>
  {children}
</body>
    </html>
  );
}