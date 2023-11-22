<script setup lang="ts">
const chatName = "Chat Name";
</script>

<template>
  <main class="card-container">
    <div class="title">
      <h2>{{ chatName }}</h2>
    </div>
    <div class="body">
      created by: user_name
    </div>
  </main>
</template>

<style scoped>

.card-container {
  background-color: rgba(9, 36, 43, 0.7);
  width: 15vw;
  height: 15vw;
  border-radius: 10%;
  margin: 10px;
}

.card-container:hover {
  box-shadow: rgba(240, 46, 170, 0.4) 5px 5px, rgba(240, 46, 170, 0.3) 10px 10px, rgba(240, 46, 170, 0.2) 15px 15px, rgba(240, 46, 170, 0.1) 20px 20px, rgba(240, 46, 170, 0.05) 25px 25px;
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
