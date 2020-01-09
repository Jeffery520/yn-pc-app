<template>
	<div class="reminder-bg setting-optings-bg" style="position: relative;">
		<el-form
			ref="Reminder"
			:model="form"
			label-suffix=":"
			label-width="auto"
			:rules="rules"
		>
			<div style="display:flex;align-items: flex-start;flex-wrap: wrap;">
				<el-form-item
					:label="$t('others.frequency')"
					class="form-inline"
					prop="frequency"
				>
					<el-select v-model="form.frequency">
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
					class="form-inline"
					:label="$t('others.date') + $t('others.time')"
					prop="settime"
				>
					<el-date-picker
						v-model="form.settime"
						:editable="false"
						type="datetime"
						:format="
							$store.getters.language == 'zh'
								? 'yyyy年MM月dd日 HH:mm'
								: 'MMM d,yyyy h:mm A'
						"
						value-format="yyyyMMddHHmm"
						style="width: 224px !important;"
					>
					</el-date-picker>
				</el-form-item>

				<el-form-item v-if="form.frequency">
					<el-checkbox-group
						v-model="setDays"
						@change="sttimesChange"
						size="mini"
					>
						<el-checkbox-button
							v-for="it in sttimesOptionsIndex"
							:label="it"
							:key="it"
							:class="setDays.indexOf(it) >= 0 ? 'active-checked' : ''"
							>{{ sttimesOptions[it - 1] }}</el-checkbox-button
						>
					</el-checkbox-group>
				</el-form-item>

				<el-form-item
					class="form-inline"
					:label="$t('others.content')"
					prop="content"
				>
					<el-input
						type="textarea"
						v-model="form.content"
						style="width: 224px"
					></el-input>
				</el-form-item>
			</div>
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
	name: 'Reminder',
	data() {
		return {
			language: this.$store.getters.language,
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
			form: {
				content: '',
				did: 0,
				frequency: 0,
				remindid: 0,
				settime: '',
				type: 1,
				voiceurl: ''
			},
			setDays: [1],
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
	mounted() {},
	methods: {
		sttimesChange(value) {
			if (value.length == 0) {
				this.setDays = [1];
				return;
			}
			// 去掉空项
			if (value[value.length - 1] == 1) {
				this.setDays = [1];
			} else {
				if (value.indexOf(1) >= 0) {
					value.splice(value.indexOf(1), 1);
				} else {
					if (value.length >= 7) {
						this.setDays = [1];
						return;
					}
				}
				this.setDays = value;
			}
		},
		submit() {
			this.$refs['Reminder'].validate((valid) => {
				if (valid) {
					let data = {
						didList: [],
						reqRemind: this.form
					};

					// 如果设置了重复提醒，转为十进制数据
					if (this.form.frequency) {
						let arr = [0, 0, 0, 0, 0, 0, 0, 0];
						for (let i = 0; i < arr.length; i++) {
							for (var j = 0; j < this.setDays.length; j++) {
								arr[this.setDays[j] - 1] = 1;
							}
						}
						arr[0] = 1;
						arr = arr.reverse();
						data.reqRemind.frequency = parseInt(arr.join(''), 2);
					}
					this.$emit('submit', data);
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		}
	}
};
</script>

<style lang="scss">
@import '@/components/AddMessage/settings/settings.scss';

.reminder-bg {
	.no-label-form-item .el-form-item__content {
		margin-left: 0px !important;
	}
	.ml20 {
		margin-left: 20px;
		.el-input {
			width: 230px !important;
		}
	}
	.label-block-form-item .el-form-item__content {
		margin-left: 20px !important;
		.label-block {
			color: #000000;
		}
		.el-textarea__inner {
			width: 542px;
		}
	}
	.active-checked {
		.el-checkbox-button__inner {
			background: #5f9de9 !important;
			color: #fff !important;
			border-color: #5f9de9 !important;
		}
	}
}
</style>
