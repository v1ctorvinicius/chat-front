<script setup lang="ts">
import { onBeforeMount, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import axiosInstance from "@/plugins/axiosConfig";

import useUserStore from "@/stores/userStore";
import { useRouter } from "vue-router";

const userStore = useUserStore();

const router = useRouter();

onMounted(() => {
  // access_token from url
  let url = window.location.href;
  let token = url.split("access_token=")[1];
  let expiresIn = url.split("expires_in=")[1].split('&')[0];
  let expirationTime = Date.now() + parseInt(expiresIn) * 1000;
  let newUrl = `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`;

  axiosInstance.get(newUrl).then((res) => {

    localStorage.setItem("token", token);
    localStorage.setItem("expirationTime", expirationTime.toString());
    localStorage.setItem("username", res.data.name);
    localStorage.setItem("imageUrl", res.data.picture.split('=s96')[0] + "=s500");
    localStorage.setItem("isAuthenticated", "true");

    userStore.setImageUrl(res.data.picture);
    userStore.setUsername(res.data.name);
    userStore.setIsAuthenticated(true);

    // timeout to redirect to home
    // setTimeout(() => {
    router.push({ name: "home" });
    // }, 2000);

  })
})

</script>

<template>
  <div class="container text-white">
    <section class="blue-whale-alpha">
      <h2>Welcome back 🚀 </h2>
    </section>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10vh 5vw;
  min-height: 88vh;
}
</style>