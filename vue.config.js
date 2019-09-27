"use strict";
const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV);
const path = require("path");
const SpritesmithPlugin = require("webpack-spritesmith");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: IS_PROD ? process.env.VUE_APP_PUBLIC_PATH : "./", // 默认'/'，部署应用包时的基本 URL
  // lintOnSave: false, // 保存时开启eslint检查
  runtimeCompiler: true, // 是否使用包含运行yarb时编译器的 Vue 构建版本
  productionSourceMap: !IS_PROD, // 生成生产环境的 source map文件
  parallel: require("os").cpus().length > 1, // 是否为 Babel 或 TypeScript 使用 thread-loader
  pwa: {},
  css: {
    loaderOptions: {
      sass: {
        data: `@import "./src/style/global.scss";`
      }
    }
  },
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
    // 将小图标拼接成雪碧图
    config.plugin("webpack-spritesmith").use(SpritesmithPlugin, [
      {
        src: {
          cwd: "./src/assets/icons/",
          glob: "*.png"
        },
        target: {
          image: "./src/assets/sprite.png",
          css: [
            [
              path.resolve(__dirname, "./src/assets/scss/_sprite.scss"),
              {
                // 引用自己的模板
                format: "function_based_template"
              }
            ]
          ]
        },
        apiOptions: {
          cssImageRef: "../sprite.png"
        },
        customTemplates: {
          function_based_template: templateFunction
        },
        spritesmithOptions: {
          algorithm: "binary-tree",
          padding: 10
        }
      }
    ]);
  },
  devServer: {
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        target: `https://easy-mock.com/mock/5d8defd908f5d9044bdb117b`,
        changeOrigin: true,
        pathRewrite: {
          ["^" + process.env.VUE_APP_BASE_API]: ""
        }
      }
    }
  }
};

// 雪碧图方法
function templateFunction(data) {
  if (data.sprites.length <= 1) {
    return "";
  }
  var shared =
    data.sprites.length > 0
      ? ".icon { display: inline-block; vertical-align: middle; background-image: url(I) }".replace(
          "I",
          data.sprites.length > 0 ? data.sprites[0].image : ""
        )
      : "";

  var perSprite = data.sprites
    .map(function(sprite) {
      return ".icon-N { width: Wpx; height: Hpx; background-position: Xpx Ypx; }"
        .replace("N", sprite.name)
        .replace("W", sprite.width)
        .replace("H", sprite.height)
        .replace("X", sprite.offset_x)
        .replace("Y", sprite.offset_y);
    })
    .join("\n");

  return shared + "\n" + perSprite;
}
