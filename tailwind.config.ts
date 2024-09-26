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
        rostr: {
          green: {
            light: {
              reg: '#effcf2',
              hover: '#e6fbec',
              active: '#ccf6d8',
            },
            normal: {
              reg: '#5be180',
              hover: '#4ac96b',
              active: '#49b466',
            },
            dark: {
              reg: '#44a960',
              hover: '#37874d',
              active: '#29653a'
            },
            darker: '#204f2d'
          },
          bg: {
            dark: '#160E20',
          },
          purple: '#B184F9',
          'purple-hover': '#9051F6'
        },
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
        rostrTitle: ['var(--font-cooper-hewitt)'],
      },
    },
  },
  plugins: [],
};
export default config;
