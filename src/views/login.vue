<template>
	<div class="login-bg">
		<!--    <div-->
		<!--    class="login-bg"-->
		<!--    :style="{ background: 'url(' + bgImg + ') no-repeat center' }"-->
		<!--  >-->
		<div class="yn-lang-select">
			<LanSelect></LanSelect>
		</div>
		<div class="yn-logo-frame">
			<img alt="logo" src="@/assets/images/onecare_logo.png" />
			<el-form ref="loginForm" :model="loginForm" :rules="loginRules">
				<el-form-item prop="username">
					<el-input
						ref="username"
						:placeholder="$t('user.userName')"
						prefix-icon="el-icon-user"
						v-model="loginForm.username"
						type="text"
						size="medium"
						v-on:keyup.native.enter="$refs.password.focus()"
					></el-input>
				</el-form-item>
				<el-form-item prop="password">
					<el-input
						ref="password"
						:placeholder="$t('user.password')"
						prefix-icon="el-icon-lock"
						v-model="loginForm.password"
						type="password"
						size="medium"
						show-password
						v-on:keyup.native.enter="handleLogin"
					></el-input>
				</el-form-item>

				<el-button
					:loading="loading"
					@click="handleLogin"
					class="yn-login-button"
					type="primary"
					size="medium"
					>{{ $t('user.login') }}</el-button
				>
				<el-form-item>
					<el-checkbox
						name="renenberLogin"
						v-model="loginForm.renenberLogin"
						:label="$t('user.renenber')"
					></el-checkbox>
				</el-form-item>
			</el-form>
		</div>
		<p>
			© 2019,&nbsp;Copyright OneCare,&nbsp;Inc All rights
			reserved.&nbsp;&nbsp;&nbsp;&nbsp;Version:V0.0.1
		</p>
	</div>
</template>

<script>
// import bgImg from '@/assets/images/login-bg.jpg';
import { storageUserAccount } from '@/utils/validate';
const LanSelect = () => import('@/components/LangSelect/index');

export default {
	name: 'login',
	components: { LanSelect },
	data() {
		const validateUsername = (rule, value, callback) => {
			if (value.trim().length < 3) {
				callback(new Error(this.$t('login.usernameError')));
			} else {
				callback();
			}
		};
		const validatePassword = (rule, value, callback) => {
			if (value.length < 3) {
				callback(new Error(this.$t('login.passwordError')));
			} else {
				callback();
			}
		};
		return {
			// bgImg: bgImg,
			loginForm: {
				username: '',
				password: '',
				renenberLogin: false
			},
			loginRules: {
				username: [
					{ required: true, trigger: 'blur', validator: validateUsername }
				],
				password: [
					{ required: true, trigger: 'blur', validator: validatePassword }
				]
			},
			loading: false,
			redirect: undefined,
			otherQuery: {}
		};
	},
	watch: {
		$route: {
			// immediate：true 该回调将会在侦听开始之后被立即调用
			handler: function(route) {
				const query = route.query;
				if (query) {
					// 如果其他页面跳转登录页需要携带redirect参数用来登录后重定向
					this.redirect = query.redirect;
					this.otherQuery = this.getOtherQuery(query);
				}
			},
			immediate: true
		}
	},
	mounted() {
		// 查询缓存账号
		const userAccount = storageUserAccount().getUserAccount();
		if (userAccount) {
			this.loginForm.username = userAccount.username;
			this.loginForm.password = userAccount.password;
		}

		// 设置自动聚焦
		if (this.loginForm.username === '') {
			this.$refs.username.focus();
		} else if (this.loginForm.password === '') {
			this.$refs.password.focus();
		}
	},
	methods: {
		handleLogin() {
			this.$refs.loginForm.validate((valid) => {
				// 表单校验结果
				if (valid) {
					this.elLoading = this.$loading({
						target: document.querySelector('.app-main'),
						background: 'rgba(0, 0, 0, 0)'
					});
					this.loading = true;
					this.$store
						.dispatch('user/login', this.loginForm)
						.then(() => {
							// 获取用户信息成功，跳转页面
							this.$router.push({
								path: this.redirect || '/',
								query: this.otherQuery
							});
							setTimeout(() => {
								this.$message({
									message: 'Login Success',
									type: 'success'
								});
								this.loading = false;
								this.elLoading.close();
							}, 1000);
						})
						.catch((err) => {
							console.log(err);
							this.loading = false;
							this.elLoading.close();
						});
				} else {
					this.$message.error('error submit!');
					return false;
				}
			});
		},
		// 获取路由参数
		getOtherQuery(query) {
			return Object.keys(query).reduce((acc, cur) => {
				if (cur !== 'redirect') {
					acc[cur] = query[cur];
				}
				return acc;
			}, {});
		}
	}
};
</script>
<style lang="scss">
.login-bg {
	.el-form-item {
		margin-bottom: 24px;
	}
	.el-input {
		.el-input__prefix {
			font-size: 20px;
			line-height: 42px;
		}
		.el-input__inner {
			height: 42px;
			padding-left: 38px;
		}
	}
	.el-input__inner {
		border: 1px solid #c1c5c8;
	}
	.yn-login-button {
		width: 100%;
		height: 42px;
	}
	.el-checkbox {
		margin-top: 30px;
		.el-checkbox__inner {
			width: 18px;
			height: 18px;
		}
	}
	.el-checkbox__inner::after {
		height: 11px;
		left: 6px;
	}
	.el-checkbox__label {
		color: #757a8d !important;
	}
}
</style>
<style scoped lang="scss">
.login-bg {
	width: 100%;
	height: 100%;
	text-align: center;
	background: #439ab8;
	background-image: linear-gradient(#439ab8, #439ab8, #eae8d0);
	img {
		margin-bottom: 24px;
		width: 200px;
	}
	.yn-logo-frame {
		width: 400px;
		background: #e8f0f2;
		box-shadow: 0 5px 15px rgb(0, 0, 0, 0.2);
		border: 1px solid #fff;
		position: fixed;
		left: 50%;
		top: 50%;
		transform: translateX(-50%);
		margin-top: -360px;
		border-radius: 4px;
		padding: 30px 45px 20px;
		box-sizing: border-box;
	}
	p {
		position: fixed;
		top: 75%;
		left: 50%;
		transform: translateX(-50%);
		text-align: center;
		color: #757b89;
		font-size: 12px;
	}
	overflow: hidden;
}
.yn-lang-select {
	width: 50px;
	height: 50px;
	position: fixed;
	top: 10px;
	right: 10px;
}
</style>
