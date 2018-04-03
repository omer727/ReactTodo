module.exports = options => {
  return {
    entry: "./index.jsx",
    output: {
      filename: "bundle.js"
    },
    module: {
      rules: [
        {
          test: /.jsx$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "babel-loader",
              options: {
                cacheDirectory: true
              }
            }
          ]
        }
      ]
    },
    devtool: "source-map"
  };
};
