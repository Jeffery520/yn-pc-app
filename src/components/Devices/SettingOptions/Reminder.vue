<template>
	<div style="position: relative;">
		<el-form
			ref="Reminder"
			:model="settingsForm"
			label-suffix=":"
			label-width="auto"
			:inline="true"
		>
			<div
				v-for="(item, index) in settingsForm.list"
				:key="index"
				class="item_list"
			>
				<el-form-item class="form-inline no-label-form-item">
					<el-select
						v-model="item.frequencyValue"
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
						:editable="false"
						value-format="yyyyMMddHHmm"
						:format="
							$store.getters.language == 'zh'
								? 'yyyy-MM-dd HH:mm'
								: 'MMM d,yyyy h:mm A'
						"
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
					v-if="item.frequencyValue"
					:prop="'list.' + index + '.setDays'"
					:rules="rules.setDays"
					class="label-block-form-item"
				>
					<div class="label-block">
						{{ language == 'zh' ? '重复时间' : 'Repeat Day' }}
					</div>
					<el-checkbox-group
						:disabled="item.disabled"
						v-model="item.setDays"
						@change="sttimesChange({ setDays: item.setDays, index })"
						size="mini"
					>
						<el-checkbox-button
							v-for="it in sttimesOptionsIndex"
							:label="it"
							:key="it"
							:class="item.setDays.indexOf(it) >= 0 ? 'active-checked' : ''"
							>{{ sttimesOptions[it - 1] }}</el-checkbox-button
						>
					</el-checkbox-group>
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
							frequency: 0, // 不重复
							frequencyValue: 0,
							setDays: [1],
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
			sttimesOptions: [
				this.$store.getters.language == 'zh' ? '每天' : 'EveryDay',
				this.$store.getters.language == 'zh' ? '周一' : 'Monday',
				this.$store.getters.language == 'zh' ? '周二' : 'Tuesday',
				this.$store.getters.language == 'zh' ? '周三' : 'Wednesday',
				this.$store.getters.language == 'zh' ? '周四' : 'Thursday',
				this.$store.getters.language == 'zh' ? '周五' : 'Friday',
				this.$store.getters.language == 'zh' ? '周六' : 'Saturday',
				this.$store.getters.language == 'zh' ? '周日' : 'Sunday'
			],
			sttimesOptionsIndex: [1, 2, 3, 4, 5, 6, 7, 8],
			timeCountOptins: [
				{
					value: 0,
					label: this.$store.getters.language == 'en' ? 'Once' : '只执行一次'
				},
				{
					value: 1,
					label: this.$store.getters.language == 'en' ? 'Repeat' : '重复'
				}
			],
			rules: {
				frequencyValue: [
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
				setDays: [
					{
						required: true,
						message:
							this.language == 'zh'
								? '请选择重复提醒时间'
								: 'Please select a repeat reminder time',
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
					// 操作值
					item.frequencyValue = item.frequency >= 1 ? 1 : 0;
					// 如果设置了重复提醒，转为十进制数据
					if (item.frequency > 1) {
						let m = item.frequency.toString(2);
						m = m.split('').reverse();
						console.log(m);
						let arr = [];
						for (let i = 0; i < m.length; i++) {
							if (i != 0) {
								arr.push(i + 1);
							}
						}
						item.setDays = arr;
					} else {
						item.setDays = [1];
					}
					return item;
				});
				this.loading.close();
			})
			.catch(() => {
				this.loading.close();
			});
	},
	methods: {
		sttimesChange(value) {
			if (value.setDays.length == 0) {
				this.settingsForm.list[value.index].setDays = [1];
				this.settingsForm = this.settingsForm;
				return;
			}
			// 去掉空项
			if (value.setDays[value.setDays.length - 1] == 1) {
				this.settingsForm.list[value.index].setDays = [1];
				this.settingsForm = this.settingsForm;
			} else {
				if (value.setDays.indexOf(1) >= 0) {
					value.setDays.splice(value.setDays.indexOf(1), 1);
				} else {
					if (value.setDays.length >= 7) {
						this.settingsForm.list[value.index].setDays = [1];
						this.settingsForm = this.settingsForm;
						return;
					}
				}
				this.settingsForm.list[value.index].setDays = value.setDays;
				this.settingsForm = this.settingsForm;
			}
		},
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
						frequencyValue,
						setDays,
						remindid,
						settime,
						type,
						voiceurl
					} = params.item;
					// 如果设置了重复提醒，转为十进制数据
					let Ffrequency = 0;
					if (frequencyValue) {
						let arr = [0, 0, 0, 0, 0, 0, 0, 0];
						for (let i = 0; i < arr.length; i++) {
							for (var j = 0; j < setDays.length; j++) {
								arr[setDays[j] - 1] = 1;
							}
						}
						arr[0] = 1;
						arr = arr.reverse();
						Ffrequency = parseInt(arr.join(''), 2);
					}
					this.loading = this.$loading({
						target: document.querySelector('.settings-dialog'),
						background: 'rgba(225, 225, 225, 0)'
					});
					subDevicesReminder({
						content,
						did: this.form.did,
						frequency: Ffrequency ? Ffrequency : 0,
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
.item_list {
	.active-checked {
		.el-checkbox-button__inner {
			background: #5f9de9 !important;
			color: #fff !important;
			border-color: #5f9de9 !important;
		}
	}
}

.label-block-form-item .el-form-item__content {
	margin-left: 20px !important;
	.label-block {
		font-size: 16px;
		color: #000000;
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
