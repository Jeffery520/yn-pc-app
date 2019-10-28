<template>
	<el-dialog
		top="7vh"
		custom-class="add-message-dialog"
		width="1380px"
		:title="$t('others.servicesHistory')"
		:visible.sync="serviceHistoryVisible"
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
		<his-table></his-table>
		<!--    表格内容-->
	</el-dialog>
</template>

<script>
import HisTable from '@/components/Service/hisTable';
export default {
	name: 'ServiceHistory',
	components: { HisTable },
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
	@include flex-c-c;
	.el-input {
		width: 200px !important;
	}
	.el-form-item__label {
		color: #000000;
		font-size: 18px;
	}
}
</style>
