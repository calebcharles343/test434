/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        mid: "800px",
        xl: "1300px",
      },
    },
  },
  variants: {},
  plugins: [],
  // Ensure you are using the JIT mode
  mode: "jit",
};
