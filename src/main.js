import Vue from 'vue';
import store from '@/store';
import Cookies from 'js-cookie';
import ElementUI from 'element-ui';
import Call from '@/components/Call/index.vue';
import '@/style/theme/index.css'; // element-ui yinuo theme css
import '@/style/index.scss'; // 全局样式

import App from '@/App.vue';
import router from '@/router/index';
import i18n from './lang'; // internationalization
import '@/assets/icons/index'; // svg-icon注册
import './permission'; // 路由权限控制

Vue.config.productionTip = false;
Vue.config.debug = process.env.NODE_ENV !== 'production';
Vue.config.devtools = process.env.NODE_ENV === 'dev';

// 设置ElementUI大小和语言包
Vue.use(ElementUI, {
	size: Cookies.get('size') || 'medium',
	i18n: (key, value) => i18n.t(key, value)
});

Vue.use(ElementUI);
Vue.component('phone-call', Call);

new Vue({
	router,
	store,
	i18n,
	render: (h) => h(App)
}).$mount('#app');
