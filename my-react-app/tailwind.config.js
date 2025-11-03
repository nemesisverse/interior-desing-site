/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    extend: {
      fontFamily:{

        ubuntu: ['Ubuntu', 'sans-serif'],
                                // little tail on feet of charachter
        playfair: ['Playfair Display', 'serif'],
      }
      // You can extend colors, fonts, etc. here later
    },
  },
  plugins: [],
}
