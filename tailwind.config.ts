import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        xl: "16px"
      }
    }
  },
  plugins: []
} satisfies Config;
