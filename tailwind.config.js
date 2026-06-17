/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#FAFAF8',
        ink: '#1A1A1A',
        muted: '#5F5F5F',
        gold: '#D4AF37',
        night: '#111111',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        premium: '0 24px 80px rgba(17, 17, 17, 0.12)',
        soft: '0 18px 45px rgba(17, 17, 17, 0.08)',
      },
    },
  },
  plugins: [],
};
