import { createStore } from "vuex";

export default createStore({
  state: {
    token: null,
  },
  mutations: {
    setToken(state, payload) {
      state.token = payload;
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

        console.log("TOKE: ");
        console.log(userDB.data.token);
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
    logout({ commit }) {
      commit("setToken", null);
      localStorage.removeItem("token2");
    },
  },
});
