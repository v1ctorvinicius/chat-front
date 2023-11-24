<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import HomeView from "./views/HomeView.vue";
import Nav from "./components/Nav.vue";
import Footer from "./components/Footer.vue";
</script>

<template>
    <router-view class="vintage main"></router-view>
</template>

<style scoped>
.home-view {
  margin: 2vw;
}

.main {
  min-height: 100vh;
  border: 1px solid blue;
}

.flex {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  border: 1px solid red;

}
</style>
