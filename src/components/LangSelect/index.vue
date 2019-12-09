<template>
	<div class="lang-select">
		<el-dropdown placement="bottom" @command="handleSetLanguage">
			<el-row class="lang-select-box">
				<svg-icon
					class-name="lang-select-icon"
					icon-class="g-translate"
				></svg-icon>
			</el-row>
			<el-dropdown-menu slot="dropdown">
				<el-dropdown-item
					icon="el-icon-check"
					:disabled="language == 'zh'"
					command="zh"
					>中文</el-dropdown-item
				>
				<el-dropdown-item
					icon="el-icon-check"
					:divided="true"
					:disabled="language == 'en'"
					command="en"
					>English</el-dropdown-item
				>
			</el-dropdown-menu>
		</el-dropdown>
	</div>
</template>

<script>
export default {
	name: 'LanSelect',
	computed: {
		language() {
			return this.$store.getters.language;
		}
	},
	methods: {
		handleSetLanguage(lang) {
			if (this.language == lang) {
				return false;
			}
			this.$i18n.locale = lang;
			this.$store.dispatch('app/setLanguage', lang);
			window.location.reload();
			// this.$emit('change', lang);
			this.$message({
				message: this.$t('action.setLangOk'),
				type: 'success'
			});
		}
	}
};
</script>

<style scoped lang="scss">
.lang-select {
	cursor: pointer;
	height: 70px;
	display: flex;
	align-items: center;
	.lang-select-box {
		height: 70px;
		display: flex;
		align-items: center;
	}
	.lang-select-icon {
		font-size: 25px;
		color: #ffffff;
	}
}
</style>
