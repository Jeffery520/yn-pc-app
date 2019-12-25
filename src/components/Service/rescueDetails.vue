<template>
	<div>
		<el-dialog
			top="8vh"
			custom-class="add-account-dialog"
			width="700px"
			:title="language == 'zh' ? '服务详情' : 'Service Details'"
			:visible.sync="rescueDetailsVisible"
		>
			<div style="width: 600px;margin: 0 auto">
				<el-form label-width="auto" :model="form" label-suffix="：">
					<el-form-item label="服务名称">
						<div>{{ form.name || 8888888888 }}</div>
					</el-form-item>
					<el-form-item label="用户姓名">
						<div>{{ form.name || 8888888888 }}</div>
					</el-form-item>
					<el-form-item label="身份证号">
						<div>{{ form.name || 8888888888 }}</div>
					</el-form-item>
					<el-form-item label="手机号">
						<div>{{ form.name || 8888888888 }}</div>
					</el-form-item>
					<el-form-item label="开通日期">
						<div>{{ form.name || 8888888888 }}</div>
					</el-form-item>
					<el-form-item label="结束日期">
						<div>{{ form.name || 8888888888 }}</div>
					</el-form-item>
					<el-form-item label="客服电话">
						<div>{{ form.name || 8888888888 }}</div>
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
	mounted() {},
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
