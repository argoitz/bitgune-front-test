import { createStore } from "vuex";
import router from "../router";

export default createStore({
  state: {
    token: null,
    regError: null,
    successRegistered: null,
  },
  mutations: {
    setToken(state, payload) {
      state.token = payload;
    },
    setErrorMessage(state, payload) {
      state.regError = payload;
    },
    setSuccessRegistered(state, payload) {
      state.successRegistered = payload;
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

        commit("setToken", userDB.data.token);
        localStorage.setItem("token2", userDB.data.token);

        //Redirect to home
        router.push("/");
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
    },
  },
});
