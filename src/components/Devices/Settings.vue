<template>
	<el-dialog
		top="14vh"
		custom-class="settings-dialog"
		width="1040px"
		height="600px"
		:title="$t('action.settings')"
		:visible.sync="settingsVisible"
		append-to-body
		destroy-on-close
	>
		<div class="yn-set-contain">
			<div class="yn-set-left">
				<el-scrollbar
					class="page-scrollbar"
					:native="false"
					:noresize="true"
					tag="div"
				>
					<ul>
						<li
							v-for="(item, index) in settings"
							@click="selectCurrent(index)"
							:key="item.title"
						>
							<span
								:class="[
									currentIndex == index ? 'actived' : '',
									'set-checkbox-label'
								]"
								>{{ item.title }}</span
							>
						</li>
					</ul>
				</el-scrollbar>
			</div>
			<div class="yn-set-right">
				<el-scrollbar
					class="page-scrollbar"
					:native="false"
					:noresize="true"
					tag="div"
				>
					<template v-if="currentIndex == 0">
						<HeartRate :form.sync="settingsForm"></HeartRate>
					</template>
					<template v-if="currentIndex == 1">
						<Steps :form.sync="settingsForm"></Steps>
					</template>
					<template v-if="currentIndex == 2">
						<Location :form.sync="settingsForm"></Location>
					</template>
					<template v-if="currentIndex == 3">
						<track-mode :form.sync="settingsForm"></track-mode>
					</template>
					<template v-if="currentIndex == 4">
						<SleepTime :form.sync="settingsForm"></SleepTime>
					</template>
					<template v-if="currentIndex == 5">
						<BloodPressure :form.sync="settingsForm"></BloodPressure>
					</template>
					<template v-if="currentIndex == 6">
						<BloodGlucose :form.sync="settingsForm"></BloodGlucose>
					</template>
					<template v-if="currentIndex == 7">
						<SedentaryReminder :form.sync="settingsForm"></SedentaryReminder>
					</template>
					<template v-if="currentIndex == 8">
						<FallDetection :form.sync="settingsForm"></FallDetection>
					</template>
					<template v-if="currentIndex == 9">
						<ReportFrequency :form.sync="settingsForm"></ReportFrequency>
					</template>
					<template v-if="currentIndex == 10">
						<WiFiConnection :form.sync="settingsForm"></WiFiConnection>
					</template>
					<template v-if="currentIndex == 11">
						<Reminder :form="settingsForm"></Reminder>
					</template>
					<template v-if="currentIndex == 12">
						<SOSsettings :form.sync="settingsForm"></SOSsettings>
					</template>
					<template v-if="currentIndex == 13">
						<PersonalInformations
							:form.sync="settingsForm"
						></PersonalInformations>
					</template>
				</el-scrollbar>
			</div>
		</div>
	</el-dialog>
</template>

<script>
import { getDevicesSettings } from '@/api/devices';
const HeartRate = () => import('@/components/Devices/SettingOptions/HeartRate');
const Steps = () => import('@/components/Devices/SettingOptions/Steps');
const Location = () => import('@/components/Devices/SettingOptions/Location');
const SleepTime = () => import('@/components/Devices/SettingOptions/SleepTime');
const TrackMode = () => import('@/components/Devices/SettingOptions/TrackMode');
const BloodPressure = () =>
	import('@/components/Devices/SettingOptions/BloodPressure');
const BloodGlucose = () =>
	import('@/components/Devices/SettingOptions/BloodGlucose');
const SedentaryReminder = () =>
	import('@/components/Devices/SettingOptions/SedentaryReminder');
const FallDetection = () =>
	import('@/components/Devices/SettingOptions/FallDetection');
const ReportFrequency = () =>
	import('@/components/Devices/SettingOptions/ReportFrequency');
const WiFiConnection = () =>
	import('@/components/Devices/SettingOptions/WiFiConnection');
const Reminder = () => import('@/components/Devices/SettingOptions/Reminder');
const SOSsettings = () =>
	import('@/components/Devices/SettingOptions/SOSsettings');
const PersonalInformations = () =>
	import('@/components/Devices/SettingOptions/PersonalInformations');

