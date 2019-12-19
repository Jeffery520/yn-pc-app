<template>
	<div id="admin_system">
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
		let iframe = document.getElementById('commandIframe');
		if (iframe.attachEvent) {
			// 兼容IE写法
			iframe.attachEvent('onload', function() {
				// iframe加载完成后要进行的操作
				that.loading.close();
			});
		} else {
			iframe.onload = function() {
				// iframe加载完成后要进行的操作
				that.loading.close();
			};
		}
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
