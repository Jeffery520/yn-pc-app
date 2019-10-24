"use strict";
const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV);

const path = require("path");

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
  publicPath: IS_PROD ? process.env.VUE_APP_PUBLIC_PATH : "/", // 默认'/'，部署应用包时的基本 URL
  lintOnSave: true, // 保存时开启eslint检查
  productionSourceMap: !IS_PROD, // 生成生产环境的 source map文件
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
      "/api": {
        target: `http://192.168.0.37:8080`,
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      },
      "/baidu": {
        target: "https://www.baidu.com",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/baidu": ""
        }
      }
    }
  },
  // css: {
  //   // 全局样式表
  //   loaderOptions: {
  //     sass: {
  //       data: `@import "./src/style/global.scss";`
  //     }
  //   }
  // },
  configureWebpack: {
    // 配置根路径别名
    resolve: {
      alias: {
        "@": resolve("src")
      }
    }
  },
  chainWebpack: config => {
    // set svg-sprite-loader
    config.module
      .rule("svg")
      .exclude.add(resolve("src/assets/icons"))
      .end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/assets/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]"
      })
      .end();

    // vue是否去掉元素之间空格
    config.module
      .rule("vue")
      .use("vue-loader")
      .loader("vue-loader")
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true;
        return options;
      })
      .end();

    config
      // 不带列映射(column-map)的 SourceMap，忽略加载的 Source Map
      // https://webpack.js.org/configuration/devtool/#development
      .when(process.env.NODE_ENV === "development", config =>
        config.devtool("cheap-source-map")
      );

    config.when(process.env.NODE_ENV !== "development", config => {
      // RuntimeChunk script-ext-html-webpack-plugin
      // https://blog.csdn.net/VhWfR2u02Q/article/details/82141650
      config
        .plugin("ScriptExtHtmlWebpackPlugin")
        .after("html")
        .use("script-ext-html-webpack-plugin", [
          {
            // `runtime` must same as runtimeChunk name. default is `runtime`
            inline: /runtime\..*\.js$/
          }
        ])
        .end();

      // chunk默认分包策略
      // https://blog.csdn.net/VhWfR2u02Q/article/details/82141650
      config.optimization.splitChunks({
        chunks: "all",
        cacheGroups: {
          libs: {
            name: "chunk-libs",
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: "initial" // 只包括依赖的第三方
          },
          elementUI: {
            name: "chunk-elementUI", // elementUI 分成单独的包
            priority: 20, // 重量需要大于libs和app，否则会被打包成libs或app
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // 以适应cnpm
          },
          commons: {
            name: "chunk-commons",
            test: resolve("src/components"), // 可以自定义规则
            minChunks: 3, //  最小数量
            priority: 5,
            reuseExistingChunk: true
          }
        }
      });
      config.optimization.runtimeChunk("single");
    });
  }
};
