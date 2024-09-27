import webpack, { Configuration } from "webpack"
import HtmlWebpackPlugin from "html-webpack-plugin"
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import path from "path"

import { BuildOptions } from "./types/types"



export function buildPlugins(options: BuildOptions): Configuration['plugins']{


    const isDev = options.mode === 'development';


    const plugins = [
        new HtmlWebpackPlugin({template: options.paths.html}),
        new webpack.ProgressPlugin(),
        new MiniCssExtractPlugin({
          filename: 'css/[name].[contenthash:8].css',
          chunkFilename: 'css/[name].[contenthash:8].css',
        })
    ].filter(Boolean)

    return plugins
}