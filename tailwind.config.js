/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./pages/**/*.{vue,js}', 'App.vue', './components/**/*.{vue,js}', './components/ui/**/*.{vue,js}'],
    theme: {
        extend: {
            colors: {
            }
        },
    },
    plugins: [],
    important: true,
}