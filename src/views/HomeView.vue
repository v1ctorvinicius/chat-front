<script setup lang="ts">
import { ref } from "vue";

import useUserStore from "@/stores/userStore";

const userStore = useUserStore();

</script>

<template>

  <div class="message-container">
    <Message class="message" v-if="!userStore.isAuthenticated" severity="info"
      :pt:text:style="'padding: 0 1vw ; display: flex; align-items: center'">Not signed in. Now authenticated as guest
      <Button @click="userStore.setIsAuthenticated(true)" label="login" style="margin-left: 10px" />
    </Message>
  </div>

  <div class="container">

    <div class="user-info blue-whale-alpha" style="display: flex; flex-direction: column; height: 55vh; justify-content: space-around;">
      <img :src="useUserStore().imageUrl" style="width: 300px; height: 300px; border-radius: 50%;" />
      <p>username: <span style="font-weight: bold; font-size: 1vw; color: tomato">{{ useUserStore().username }}</span></p>
    </div>

  </div>
</template>
<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.message-container {
  position: absolute;
  right: 0;
  margin: 1vh;
}

.message {
  display: flex;
  justify-content: center;
  align-items: center;
}

.user-info {
  display: flex;
  justify-content: center;
  align-items: center;
  /* width: 80vw; */
  padding: 2vw;
  border-radius: 10px;
}

.user-info img:hover {
  border: 1px solid #193842;
}
</style>