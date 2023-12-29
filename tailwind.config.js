/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                lightBrown: '#86913f', //로고 Yum 색
                darkGreen: '#5e9149' //로고 Ya색
            }
        }
    },
    plugins: [require('@tailwindcss/line-clamp'), require('daisyui')]
}
