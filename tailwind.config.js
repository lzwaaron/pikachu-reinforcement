/** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: ['./build/*.html', './client/**/*.{js,jsx}', './index.html'],
//   theme: { 
//     extend: {
//       fontFamily:{
//         'primary': ['Bricolage Grotesque']
//       }
//   },},
//   plugins: [],
// }
module.exports = {
  content: ['./build/*.html', './client/**/*.{js,jsx}', './index.html'],
  theme: {
    extend: {
      fontFamily:{
        'primary': ['Bricolage Grotesque']
      },
      textColor: {
        'primary': '#38543B',
        'secondary': '#ffed4a',
        'danger': '#e3342f',
      }
    },
  },
  plugins: [require('daisyui')],
}
