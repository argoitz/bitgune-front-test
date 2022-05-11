import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import About from "../views/About.vue";

import store from "../store";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { hideForAuth: true },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: { hideForAuth: true },
  },
  {
    path: "/about",
    name: "About",
    component: About,
    meta: { requireAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(
    process.env.NODE_ENV === "production" ? process.env.BASE_URL : ""
  ),
  routes,
});

router.beforeEach((to, from, next) => {
  const protectedRoute = to.matched.some((record) => record.meta.requireAuth);
  const hideForAutPages = to.matched.some((record) => record.meta.hideForAuth);

  //Check if token exist and current route is protected
  if (protectedRoute && store.state.token === null) {
    next({ name: "Home" });
  } else {
    next();
  }

  //Check if logued in and if current route is login or register for redirecting
  if (hideForAutPages && store.state.token !== null) {
    router.push("/");
  } else {
    next();
  }
});

export default router;
