/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            animation: {
                'spin-slow': 'spin 8s linear infinite',
                'reverse-spin': 'reverse-spin 6s linear infinite',
                'float': 'float 6s ease-in-out infinite',
            },
            keyframes: {
                'reverse-spin': {
                    from: {
                        transform: 'rotate(360deg)'
                    },
                },
                'float': {
                    '0%, 100%': {
                        transform: 'translateY(0)',
                    },
                    '50%': {
                        transform: 'translateY(-20px)'
                    },
                },
            },
        },
    },
    plugins: [],
}