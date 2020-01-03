<template>
	<!-- 新增用户-->
	<el-dialog
		top="30vh"
		custom-class="add-user-dialog"
		width="600px"
		:title="$t('action.addUser')"
		:visible.sync="addUserVisible"
		append-to-body
	>
		<el-form :model="form">
			<el-form-item :label="$t('user.userName')" label-width="140px">
				<el-input v-model="form.name"></el-input>
			</el-form-item>
			<el-form-item :label="$t('user.phoneNumber')" label-width="140px">
				<el-input v-model="form.phone"></el-input>
			</el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button @click="addUserVisible = false">取 消</el-button>
			<el-button type="primary" @click="saveNewUser">确 定</el-button>
		</div>
	</el-dialog>
</template>

<script>
export default {
	name: 'AddUser',
	data() {
		return {
			addUserVisible: false,
			form: {
				name: '',
				phone: ''
			}
		};
	},
	methods: {
		saveNewUser() {
			console.log(this.form);
			this.$emit('saveNewUser');
		}
	}
};
</script>

<style lang="scss">
.add-user-dialog {
	.el-input__inner {
		width: 360px;
	}
}
</style>
