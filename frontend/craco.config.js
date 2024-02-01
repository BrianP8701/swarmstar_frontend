// craco.config.js
const path = require('path');

module.exports = {
    webpack: {
        alias: {
            '@components': path.resolve(__dirname, 'src/components/'),
            '@api': path.resolve(__dirname, 'src/api/'),
            '@configs': path.resolve(__dirname, 'src/configs/'),
            '@models': path.resolve(__dirname, 'src/models/'),
        },
    },
    style: {
        postcss: {
            plugins: [
                require('tailwindcss'),
                require('autoprefixer'),
            ],
        },
    },
};
