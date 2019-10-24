import { login, logout, getInfo } from "@/api/user";
import { getToken, setToken, removeToken } from "@/utils/token";
import { storageUserAccount } from "@/utils/validate";
import Item from "../../layout/components/Sidebar/Item";
import router, { resetRouter } from "@/router";

const state = {
  token: getToken(),
  userInfo: {},
  roles: []
};

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_USER_INFO: (state, userInfo) => {
    state.userInfo = userInfo;
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles;
  }
};

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password, renenberLogin } = userInfo;
    // 保存用户名和密码，默认为30天
    if (renenberLogin) {
      storageUserAccount().setUserAccount(username, password);
    }

    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password })
        .then(response => {
          const token = `${response.token_type} ${response.access_token} `;
          commit("SET_TOKEN", token);
          // 如果设置了记住用户状态，将token进行cookies存储设置过期时间为一周
          if (renenberLogin) {
            setToken(token, 7);
          } else {
            setToken(token);
          }
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token)
        .then(response => {
          console.log(response);
          // todo
          response = { roles: ["admin"] };
          const { roles } = response;
          // if (!response) {
          //   reject("Verification failed, please Login again.");
          // }
          // // roles must be a non-empty array
          // if (!response.authorities || response.authorities.length <= 0) {
          //   reject("getInfo: roles must be a non-null array!");
          // }
          // const roles = response.authorities.map(item => {
          //   return item.authority;
          // });
          commit("SET_ROLES", roles);
          commit("SET_USER_INFO", response);
          resolve(response);
        })
        .catch(error => {
          // todo
          // 设置一个假权限
          commit("SET_ROLES", ["admin"]);
          reject(error);
        });
    });
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      // logout(state.token)
      //   .then(() => {
      //     commit("SET_TOKEN", "");
      //     commit("SET_ROLES", []);
      //     removeToken();
      //     // resetRouter();
      //     resolve();
      //   })
      //   .catch(error => {
      //     reject(error);
      //   });
      commit("SET_TOKEN", "");
      commit("SET_ROLES", []);
      removeToken();
      resetRouter();
      resolve();
    });
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      console.log("resetToken");
      commit("SET_TOKEN", "");
      commit("SET_ROLES", []);
      removeToken();
      resolve("123");
    });
  },

  // dynamically modify permissions
  changeRoles({ commit, dispatch }, role) {
    return new Promise(async resolve => {
      const token = role + "-token";

      commit("SET_TOKEN", token);
      setToken(token);

      // const { roles } = await dispatch("getInfo");

      // resetRouter();

      // generate accessible routes map based on roles
      // const accessRoutes = await dispatch("permission/generateRoutes", roles, {
      //   root: true
      // });

      // dynamically add accessible routes
      // router.addRoutes(accessRoutes);

      // reset visited views and cached views
      dispatch("tagsView/delAllViews", null, { root: true });
      resolve();
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
