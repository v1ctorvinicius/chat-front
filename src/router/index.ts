import { createRouter, createWebHistory } from "vue-router";
import { isTokenExpired, getToken, clearAuthData } from "../auth/auth";
import useUserStore from "../stores/userStore";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/HomeView.vue"),
    },
    {
      path: "/forums",
      name: "forums",
      component: () => import("../views/ForumsView.vue"),
      // meta: { requiresAuth: true },
    },
    {
      path: "/chats",
      name: "chats",
      component: () => import("../views/ChatsView.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/login-success",
      name: "login-success",
      component: () => import("../views/LoginSuccessView.vue"),
      
    },

    {
      path: "/:pathMatch(.*)*",
      name: "notfound",
      component: () => import("../views/NotFound.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  const token = getToken();

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!token || isTokenExpired()) {
      clearAuthData();
      userStore.setIsAuthenticated(false);
      next({ name: "login" });
    } else {
      userStore.setIsAuthenticated(true);
      userStore.setUsername(localStorage.getItem("username") ?? "");
      userStore.setImageUrl(localStorage.getItem("imageUrl") ?? "");
      next();
    }
  } else {
    next();
  }
});

export default router;
