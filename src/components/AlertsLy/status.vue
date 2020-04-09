<template>
	<div>
		<el-dialog
			:title="$store.getters.language == 'en' ? 'Alert status' : '警报状态'"
			:visible.sync="AlertstatusFormVisible"
			width="400px"
			center
		>
			<div style="display: flex;justify-content: center;padding-top: 20px">
				<el-select
					v-model="fStatus"
					:placeholder="
						$store.getters.language == 'zh' ? '选择状态' : 'Select status'
					"
				>
					<el-option
						v-for="item in options"
						:key="item.value"
						:label="item.label"
						:value="item.value"
					></el-option>
				</el-select>
			</div>
			<div slot="footer" class="dialog-footer" style="margin-top: 20px">
				<el-button @click="AlertstatusFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="AlertstatusFormVisible = false"
					>确 定</el-button
				>
			</div>
		</el-dialog>
	</div>
</template>

<script>
export default {
	name: 'status',
	props: { detail: Object },
	data() {
		return {
			AlertstatusFormVisible: false,
			fStatus: 0,
			options: []
		};
	},
	created() {},
	mounted() {
		this.fStatus = this.detail.fStatus;
		this.options = [
			{
				label: this.$store.getters.language == 'zh' ? '开启' : 'open',
				value: 1
			},
			{
				label: this.$store.getters.language == 'zh' ? '跳过' : 'Skip',
				value: 2
			},
			{
				label: this.$store.getters.language == 'zh' ? '跟进' : 'Follow up',
				value: 3
			},
			{
				label: this.$store.getters.language == 'zh' ? '完成' : 'completed',
				value: 4
			}
		];
	},
	methods: {}
};
</script>

<style lang="scss" scoped></style>
