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
        "chatgpt-gray": "#343541"
      },
      boxShadow: {
        "my-inset": "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
      },
      borderRadius: {
        's': '0.375rem', // This translates to 6px
        'm': '0.5rem', // This translates to 8px
        'l': '0.75rem', // This translates to 12px
      },
    },
  },
  plugins: [],
};
export default config;
