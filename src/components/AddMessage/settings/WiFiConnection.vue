<template>
	<div class="setting-optings-bg" style="position: relative;">
		<el-form
			ref="WiFiConnection"
			:model="form.wifiInfoList[0]"
			label-suffix=":"
			label-width="auto"
			:rules="rules"
		>
			<el-form-item class="form-inline" :label="$t('others.name')" prop="name">
				<el-input class="w200" v-model="form.wifiInfoList[0].name"></el-input>
			</el-form-item>
			<el-form-item
				class="form-inline"
				:label="$t('others.password')"
				prop="pwd"
			>
				<el-input class="w200" v-model="form.wifiInfoList[0].pwd"></el-input>
			</el-form-item>
		</el-form>
		<el-button
			@click="submit"
			style="width: 100px;margin-left: 0;"
			type="primary"
			>{{ $t('action.save') }}</el-button
		>
	</div>
</template>

<script>
export default {
	name: 'WiFiConnection',
	data() {
		let validateWifi = (rule, value, callback) => {
			let reg = /{|}|,/g;
			if (!value) {
				return callback(
					new Error(
						this.$store.getters.language == 'en'
							? 'Please enter the content'
							: '请输入内容'
					)
				);
			}
			if (reg.test(value)) {
				callback(
					new Error(
						this.$store.getters.language == 'en'
							? 'Cannot contain "{}", ","'
							: '不能包含“{}”,“,”等字符'
					)
				);
			} else {
				callback();
			}
		};
		return {
			language: this.$store.getters.language,
			rules: {
				name: [{ validator: validateWifi, trigger: 'blur' }],
				password: [{ validator: validateWifi, trigger: 'blur' }]
			},
			form: {
				cmd: 304,
				did: 0,
				wifiInfoList: [{ mac: '', name: '', pwd: '' }]
			}
		};
	},
	methods: {
		submit() {
			this.$refs['WiFiConnection'].validate((valid) => {
				if (valid) {
					let data = {
						didList: [],
						wSettings: this.form
					};
					this.$emit('submit', data);
				} else {
					this.$message({
						showClose: true,
						message:
							this.$store.getters.language == 'en'
								? `The information submitted is incorrect !`
								: `提交的信息有误 ！`,
						type: 'error'
					});
					return false;
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.w200 {
	width: 180px !important;
}
</style>
