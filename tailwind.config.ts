import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        atkinson: ["var(--font-atkinson)", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Arial", "sans-serif"],
      },
      colors: {
        printtie: {
          primary: "#0891B2",
          secondary: "#22D3EE",
          cta: "#22C55E",
          background: "#ECFEFF",
          surface: "#F8FEFF",
          text: "#164E63",
          text2: "#0F4B57",
          border: "#A5F3FC",
          error: "#EF4444",
          success: "#10B981",
        },
      },
      boxShadow: {
        soft: "0 1px 2px rgba(8,145,178,0.08)",
        mdsoft: "0 6px 16px rgba(8,145,178,0.14)",
      },
    },
  },
  plugins: [],
};

export default config;
