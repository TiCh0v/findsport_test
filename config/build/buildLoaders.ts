import { ModuleOptions } from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { BuildOptions } from "./types/types";

export function buildLoaders(options: BuildOptions): ModuleOptions['rules'] {


    const isDev = options.mode === 'development'




    const scssLoader = {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
        ],


    }

    const tsLoader = {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
    }

    const assetLoader = {
        test: /\.svg$/i,
        use: [
            {
                loader: '@svgr/webpack',
                options: {
                    icon: true,
                }
            }
        ],
    }



    return[
        assetLoader,
        scssLoader,
        tsLoader,
    
    ]

}

