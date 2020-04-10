<template>
	<div class="alert-status-log">
		<el-dialog
			:title="$store.getters.language == 'en' ? 'Alert status' : '警报状态'"
			:visible.sync="AlertstatusFormVisible"
			width="400px"
			center
			@opened="statusOpened"
		>
			<div style="display: flex;justify-content: center;padding-top: 20px">
				<el-select
					v-model="fStatus"
					:placeholder="
						$store.getters.language == 'zh' ? '选择状态' : 'Select status'
					"
				>
					<el-option
						v-for="item in options"
						:key="item.value"
						:label="item.label"
						:value="item.value"
					></el-option>
				</el-select>
			</div>
			<div slot="footer" class="dialog-footer" style="margin-top: 20px">
				<el-button @click="AlertstatusFormVisible = false">{{
					$t('action.cancel')
				}}</el-button>
				<el-button type="primary" @click="rickAlertStatusHandle">{{
					$t('action.save')
				}}</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import { rickAlertStatusHandle } from '@/api/devices';
export default {
	name: 'status',
	props: { detail: Object },
	data() {
		return {
			AlertstatusFormVisible: false,
			fStatus: 0,
			options: []
		};
	},
	created() {},
	mounted() {
		this.fStatus = this.detail.fAlertStaus != 4 ? 1 : 4;
		this.options = [
			{
				label: this.$store.getters.language == 'zh' ? '未服务' : 'Unserved',
				value: 1
			},
			{
				label: this.$store.getters.language == 'zh' ? '已服务' : 'Served',
				value: 4
			}
		];
	},

	methods: {
		statusOpened() {
			this.fStatus = this.detail.fAlertStaus != 4 ? 1 : 4;
		},
		rickAlertStatusHandle() {
			this.loading = this.$loading({
				target: document.querySelector('.alert-status-log'),
				background: 'rgba(225, 225, 225, 0)'
			});
			const { fId, fDid } = this.detail;
			const params = {
				fAlertId: fId || 0,
				fDid: fDid,
				fStatus: this.fStatus
			};
			rickAlertStatusHandle(params)
				.then(() => {
					this.loading.close();
					this.$message({
						message: 'Success',
						type: 'success'
					});
					this.$emit('change');
					this.AlertstatusFormVisible = false;
				})
				.catch(() => {
					this.loading.close();
					this.AlertstatusFormVisible = false;
				});
		}
	}
};
</script>

<style lang="scss" scoped></style>
