<template>
  <div style="padding: 15px;">
    <h3>{{ message }}</h3>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

const message = ref("");

const props = defineProps({
  message: String
})

onMounted(() => {
  message.value = props.message!
})
</script>