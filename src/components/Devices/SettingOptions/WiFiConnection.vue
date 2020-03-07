<template>
	<div style="position: relative;">
		<el-button
			v-if="$store.getters.userInfo.resource.indexOf(11) > -1"
			v-show="disabled"
			@click="disabled = false"
			type="primary"
			icon="el-icon-edit-outline"
			style="width: 70px;padding: 10px 5px;position: absolute;right: 0;top: 0;z-index: 10;"
			>{{ $t('action.edit') }}</el-button
		>
		<el-form
			ref="WiFiConnection"
			:model="formData"
			label-suffix=":"
			label-width="auto"
			:inline="true"
		>
			<div
				v-for="(item, index) in formData.wifiInfo"
				:key="index"
				style="width: 100%"
			>
				<el-form-item
					class="form-inline"
					:label="language == 'zh' ? '名称' : 'SSID'"
					:prop="'wifiInfo.' + index + '.name'"
					:rules="rules.name"
				>
					<el-input
						class="w200"
						v-model="item.name"
						:disabled="disabled"
					></el-input>
				</el-form-item>
				<span class="line-to form-inline"></span>
				<el-form-item
					class="form-inline"
					:label="$t('others.password')"
					:prop="'wifiInfo.' + index + '.password'"
					:rules="rules.password"
				>
					<el-input
						class="w200"
						v-model="item.password"
						:disabled="disabled"
						type="password"
					></el-input>
					<el-button
						style="width: auto;margin-left: 10px;"
						@click.prevent="remove(index)"
						icon="el-icon-delete"
						:disabled="disabled"
						circle
					></el-button>
				</el-form-item>
			</div>
			<div class="button-el-form-item__label">
				<el-form-item label="-" v-show="!disabled">
					<el-button
						@click="formData.wifiInfo.push({ mac: '', name: '', password: '' })"
						icon="el-icon-plus"
						style="width: auto;"
						>{{ $t('action.add') }}</el-button
					>
				</el-form-item>
			</div>
			<div class="button-el-form-item__label">
				<el-form-item
					label="-"
					v-show="!disabled && formData.wifiInfo.length > 0"
					style="margin-top: 40px"
				>
					<el-button @click="cancel">{{ $t('action.cancel') }}</el-button>
					<el-button type="primary" @click="submit">{{
						$t('action.save')
					}}</el-button>
				</el-form-item>
			</div>
		</el-form>
	</div>
</template>

<script>
import mixin from '@/components/Devices/SettingOptions/mixin';
export default {
	name: 'WiFiConnection',
	mixins: [mixin],
	data() {
		let validateWifi = (rule, value, callback) => {
			if (!value) {
				return callback(
					new Error(
						this.language == 'en' ? 'Please enter the content' : '请输入内容'
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
			}
		};
	},
	methods: {
		submit() {
			this.$refs['WiFiConnection'].validate((valid) => {
				if (valid) {
					const { did, wifiInfo } = this.formData;
					let wifiInfoList = wifiInfo.map((item) => {
						let obj = {
							mac: '', //Wifi MAC地址
							name: item.name
								.replace(',', '/,')
								.replace('{', '/{')
								.replace('}', '/}'), // Wifi名称，注意不能含有 ‘, or {}’
							pwd: item.password //Wifi 密码， 注意不能含有 ‘, or {}’
						};
						return obj;
					});

					let data = {
						cmd: 304,
						did: did,
						wifiInfoList: wifiInfoList
					};

					this._submitForm(data);
				} else {
					this.$message({
						showClose: true,
						message:
							this.language == 'en'
								? `The information submitted is incorrect !`
								: `提交的信息有误 ！`,
						type: 'error'
					});
					return false;
				}
			});
		},
		remove(index) {
			if (index !== -1) {
				this.$confirm(
					this.$store.getters.language == 'zh'
						? '您确定要删除吗?'
						: 'Are you sure you want to Delete?',
					this.$store.getters.language == 'zh' ? '提示' : 'Prompt',
					{
						type: 'warning'
					}
				).then(() => {
					this.formData.wifiInfo.splice(index, 1);
				});
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.w200 {
	width: 180px !important;
}
</style>
