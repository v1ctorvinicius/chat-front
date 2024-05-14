<template>
  <div style="padding: 15px;">
    <img :src="userImg" style="width: 50px; height: 50px; border-radius: 50%;" />
    <h3>{{message?.username}} :~$ {{ message?.content }}</h3>
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