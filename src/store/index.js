import { createStore } from "vuex";
import router from "../router";

export default createStore({
  state: {
    token: null,
    regError: null,
    successRegistered: null,
    loginError: null,
    userRole: null,
  },
  mutations: {
    setToken(state, payload) {
      state.token = payload;
    },
    setRole(state, payload) {
      state.userRole = payload;
    },
    setErrorMessage(state, payload) {
      state.regError = payload;
    },
    setSuccessRegistered(state, payload) {
      state.successRegistered = payload;
    },
    setLoginError(state, payload) {
      state.loginError = payload;
    },
    resetErrors(state) {
      state.loginError = null;
      state.regError = null;
    },
  },
  actions: {
    async login({ commit }, user) {
      try {
        //Post login data
        const res = await fetch("http://localhost:3001/api/user/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });
        //Return in json format
        const userDB = await res.json();

        //Check if server return any error message
        if (userDB.error) {
          commit("setLoginError", userDB.error);
        } else {
          commit("setLoginError", null);
          commit("setToken", userDB.data.token);
          localStorage.setItem("token2", userDB.data.token);

          //SetUSerRole
          commit("setRole", userDB.data.userRole);
          localStorage.setItem("role2", userDB.data.userRole);

          //Redirect to home
          router.push("/request-form");
        }
      } catch (error) {
        console.log("error: ", error);
      }
    },
    getToken({ commit }) {
      if (localStorage.getItem("token2")) {
        commit("setToken", localStorage.getItem("token2"));
      } else {
        commit("setToken", null);
      }
    },
    getRole({ commit }) {
      if (localStorage.getItem("role2")) {
        commit("setRole", localStorage.getItem("role2"));
      } else {
        commit("setRole", null);
      }
    },
    async register({ commit }, user) {
      try {
        //Post register data
        const res = await fetch("http://localhost:3001/api/user/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });

        const response = await res.json();
        if (response.error) {
          commit("setSuccessRegistered", null);
          commit("setErrorMessage", response.error);
        } else {
          commit("setErrorMessage", null);
          commit("setSuccessRegistered", true);
        }
      } catch (error) {
        console.log("error: ", error);
      }
    },
    logout({ commit }) {
      commit("setToken", null);
      localStorage.removeItem("token2");
      router.push("/");
    },
    isAdminUser() {
      if (localStorage.getItem("role2") != "admin") router.push("/");
    },
  },
});
