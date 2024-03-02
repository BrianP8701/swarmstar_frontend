import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "gray-50": "#f7f7f8",
        "gray-100": "#ececf1",
        "gray-200": "#d9d9e3",
        "gray-300": "#c5c5d2",
        "gray-400": "#acacbe",
        "gray-500": "#999",
        "gray-600": "#666",
        "gray-700": "#40414f",
        "gray-800": "#343541",
        "gray-900": "#202123",
        "gray-950": "#0f0f0f",
      },
      boxShadow: {
        "shadow-inside": "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
        "shadow-outside": "0 2px 4px 0 rgba(0, 0, 0, 0.06)",
        "shadow-both": "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06), 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
      },
      borderRadius: {
        '10': '10px',
        '20': '20px', 
        '30': '30px', 
        '40': '40px', 
        '50': '50px',
      },
    },
  },
  plugins: [],
};
export default config;


