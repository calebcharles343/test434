/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        fourK: "2560px",
        twoK: "1440px",
        oneK: "1024px",
        mid: "800px",
        tablet: "768px",
        largeMobile: "425px",
        mediumMobile: "375px",
        smallMobile: "320px",
      },
    },
  },
  variants: {},
  plugins: [],
  // Ensure you are using the JIT mode
  mode: "jit",
};
