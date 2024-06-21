<script setup lang="ts">
import { computed, watch } from "vue";
import { useForumStore } from "@/stores/forumStore";
import type { Forum } from "@/types/forum";


const props = defineProps({
  forumObject: Object as () => Forum,
});

const emit = defineEmits(["forumCardClick"]);

const forumStore = useForumStore();

function forumClickHandler() {
  emit("forumCardClick", props.forumObject);
}


// const selectedCards = computed(() => chatStore.openChats);
// const selected = computed(() => selectedCards.value.includes(props.chatObject!));
// watch(selected, () => {
//   // console.log(`${props.chatObject?.name} selected: `, selected.value);
//   console.log(`${props.chatObject?.name} props.selected: `, props.selected);
// })
</script>

<template>
  <Card style=" width: 15vw; min-height: 30vh; overflow: hidden" @click="forumClickHandler"
    class="card-container my-fadein" :pt:root:style="' width: 100%; border-radius: 8px'"
    :pt:footer:Style="'position: absolute; top : 10%; color: lightgreen'">
    <template #header>
      <img alt="user header" src="https://primefaces.org/cdn/primevue/images/usercard.png" style="width: 100%; " />
      <!-- <img alt="user header"  src="https://picsum.photos/500/200" style="max-height: 100%; width: 100%; overflow: hidden;" /> -->
    </template>

    <template #title>{{ props.forumObject?.name }}</template>
    <!-- <template #subtitle>Description: <span style="color: tomato;">{{ props.forumObject?.description }}</span></template> -->
    <template #content>
      <p class="m-0">
        {{ props.forumObject?.description }} <br>
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
  max-height: 10vh;
}

.card-container:hover {
  animation: fadein 0.4s ease forwards;
  cursor: pointer;
}

.card-container:not(:hover) {
  animation: fadeout 1.4s ease forwards;
}

/* .selected:hover {
  box-shadow: rgba(236, 233, 4, 0.5) 5px 5px, rgba(24, 187, 65, 0.4) 10px 10px,
    rgba(51, 211, 2, 0.3) 15px 15px, rgba(46, 240, 208, 0.2) 20px 20px,
    rgba(139, 106, 231, 0.2) 25px 25px !important;
} */

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
