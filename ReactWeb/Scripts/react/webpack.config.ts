
import * as v8 from "v8";
import * as glob from "glob";
import * as _ from "lodash";
import * as path from "path";

v8.setFlagsFromString("--max_old_space_size=4096");

const webBundles: string[]  = glob.sync(`${__dirname}/src/Bundle/*.tsx`);
const basePath = `dist`;
const outputPath: string = path.resolve(__dirname, basePath);

const template: any = {
    // enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json", ".png"],
    },
    // plugins: [
    //     new CopyWebpackPlugin([{ from: "tmp/a.txt", to: "dist/" }]),
    // ],
    module: {
        rules: [
            // all files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            {
                test: /\.tsx?$/,
                loader: "awesome-typescript-loader",
            },
/*             {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                  {
                    loader: "file-loader",
                  },
                ],
              }, */
            // all output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader",
            },
            {
                test: /\.(png|jp(e*)g|svg)$/,
                use: [{
                    loader: "url-loader",
                    options: {
                        limit: 8000, // Convert images < 8kb to base64 strings
                        name: "images/[hash]-[name].[ext]",
                    },
                }],
            },
        ],
    },

    devServer: {
        hot: true,
        inline: true,
        host: "localhost",
        port: 22839,
        watchOptions: {
            poll: true,
        },
    },

    // when importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // this is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        "react": "React",
        "react-dom": "ReactDOM",
        "jquery": "$",
    },
};

const configs: any[] = webBundles.map((webBundle) => {
    const baseName: string = path.basename(webBundle, ".tsx");
    const outputFilename = `${baseName.toLowerCase()}.js`;

    return {
        ...template,
        entry: webBundle,
        output: {
            filename: outputFilename,
            path: outputPath,
            publicPath: "/",
        },
    };
});

export default configs;

