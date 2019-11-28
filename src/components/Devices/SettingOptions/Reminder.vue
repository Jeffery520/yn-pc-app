<template>
	<div style="position: relative;">
		<el-form
			ref="Reminder"
			:model="settingsForm"
			label-suffix=":"
			label-width="auto"
		>
			<div
				v-for="(item, index) in settingsForm.list"
				:key="index"
				class="item_list"
			>
				<el-form-item class="form-inline no-label-form-item">
					<el-select
						v-model="item.frequency"
						:prop="'list.' + index + '.frequency'"
						:rules="rules.frequency"
						:disabled="item.disabled"
					>
						<el-option
							v-for="item in timeCountOptins"
							:key="item.value"
							:label="item.label"
							:value="item.value"
						>
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item
					class="form-inline ml20"
					:label="$t('others.date') + $t('others.time')"
					:prop="'list.' + index + '.settime'"
					:rules="rules.settime"
				>
					<el-date-picker
						v-model="item.settime"
						type="datetime"
						format="MMM d,yyyy HH:mm A"
						value-format="yyyyMMddHHmm"
						:disabled="item.disabled"
					>
					</el-date-picker>
					<el-button
						style="width: auto;margin-left: 10px;"
						@click.prevent="remove({ item: item, index: index })"
						icon="el-icon-delete"
						v-show="!item.disabled"
						circle
					></el-button>
					<el-button
						style="width: auto;margin-left: 10px;"
						v-show="item.disabled"
						@click="item.disabled = false"
						type="primary"
						icon="el-icon-edit-outline"
						circle
					></el-button>
				</el-form-item>
				<el-form-item
					class="label-block-form-item"
					:prop="'list.' + index + '.content'"
					:rules="rules.content"
					style="margin-top: -10px;"
				>
					<div class="label-block">{{ $t('others.content') }}</div>
					<el-input
						type="textarea"
						v-model="item.content"
						:disabled="item.disabled"
					></el-input>
				</el-form-item>
				<el-form-item class="no-label-form-item" v-show="!item.disabled">
					<el-button @click="cancelEdit(index)">{{
						$t('action.cancel')
					}}</el-button>
					<el-button
						type="primary"
						@click="submit({ item: item, index: index })"
						>{{ $t('action.save') }}</el-button
					>
				</el-form-item>
			</div>

			<el-form-item class="form-inline no-label-form-item">
				<el-button
					@click="
						settingsForm.list.push({
							content: '',
							did: form.did,
							frequency: 0,
							remindid: 0,
							settime: '',
							type: 1,
							disabled: false,
							voiceurl: ''
						})
					"
					icon="el-icon-plus"
					style="width: auto;"
					>{{ $t('action.add') }}</el-button
				>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
import mixin from '@/components/Devices/SettingOptions/mixin';
import {
	getDevicesReminder,
	subDevicesReminder,
	delDevicesReminder
} from '@/api/devices';
export default {
	name: 'Reminder',
	mixins: [mixin],
	props: {},
	data() {
		return {
			language: this.$store.getters.language,
			settingsForm: { list: [] },
			timeCountOptins: [
				{ value: 0, label: this.language == 'en' ? 'Once' : '只执行一次' },
				{ value: 1, label: this.language == 'en' ? 'Repeat' : '重复' }
			],
			rules: {
				frequency: [
					{
						required: true,
						message:
							this.language == 'zh'
								? '请选择提醒频率'
								: 'Please Select A Reminder Frequency',
						trigger: 'blur'
					}
				],
				settime: [
					{
						required: true,
						message:
							this.language == 'zh'
								? '请选择提醒时间'
								: 'Please Select Reminder Time',
						trigger: 'blur'
					}
				],
				content: [
					{
						required: true,
						message:
							this.language == 'zh' ? '请输入内容' : 'Please Enter The Content',
						trigger: 'blur'
					}
				]
			}
		};
	},
	mounted() {
		// 获取提醒项目
		this.loading = this.$loading({
			target: document.querySelector('.settings-dialog'),
			background: 'rgba(225, 225, 225, 0)'
		});
		getDevicesReminder({ did: this.form.did })
			.then((data) => {
				this.settingsForm.list = data.map((item) => {
					item.disabled = true;
					return item;
				});
				this.loading.close();
			})
			.catch(() => {
				this.loading.close();
			});
	},
	methods: {
		cancelEdit(index) {
			if (index !== -1) {
				if (!this.settingsForm.list[index].remindid) {
					this.settingsForm.list.splice(index, 1);
					return;
				} else {
					this.settingsForm.list[index].disabled = true;
				}
			}
		},
		remove(value) {
			console.log(value);
			if (value.index !== -1) {
				if (!this.settingsForm.list[value.index].remindid) {
					this.settingsForm.list.splice(value.index, 1);
					return;
				}
				this._delDevicesReminder(value);
			}
		},
		submit(value) {
			this._subDevicesReminder(value);
		},
		_delDevicesReminder(params) {
			const {
				content,
				frequency,
				remindid,
				settime,
				type,
				voiceurl
			} = params.item;
			this.loading = this.$loading({
				target: document.querySelector('.settings-dialog'),
				background: 'rgba(225, 225, 225, 0)'
			});
			delDevicesReminder({
				content,
				did: this.form.did,
				frequency,
				remindid,
				settime,
				type,
				voiceurl
			})
				.then(() => {
					this.loading.close();
					this.settingsForm.list.splice(params.index, 1);
					this.$message({
						message: 'Delete Success',
						type: 'success'
					});
				})
				.catch(() => {
					this.loading.close();
				});
		},
		// 提交数据
		_subDevicesReminder(params) {
			this.$refs['Reminder'].validate((valid) => {
				if (valid) {
					const {
						content,
						frequency,
						remindid,
						settime,
						type,
						voiceurl
					} = params.item;

					this.loading = this.$loading({
						target: document.querySelector('.settings-dialog'),
						background: 'rgba(225, 225, 225, 0)'
					});
					subDevicesReminder({
						content,
						did: this.form.did,
						frequency,
						remindid,
						settime,
						type,
						voiceurl
					})
						.then(() => {
							this.settingsForm.list[params.index].disabled = true;
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
			});
		}
	}
};
</script>

<style lang="scss">
.no-label-form-item .el-form-item__content {
	margin-left: 20px !important;
}
.ml20 {
	margin-left: 20px;
	.el-input {
		width: 285px !important;
	}
}
.label-block-form-item .el-form-item__content {
	margin-left: 20px !important;
	.label-block {
		color: #000000;
		font-size: 18px;
	}
	.el-textarea__inner {
		width: 542px;
	}
}
</style>

<style lang="scss" scope>
.item_list {
	border-bottom: 1px solid $baseBorderColor;
	margin-bottom: 20px;
	padding-top: 10px;
}
</style>
