<template>
	<div class="input-phone">
		<div style="display: flex;justify-content: flex-start;align-items: center;">
			<div style="width: 50px;height: 40px;flex-shrink: 0">
				<intl-tel-input
					:countryCode="ipData[phoneIpt]"
					@excountry="change"
				></intl-tel-input>
			</div>
			<span style="margin-left:2px;flex-shrink: 0">+{{ phoneIpt }}</span>
			<el-input
				style="margin-left: 10px;flex-shrink: 1;flex-grow: 0;width: auto !important;min-width: 240px;"
				v-model="phoneNumber"
				@input="inputPhone"
				@change="inputPhone"
				type="number"
			></el-input>
		</div>
	</div>
</template>

<script>
import IntlTelInput from '@/components/IntlTelInput/index.vue';
export default {
	name: 'Reg',
	components: {
		IntlTelInput
	},
	props: { phone: String },
	data() {
		return {
			phoneIpt: this.$store.getters.language == 'en' ? '1' : '86',
			phoneNumber: '',
			ipData: {
				'1': 'us',
				'7': 'ru',
				'20': 'eg',
				'27': 'za',
				'30': 'gr',
				'31': 'nl',
				'32': 'be',
				'33': 'fr',
				'34': 'es',
				'36': 'hu',
				'39': 'va',
				'40': 'ro',
				'41': 'ch',
				'43': 'at',
				'44': 'gb',
				'45': 'dk',
				'46': 'se',
				'47': 'sj',
				'48': 'pl',
				'49': 'de',
				'51': 'pe',
				'52': 'mx',
				'53': 'cu',
				'54': 'ar',
				'55': 'br',
				'56': 'cl',
				'57': 'co',
				'58': 've',
				'60': 'my',
				'61': 'cc',
				'62': 'id',
				'63': 'ph',
				'64': 'nz',
				'65': 'sg',
				'66': 'th',
				'81': 'jp',
				'82': 'kr',
				'84': 'vn',
				'86': 'cn',
				'90': 'tr',
				'91': 'in',
				'92': 'pk',
				'93': 'af',
				'94': 'lk',
				'95': 'mm',
				'98': 'ir',
				'211': 'ss',
				'212': 'eh',
				'213': 'dz',
				'216': 'tn',
				'218': 'ly',
				'220': 'gm',
				'221': 'sn',
				'222': 'mr',
				'223': 'ml',
				'224': 'gn',
				'225': 'ci',
				'226': 'bf',
				'227': 'ne',
				'228': 'tg',
				'229': 'bj',
				'230': 'mu',
				'231': 'lr',
				'232': 'sl',
				'233': 'gh',
				'234': 'ng',
				'235': 'td',
				'236': 'cf',
				'237': 'cm',
				'238': 'cv',
				'239': 'st',
				'240': 'gq',
				'241': 'ga',
				'242': 'cg',
				'243': 'cd',
				'244': 'ao',
				'245': 'gw',
				'246': 'io',
				'248': 'sc',
				'249': 'sd',
				'250': 'rw',
				'251': 'et',
				'252': 'so',
				'253': 'dj',
				'254': 'ke',
				'255': 'tz',
				'256': 'ug',
				'257': 'bi',
				'258': 'mz',
				'260': 'zm',
				'261': 'mg',
				'262': 're',
				'263': 'zw',
				'264': 'na',
				'265': 'mw',
				'266': 'ls',
				'267': 'bw',
				'268': 'sz',
				'269': 'km',
				'290': 'sh',
				'291': 'er',
				'297': 'aw',
				'298': 'fo',
				'299': 'gl',
				'350': 'gi',
				'351': 'pt',
				'352': 'lu',
				'353': 'ie',
				'354': 'is',
				'355': 'al',
				'356': 'mt',
				'357': 'cy',
				'358': 'ax',
				'359': 'bg',
				'370': 'lt',
				'371': 'lv',
				'372': 'ee',
				'373': 'md',
				'374': 'am',
				'375': 'by',
				'376': 'ad',
				'377': 'mc',
				'378': 'sm',
				'380': 'ua',
				'381': 'rs',
				'382': 'me',
				'383': 'xk',
				'385': 'hr',
				'386': 'si',
				'387': 'ba',
				'389': 'mk',
				'420': 'cz',
				'421': 'sk',
				'423': 'li',
				'500': 'fk',
				'501': 'bz',
				'502': 'gt',
				'503': 'sv',
				'504': 'hn',
				'505': 'ni',
				'506': 'cr',
				'507': 'pa',
				'508': 'pm',
				'509': 'ht',
				'590': 'mf',
				'591': 'bo',
				'592': 'gy',
				'593': 'ec',
				'594': 'gf',
				'595': 'py',
				'596': 'mq',
				'597': 'sr',
				'598': 'uy',
				'599': 'cw',
				'670': 'tl',
				'672': 'nf',
				'673': 'bn',
				'674': 'nr',
				'675': 'pg',
				'676': 'to',
				'677': 'sb',
				'678': 'vu',
				'679': 'fj',
				'680': 'pw',
				'681': 'wf',
				'682': 'ck',
				'683': 'nu',
				'685': 'ws',
				'686': 'ki',
				'687': 'nc',
				'688': 'tv',
				'689': 'pf',
				'690': 'tk',
				'691': 'fm',
				'692': 'mh',
				'850': 'kp',
				'852': 'hk',
				'853': 'mo',
				'855': 'kh',
				'856': 'la',
				'880': 'bd',
				'886': 'tw',
				'960': 'mv',
				'961': 'lb',
				'962': 'jo',
				'963': 'sy',
				'964': 'iq',
				'965': 'kw',
				'966': 'sa',
				'967': 'ye',
				'968': 'om',
				'970': 'ps',
				'971': 'ae',
				'972': 'il',
				'973': 'bh',
				'974': 'qa',
				'975': 'bt',
				'976': 'mn',
				'977': 'np',
				'992': 'tj',
				'993': 'tm',
				'994': 'az',
				'995': 'ge',
				'996': 'kg',
				'998': 'uz',
				'1242': 'bs',
				'1246': 'bb',
				'1264': 'ai',
				'1268': 'ag',
				'1284': 'vg',
				'1340': 'vi',
				'1345': 'ky',
				'1441': 'bm',
				'1473': 'gd',
				'1649': 'tc',
				'1664': 'ms',
				'1670': 'mp',
				'1671': 'gu',
				'1684': 'as',
				'1721': 'sx',
				'1758': 'lc',
				'1767': 'dm',
				'1784': 'vc',
				'1868': 'tt',
				'1869': 'kn',
				'1876': 'jm'
			}
		};
	},
	mounted() {
		if (this.phone) {
			let arr = this.phone.split('-');
			if (arr[0]) {
				this.phoneIpt = arr[0].substring(arr[0].indexOf('+') + 1);
			}
			this.phoneNumber = arr[1];
		}
	},
	methods: {
		change(val) {
			this.phoneIpt = val.dialCode;
			setTimeout(() => {
				this.$emit('change', `+${this.phoneIpt}-${this.phoneNumber}`);
			}, 600);
		},
		inputPhone(phoneNumber) {
			this.$emit('change', `+${this.phoneIpt}-${phoneNumber}`);
		}
	}
};
</script>

<style lang="scss">
.input-phone {
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
	}
	input[type='number'] {
		-moz-appearance: textfield;
	}
}
</style>
