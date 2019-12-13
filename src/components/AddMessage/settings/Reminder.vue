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
				<el-form-item class="form-inline no-label-form-item" prop="frequency">
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
					class="form-inline ml20"
					:label="$t('others.date') + $t('others.time')"
					prop="settime"
				>
					<el-date-picker
						v-model="form.settime"
						:editable="false"
						type="datetime"
						format="MMM d,yyyy HH:mm A"
						value-format="yyyyMMddHHmm"
					>
					</el-date-picker>
				</el-form-item>
				<el-form-item
					class="form-inline"
					:label="$t('others.content')"
					prop="content"
				>
					<el-input type="textarea" v-model="form.content"></el-input>
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
			form: {
				content: '',
				did: 0,
				frequency: 0,
				remindid: 0,
				settime: '',
				type: 1,
				voiceurl: ''
			},
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
	mounted() {},
	methods: {
		submit() {
			this.$refs['Reminder'].validate((valid) => {
				if (valid) {
					let data = {
						didList: [],
						reqRemind: this.form
					};
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
			font-size: 18px;
		}
		.el-textarea__inner {
			width: 542px;
		}
	}
}
</style>
