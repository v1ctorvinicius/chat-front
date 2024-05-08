<template>
  <div style="padding: 15px;">
    <h3>{{ message?.content }}</h3>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import type Message from "../types/message";

const message = ref<Message>();

const props = defineProps({
  message: Object as () => Message
})

onMounted(() => {
  message.value = props.message!
})
</script>