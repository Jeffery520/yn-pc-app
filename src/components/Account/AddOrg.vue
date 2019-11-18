<template>
	<div>
		<el-dialog
			top="8vh"
			custom-class="add-org-dialog"
			width="600px"
			:title="$t('action.add') + ' ' + $t('tableTitle.origin')"
			:visible.sync="addAccountVisible"
			append-to-body
			destroy-on-close
		>
			<main style="width: 500px;">
				<el-form
					ref="form"
					:model="formData"
					label-width="160px"
					label-suffix=":"
				>
					<el-form-item :label="$t('tableTitle.orgName')">
						<el-input v-model="formData.simpleName"></el-input>
					</el-form-item>
					<el-form-item :label="$t('tableTitle.orgFullName')">
						<el-input v-model="formData.fullName"></el-input>
					</el-form-item>
					<el-form-item :label="$t('user.address')">
						<el-input v-model="formData.address"></el-input>
					</el-form-item>
					<el-form-item :label="$t('tableTitle.admin')">
						<el-input v-model="formData.contact"></el-input>
					</el-form-item>
					<el-form-item :label="$t('user.phone')">
						<el-input v-model="formData.phone"></el-input>
					</el-form-item>
					<el-form-item :label="$t('user.email')">
						<el-input v-model="formData.email"></el-input>
					</el-form-item>
					<el-form-item :label="$t('user.password')">
						<el-input type="password" v-model="formData.password"></el-input>
					</el-form-item>

					<el-form-item :label="$t('tableTitle.noOfDevices')">
						<span style="font-size: 20px;color:#5f9de9;">
							{{ formData.devNum }}</span
						>
					</el-form-item>
					<el-form-item :label="$t('tableTitle.allocateDevices')">
						<el-button
							type="primary"
							size="small"
							@click="$refs.AllocateDevices.allocateDevicesVisible = true"
							>+ {{ $t('tableTitle.allocate') }}</el-button
						>
					</el-form-item>
					<el-form-item>
						<el-button style="width: 140px">{{
							$t('action.cancel')
						}}</el-button>
						<el-button style="width: 140px" type="primary">{{
							$t('action.save')
						}}</el-button>
					</el-form-item>
				</el-form>
			</main>
		</el-dialog>
		<AllocateDevices ref="AllocateDevices"></AllocateDevices>
	</div>
</template>

<script>
import mixin from '@/views/mixin';
import AllocateDevices from '@/components/Account/AllocateDevices';
import { addOrg } from '@/api/account';

export default {
	name: 'AddAccount',
	mixins: [mixin],
	components: { AllocateDevices },
	data() {
		return {
			addAccountVisible: false,
			formData: {
				fullName: '', // 机构全称
				simpleName: '', // 机构名称
				address: '', // 机构地址
				devNum: 0, // 设备数量
				contact: '', // 管理员
				phone: '', // 机构电话
				email: '' // 邮箱
			}
		};
	},
	methods: {
		// 切换页码
		pageChange(page) {
			this.$refs.Pagination.currentPage = page;
		},
		_addAccount() {
			// addOrg
		},
		_tableCellColor({ columnIndex }) {
			if (columnIndex === 4 || columnIndex === 6 || columnIndex === 7) {
				// 蓝色字体
				return 'color: #60b8f7;text-align: center;cursor: pointer;';
			}
			return 'color: #666666;text-align: center;cursor: pointer;';
		}
	}
};
</script>

<style lang="scss">
.add-org-dialog {
	.el-dialog__body {
		padding: 20px !important;
	}
}
</style>
