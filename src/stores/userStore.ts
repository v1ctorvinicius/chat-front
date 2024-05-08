import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("user", () => {
  const userId = ref("");
  const username = ref("");
  const isAuthenticated = ref(false);

  function setUser(_userId: string) {
    userId.value = _userId;
  }

  function setUsername(_username: string) {
    username.value = _username;
  }

  function setIsAuthenticated(_isAuthenticated: boolean) {
    isAuthenticated.value = _isAuthenticated;
  }

  return { userId, username, setUser, setUsername, setIsAuthenticated, isAuthenticated };
});