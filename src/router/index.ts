import { createRouter, createWebHistory } from "vue-router";

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
    },
    {
      path: "/chats",
      name: "chats",
      component: () => import("../views/ChatsView.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      name: "notfound",
      component: () => import("../views/NotFound.vue"),
    },
  ],
});

export default router;
