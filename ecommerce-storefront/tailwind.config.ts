// tailwind.config.ts (root)
import type { Config } from 'tailwindcss';
import groceryTheme from './themes/grocery/tailwind.config';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './themes/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      ...groceryTheme.theme?.extend,
    },
  },
  plugins: [],
};

export default config;