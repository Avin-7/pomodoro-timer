/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        raleway: ["Raleway", "sans-serif"],
      },
      width: {
        '100':'30rem',
        '120': '44rem',
        '128': '62rem',
      }
    },
    
  },
  plugins: [],
  
}

