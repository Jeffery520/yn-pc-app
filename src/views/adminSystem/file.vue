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
			src="http://47.88.57.208:10369/file"
			frameborder="0"
			height="80vh"
		>
		</iframe>
		<!--		<el-form-->
		<!--			style="width: 520px;text-align: left;"-->
		<!--			ref="form"-->
		<!--			:model="form"-->
		<!--			label-width="auto"-->
		<!--			label-suffix=":"-->
		<!--		>-->
		<!--			<el-form-item :label="language == 'zh' ? '差分文件' : 'Difference file'">-->
		<!--				<el-upload-->
		<!--					ref="upload"-->
		<!--					class="upload-demo"-->
		<!--					drag-->
		<!--					action="https://jsonplaceholder.typicode.com/posts/"-->
		<!--					:auto-upload="false"-->
		<!--					:on-preview="handlePreview"-->
		<!--					:limit="1"-->
		<!--					multiple-->
		<!--				>-->
		<!--					<i class="el-icon-upload"></i>-->
		<!--					<div class="el-upload__text">-->
		<!--						{{ language == 'zh' ? '将文件拖到此处，或' : 'Drag files here, or '-->
		<!--						}}<em>{{ language == 'zh' ? '点击上传' : 'Click upload' }}</em>-->
		<!--					</div>-->
		<!--					<div class="el-upload__tip" slot="tip" style="margin-top: 0;">-->
		<!--						{{-->
		<!--							language == 'zh'-->
		<!--								? '只能上传jpg/png文件，且不超过500kb'-->
		<!--								: 'Only upload jpg / png files, and no more than 500kb'-->
		<!--						}}-->
		<!--					</div>-->
		<!--				</el-upload>-->
		<!--			</el-form-item>-->
		<!--			<el-form-item :label="language == 'zh' ? '型号' : 'Model'">-->
		<!--				<el-input v-model="form.name"></el-input>-->
		<!--			</el-form-item>-->
		<!--			<el-form-item-->
		<!--				:label="language == 'zh' ? '旧版本号' : 'Old version number'"-->
		<!--			>-->
		<!--				<el-input v-model="form.name"></el-input>-->
		<!--			</el-form-item>-->
		<!--			<el-form-item :label="language == 'zh' ? '新版本' : 'New version'">-->
		<!--				<el-input v-model="form.name"></el-input>-->
		<!--			</el-form-item>-->

		<!--			<el-form-item>-->
		<!--				<el-button type="primary" @click="onSubmit">{{-->
		<!--					$t('action.submit')-->
		<!--				}}</el-button>-->
		<!--			</el-form-item>-->
		<!--		</el-form>-->
	</div>
</template>

<script>
export default {
	name: 'File',
	props: {},
	data() {
		return {
			language: this.$store.getters.language,
			fileList: [
				{
					name: '1.jpeg',
					url:
						'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
				}
			],
			form: {
				name: '',
				region: '',
				date1: '',
				date2: '',
				delivery: false,
				type: [],
				resource: '',
				desc: ''
			}
		};
	},
	created() {},
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
	methods: {
		onSubmit() {
			console.log('submit!');
			this.$refs.upload.submit();
		},
		handlePreview(file) {
			console.log(this.fileList);
			console.log(file);
		}
	}
};
</script>

<style lang="scss" scoped>
@import '@/style/mixin.scss';
#admin_system {
	@include table-bg;
	.el-upload {
		display: block !important;
	}
	.admin_system_iframe {
		width: 100%;
		min-height: 76vh;
		button {
			color: #0f90d2;
		}
	}
}
</style>
<style lang="scss">
.upload-demo {
	.el-upload {
		display: block !important;
	}
}
</style>
