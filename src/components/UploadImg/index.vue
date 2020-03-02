<template>
	<div class="upload-img-tool">
		<div class="user-header">
			<div class="user-header-bg">
				<input
					v-if="!disabled"
					type="file"
					name="image"
					:disabled="disabled"
					accept="image/*"
					@change="onchangeImgFun"
					class="header-upload-btn user-header-com"
					title=""
				/>
				<img alt="" :src="imgUrl" class="user-header-img user-header-com" />
			</div>

			<p v-if="!disabled" class="tip">
				<span v-if="!disabled">
					<span style="display: block;font-size: 20px;margin-bottom: 10px;">{{
						$store.getters.language == 'en'
							? 'Click on the picture to modify'
							: '点击图片修改'
					}}</span>
					<span style="color: #4b96ef;"
						>{{
							$store.getters.language == 'en'
								? 'Image size limit'
								: '图片大小限制'
						}}
						{{ imgMaxSize }} kb</span
					>
				</span>
				<span class="error">{{ imgErrorStr }}</span>
			</p>
		</div>
	</div>
</template>

<script>
export default {
	name: 'UploadImg',
	props: { imgUrl: String, disabled: false },
	data() {
		return {
			imgMaxSize: 500,
			imgErrorStr: ''
		};
	},
	mounted() {},
	methods: {
		onchangeImgFun(e) {
			var file = e.target.files[0];
			console.log(file);
			// 获取图片的大小，做大小限制有用
			let imgSize = file.size;
			console.log(imgSize);
			var _this = this; // this指向问题，所以在外面先定义
			// 比如上传头像限制5M大小，这里获取的大小单位是b
			if (imgSize <= this.imgMaxSize * 1024) {
				// 合格
				_this.imgErrorStr = '';
				// 开始渲染选择的图片
				// 本地路径方法 1
				// this.imgStr = window.URL.createObjectURL(e.target.files[0])
				// console.log(window.URL.createObjectURL(e.target.files[0])) // 获取当前文件的信息

				// base64方法 2
				var reader = new FileReader();
				reader.readAsDataURL(file); // 读出 base64
				reader.onloadend = function() {
					// 图片的 base64 格式, 可以直接当成 img 的 src 属性值
					var dataURL = reader.result;
					console.log(dataURL);
					_this.imgUrl = dataURL;
					// 下面逻辑处理
				};
			} else {
				console.log('大小不合适');
				_this.imgErrorStr = '图片大小超出范围';
			}
		}
	}
};
</script>

<style lang="scss" scoped>
@import '@/style/mixin.scss';
.upload-img-tool {
	.user-header {
		display: inline-block;
		input:-webkit-autofill,
		select:-webkit-autofill {
			-webkit-box-shadow: 0 0 0px 1000px white inset !important;
		}
		input[type='file'] {
			color: transparent;
		}
		.user-header-bg {
			width: 100px;
			height: 100px;
			position: relative;
			overflow: hidden;
		}
	}
	.user-header-com {
		width: 100%;
		height: 100%;
		display: inline-block;
		outline-color: invert;
		outline-style: none;
		outline-width: 0px;
		border: none;
		border-style: none;
		text-shadow: none;
		-webkit-appearance: none;
		-webkit-user-select: text;
		outline-color: transparent;
		box-shadow: none;
	}
	.header-upload-btn {
		position: absolute;
		left: 0;
		top: 0;
		opacity: 0;
		cursor: pointer;
		/* 通过定位把input放在img标签上面，通过不透明度隐藏 */
	}
	.user-header-img {
		width: 100px;
		height: 100px;
		background: url('~@/assets/images/noPhoto.png') center center no-repeat;
		background-size: 60%;
		border: 1px solid $baseBorderColor;
	}
	.tip {
		font-size: 14px;
		color: #666;
		line-height: 1em;
		margin-top: 10px;
	}
	/* error是用于错误提示 */
	.error {
		font-size: 12px;
		color: tomato;
		margin-left: 10px;
	}
}
</style>
