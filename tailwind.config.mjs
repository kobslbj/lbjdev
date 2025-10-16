/** @type {import('tailwindcss').Config} */
import { nextui } from "@nextui-org/react";
import typography from '@tailwindcss/typography';
export default {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'times': ['"Times New Roman"', 'Times', 'serif'],
      },
      backgroundImage: theme => ({
        'black-gray-gradient': 'linear-gradient(to right, #000000, #808080)',
      }),
    },
  },
  darkMode: "class",
  plugins: [nextui(), typography()],
};
