<script setup lang="ts">
const props = defineProps({
  chatName: String,
});

const emit = defineEmits(["changeVisible"]);

function cardClickHandler() {
  emit("changeVisible");
}
</script>

<template>
  <div @click="cardClickHandler">

    <main class=" card-container">
      <div class="title">
        <h3>{{ props.chatName }}</h3>
      </div>
      <div class="body">created by: user_name</div>
    </main>
  </div>
</template>

<style scoped>
.card-container {
  background-color: rgba(9, 36, 43, 0.7);
  width: 14vw;
  height: 14vw;
  border-radius: 10%;
  margin: 10px;
}

.card-container:hover {
  box-shadow: rgba(240, 46, 170, 0.4) 5px 5px, rgba(240, 46, 170, 0.3) 10px 10px,
    rgba(240, 46, 170, 0.2) 15px 15px, rgba(240, 46, 170, 0.1) 20px 20px,
    rgba(240, 46, 170, 0.05) 25px 25px;
  transform: translate3d(-5px, -5px, 0);
}

.title {
  height: 10vh;
  width: 50%;
  padding: 1%;
}

.body {
  padding: 1%;
}
</style>
