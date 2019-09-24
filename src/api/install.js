/*
* 2019-09-24 jeffery
* 所有的api接口安装到全局
* */
import apiList from './apiList'

const install = function(Vue) {
  if (install.installed) {
    return
  }
  install.installed = true
  Object.defineProperties(Vue.prototype, {
    $api: {
      get() {
         return apiList
      }
    }
  })
}

export default {
  install
}