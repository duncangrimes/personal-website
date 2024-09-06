import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      keyframes: {
        blink: {
          '0%': { opacity: '0.2' },
          '20%': { opacity: '1' },
          '100%': { opacity: '0.2' },
        },
      },
      animation: {
        blink: 'blink 1.4s infinite both',
      },
      fontFamily: {
        body: ['var(--font-pt-sans)'],
        subtitle: ['var(--font-open-sans)'],
        title: ['var(--font-cooper-hewitt)'],
      },
    },
  },
  plugins: [],
};
export default config;
