import { _debounce } from '@/utils/validate';
const cloneDeep = require('lodash/cloneDeep');
import { submitSettings } from '@/api/devices';

/*
 * 设置项指令
 * 定时设置{心率-201、计步-202、定位-203、睡眠-204、久坐-205、跌倒-206};
 * 上下限{心率-221、血压-110、血糖-111、体温-112};
 * 计步目标-231、上报频率-232、电子围栏-301、跟踪模式-302、表盘-303、WiFi-304、SOS-214
 * */

export default {
	data() {
		return {};
	},
	mounted() {},
	methods: {
		//用户取消提交
		// _submitForm(data) {
		// 	this.loading = this.$loading({
		// 		target: document.querySelector('.settings-dialog'),
		// 		background: 'rgba(225, 225, 225, 0)'
		// 	});
		// 	submitSettings(data)
		// 		.then(() => {
		// 			// 更新父组件数据
		// 			this.$emit('update:form', this.formData);
		// 			this.disabled = true;
		// 			this.loading.close();
		// 			this.$message({
		// 				message: 'Submit Success',
		// 				type: 'success'
		// 			});
		// 		})
		// 		.catch(() => {
		// 			this.loading.close();
		// 		});
		// },
	}
};
