let path = require('path');
let StylelintPlugin = require('stylelint-webpack-plugin');

const resolve = dir => path.join(__dirname, dir);

const isProEnv = process.env.NODE_ENV === 'production';

module.exports = {
    publicPath: './',
    productionSourceMap: false,
    css: {
        extract: false
    },
    configureWebpack: {
        resolve: {
            alias: {
                'api': resolve('./src/api'),
                'const': resolve('./src/utils/const'),
                'components': resolve('./src/components'),
                'lemon': '@souche-ui/lemon',
                '@': resolve('src'),
                'src': resolve('./src')
            }
        },
        module: {
            rules: [
                {
                    test: /\.(css|less)$/,
                    use: [
                        {
                            loader: 'style-resources-loader',
                            options: {
                                patterns: [
                                    path.resolve(__dirname, './node_modules/@souche-ui/lemon/less/global.less')
                                ]
                            }
                        }
                    ]
                }
            ]
        },
        plugins: [
            new StylelintPlugin({
                context: 'src',
                files: ['**/*.{vue,htm,html,css,sss,less,scss,sass}']
            })
        ]
    }
};
