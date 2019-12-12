<template>
	<div class="message-setting-bg">
		<el-select v-model="messageType">
			<el-option
				v-for="(item, index) in settings"
				:key="item.type"
				:label="item.title"
				:value="item.type"
			></el-option>
		</el-select>
		<div class="yn-set-right">
			<template v-if="messageType == 0">
				<HeartRate ref="HeartRate" @submit="submit"></HeartRate>
			</template>
			<template v-if="messageType == 1">
				<Steps></Steps>
			</template>
			<template v-if="messageType == 2">
				<Location></Location>
			</template>
			<template v-if="messageType == 3">
				<track-mode></track-mode>
			</template>
			<template v-if="messageType == 4">
				<SleepTime></SleepTime>
			</template>
			<template v-if="messageType == 5">
				<BloodPressure></BloodPressure>
			</template>
			<template v-if="messageType == 6">
				<BloodGlucose></BloodGlucose>
			</template>
			<template v-if="messageType == 7">
				<SedentaryReminder></SedentaryReminder>
			</template>
			<template v-if="messageType == 8">
				<FallDetection></FallDetection>
			</template>
			<template v-if="messageType == 9">
				<ReportFrequency></ReportFrequency>
			</template>
			<template v-if="messageType == 10">
				<WiFiConnection></WiFiConnection>
			</template>
			<template v-if="messageType == 11">
				<Reminder ref="Reminder" @submit="submit"></Reminder>
			</template>
			<template v-if="messageType == 12">
				<SOSsettings></SOSsettings>
			</template>
			<template v-if="messageType == 13">
				<PersonalInformations></PersonalInformations>
			</template>
		</div>
	</div>
</template>

<script>
const HeartRate = () => import('@/components/AddMessage/settings/HeartRate');
const Steps = () => import('@/components/AddMessage/settings/Steps');
const Location = () => import('@/components/AddMessage/settings/Location');
const SleepTime = () => import('@/components/AddMessage/settings/SleepTime');
const TrackMode = () => import('@/components/AddMessage/settings/TrackMode');
const BloodPressure = () =>
	import('@/components/AddMessage/settings/BloodPressure');
const BloodGlucose = () =>
	import('@/components/AddMessage/settings/BloodGlucose');
const SedentaryReminder = () =>
	import('@/components/AddMessage/settings/SedentaryReminder');
const FallDetection = () =>
	import('@/components/AddMessage/settings/FallDetection');
const ReportFrequency = () =>
	import('@/components/AddMessage/settings/ReportFrequency');
const WiFiConnection = () =>
	import('@/components/AddMessage/settings/WiFiConnection');
const Reminder = () => import('@/components/AddMessage/settings/Reminder');
const SOSsettings = () =>
	import('@/components/AddMessage/settings/SOSsettings');
const PersonalInformations = () =>
	import('@/components/AddMessage/settings/PersonalInformations');

import { submitSetMsg } from '@/api/devices';
import eventBus from '@/utils/eventBus.js';

export default {
	name: 'MessageSettings',
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
	props: ['selectDidList'],
	data() {
		return {
			language: this.$store.getters.language,
			messageType: 11,
			settings: [
				{
					title: this.$t('others.reminders'),
					type: 11
				},
				{
					title: this.$t('others.heartRate'),
					type: 0
				},
				{
					title: this.$t('others.steps'),
					type: 1
				},
				{
					title: this.$t('others.location'),
					type: 2
				},
				{
					title: this.$t('others.trackingMode'),
					type: 3
				},
				{
					title: this.$t('others.sleepTime'),
					type: 4
				},
				{
					title: this.$t('others.bloodPressure'),
					type: 5
				},
				{
					title: this.$t('others.bloodGlucose'),
					type: 6
				},
				{
					title: this.$t('others.sedentaryReminder'),
					type: 7
				},
				{
					title: this.$t('others.fallDetection'),
					type: 8
				},
				{
					title: this.$t('others.reportFrequency'),
					type: 9
				},
				{
					title: this.$t('others.wifiConnection'),
					type: 10
				},

				{
					title: this.$t('others.SOSSettings'),
					type: 12
				},
				{
					title: this.$t('others.personalInformations'),
					type: 13
				}
			]
		};
	},
	created() {},
	mounted() {},
	methods: {
		submit(data) {
			if (this.selectDidList.length <= 0) {
				this.$alert(
					this.language == 'zh' ? '请选择设备' : 'Please select a device'
				);
				return;
			} else {
				data.didList = this.selectDidList;
				this._submitSetMsg(data);
			}
		},
		_submitSetMsg(params) {
			this.loading = this.$loading({
				target: document.querySelector('.add-message-dialog'),
				background: 'rgba(225, 225, 225, 0)'
			});
			submitSetMsg(params)
				.then(() => {
					// 更新父组件数据
					// this.$emit('update:form', this.formData);
					this.disabled = true;
					this.$message({
						message: 'Submit Success',
						type: 'success'
					});
					this.$refs.Reminder.form = {};
					this.$refs.HeartRate.form = {};

					this.loading.close();
					// 更新父组件数据
					eventBus.$emit('updateMessageList');
				})
				.catch(() => {
					this.loading.close();
				});
		}
	}
};
</script>

<style lang="scss" scoped>
@import '@/style/mixin.scss';
.message-setting-bg {
	width: 100%;
	@include flex-b-c;
	align-items: flex-start;

	.yn-set-right {
		flex-grow: 1;
		margin: 0 0 0 30px;
	}
}
</style>
