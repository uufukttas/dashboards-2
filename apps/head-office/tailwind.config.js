const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
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
      primary: '#FCD800',
      secondary: '#656567',
      heading: '#0A0A0A',
      text: '#0F0F0F',
      error: '#E02424',
      success: '#057A55',
      info: '#1C64f2',
    }
  },
  plugins: [
    require("flowbite/plugin")
  ],
};
