<template>
	<el-container
		:style="{
			position: fixed,
			height: height + 'px',
			width: width + 'px',
			left: left + 'px',
			top: top + 'px',
			'z-index': 999999999999
		}"
		class="drag-dialog-bg"
		:id="id"
		v-show="dialogVisible"
	>
		<el-header>
			<div @mousedown="mousedown">
				<div style="font-size: 18px;text-align: left" v-html="title"></div>
				<div
					@click.stop="closeDialog()"
					style="position: absolute;top: 5px; right: 20px;cursor: pointer;"
				>
					<i class="el-icon-close" style="font-size: 24px;"></i>
				</div>
			</div>
		</el-header>
		<el-main>
			<slot></slot>
		</el-main>
		<el-footer v-if="showDialogFooter">
			<span class="dialog-footer">
				<el-button @click="closeDialog">取 消</el-button>
				<el-button type="primary" @click="closeDialog">确 定</el-button>
			</span>
		</el-footer>
	</el-container>
</template>

<script>
export default {
	name: 'Window',
	props: {
		dialogVisible: false,
		title: String,
		id: [String, Number],
		height: [String, Number],
		width: [String, Number],
		showDialogFooter: false
	},
	data() {
		return {
			selectElement: '',
			left: 0,
			top: 0,
			WindowWidth: 0,
			WindowHeight: 0
		};
	},
	beforeMount() {
		this.WindowWidth = document.documentElement.clientWidth;
		this.WindowHeight = document.documentElement.clientHeight;
		this.left = this.WindowWidth - this.width - 10;
		this.top = this.WindowHeight - this.height - 10;
	},
	methods: {
		closeDialog(e) {
			this.dialogVisible = false;
			this.$emit('closeDialog');
		},
		mousedown(event) {
			this.selectElement = document.getElementById(this.id);
			var div1 = this.selectElement;
			this.selectElement.style.cursor = 'move';
			this.isDowm = true;
			var distanceX = event.clientX - this.selectElement.offsetLeft;
			var distanceY = event.clientY - this.selectElement.offsetTop;

			document.onmousemove = (ev) => {
				var oevent = ev || event;
				var L = oevent.clientX - distanceX;
				var T = oevent.clientY - distanceY;
				if (L < 10) {
					L = 10;
				} else if (
					L >
					document.documentElement.clientWidth - div1.offsetWidth - 10
				) {
					L = document.documentElement.clientWidth - div1.offsetWidth - 10;
				}

				if (T < 10) {
					T = 10;
				} else if (
					T >
					document.documentElement.clientHeight - div1.offsetHeight - 10
				) {
					T = document.documentElement.clientHeight - div1.offsetHeight - 10;
				}

				div1.style.left = L + 'px';
				div1.style.top = T + 'px';
			};
			document.onmouseup = function() {
				document.onmousemove = null;
				document.onmouseup = null;
				div1.style.cursor = 'default';
			};
		}
	}
};
</script>

<style lang="scss" scoped>
.drag-dialog-bg {
	position: fixed;
	height: 630px;
	width: 382px;
	background: #ffffff;
	border: 1px solid #ddd;
	box-shadow: 0 5px 20px rgba(0, 0, 0, 0.4);
	z-index: 999999999999;
	.dialog-footer {
		text-align: right;
	}

	.el-main {
		background-color: white;
		padding: 0 10px 20px;
	}

	.el-footer {
		background-color: white;
	}

	.el-header {
		background-color: white;
		color: #333;
		line-height: 50px;
		height: 50px !important;
		cursor: move;
		-webkit-user-select: none;

		-moz-user-select: none;

		-ms-user-select: none;

		user-select: none;
	}

	.el-aside {
		color: #333;
	}
}
</style>
