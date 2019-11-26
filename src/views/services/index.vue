<template>
	<div id="services-bg">
		<div class="services-item-bg">
			<div
				@click="$refs.ServiceHistory.serviceHistoryVisible = true"
				class="services-item"
				style="margin-bottom: 1px;margin-right: 1px;"
			>
				<img src="@/assets/images/services_r1_c1.png" alt="Service History" />
				<span>{{ $t('others.servicesHistory') }}</span>
			</div>

			<div
				@click="$refs.ChatHistory.chatHistoryVisible = true"
				class="services-item"
				style="margin-bottom: 1px;margin-right: 1px;"
			>
				<img src="@/assets/images/services_r2_c4.png" alt="Chat History" />
				<span>{{ $t('others.chatHistory') }}</span>
			</div>
			<div
				@click="$refs.CallHistory.callHistoryVisible = true"
				class="services-item"
				style="margin-bottom: 1px;"
			>
				<img src="@/assets/images/services_r2_c8.png" alt="Call History" />
				<span>{{ $t('others.callHistory') }}</span>
			</div>
			<div class="services-item" style="margin-bottom: 1px;margin-right: 1px;">
				<img src="@/assets/images/services_r5_c1.png" alt="Remote Monitoring" />
				<span>{{ $t('others.RemoteMonitoring') }}</span>
			</div>
			<div class="services-item" style="margin-bottom: 1px;margin-right: 1px;">
				<img src="@/assets/images/services_r6_c5.png" alt="Online Consulting" />
				<span>{{ $t('others.OnlineConsulting') }}</span>
			</div>
			<div class="services-item" style="margin-bottom: 1px;">
				<img
					src="@/assets/images/services_r6_c8.png"
					alt="Telephone Consulting"
				/>
				<span>{{ $t('others.TelephoneConsulting') }}</span>
			</div>
			<div class="services-item" style="margin-right: 1px;">
				<img
					src="@/assets/images/services_r9_c1.png"
					alt="Health Evaluating Reports"
				/>
				<span> {{ $t('others.HealthEvaluatingReports') }}</span>
			</div>
			<div class="services-item" style="margin-right: 1px;">
				<img
					src="@/assets/images/services_r9_c4.png"
					alt="Nutrition and Workouts"
				/>
				<span>{{ $t('others.NutritionandWorkouts') }}</span>
			</div>
			<div class="services-item">
				<img
					src="@/assets/images/services_r9_c9.png"
					alt="Medication Instructions"
				/>
				<span>{{ $t('others.MedicationInstructions') }}</span>
			</div>
		</div>
		<service-history ref="ServiceHistory"></service-history>
		<chat-history ref="ChatHistory"></chat-history>
		<call-history ref="CallHistory"></call-history>
	</div>
</template>

<script>
const ServiceHistory = () => import('@/components/Service/serviceHistory');
const ChatHistory = () => import('@/components/Service/chatHistory');
const CallHistory = () => import('@/components/Service/callHistory');

export default {
	name: 'Services',
	components: { ServiceHistory, ChatHistory, CallHistory }
};
</script>

<style lang="scss" scoped>
@import '~@/style/mixin.scss';
#services-bg {
	@include table-bg;
	width: 100%;
	.services-item-bg {
		@include flex-s-c;
		flex-wrap: wrap;
		background-color: $baseBorderColor;
		.services-item {
			@include flex-c-c-c;
			width: 32.33%;
			min-width: 200px;
			height: 265px;
			background-color: #fff;
			font-size: 20px;
			color: $normal-fontColor;
			cursor: pointer;
			flex-grow: 1;
			flex-shrink: 0;
			img {
				width: 118px;
				height: 118px;
				&:active {
					opacity: 0.6;
				}
			}
			span {
				margin-top: 30px;
				line-height: 28px;
			}
		}
	}
}
</style>
