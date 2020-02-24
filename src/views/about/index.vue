<template>
	<div
		style="width: 600px;margin:40px auto; text-align: left;line-height: 30px; font-size: 20px;color: #000"
	>
		OneCare is all about Mobile Connected Care Simplified Simply the Best in
		Design, Features and Functions OneCare and Yinuo Technologies have been
		together since 2012 building upon their Innovative Cultures The OneCare Team
		is dedicated to helping you provided for your loved ones.
		<br />
		<a class="onecare_saves" href="https://onecaresaves.com/" target="_blank"
			>https://onecaresaves.com/</a
		>
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

<style lang="scss" scoped>
.onecare_saves {
	color: #5f9de9;
	font-size: 20px;
	padding: 10px 0;
	display: block;
	&:hover {
		text-decoration: underline;
	}
}
</style>
