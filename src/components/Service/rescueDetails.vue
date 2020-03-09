<template>
	<div>
		<el-dialog
			top="8vh"
			custom-class="add-account-dialog"
			width="700px"
			:title="language == 'zh' ? '新增订单' : 'Add order'"
			:visible.sync="rescueDetailsVisible"
		>
			<div style="width: 600px;margin: 20px auto">
				<el-form label-width="auto" :model="form" label-suffix="：">
					<el-form-item :label="language == 'en' ? 'Service Name' : '服务名称'">
						<el-input v-model="form.subject"></el-input>
					</el-form-item>

					<div style="font-size: 20px;padding: 10px 0 20px;font-weight: 600;">
						{{
							language == 'en' ? 'Service object information' : '服务对象信息'
						}}：
					</div>

					<el-form-item :label="language == 'en' ? 'User Name' : '用户名'">
						<el-input v-model="form.fullname"></el-input>
					</el-form-item>
					<el-form-item
						:label="language == 'en' ? 'Identity Number' : '身份证号'"
					>
						<el-input v-model="form.idnumber"></el-input>
					</el-form-item>
					<el-form-item :label="language == 'en' ? 'Phone Number' : '手机号'">
						<el-input v-model="form.phone"></el-input>
					</el-form-item>
					<el-form-item :label="language == 'en' ? 'Email' : '邮箱'">
						<el-input v-model="form.email"></el-input>
					</el-form-item>

					<el-form-item :label="language == 'en' ? 'Opening Date' : '开通日期'">
						<el-date-picker
							v-model="form.startDate"
							type="datetime"
							value-format="timestamp"
							:format="
								language == 'zh' ? 'yyyy-MM-dd HH:mm' : 'MMM d,yyyy h:mm A'
							"
						>
						</el-date-picker>
					</el-form-item>
					<el-form-item :label="language == 'en' ? 'End Date' : '结束日期'">
						<el-date-picker
							v-model="form.endDate"
							type="datetime"
							value-format="timestamp"
							:format="
								language == 'zh' ? 'yyyy-MM-dd HH:mm' : 'MMM d,yyyy h:mm A'
							"
						>
						</el-date-picker>
					</el-form-item>

					<div class="form-line-border"></div>
					<el-form-item label="服务状态">
						<el-radio-group v-model="form.resource">
							<el-radio label="审核中"></el-radio>
							<el-radio label="已完成"></el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item>
						<el-button @click="rescueDetailsVisible = false">取消</el-button>
						<el-button type="primary" @click="onSubmit">保存</el-button>
					</el-form-item>
				</el-form>
			</div>
		</el-dialog>
	</div>
</template>

<script>
export default {
	name: 'rescueDetails',
	props: {},
	data() {
		return {
			rescueDetailsVisible: false,
			language: this.$store.getters.language,
			form: {}
		};
	},
	created() {},
	mounted() {
		console.log(this.form);
	},
	methods: {}
};
</script>

<style lang="scss" scoped>
@import '@/style/mixin.scss';
.form-line-border {
	margin-bottom: 20px;
	height: 1px;
	background: $baseBorderColor;
}
</style>
