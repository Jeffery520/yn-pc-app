<template>
	<!--    年龄-->
	<div class="chart-bg">
		<header>
			<div class="chart-header">
				<span style="font-weight: 600;">Heart rate</span>
				<span style="cursor: pointer" @click="isShowList = !isShowList"
					><span style="color: #3aca75"
						>{{
							isShowList
								? language == 'en'
									? 'Chart'
									: '图表'
								: language == 'en'
								? 'List'
								: '列表'
						}} </span
					><i style="color: #3aca75" class="el-icon-arrow-right"></i
				></span>
			</div>
			<chart-header
				ref="chartHeader"
				v-if="!isShowList"
				@dateChanged="dateChanged"
				@typeChanged="typeChanged"
			></chart-header>
		</header>
		<div style="width: 440px; height: 300px;overflow-y: hidden;">
			<div
				v-show="!isShowList"
				id="heartRate"
				style="width: 450px;height: 300px;margin-top: -45px;margin-left: -15px"
			></div>
			<chart-list v-if="isShowList" :valueList="valueList"></chart-list>
		</div>
	</div>
</template>
<script>
import mixin from '@/components/Chart/mixin';
import ChartHeader from '@/components/Chart/chartHeader';
import ChartList from '@/components/Chart/chartList';

export default {
	name: 'HeartRate',
	mixins: [mixin],
	components: { ChartHeader, ChartList },
	data() {
		return {
			isShowList: false,
			valueList: []
		};
	},
	created() {},
	mounted() {},
	methods: {}
};
</script>

<style lang="scss" scoped></style>
