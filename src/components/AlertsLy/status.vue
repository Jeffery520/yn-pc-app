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
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="dialogFormVisible = false"
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
			fStatus: 0
		};
	},
	created() {},
	mounted() {},
	methods: {}
};
</script>

<style lang="scss" scoped></style>
