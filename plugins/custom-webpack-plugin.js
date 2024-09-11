module.exports = function customWebpackPlugin(context, options) {
  return {
    name: 'custom-webpack-plugin',
    configureWebpack(config, isServer, utils) {
      return {
        devtool: 'source-map', // Enable source maps
      };
    },
  };
};
