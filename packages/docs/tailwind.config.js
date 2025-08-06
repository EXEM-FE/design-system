/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {},
  },
  plugins: [
    // EXEM 디자인 시스템 Tailwind 플러그인 통합
    require("exem-tailwindcss-plugin"),
  ],
}
