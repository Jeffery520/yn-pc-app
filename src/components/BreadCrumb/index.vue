<template>
	<el-breadcrumb class="app-breadcrumb" separator-class="el-icon-arrow-right">
		<transition-group name="breadcrumb">
			<el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
				<svg-icon v-if="item.meta.icon" :icon-class="item.meta.icon"></svg-icon>
				<span
					v-if="item.redirect === 'noRedirect' || index == levelList.length - 1"
					:class="levelList.length == 1 ? '' : 'no-redirect'"
					>{{ generateTitle(item.meta.title) }}</span
				>
				<a v-else @click.prevent="handleLink(item)">{{
					generateTitle(item.meta.title)
				}}</a>
			</el-breadcrumb-item>
		</transition-group>
	</el-breadcrumb>
</template>

<script>
import { generateTitle } from '@/utils/i18n';
import { _debounce } from '@/utils/validate';
import pathToRegexp from 'path-to-regexp';

export default {
	data() {
		return {
			levelList: []
		};
	},
	watch: {
		$route(route) {
			// 如果你转到重定向页面，不需要更新面包屑
			if (route.path.startsWith('/redirect/')) {
				return;
			}
			this.getBreadcrumb();
		}
	},
	created() {
		this.getBreadcrumb();
	},
	methods: {
		generateTitle,
		getBreadcrumb() {
			// only show routes with meta.title
			let matched = this.$route.matched.filter(
				(item) => item.meta && item.meta.title
			);
			this.levelList = matched.filter(
				(item) => item.meta && item.meta.title && item.meta.breadcrumb !== false
			);
		},
		pathCompile(path) {
			// 解决面包屑不支持动态路由问题
			// Breadcrumb not support params
			const { params } = this.$route;
			var toPath = pathToRegexp.compile(path);
			return toPath(params);
		},
		handleLink: _debounce(function(item) {
			// 面包屑点击跳转
			const { redirect, path } = item;
			if (redirect) {
				this.$router.push(redirect);
				return;
			}
			this.$router.push(this.pathCompile(path));
		})
	}
};
</script>

<style lang="scss">
@import '@/style/mixin.scss';
.app-breadcrumb.el-breadcrumb {
	font-size: 16px;
	line-height: 20px;
	margin-bottom: 20px;
	color: $mainTextColor;
	cursor: default;

	.svg-icon {
		margin-right: 5px;
		color: $mainTextColor;
	}
	.no-redirect {
		cursor: text;
		color: #999;
		cursor: default;
	}
	.el-breadcrumb__separator {
		margin: 0 5px !important;
	}
}
</style>
