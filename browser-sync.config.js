module.exports = {
  https: true,
  proxy: "https://shop-royaldenta-lt.local",
  files: [
    './**/*.php',
    './**/*.css',
    './**/*.js'
  ],
  ignore: [
    'node_modules'
  ],
  reloadDelay: 0,
  reloadDebounce: 500,
};

