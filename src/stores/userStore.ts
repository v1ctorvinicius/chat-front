import { defineStore } from "pinia";
import { ref } from "vue";

const useUserStore = defineStore("user", () => {
  const userId = ref("");
  const username = ref("guest" + Math.floor(Math.random() * 1000));
  const isAuthenticated = ref(false);
  const imageUrl = ref(`https://picsum.photos/id/237/250/250`);

  function setUser(_userId: string) {
    userId.value = _userId;
  }

  function setUsername(_username: string) {
    username.value = _username;
  }

  function setIsAuthenticated(_isAuthenticated: boolean) {
    isAuthenticated.value = _isAuthenticated;
  }

  return {
    userId,
    username,
    imageUrl,
    isAuthenticated,
    setUser,
    setUsername,
    setIsAuthenticated,
  };
});

export default useUserStore;