export default {
	name: 'Settings',
	components: {
		HeartRate,
		Steps,
		Location,
		SleepTime,
		TrackMode,
		BloodPressure,
		BloodGlucose,
		SedentaryReminder,
		FallDetection,
		ReportFrequency,
		WiFiConnection,
		Reminder,
		SOSsettings,
		PersonalInformations
	},
	data() {
		return {
			settingsVisible: false,
			currentIndex: 0, // 当前现实的设置项
			settingsInfo: Object, // 设备信息
			settingsForm: {},
			settings: [
				{
					title: this.$t('others.heartRate')
				},
				{
					title: this.$t('others.steps')
				},
				{
					title: this.$t('others.location')
				},
				{
					title: this.$t('others.trackingMode')
				},
				{
					title: this.$t('others.sleepTime')
				},
				{
					title: this.$t('others.bloodPressure'),
					type: 5,
					checked: false,
					form: {
						SYS_low_limit: { name: 'SYS low limit', value: '' },
						SYS_high_limit: { name: 'SYS high limit', value: '' },
						DIA_low_limit: { name: 'DIA low limit', value: '' },
						DIA_high_limit: { name: 'DIA high limit', value: '' }
					}
				},
				{
					title: this.$t('others.bloodGlucose'),
					type: 6,
					checked: false,
					form: {
						low_limit: { name: 'Low limit', value: '' },
						High_limit: { name: 'High limit', value: '' }
					}
				},
				{
					title: this.$t('others.sedentaryReminder'),
					type: 7,
					checked: false,
					form: {
						startTime: { name: 'Start Time', value: '00:20' },
						endTime: { name: 'End Time', value: '15:00' }
					}
				},
				{
					title: this.$t('others.fallDetection'),
					type: 8,
					checked: false,
					form: {
						startTime: { name: 'Start Time', value: '00:20' },
						endTime: { name: 'End Time', value: '15:00' }
					}
				},
				{
					title: this.$t('others.reportFrequency'),
					type: 9,
					checked: false,
					form: {
						interval: { name: 'Interval', value: 30 }
					}
				},
				{
					title: this.$t('others.wifiConnection'),
					type: 10,
					checked: false,
					form: {
						name1: { name: 'Name1', value: '00:20' },
						password: { name: 'Password', value: '15:00' }
					}
				},
				{
					title: this.$t('others.reminders'),
					type: 11,
					checked: false,
					form: {
						timeCount: { name: 'Time Count', value: 'once' },
						date: { name: 'Date', value: '' },
						time: { name: 'Time', value: '' },
						content: { name: 'Content', value: '该起床啦！' }
					}
				},
				{
					title: this.$t('others.SOSSettings'),
					type: 12,
					checked: false,
					form: {
						phoneList: [{ name: 'Phone1', value: '13163735200' }]
					}
				},
				{
					title: this.$t('others.personalInformations'),
					type: 13,
					checked: false,
					form: {
						user_name: { name: 'User Name', value: 'once' },
						age: { name: 'Age', value: '' },
						gender: { name: 'Gender', value: '' },
						phone_number: { name: 'Phone Number', value: '' },
						adress: { name: 'Adress', value: '' },
						organization: { name: 'Organization', value: '' }
					}
				}
			]
		};
	},
	watch: {
		settingsVisible() {
			if (this.settingsVisible) {
				this.loading = this.$loading({
					target: document.querySelector('.app-main'),
					background: 'rgba(225, 225, 225, .6)'
				});
				getDevicesSettings({ did: this.settingsInfo.fDid })
					.then((data) => {
						this.settingsForm = data;
						this.loading.close();
					})
					.catch((error) => {
						this.loading.close();
						this.$message({
							showClose: true,
							message:
								error.message ||
								`Request failed with status code${error.status}`,
							type: 'error'
						});
					});
			}
		}
	},
	methods: {
		onSubmit() {
			console.log(this.$refs.form);
		},
		selectCurrent(index) {
			this.currentIndex = index;
		}
	}
};
</script>

<style lang="scss" scoped>
@import '@/style/mixin.scss';
.yn-set-contain {
	@include flex-b-c;
	align-items: flex-start;
	.yn-set-left {
		width: 245px;
		height: 600px;
		border-right: 1px solid #b5b5b5;
		padding: 20px 0;
		flex-shrink: 0;
		.set-checkbox-label {
			font-size: 18px;
			color: #333;
			padding-left: 10px;
			cursor: pointer;
			&:hover {
				color: $normalColor;
			}
			&.actived {
				color: $normalColor;
			}
		}

		li {
			line-height: 36px;
		}
	}
	.yn-set-right {
		flex-grow: 1;
		height: 600px;
		padding: 30px 10px 30px 30px;
		.form-button {
			margin-top: 40px;
			padding-left: 120px;
		}
	}
}
</style>

<style lang="scss">
.settings-dialog {
	.el-dialog__body {
		padding: 0 20px !important;
	}
	.el-checkbox__label {
		display: none;
	}
	.el-checkbox__inner,
	.el-checkbox__input {
		transform: scale(1.1);
		line-height: 18px;
	}
}
.yn-set-right {
	color: #000000;
	font-size: 18px;
	.line-to,
	.form-unit {
		padding: 0 10px;
		color: #666;
		font-size: 18px;
	}
	.el-button {
		width: 140px;
	}

	.el-input {
		width: 140px;
		font-size: 18px;
	}
	.el-form-item__label {
		color: #000000;
		font-size: 18px;
	}
}
</style>
