/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html', './*.js'],
  theme: {
    fontFamily: {
      poppins: ['Poppins', 'sans-serif'],
    },
    extend: {
      colors: {
        primary: '#E6C744',
      },
      screens: {
        sm: '480px',
      },
      content: {
        oval: 'url("../images/banner-image-2.png")',
      },
    },
  },
  plugins: [],
};
