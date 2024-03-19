import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import dotenv from "dotenv";
import webpack from "webpack";
const { DefinePlugin } = webpack;

const __dirname = import.meta.dirname;

export default (env) => {
  const configEnv = dotenv.config({
    path: `.env.${env.NODE_ENV}`,
  }).parsed;

  console.log(configEnv);

  const envKeys = Object.keys(configEnv).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(configEnv[next]);
    return prev;
  }, {});

  console.log(envKeys);
  return {
    entry: path.resolve(__dirname, "src", "index.js"),
    devtool: "source-map",
    devServer: {
      port: 5000,
      historyApiFallback: true,
    },
    output: {
      path: path.resolve(__dirname, "build"), // 當執行build 會將index.html 以及 相關會用到的工具進行打包成指定檔名 (如下行的bundle.js)
      filename: "bundle.js", // 當webpack進行打包時，會將所有的.js檔案，打包為bundle.js檔案
      publicPath: "/",
    },
    resolve: {
      modules: [path.join(__dirname, "src"), "node_modules"], //
      alias: {
        react: path.join(__dirname, "node_modules", "react"),
      },
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: "style-loader",
            },
            {
              loader: "css-loader",
            },
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./public/index.html",
      }),
      new DefinePlugin(envKeys),
    ],
  };
};
