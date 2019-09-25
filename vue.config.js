const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV);
const path = require("path");
const SpritesmithPlugin = require("webpack-spritesmith");

module.exports = {
  publicPath: IS_PROD ? process.env.VUE_APP_PUBLIC_PATH : "./", // 默认'/'，部署应用包时的基本 URL
  // outputDir: process.env.outputDir || 'dist', // 'dist', 生产环境构建文件的目录
  // assetsDir: "", // 相对于outputDir的静态资源(js、css、img、fonts)目录
  // lintOnSave: false,  // 保存时开启eslint检查
  runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本
  productionSourceMap: !IS_PROD, // 生成生产环境的 source map文件
  parallel: require("os").cpus().length > 1, // 是否为 Babel 或 TypeScript 使用 thread-loader
  pwa: {},
  chainWebpack: config => {
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
    // overlay: { // 让浏览器 overlay 同时显示警告和错误
    //   warnings: true,
    //   errors: true
    // },
    // open: false, // 是否打开浏览器
    // host: "localhost",
    // port: "8080", // 代理断就
    // https: false,
    // hotOnly: false, // 热更新
    proxy: {
      "/api": {
        target: process.env.VUE_APP_API, // 目标代理接口地址
        secure: false, // 接受运行在 HTTPS 上
        changeOrigin: true, // 开启代理，在本地创建一个虚拟服务端
        pathRewrite: {
          "^/api": "/"
        }
      }
    }
  }
};

// 雪碧图方法
function templateFunction(data) {
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
