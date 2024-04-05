const path = require('path');
const defaultConfig = require("@wordpress/scripts/config/webpack.config");

module.exports = function () {
    const config = {
        ...defaultConfig,
        resolve: {
            ...defaultConfig.resolve,
            alias: {
                ...defaultConfig.resolve.alias,
                // Ensure the alias points to your `store.js` within the src directory
                'store': path.resolve(__dirname, 'src/store.js'),
            },
        },
        plugins: [...defaultConfig.plugins],
    };

    return config;
};