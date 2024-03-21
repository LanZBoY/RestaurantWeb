import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import DotenvWebpackPlugin from "dotenv-webpack";

const __dirname = import.meta.dirname;

export default (env) => {
  console.log(`Current Enviroment is ${env.NODE_ENV}`);
  return {
    entry: path.resolve(__dirname, "src", "index.js"),
    output: {
      path: path.resolve(__dirname, "dist"), // 當執行build 會將index.html 以及 相關會用到的工具進行打包成指定檔名 (如下行的bundle.js)
      filename: "bundle.js", // 當webpack進行打包時，會將所有的.js檔案，打包為bundle.js檔案
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
      new DotenvWebpackPlugin({
        path: ".env.production",
      }),
    ],
  };
};
