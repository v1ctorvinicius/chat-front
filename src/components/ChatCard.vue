<script setup lang="ts">
import type chat from "../types/chat";

const props = defineProps({
  chatObject: Object as () => chat,
  selected: Boolean
});

const emit = defineEmits(["chatCardClick"]);

function cardClickHandler() {
  emit("chatCardClick", props.chatObject);  
}
</script>

<template>
  <Card style=" width: 15vw; max-height: 35vh; overflow: hidden" @click="cardClickHandler()" class="card-container my-fadein" :class="{ 'selected': props.selected }" :pt:root:style="' width: 100%; border-radius: 8px'" :pt:footer:Style="'position: absolute; top : 10%; color: lightgreen'">
    <template #header>
      <img alt="user header" src="https://primefaces.org/cdn/primevue/images/usercard.png" style="width: 100%; " />
      <!-- <img alt="user header"  src="https://picsum.photos/500/200" style="max-height: 100%; width: 100%; overflow: hidden;" /> -->
    </template>

    <template #title>{{ props.chatObject?.name }}</template>
    <template #subtitle>created by: user_name</template>
    <template #content>
      <p class="m-0">
        lorem ipsum dolor sit amet <br>
      </p>
    </template>
    <template #footer>
      <p>online: 0 </p>
    </template>
  </Card>

</template>

<style scoped>
.card-container {
  background-color: rgba(2, 7, 8, 0.7);
  margin: 0;
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

@media (max-width: 480px) {
  .card-container {
    /* width: 200px; */
    /* border: 5px solid cyan; */
    width: 100%;
    height: 500px;
    margin: 0;
  }

}
</style>
