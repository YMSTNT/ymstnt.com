/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    colors: {
      gray: {
        50: "#f8f8f8",
        100: "#f0f0f0",
        200: "#e1e1e1",
        300: "#cdcdcd",
        400: "#aeaeae",
        500: "#919191",
        600: "#767676",
        700: "#5e5e5e",
        800: "#4b4b4b",
        900: "#3d3d3d",
        950: "#222222",
      },
    },
  },
  plugins: [],
};
