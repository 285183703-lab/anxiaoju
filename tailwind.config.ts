import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Public Sans", "PingFang SC", "Microsoft YaHei", "system-ui", "sans-serif"],
        mono: ["SF Mono", "monospace"],
        headline: ["Public Sans"],
        display: ["Public Sans"],
        body: ["Public Sans"],
        label: ["Public Sans"],
      },
      colors: {
        // Material Design 3 Surface Colors
        "on-surface": "#1b1c1a",
        "on-surface-variant": "#424754",
        "surface-bright": "#faf9f5",
        "surface-dim": "#dbdad6",
        "surface-container": "#efeeea",
        "surface-container-high": "#e9e8e4",
        "surface-container-low": "#f4f4f0",
        "surface-container-lowest": "#ffffff",
        "surface-container-highest": "#e3e2df",
        "surface-variant": "#e3e2df",

        // Material Design 3 Primary Colors
        primary: "#3d8bff",
        "on-primary": "#ffffff",
        "primary-container": "#3d8bff",
        "on-primary-container": "#fefcff",
        "primary-fixed": "#d8e2ff",
        "on-primary-fixed": "#001a42",
        "on-primary-fixed-variant": "#004395",
        "primary-fixed-dim": "#adc6ff",
        "inverse-primary": "#adc6ff",

        // Material Design 3 Secondary Colors
        secondary: "#495e8a",
        "on-secondary": "#ffffff",
        "secondary-container": "#b6ccff",
        "on-secondary-container": "#405682",
        "secondary-fixed": "#d8e2ff",
        "on-secondary-fixed": "#001a42",
        "on-secondary-fixed-variant": "#304671",
        "secondary-fixed-dim": "#b1c6f9",

        // Material Design 3 Tertiary Colors
        tertiary: "#765700",
        "on-tertiary": "#ffffff",
        "tertiary-container": "#956e00",
        "on-tertiary-container": "#fffbff",
        "tertiary-fixed": "#ffdf9f",
        "on-tertiary-fixed": "#261a00",
        "on-tertiary-fixed-variant": "#5c4300",
        "tertiary-fixed-dim": "#f9bd22",

        // Material Design 3 Error Colors
        error: "#ba1a1a",
        "on-error": "#ffffff",
        "error-container": "#ffdad6",
        "on-error-container": "#93000a",

        // Material Design 3 Other Colors
        outline: "#727785",
        "outline-variant": "#c2c6d6",
        "surface-tint": "#3d8bff",
        "inverse-surface": "#2f312e",
        "inverse-on-surface": "#f2f1ed",

        // Background & Surface
        background: "#faf9f5",
        foreground: "#1b1c1a",
        surface: "#faf9f5",

        // shadcn/ui compatible
        card: {
          DEFAULT: "rgba(255, 255, 255, 0.5)",
          foreground: "#1b1c1a",
        },
        muted: {
          DEFAULT: "#f4f4f0",
          foreground: "#727785",
        },
        accent: {
          DEFAULT: "#d8e2ff",
          foreground: "#001a42",
        },
        destructive: {
          DEFAULT: "#ba1a1a",
          foreground: "#ffffff",
        },
        border: "rgba(255, 255, 255, 0.4)",
        input: "#e9e8e4",
        ring: "#3d8bff",
      },
      borderRadius: {
        DEFAULT: "1.25rem",
        lg: "2.25rem",
        xl: "3.5rem",
        sm: "calc(1.25rem - 8px)",
        md: "calc(1.25rem - 4px)",
        full: "9999px",
      },
      boxShadow: {
        premium: "0 10px 30px -5px rgba(0, 0, 0, 0.04), 0 20px 40px -10px rgba(0, 0, 0, 0.02)",
        inner: "inset 0 1px 1px rgba(255, 255, 255, 0.8)",
      },
    },
  },
  plugins: [],
}

export default config
