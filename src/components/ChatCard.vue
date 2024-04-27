<script setup lang="ts">
import type chat from "../types/chat";

const props = defineProps({
  chatObject: Object as () => chat,
  selected: Boolean
});

const emit = defineEmits(["changeVisible"]);

function cardClickHandler() {
  emit("changeVisible", props.chatObject?.name);
}
</script>

<template>
  <Card style=" width: 15vw; max-height: 35vh; overflow: hidden" @click="cardClickHandler()"
    class="card-container my-fadein" :class="{ 'selected': props.selected }">
    <template #header>
      <img alt="user header" src="https://primefaces.org/cdn/primevue/images/usercard.png" style="width: 100%; " />
    </template>

    <template #title>{{ props.chatObject?.name }}</template>
    <template #subtitle>created by: user_name</template>
    <template #content>
      <p class="m-0">
        lorem ipsum dolor sit amet <br>
      </p>
    </template>
    <template #footer>
      <!-- <div class="flex gap-3 mt-1">
        <Button label="Cancel" severity="secondary" outlined class="w-full" />
        <Button label="Save" class="w-full" />
      </div> -->
    </template>
  </Card>

</template>

<style scoped>
.card-container {
  background-color: rgba(2, 7, 8, 0.7);
  margin: 10px 0;
}

.card-container:hover {
  animation: fadein 0.4s ease forwards;
  cursor: pointer;
}

.card-container:not(:hover) {
  animation: fadeout 1.4s ease forwards;
}

.selected {
  transform: translate3d(-5px, -5px, 0) !important;
  box-shadow: rgba(240, 46, 170, 0.4) 5px 5px, rgba(240, 46, 170, 0.3) 10px 10px,
    rgba(240, 46, 170, 0.2) 15px 15px, rgba(240, 46, 170, 0.1) 20px 20px,
    rgba(240, 46, 170, 0.05) 25px 25px !important;
}

@keyframes fadein {
  100% {
    transform: translate3d(-5px, -5px, 0);
    box-shadow: rgba(240, 46, 170, 0.4) 5px 5px, rgba(240, 46, 170, 0.3) 10px 10px,
      rgba(240, 46, 170, 0.2) 15px 15px, rgba(240, 46, 170, 0.1) 20px 20px,
      rgba(240, 46, 170, 0.05) 25px 25px;
  }
}

@keyframes fadeout {
  from {
    transform: translate3d(-5px, -5px, 0);
    box-shadow: rgba(240, 46, 170, 0.4) 5px 5px, rgba(240, 46, 170, 0.3) 10px 10px,
      rgba(240, 46, 170, 0.2) 15px 15px, rgba(240, 46, 170, 0.1) 20px 20px,
      rgba(240, 46, 170, 0.05) 25px 25px;
  }

  to {
    transform: translate3d(0, 0, 0);
    box-shadow: none;
  }
}
</style>
