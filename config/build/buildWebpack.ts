import path from 'path';
import webpack from 'webpack';
import 'webpack-dev-server';
// import HtmlWebpackPlugin from 'html-webpack-plugin'
// import MiniCssExtractPlugin from 'mini-css-extract-plugin'
// import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import { buildDevServer } from './buildDevServer';
import { buildLoaders } from './buildLoaders';
import { buildPlugins } from './buildPlugins';
import { buildResolvers } from './buildResolvers';
import { BuildOptions } from './types/types';



export function buildWebpack(options: BuildOptions): webpack.Configuration{

    const isDev = options.mode === 'development'

    const {
        mode,
        paths
    } = options

    return{

        mode: mode ?? 'development',
    
        entry: paths.entry,
        output: {
            path: paths.output,
            filename: '[name].[contenthash].js',
            clean: true
        },
    
    
        plugins:  buildPlugins(options),
        module: {
            rules: buildLoaders(options)
          },
        resolve: buildResolvers(options),

      

        devtool: isDev ? 'inline-source-map': undefined, // отображение файла где была ошибка
        devServer: buildDevServer(options)
    
      }

}