<template>
  <div class="login-bg">
    <div class="yn-lang-select"><LanSelect></LanSelect></div>
    <div class="yn-logo-frame">
      <img alt="logo" src="@/assets/images/logo.png" />
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules">
        <el-form-item prop="username"
          ><el-input
            ref="username"
            :placeholder="$t('login.username')"
            prefix-icon="el-icon-user"
            v-model="loginForm.username"
            type="text"
            maxlength="20"
            size="medium"
          >
          </el-input
        ></el-form-item>
        <el-form-item prop="password"
          ><el-input
            ref="password"
            :placeholder="$t('login.password')"
            prefix-icon="el-icon-lock"
            v-model="loginForm.password"
            type="password"
            maxlength="20"
            size="medium "
          >
          </el-input
        ></el-form-item>

        <el-button
          :loading="loading"
          @click="handleLogin"
          class="yn-login-button"
          type="primary"
          size="medium"
          >{{ $t("login.btnText") }}</el-button
        >
        <el-form-item
          ><el-checkbox
            name="renenberLogin"
            v-model="loginForm.renenberLogin"
            :label="$t('login.renenber')"
          ></el-checkbox
        ></el-form-item>
      </el-form>
    </div>
    <p>
      © 2019,&nbsp;Copyright OneCare,&nbsp;Inc All rights
      reserved.&nbsp;&nbsp;&nbsp;&nbsp;Version:V0.0.1
    </p>
  </div>
</template>

<script>
import LanSelect from "@/components/LangSelect/index";
export default {
  name: "Login",
  components: { LanSelect },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value.trim().length < 6) {
        callback(new Error(this.$t("login.usernameError")));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.trim().length < 6) {
        callback(new Error(this.$t("login.passwordError")));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "",
        password: "",
        renenberLogin: false
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername }
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword }
        ]
      },
      loading: false,
      redirect: undefined,
      otherQuery: {}
    };
  },
  watch: {
    // $route: {
    //   handler: function(route) {
    //     const query = route.query;
    //     if (query) {
    //       this.redirect = query.redirect;
    //       this.otherQuery = this.getOtherQuery(query);
    //     }
    //   },
    //   immediate: true
    // }
  },
  mounted() {
    // 设置自动聚焦
    if (this.loginForm.username === "") {
      this.$refs.username.focus();
    } else if (this.loginForm.password === "") {
      this.$refs.password.focus();
    }
  },
  methods: {
    handleLogin() {
      console.log(this.loginForm);
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("user/login", this.loginForm)
            .then(() => {
              this.$router.push({
                path: this.redirect || "/",
                query: this.otherQuery
              });
              this.loading = false;
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
    // getOtherQuery(query) {
    //   return Object.keys(query).reduce((acc, cur) => {
    //     if (cur !== "redirect") {
    //       acc[cur] = query[cur];
    //     }
    //     return acc;
    //   }, {});
    // }
  }
};
</script>
<style lang="scss">
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
    border: 1px solid #c1c5c8;
  }
}
.el-checkbox__inner::after {
  height: 11px;
  left: 6px;
}
.el-checkbox__label {
  color: #757a8d !important;
}
</style>
<style scoped lang="scss">
.login-bg {
  width: 100%;
  height: 100%;
  background: url("../assets/images/login-bg.png") no-repeat center;
  img {
    margin-bottom: 24px;
  }
  .yn-logo-frame {
    width: 400px;
    height: 400px;
    background: #e8f0f2;
    position: fixed;
    left: 50%;
    top: 50%;
    margin-left: -200px;
    margin-top: -260px;
    border-radius: 4px;
    box-shadow: 0 5px 15px rgb(0, 0, 0, 0.2);
    border: 1px solid #fff;
    padding: 56px 46px 20px;
    box-sizing: border-box;
  }
  p {
    position: fixed;
    bottom: 100px;
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
