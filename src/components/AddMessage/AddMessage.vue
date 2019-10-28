<template>
	<el-dialog
		top="7vh"
		custom-class="add-message-dialog"
		width="1380px"
		:title="$t('others.addMessage')"
		:visible.sync="addMessageVisible"
	>
		<el-form class="add-message-header" ref="form" :model="form" :inline="true">
			<el-form-item label-width="70px">
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
				style="line-height: 36px;margin:0 10px 22px 120px;font-size: 18px;color: #000;"
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
		<footer>
			<el-form ref="form" :model="form" :inline="true">
				<el-form-item>
					<el-select v-model="form.type">
						<el-option
							v-for="item in addMessageType"
							:key="item.value"
							:label="item.label"
							:value="item.value"
						></el-option>
					</el-select>
				</el-form-item>

				<el-form-item v-if="form.type == 'Reminder'">
					<el-radio-group
						class="message-type-radio"
						v-model="form.repeatType"
						size="mini"
					>
						<el-radio label="Once" border style="margin-bottom: 5px;"
							>Once</el-radio
						>
						<el-radio
							label="Repeat"
							border
							@click.native="showRepeatCheckbox = true"
							@mouseleave.native="showRepeatCheckbox = false"
						>
							<div class="repeat-checkbox-bg">
								<span>Repeat</span>
								<div v-if="showRepeatCheckbox" class="repeat-checkbox">
									<el-checkbox-group v-model="form.repeat">
										<el-checkbox
											v-for="item in repeatChildren"
											:key="item.value"
											:label="item.value"
											>{{ item.value }}</el-checkbox
										>
									</el-checkbox-group>
								</div>
							</div>
						</el-radio>
					</el-radio-group>
				</el-form-item>

				<el-form-item :label="$t('tableTitle.date')">
					<el-date-picker v-model="form.date" type="date"></el-date-picker>
				</el-form-item>
				<el-form-item :label="$t('tableTitle.time')">
					<el-time-picker
						v-model="form.time"
						value-format="HH:mm:ss"
						format="HH:mm A"
						:picker-options="{
							selectableRange: '00:00:00 - 23:59:59'
						}"
					></el-time-picker>
				</el-form-item>
				<el-form-item :label="$t('tableTitle.content')">
					<el-input
						type="textarea"
						v-model="form.content"
						style="width: 238px"
						:autosize="{ minRows: 2, maxRows: 2 }"
						resize="none"
					></el-input>
				</el-form-item>
				<el-form-item style="margin-left:20px;margin-right: 0;">
					<el-button @click="addMessageVisible = false">
						{{ $t('action.cancel') }}
					</el-button>
					<el-button type="primary" style="margin-right: 0">
						{{ $t('action.submit') }}
					</el-button>
				</el-form-item>
			</el-form>
		</footer>
	</el-dialog>
</template>

<script>
import AddMessageTable from '@/components/AddMessage/AddMessageTable';
export default {
	name: 'AddMessage',
	components: { AddMessageTable },
	data() {
		return {
			addMessageVisible: false,
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
	@include flex-c-c;
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
