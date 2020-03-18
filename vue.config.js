'use strict';
const cdn = {
	css: [],
	js: [
		// vue must at first!
		'https://cdn.bootcss.com/vue/2.6.10/vue.min.js',
		// element-ui js
		'https://unpkg.com/element-ui/lib/index.js',
		// twilio
		'https://media.twiliocdn.com/sdk/js/client/v1.9/twilio.min.js',
		'https://cdn.bootcss.com/jquery/1.7.2/jquery.min.js'
	]
};
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV);
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
// 导入compression-webpack-plugin
const CompressionWebpackPlugin = require('compression-webpack-plugin');
// 定义压缩文件类型
const productionGzipExtensions = ['js', 'css'];
const path = require('path');

function resolve(dir) {
	return path.join(__dirname, dir);
}

// 所有的配置项说明https://cli.vuejs.org/config/
module.exports = {
	/*
	 * 如果计划在子路径下部署站点，需要设置publicPath
	 * 例如GitHub页面。如果您计划将您的站点部署到https://foo.github.io/bar/
	 * 然后将publicPath设置为“/bar/”
	 * 在大多数情况下请使用'/'
	 * 细节:https://cli.vuejs.org/config/ publicpath
	 */
	publicPath: IS_PROD ? process.env.VUE_APP_PUBLIC_PATH : '/', // 默认'/'，部署应用包时的基本 URL
	lintOnSave: !IS_PROD, // 保存时开启eslint检查
	productionSourceMap: false, // 生成生产环境的 source map文件
	outputDir: 'dist',
	assetsDir: 'static',
	devServer: {
		// services服务配置
		overlay: {
			// 显示编译的errors或warnings
			warnings: false,
			errors: true
		},
		// history模式将在响应404时返回index.html
		historyApiFallback: true,
		proxy: {
			'/api': {
				// -------OneCare-------
				// 本地
				// target: `http://192.168.31.108:10421`,

				// 线上
				// target: `http://47.88.57.208:10421`,

				// 新服
				// target: `http://13.82.229.111:10421`,
				// todo 聆医
				// ------聆医-------
				target: `http://47.103.199.79:10421`,
				ws: true,
				changeOrigin: true,
				pathRewrite: {
					'^/api': ''
				}
			},

			'/twilio': {
				// 本地
				target: `https://cyan-cobra-1135.twil.io`,
				ws: true,
				changeOrigin: true,
				pathRewrite: {
					'^/twilio': ''
				}
			},

			'/socket': {
				// 本地
				target: `ws://192.168.31.108:10422/ws`,
				// 线上
				// target: `http://47.88.57.208:10421`,
				ws: true,
				secure: false,
				disableHostCheck: true, //  新增该配置项
				changeOrigin: true,
				pathRewrite: {
					'^/socket': ''
				}
			}
		}
	},
	css: {
		// 全局样式表
		loaderOptions: {
			sass: {
				data: `@import "./src/style/global.scss";`
			}
		}
	},
	configureWebpack: {
		externals: {
			vue: 'Vue',
			'element-ui': 'ELEMENT' // 不能用ElementUI会报错undefined
		}
	},
	chainWebpack: (config) => {
		config.plugin('html').tap((args) => {
			args[0].cdn = cdn;
			return args;
		});
		// 配置根路径别名
		config.resolve.alias.set('@', resolve('src'));
		// 移除 prefetch 插件
		config.plugins.delete('prefetch');
		// 移除 preload 插件
		config.plugins.delete('preload');
		// 优化lodash
		config.plugin('loadshReplace').use(new LodashModuleReplacementPlugin());
		// 生成打包后文件视图
		config
			.plugin('webpack-bundle-analyzer')
			.use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin);
		// 设置svg
		config.module
			.rule('svg')
			.exclude.add(resolve('src/assets/icons'))
			.end();
		config.module
			.rule('icons')
			.test(/\.svg$/)
			.include.add(resolve('src/assets/icons'))
			.end()
			.use('svg-sprite-loader')
			.loader('svg-sprite-loader')
			.options({
				symbolId: 'icon-[name]'
			})
			.end();

		// vue是否去掉元素之间空格
		config.module
			.rule('vue')
			.use('vue-loader')
			.loader('vue-loader')
			.tap((options) => {
				options.compilerOptions.preserveWhitespace = true;
				return options;
			})
			.end();

		// 不带列映射(column-map)的 SourceMap，忽略加载的 Source Map
		// https://webpack.js.org/configuration/devtool/#development
		config.when(!IS_PROD, (config) => config.devtool('cheap-source-map'));
		config.when(IS_PROD, (config) => {
			// RuntimeChunk script-ext-html-webpack-plugin
			// https://blog.csdn.net/VhWfR2u02Q/article/details/82141650
			config
				.plugin('ScriptExtHtmlWebpackPlugin')
				.after('html')
				.use('script-ext-html-webpack-plugin', [
					{
						// `runtime` must same as runtimeChunk name. default is `runtime`
						inline: /runtime\..*\.js$/
					}
				])
				.end();
			// chunk默认分包策略
			// https://blog.csdn.net/VhWfR2u02Q/article/details/82141650
			config.optimization.splitChunks({
				chunks: 'all',
				cacheGroups: {
					libs: {
						name: 'chunk-libs',
						test: /[\\/]node_modules[\\/]/,
						priority: 10,
						chunks: 'initial' // 只包括依赖的第三方
					},
					elementUI: {
						name: 'chunk-elementUI', // elementUI 分成单独的包
						priority: 20, // 重量需要大于libs和app，否则会被打包成libs或app
						test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // 以适应cnpm
					},
					commons: {
						name: 'chunk-commons',
						test: resolve('src/components'), // 可以自定义规则
						minChunks: 3, //  最小数量
						priority: 5,
						reuseExistingChunk: true
					}
				}
			});
			config.optimization.runtimeChunk('single');

			// 配置 gzip 压缩
			return {
				plugins: [
					new CompressionWebpackPlugin({
						filename: '[path].gz[query]',
						algorithm: 'gzip',
						test: new RegExp(
							'\\.(' + productionGzipExtensions.join('|') + ')$'
						),
						threshold: 10240,
						minRatio: 0.8
					})
				]
			};
		});
	}
};
