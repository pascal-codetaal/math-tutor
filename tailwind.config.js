/** @type {import('tailwindcss').Config} */
export default {
  content: ['./app/**/*.{tsx,ts,jsx,js}', "./node_modules/flowbite-react/**/*.js"],
  safelist: [
    'grid-cols-1',
    'grid-cols-2',
    'grid-cols-3',
    'grid-cols-4',
    'grid-cols-5',
    'grid-cols-6',
    'grid-cols-7',
    'bg-yellow-500',
    'border-yellow-500',
    'bg-green-500',
    'border-green-500',
    'bg-blue-500',
    'border-blue-500',
    'bg-cyan-500',
    'border-cyan-500',
    'bg-fuchsia-500',
    'border-fuchsia-500'
  ],
  theme: {
    extend: {},
  },
  plugins: ["flowbite/plugin"],
}
