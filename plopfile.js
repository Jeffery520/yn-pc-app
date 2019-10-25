// plop插件配置(文件生成器)
// 运行npm run new生成.vue文件配置
const viewGenerator = require('./plop-templates/view/prompt');
const componentGenerator = require('./plop-templates/component/prompt');

module.exports = function(plop) {
  plop.setGenerator('view', viewGenerator);
  plop.setGenerator('component', componentGenerator);
};
