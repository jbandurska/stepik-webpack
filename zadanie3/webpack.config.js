var path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
var ImageminPlugin = require("imagemin-webpack-plugin").default;

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "dist", "assets"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: "./src/style.css" }),
    new ImageminPlugin({
      disable: process.env.NODE_ENV !== "production",
      pngquant: {
        quality: "95-100",
      },
      test: "./img/**",
    }),
  ],
  devtool: "source-map",
};
