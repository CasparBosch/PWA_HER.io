/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        'index.html',
        './src/**/*.js',
    ],
    theme: {
        extend: {
            colors: {
                'primary': '#d3104c',
                'secondary': '#2e635b',
                // 'error': '',
                // '': '',
            }
        },
    },
    plugins: [],
}

