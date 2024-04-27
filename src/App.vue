<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";

import Nav from "./components/NavbarComponent.vue";
import Footer from "./components/Footer.vue";
</script>

<template>
  <div class="vintage main">
    <div class="center">

      <Nav />
    </div>
    <router-view></router-view>
    <Footer />
  </div>
</template>

<style scoped>
@media screen and (min-width: 1000px) {
  .main {
    min-height: 100vh;
    padding: 0;
  }

  .center {
    display: flex;
    justify-content: center;
  }

}
</style>
