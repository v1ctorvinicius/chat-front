<template>
  <div class="container">
    <img :src="userImg" />
    <h3>{{ message?.username }}:~$ {{ message?.content }}</h3>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import type Message from "../types/message";
import useUserStore from "@/stores/userStore";

const props = defineProps({
  message: Object as () => Message
})

onMounted(() => {
  message.value = props.message!
  userImg.value = props.message?.userImg
})

const message = ref<Message>();

const userStore = useUserStore();
//TODO: save image client-side so I don't need to get it everytime
const userImg = ref<string | undefined>("");// = message.value?.userImg;


</script>

<style scoped>
.container {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  text-align: justify;
  word-break: break-all;
  margin-bottom: 1%;
  
  
  padding: 1%;
  
}

img {
  width: 60px;
  border-radius: 50%;
  margin-right: 2%;
}
</style>