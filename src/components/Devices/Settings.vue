<template>
	<el-dialog
		top="8vh"
		custom-class="settings-dialog"
		width="1100px"
		height="800px"
		:title="$t('action.settings')"
		:visible.sync="settingsVisible"
		@close="settingsClose"
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
					<template v-if="currentIndex == 0 && settingsForm.did">
						<PersonalInformations
							:form.sync="settingsForm"
						></PersonalInformations>
					</template>
					<template v-if="currentIndex == 1 && settingsForm.did">
						<HeartRate :form.sync="settingsForm"></HeartRate>
					</template>
					<template v-if="currentIndex == 2 && settingsForm.did">
						<Steps :form.sync="settingsForm"></Steps>
					</template>
					<template v-if="currentIndex == 3 && settingsForm.did">
						<Location :form.sync="settingsForm"></Location>
					</template>
					<template v-if="currentIndex == 4 && settingsForm.did">
						<track-mode :form.sync="settingsForm"></track-mode>
					</template>
					<template v-if="currentIndex == 5 && settingsForm.did">
						<SleepTime :form.sync="settingsForm"></SleepTime>
					</template>
					<template v-if="currentIndex == 6 && settingsForm.did">
						<BloodPressure :form.sync="settingsForm"></BloodPressure>
					</template>
					<template v-if="currentIndex == 7 && settingsForm.did">
						<BloodGlucose :form.sync="settingsForm"></BloodGlucose>
					</template>
					<template v-if="currentIndex == 8 && settingsForm.did">
						<SedentaryReminder :form.sync="settingsForm"></SedentaryReminder>
					</template>
					<template v-if="currentIndex == 9 && settingsForm.did">
						<FallDetection :form.sync="settingsForm"></FallDetection>
					</template>
					<template v-if="currentIndex == 10 && settingsForm.did">
						<ReportFrequency :form.sync="settingsForm"></ReportFrequency>
					</template>
					<template v-if="currentIndex == 11 && settingsForm.did">
						<WiFiConnection :form.sync="settingsForm"></WiFiConnection>
					</template>
					<template v-if="currentIndex == 12 && settingsForm.did">
						<Reminder :form="settingsForm"></Reminder>
					</template>
					<template v-if="currentIndex == 13 && settingsForm.did">
						<SOSsettings :form.sync="settingsForm"></SOSsettings>
					</template>
					<template v-if="currentIndex == 14 && settingsForm.did">
						<ReplaceDevice :form.sync="settingsForm"></ReplaceDevice>
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
const ReplaceDevice = () =>
	import('@/components/Devices/SettingOptions/ReplaceDevice');

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
		PersonalInformations,
		ReplaceDevice
	},
	data() {
		return {
			settingsVisible: false,
			currentIndex: 0, // 当前现实的设置项
			settingsInfo: Object, // 设备信息
			settingsForm: {},
			settings: [
				{
					title: this.$t('others.personalInformations'),
					type: 0
				},
				{
					title: this.$t('others.heartRate'),
					type: 1
				},
				{
					title: this.$t('others.steps'),
					type: 2
				},
				{
					title: this.$t('others.location'),
					type: 3
				},
				{
					title: this.$t('others.trackingMode'),
					type: 4
				},
				{
					title: this.$t('others.sleepTime'),
					type: 5
				},
				{
					title: this.$t('others.bloodPressure'),
					type: 6
				},
				{
					title: this.$t('others.bloodGlucose'),
					type: 7
				},
				{
					title: this.$t('others.sedentaryReminder'),
					type: 8
				},
				{
					title: this.$t('others.fallDetection'),
					type: 9
				},
				{
					title: this.$t('others.reportFrequency'),
					type: 10
				},
				{
					title: this.$t('others.wifiConnection'),
					type: 11
				},
				{
					title: this.$t('others.reminders'),
					type: 12
				},
				{
					title: this.$t('others.SOSSettings'),
					type: 13
				},
				{
					title: this.$t('others.ReplaceDevice'),
					type: 14
				}
			]
		};
	},
	watch: {
		settingsVisible() {
			if (this.settingsVisible) {
				setTimeout(() => {
					this.loading = this.$loading({
						target: document.querySelector('.settings-dialog'),
						background: 'rgba(225, 225, 225, 0)'
					});
					getDevicesSettings({ did: this.settingsInfo.fDid })
						.then((data) => {
							this.settingsForm = data;
							this.loading.close();
						})
						.catch((error) => {
							this.loading.close();
							this.settingsForm.did = this.settingsInfo.fDid;
							this.$message({
								showClose: true,
								message:
									error.message ||
									`Request failed with status code${error.status}`,
								type: 'error'
							});
						});
				}, 100);
			}
		}
	},
	methods: {
		settingsClose() {
			this.settingsInfo = {};
			this.settingsForm = {};
			this.$emit('change');
		},
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
		width: 300px;
		height: 760px;
		border-right: 1px solid #b5b5b5;
		padding: 20px 0;
		flex-shrink: 0;
		.set-checkbox-label {
			font-size: 16px;
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
		height: 760px;
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
	font-size: 16px;
	.line-to,
	.form-unit {
		display: inline-block;
		padding: 0 10px;
		line-height: 36px;
		color: #666;
		font-size: 16px;
	}
	.el-button {
		width: 140px;
	}

	.el-input {
		width: 140px;
	}
	.el-form-item__label {
		color: #000000;
	}
	.button-el-form-item__label {
		.el-form-item__label {
			visibility: hidden;
		}
	}
}
</style>
