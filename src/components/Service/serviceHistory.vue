<template>
	<el-dialog
		top="7vh"
		custom-class="add-message-dialog"
		width="1380px"
		:title="$t('others.addMessage')"
		:visible.sync="serviceHistoryVisible"
	>
		<el-form class="add-message-header" ref="form" :model="form" :inline="true">
			<el-form-item :label="$t('others.to')" label-width="70px">
				<el-select v-model="form.type">
					<el-option
						v-for="item in typeOptions"
						:key="item.label"
						:label="item.label"
						:value="item.value"
					></el-option>
				</el-select>
			</el-form-item>
			<el-form-item :label="$t('others.filtBy')">
				<el-select v-model="form.filtBy">
					<el-option
						v-for="item in filtOptions[form.type]"
						:key="item"
						:label="item"
						:value="item"
					></el-option>
				</el-select>
			</el-form-item>
			<span
				style="line-height: 36px;margin-left: 20px;font-size: 18px;color: #000;"
				>{{ $t('others.arange') }}:</span
			>
			<el-form-item :label="$t('others.from')">
				<el-input v-model="form.name"></el-input>
			</el-form-item>
			<el-form-item :label="$t('others.to')">
				<el-input v-model="form.name"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary">{{ $t('action.search') }}</el-button>
			</el-form-item>
		</el-form>
		<!--    表格内容-->
		<AddMessageTable></AddMessageTable>
		<!--    表格内容-->
	</el-dialog>
</template>

<script>
import AddMessageTable from '@/components/AddMessage/AddMessageTable';
export default {
	name: 'ServiceHistory',
	components: { AddMessageTable },
	data() {
		return {
			serviceHistoryVisible: false,
			showRepeatCheckbox: false,
			form: {
				type: 'App',
				filtBy: '',
				name: '',
				phone: '',
				date: '',
				time: '',
				content: '',
				repeatType: '',
				repeat: []
			},
			typeOptions: [
				{
					label: 'App',
					value: 'App'
				},
				{
					label: 'Device',
					value: 'Device'
				}
			],
			filtOptions: {
				App: ['Phone Number', 'User ID', 'User Name'],
				Device: [
					'User ID',
					'User Name',
					"Device's IMSI",
					"Device's IMEI",
					'Organization',
					'Area',
					'Age'
				]
			},
			addMessageType: [
				{
					label: 'Reminder',
					value: 'Reminder'
				},
				{
					label: 'Settings',
					value: 'Settings'
				}
			],
			repeatChildren: [
				{
					label: 'Monday',
					value: 'Monday'
				},
				{
					label: 'Tuesday',
					value: 'Tuesday'
				},
				{
					label: 'Wednesday',
					value: 'Wednesday'
				},
				{
					label: 'Thursday',
					value: 'Thursday'
				},
				{
					label: 'Friday',
					value: 'Friday'
				},
				{
					label: 'Saturday',
					value: 'Saturday'
				},
				{
					label: 'Sunday',
					value: 'Sunday'
				}
			]
		};
	},
	methods: {
		_closeRepeatCheckbox() {
			this.showRepeatCheckbox = false;
		}
	},
	watch: {
		showRepeatCheckbox() {
			console.log(this.showRepeatCheckbox);
			console.log(this.form.repeatType);
			if (!this.showRepeatCheckbox && this.form.repeat.length == 0) {
				this.form.repeatType = 'Once';
			}
		}
	}
};
</script>

<style lang="scss">
@import '@/style/mixin.scss';
.add-message-header {
	.el-input {
		width: 200px !important;
	}
	.el-form-item__label {
		color: #000000;
		font-size: 18px;
	}
}
.add-message-dialog {
	footer {
		@include flex-e-c;
		background-color: #e5e5e5;
		margin-top: 20px;
		padding: 5px 30px;
		.el-form--inline {
			@include flex-s-c;
		}
		.el-form-item__label {
			color: #000000;
			font-size: 14px;
		}
		.el-form-item {
			margin-bottom: 0;
			margin-right: 20px;
		}
		.el-input {
			width: 160px !important;
		}
		.message-type-radio {
			@include flex-c-c-c;
			.el-radio {
				width: 100px;
				margin-left: 0 !important;
				margin-right: 0 !important;
				background-color: #fff;
			}
		}
	}
}
.repeat-checkbox-bg {
	position: relative;
	display: inline-block;
	.repeat-checkbox {
		width: 150px;
		background-color: #fff;
		position: absolute;
		right: -176px;
		bottom: -6px;
		z-index: 1000;
		padding: 20px;
		box-shadow: 0 0 8px rgba(0, 0, 0, 0.5);
		border-radius: 4px;
	}
	.el-checkbox-group {
		height: 260px;
		@include flex-c-c-c;
		align-items: flex-start;
		justify-content: space-between;
		.el-checkbox__label {
			font-size: 16px;
			color: #000;
		}
	}
}
</style>
