import type { Config } from "tailwindcss";
const { fontFamily } = require("tailwindcss/defaultTheme");

const config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./sections/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(109deg, rgba(168, 192, 255, 0.90) 12.88%, rgba(90, 82, 177, 0.90) 60.68%, rgba(63, 43, 150, 0.90) 87.02%)",
      },
      backgroundColor: {
        "custom-gradient":
          "linear-gradient(109deg, rgba(168, 192, 255, 0.90) 12.88%, rgba(90, 82, 177, 0.90) 60.68%, rgba(63, 43, 150, 0.90) 87.02%)",
      },
      textColor: {
        "custom-gradient":
          "linear-gradient(109deg, rgba(168, 192, 255, 0.90) 12.88%, rgba(90, 82, 177, 0.90) 60.68%, rgba(63, 43, 150, 0.90) 87.02%)",
      },
      borderColor: {
        "custom-gradient":
          "linear-gradient(109deg, rgba(168, 192, 255, 0.90) 12.88%, rgba(90, 82, 177, 0.90) 60.68%, rgba(63, 43, 150, 0.90) 87.02%)",
      },
      boxShadow: {
        "custom-shadow":
          "1px 2px 12.5px 0px rgba(109, 109, 196, 0.45), 0px 0px 4px 0px rgba(111, 111, 111, 0.25) inset",
      },

      fontFamily: {
        sans: ["var(--font-outfit)", ...fontFamily.sans],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
