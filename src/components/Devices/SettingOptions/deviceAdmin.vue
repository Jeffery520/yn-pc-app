<template>
	<div>
		<div style="position: relative;width: 600px">
			<el-button
				v-if="$store.getters.userInfo.resource.indexOf(11) > -1"
				v-show="disabled"
				@click="disabled = false"
				type="primary"
				icon="el-icon-edit-outline"
				style="width: 70px;padding: 10px 5px;position: absolute;right: 0;top: 0;z-index: 10;"
				>Edit</el-button
			>
			<el-form
				ref="BloodGlucose"
				:model="formData"
				label-suffix="："
				label-width="auto"
			>
				<el-form-item
					:label="$store.getters.language == 'en' ? 'Administrator' : '管理员'"
				>
					<div
						style="color: #4b96ef;"
						v-for="item in formData.bindUserList"
						v-if="item.fUid == admin"
					>
						{{
							item.fUserAlias
								? item.fUserAlias
								: $store.getters.language == 'en'
								? 'Unknown name'
								: '未命名'
						}}
					</div>
				</el-form-item>
				<el-form-item
					:label="$store.getters.language == 'en' ? 'Caregiver' : '普通用户'"
				>
					<el-radio-group v-model="admin" :disabled="disabled">
						<el-radio
							v-for="(item, index) in formData.bindUserList"
							:label="item.fUid"
						>
							<span style="display:inline-block;padding:10px 0;">
								{{
									item.fUserAlias
										? item.fUserAlias
										: $store.getters.language == 'en'
										? 'Unknown name'
										: '未命名'
								}}
								<i
									v-if="!item.fAdmin && !disabled"
									style="font-size: 20px;cursor: pointer;color: #999;transform: translateY(2px);"
									class="el-icon-close"
									@click.prevent="deleteUser({ item, index })"
								></i>
							</span>
						</el-radio>
					</el-radio-group>
				</el-form-item>

				<div class="button-el-form-item__label">
					<el-form-item label="-" v-show="!disabled" style="margin-top: 40px">
						<el-button @click="cancel">{{ $t('action.cancel') }}</el-button>
						<el-button type="primary" @click="submit">{{
							$t('action.save')
						}}</el-button>
					</el-form-item>
				</div>
			</el-form>
		</div>
	</div>
</template>

<script>
import mixin from '@/components/Devices/SettingOptions/mixin';
import { resetDeviceBinding, deltDeviceBinding } from '@/api/devices';
export default {
	name: 'DeviceAdmin',
	mixins: [mixin],
	data() {
		return { admin: '', startAdmin: '' };
	},
	mounted() {
		const userList = this.formData.bindUserList;
		console.log(userList);
		for (var i = 0; i < userList.length; i++) {
			if (userList[i].fAdmin) {
				this.admin = userList[i].fUid;
				this.startAdmin = userList[i].fUid;
				break;
			}
		}
	},
	methods: {
		deleteUser({ item, index }) {
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
					this._deltDeviceBinding({ item, index });
				});
			}
		},
		_deltDeviceBinding({ item, index }) {
			this.loading = this.$loading({
				target: document.querySelector('.settings-dialog'),
				background: 'rgba(225, 225, 225, 0)'
			});
			const params = { did: this.formData.fDid, uid: item.fUid };
			deltDeviceBinding(params)
				.then(() => {
					this.formData.bindUserList.splice(index, 1);
					// 更新父组件数据
					this.$emit('update:form', this.formData);
					this.loading.close();
					this.$message({
						message: 'Submit Success',
						type: 'success'
					});
				})
				.catch(() => {
					this.loading.close();
				});
		},
		cancel() {
			this.disabled = true;
			this.admin = this.startAdmin;
		},
		submit() {
			this.loading = this.$loading({
				target: document.querySelector('.settings-dialog'),
				background: 'rgba(225, 225, 225, 0)'
			});
			const params = { did: this.formData.fDid, uid: this.admin };
			resetDeviceBinding(params)
				.then(() => {
					// 更新父组件数据
					this.$emit('update:form', this.formData);
					this.disabled = true;
					this.loading.close();
					this.$message({
						message: 'Submit Success',
						type: 'success'
					});
				})
				.catch(() => {
					this.loading.close();
				});
		}
	}
};
</script>

<style lang="scss" scoped></style>
