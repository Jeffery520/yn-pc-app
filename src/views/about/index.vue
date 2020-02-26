<template>
	<div
		style="width: 1000px;margin:40px auto; text-align: left;line-height: 30px; font-size: 20px;color: #000"
	>
    OneCare is all about Mobile Connected Care Simplified <br>
    Simply the Best in Design, Features and Functions<br>
    OneCare and Yinuo Technologies have been together since 2012 building upon their Innovative Cultures<br>
    The OneCare Team is dedicated to helping you provided for your loved ones.
		<br />
    <a class="onecare_saves" href="https://onecaresaves.com/" target="_blank"
    >https://onecaresaves.com/</a
    >
    <a class="onecare_saves" @click="$router.push({name:'TermsService'})"
    >Terms and Service</a
    >
    <a class="onecare_saves" @click="$router.push({name:'TermsSale'})" target="_blank"
    >Terms of Sale</a
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
