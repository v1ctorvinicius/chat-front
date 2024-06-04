import { defineStore } from "pinia";
import { ref } from "vue";

const useUserStore = defineStore("user", () => {
  const userId = ref("");
  const username = ref("guest" + Math.floor(Math.random() * 1000));
  const isAuthenticated = ref(false);
  const imageUrl = ref(`https://picsum.photos/id/237/250/250`);
  const token = ref(localStorage.getItem("token") ?? "");

  function setUser(_userId: string) {
    userId.value = _userId;
  }

  function getToken() {
    return token.value;
  }

  function setUsername(_username: string) {
    username.value = _username;
  }

  function setImageUrl(_imageUrl: string) {
    imageUrl.value = _imageUrl;
  }

  function setIsAuthenticated(_isAuthenticated: boolean) {
    isAuthenticated.value = _isAuthenticated;
    if (_isAuthenticated === false) {
      userId.value = "";
      username.value = "guest" + Math.floor(Math.random() * 1000);
      imageUrl.value = `https://picsum.photos/id/237/250/250`;
      localStorage.clear();
    }
  }

  return {
    userId,
    username,
    imageUrl,
    isAuthenticated,
    setUser,
    getToken,
    setUsername,
    setImageUrl,
    setIsAuthenticated,
  };
});

export default useUserStore;
