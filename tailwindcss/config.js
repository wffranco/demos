/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');
export default {
  theme: {
    extend: {
      // ...
    },
  },
  plugins: [
    plugin(({ matchVariant }) => {
      const modifier = extra => extra?.modifier ? `\\/${extra.modifier}` : '';
      const values = {checked: 'checked'};
      matchVariant('cousin', (value, extra) => `:has(> .cousin${modifier(extra)}:${value}, * .cousin${modifier(extra)}:${value}) ~ * &`, {values});
      matchVariant('heir', (value, extra) => `&:has(> .heir${modifier(extra)}:${value}, * .heir${modifier(extra)}:${value})`, {values});
      matchVariant('nephew', (value, extra) => `:has(> .nephew${modifier(extra)}:${value}, * .nephew${modifier(extra)}:${value}) ~ &`, {values});
      matchVariant('uncle', (value, extra) => `.uncle${modifier(extra)}:${value} ~ * &`, {values});
    }),
  ],
}
