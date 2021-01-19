module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: { // gruvbox theme colors
                "gb-dark-hard": "#1C2021",
                "gb-dark-medium": "#282828",
                "gb-dark-soft": "#3C3835",
                "gb-text": "#8E7F70",
                "gb-light": "#FFE7C9"
            }
        },
        container: {
            center: true,
            padding: {
                DEFAULT: '1rem',
                sm: '1rem',
                md: '1rem',
                lg: '1rem',
                xl: '10rem',
                '2xl': '15rem'
            },
        },
        variants: {
            extend: {},
        },
        plugins: [],
    }
}