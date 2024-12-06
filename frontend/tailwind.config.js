import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: ['light'],
    base: true, // Apply global base styles
    utils: true, // Enable utility classes
    logs: true, // Display DaisyUI logs in the console
  },
}

