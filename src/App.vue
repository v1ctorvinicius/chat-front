<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import HomeView from "./views/HomeView.vue";
import Nav from "./components/Nav.vue";
import Footer from "./components/Footer.vue";
</script>

<template>
  <div class="vintage">
    <Nav />
    <HomeView class="home-view" />
    <Footer />
  </div>
</template>

<style scoped>
.home-view {
  margin: 2vh;
}
</style>
