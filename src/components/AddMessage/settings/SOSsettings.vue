<template>
	<div class="setting-optings-bg" style="position: relative;">
		<el-form
			ref="SOSsettings"
			:model="form"
			label-suffix="："
			label-width="140px"
		>
			<el-form-item
				:label="$t('user.phone') + 1"
				class="form-inline phone-width"
			>
				<el-input v-model="form.sos.sos1"></el-input>
			</el-form-item>
			<el-form-item
				:label="$t('user.phone') + 2"
				class="form-inline phone-width"
			>
				<el-input v-model="form.sos.sos2"></el-input>
			</el-form-item>
			<el-form-item
				:label="$t('user.phone') + 3"
				class="form-inline phone-width"
			>
				<el-input v-model="form.sos.sos3"></el-input>
			</el-form-item>
			<el-form-item class="form-inline" :label="'SOS ' + $t('others.content')">
				<el-input
					type="textarea"
					v-model="form.sos.soscontent"
					style="width: 200px"
				></el-input>
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
	name: 'SOSsettings',
	data() {
		return {
			language: this.$store.getters.language,
			form: {
				cmd: 214,
				did: 0,
				sos: { sos1: '', sos2: '', sos3: '', soscontent: '' }
			}
		};
	},
	methods: {
		submit() {
			console.log(this.form);
			if (
				(this.form.sos.sos1 || this.form.sos.sos2 || this.form.sos.sos3) &&
				this.form.sos.soscontent
			) {
				let data = {
					didList: [],
					wSettings: this.form
				};
				this.$emit('submit', data);
			} else {
				console.log('error submit!!');
				this.$alert(
					this.language == 'zh'
						? '请填写完整信息'
						: 'Please complete the information'
				);
			}
		}
	}
};
</script>

<style lang="scss">
.phone-width {
	.el-input {
		width: 200px !important;
	}
}
</style>
