/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                naverLogo: '#03c75a'
            }
        }
    },
    plugins: [require('@tailwindcss/line-clamp'), require('daisyui')]
}
