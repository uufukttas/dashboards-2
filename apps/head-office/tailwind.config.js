const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    "../../node_modules/flowbite-react/lib/**/*.js",
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      boxShadow: {
        custom: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset',
      },
    },
    colors: {
      primary: 'var(--primary-color)',
      "primary-font-color": 'var(--primary-font-color)',
      secondary: 'var(--secondary-color)',
      'gray-light': 'rgb(245, 248, 250)',
      heading: '#1F2937',
      text: '#504E4E',
      error: '#9B1C1C',
      success: '#03543F',
      info: '#1E429F',
      warning: '#723B13',
      admin: 'red',
      guest: 'blue',
      employee: 'green',
      manager: 'yellow',
    }
  },
  plugins: [
    require("flowbite/plugin")
  ],
};
