<template>
  <div style="padding: 15px;">
    <img :src="imgUrl" style="width: 50px; height: 50px;" />
    <h3>{{message?.username}} :~$ {{ message?.content }}</h3>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import type Message from "../types/message";

const message = ref<Message>();
const imgUrl = `https://picsum.photos/50?random=${Math.random()}`;

const props = defineProps({
  message: Object as () => Message
})

onMounted(() => {
  message.value = props.message!
})
</script>