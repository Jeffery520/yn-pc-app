<template>
	<div id="admin_system">
		<p
			style="color:#ff0101;text-align: left;font-size: 16px;margin-bottom: 10px;"
		>
			{{
				language == 'zh'
					? '当前为正式环境，请不要随意操作，以免影响用户 ！'
					: 'The current environment is production, please do not operate at will, so as not to affect users ！'
			}}
		</p>
		<iframe
			id="commandIframe"
			class="admin_system_iframe"
			src="http://47.88.57.208:10369/ota/preReleaseList"
			frameborder="0"
			height="80vh"
		>
		</iframe>
	</div>
</template>

<script>
export default {
	name: 'PreReleaseList',
	props: {},
	data() {
		return {
			language: this.$store.getters.language
		};
	},
	mounted() {
		const that = this;
		that.loading = this.$loading({
			target: document.querySelector('.app-main'),
			background: 'rgba(225, 225, 225, 0.4)'
		});
		setTimeout(() => {
			that.loading.close();
		}, 2000);
	},
	methods: {}
};
</script>

<style lang="scss" scoped>
@import '@/style/mixin.scss';
#admin_system {
	@include table-bg;
	.admin_system_iframe {
		width: 100%;
		min-height: 76vh;
	}
}
</style>
