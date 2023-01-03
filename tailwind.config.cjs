/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      minWidth: {
        'c/image': '6rem',
        't/image': '5rem'
      },
      minHeight: {
        'c/image': '6rem',
        't/image': '5rem'
      }
    },
  },
  plugins: [],
};
