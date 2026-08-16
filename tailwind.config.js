/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fdf6f0',
          100: '#fbe8da',
          200: '#f6cdb0',
          300: '#efab7c',
          400: '#e8854a',
          500: '#d9662b',
          600: '#bd4e1f',
          700: '#9a3a1a',
          800: '#7c301b',
          900: '#66291a',
          950: '#37130a',
        },
        ink: {
          50: '#f6f5f3',
          100: '#e8e5e0',
          200: '#d2ccc2',
          300: '#b3a99b',
          400: '#968878',
          500: '#7c6e5f',
          600: '#635849',
          700: '#50473b',
          800: '#3d362d',
          900: '#2a251f',
          950: '#1a1612',
        },
        accent: {
          400: '#c9a24b',
          500: '#b08a32',
          600: '#94722a',
        },
        success: { 500: '#2f9e44', 600: '#248a38' },
        warning: { 500: '#e8a13c', 600: '#cf8a22' },
        error: { 500: '#e03131', 600: '#c22525' },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 6px 24px -8px rgba(60, 48, 36, 0.18)',
        card: '0 10px 30px -12px rgba(60, 48, 36, 0.22)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-out both',
        slideIn: 'slideIn 0.3s ease-out both',
        scaleIn: 'scaleIn 0.25s ease-out both',
        shimmer: 'shimmer 1.6s linear infinite',
      },
    },
  },
  plugins: [],
};
