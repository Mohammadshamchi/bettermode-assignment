/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#4361ee",
        secondary: "#2d3748",
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "none",
            color: "#1a202c",
            a: {
              color: "#4361ee",
              "&:hover": {
                color: "#3651d4",
              },
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
