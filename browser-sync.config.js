module.exports = {
  https: true,
  proxy: "https://shop-royaldenta-pl-dev.local/",
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

