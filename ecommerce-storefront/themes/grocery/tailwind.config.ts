// themes/grocery/tailwind.config.ts
import type { Config } from 'tailwindcss';

const groceryConfig: Omit<Config, 'content'> = {
  theme: {
    extend: {
      /* ---------- Colors (from your CSS variables) ---------- */
      colors: {
        primary: {
          DEFAULT: '#1a9d5b',
          dark: '#147a48',
        },
        secondary: '#2fbf71',
        accent: '#ffd43b',
        dark: {
          DEFAULT: '#145c38',
          light: '#1c6b46',
        },
        gray: {
          DEFAULT: '#f6f9f7',
          border: '#e3ece6',
        },
        text: {
          DEFAULT: '#26312b',
          light: '#6b7d73',
        },
        'nav-muted': '#8a998f',
      },

      /* ---------- Fonts ---------- */
      fontFamily: {
        sans: ['"Hind Siliguri"', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },

      /* ---------- Spacing / Heights ---------- */
      spacing: {
        'header': '78px',
        'header-top': '40px',
        'bottom-nav': '65px',
        'max-w': '1280px',
      },

      /* ---------- Border Radius ---------- */
      borderRadius: {
        DEFAULT: '8px',
      },

      /* ---------- Box Shadows ---------- */
      boxShadow: {
        'sm-theme': '0 2px 8px rgba(0,0,0,0.06)',
        'md-theme': '0 4px 20px rgba(0,0,0,0.1)',
        'bottom-nav': '0 -2px 10px rgba(0,0,0,0.05)',
        'center-btn': '0 6px 16px rgba(26,157,91,0.45)',
      },

      /* ---------- Z-Index ---------- */
      zIndex: {
        'header': '1000',
        'sidebar': '2000',
        'sidebar-panel': '2001',
        'bottom-nav': '1500',
        'scroll-top': '2500',
      },

      /* ---------- Animations ---------- */
      keyframes: {
        pulse: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.2)' },
        },
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(-5px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInSub: {
          from: { opacity: '0', transform: 'translateY(-5px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        pulse: 'pulse 1.5s infinite',
        'fade-in': 'fadeIn 0.3s ease',
        'fade-in-sub': 'fadeInSub 0.3s ease',
      },

      /* ---------- Transition ---------- */
      transitionTimingFunction: {
        theme: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
};

export default groceryConfig;