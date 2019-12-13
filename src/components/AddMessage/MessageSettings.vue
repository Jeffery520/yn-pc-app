<template>
	<div class="message-setting-bg">
		<el-select v-model="messageType" @change="typeChange">
			<el-option
				v-for="item in settings"
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
				<Steps ref="Steps" @submit="submit"></Steps>
			</template>
			<template v-if="messageType == 2">
				<Location ref="Location" @submit="submit"></Location>
			</template>
			<template v-if="messageType == 4">
				<SleepTime ref="SleepTime" @submit="submit"></SleepTime>
			</template>
			<template v-if="messageType == 5">
				<BloodPressure ref="BloodPressure" @submit="submit"></BloodPressure>
			</template>
			<template v-if="messageType == 6">
				<BloodGlucose ref="BloodGlucose" @submit="submit"></BloodGlucose>
			</template>
			<template v-if="messageType == 7">
				<SedentaryReminder
					ref="SedentaryReminder"
					@submit="submit"
				></SedentaryReminder>
			</template>
			<template v-if="messageType == 8">
				<FallDetection ref="FallDetection" @submit="submit"></FallDetection>
			</template>
			<template v-if="messageType == 9">
				<ReportFrequency
					ref="ReportFrequency"
					@submit="submit"
				></ReportFrequency>
			</template>
			<template v-if="messageType == 10">
				<WiFiConnection ref="WiFiConnection" @submit="submit"></WiFiConnection>
			</template>
			<template v-if="messageType == 11">
				<Reminder ref="Reminder" @submit="submit"></Reminder>
			</template>
			<template v-if="messageType == 12">
				<SOSsettings ref="SOSsettings" @submit="submit"></SOSsettings>
			</template>
		</div>
	</div>
</template>

<script>
const HeartRate = () => import('@/components/AddMessage/settings/HeartRate');
const Steps = () => import('@/components/AddMessage/settings/Steps');
const Location = () => import('@/components/AddMessage/settings/Location');
const SleepTime = () => import('@/components/AddMessage/settings/SleepTime');
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

import { submitSetMsg } from '@/api/devices';
import eventBus from '@/utils/eventBus.js';

export default {
	name: 'MessageSettings',
	components: {
		HeartRate,
		Steps,
		Location,
		SleepTime,
		BloodPressure,
		BloodGlucose,
		SedentaryReminder,
		FallDetection,
		ReportFrequency,
		WiFiConnection,
		Reminder,
		SOSsettings
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
				}
			]
		};
	},
	created() {},
	mounted() {},
	methods: {
		typeChange() {
			setTimeout(() => {
				document.querySelector('.add-message-scroll').scrollTop = 2000;
			}, 500);
		},
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
					this.$refs.Steps.form = {};
					this.$refs.Location.form = {};
					this.$refs.SleepTime.form = {};
					this.$refs.BloodPressure.form = {};
					this.$refs.BloodGlucose.form = {};
					this.$refs.SedentaryReminder.form = {};
					this.$refs.FallDetection.form = {};
					this.$refs.ReportFrequency.form = {};
					this.$refs.WiFiConnection.form = {};
					this.$refs.SOSsettings.form = {};

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
