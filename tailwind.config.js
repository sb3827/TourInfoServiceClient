/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                lightGreen: '#8EB682', //로고 D,T 색
                darkGreen: '#609966' //로고 o색
            }
        }
    },
    plugins: [require('@tailwindcss/line-clamp'), require('daisyui')]
}
