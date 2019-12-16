<template>
	<div style="font-size: 24px;color: #999999">
		<svg-icon
			class-name="no-development-icon"
			icon-class="development"
		></svg-icon>
		<div>
			{{
				language == 'zh'
					? '暂不支持该功能暂 ！'
					: 'This function is not supported yet ！'
			}}
		</div>
	</div>
</template>

<script>
export default {
	name: 'index',
	data() {
		return { language: this.$store.getters.language };
	}
};
</script>

<style scoped></style>
