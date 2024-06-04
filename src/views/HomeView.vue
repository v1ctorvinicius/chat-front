<script setup lang="ts">
import { onBeforeMount, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
// import {authService} from "@/services/auth";

import useUserStore from "@/stores/userStore";

const userStore = useUserStore();
const router = useRouter();

const login = () => {
  router.push("/login");
};

// import { AuthenticateUserUseCase } from '@/auth/domain/useCases';


// async function coiso() {
//   try {
//     const authToken = await AuthenticateUserUseCase.execute(token);
//   } catch (error) {
//     console.error('Failed to authenticate:', error.message);
//   }
// }


</script>

<template>

  <div class="message-container">
    <Message class="message" v-if="!userStore.isAuthenticated" severity="info"
      :pt:text:style="'padding: 0 1vw ; display: flex; align-items: center'"> Now authenticated as guest
      <Button @click="login()" label="login" style="margin-left: 10px" />
    </Message>
  </div>

  <div class="container">

    <div class="user-info blue-whale-alpha"
      style="display: flex; flex-direction: column; height: 55vh; justify-content: space-around;">
      <img :src="useUserStore().imageUrl" style="width: 300px; height: 300px; border-radius: 50%;" />
      <p>username: <span style="font-weight: bold; font-size: 1vw; color: tomato">{{ useUserStore().username }}</span></p>
      <!-- logout button  -->
      <Button :disabled="!userStore.isAuthenticated" severity="danger" @click="userStore.setIsAuthenticated(false)" label="Logout" style=" align-self: flex-end; min-width: 40%;" icon="pi pi-sign-out" :pt:icon:style="'padding: 10% 10%'" />
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
  padding: 0 2vw;
  border-radius: 10px;
}

.user-info img:hover {
  border: 1px solid #193842;
}
</style>