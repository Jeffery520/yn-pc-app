<template>
	<div class="show-sidebar-inner">
		<div @click="toggleSideBar">
			<span :class="[isCollapse ? '' : 'collapsed', 'collapse-btn']">
				<svg-icon icon-class="show-sidebar" />
			</span>
		</div>
		<el-scrollbar wrap-class="scrollbar-wrapper">
			<el-menu
				:default-active="activeMenu"
				:background-color="variables.menuBg"
				:text-color="variables.menuText"
				:active-text-color="variables.menuActiveText"
				mode="vertical"
				:collapse="isCollapse"
			>
				<sidebar-item
					v-for="route in permission_routes"
					:key="route.path"
					:item="route"
					:base-path="route.path"
				/>
			</el-menu>
		</el-scrollbar>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import SidebarItem from './SidebarItem';
import variables from '@/style/global.scss';

export default {
	data() {
		return {};
	},
	components: { SidebarItem },
	computed: {
		...mapGetters(['permission_routes', 'sidebar']),
		activeMenu() {
			const route = this.$route;
			const { meta, path } = route;
			// if set path, the sidebar will highlight the path you set
			if (meta.activeMenu) {
				return meta.activeMenu;
			}
			return path;
		},
		variables() {
			return variables;
		},
		isCollapse() {
			return !this.sidebar.opened;
		}
	},

	methods: {
		toggleSideBar() {
			this.$store.dispatch('app/toggleSideBar');
		}
	}
};
</script>
<style lang="scss">
.show-sidebar-inner {
	.scrollbar-wrapper {
		height: 85vh !important;
		padding-bottom: 100px;
	}
}
</style>
