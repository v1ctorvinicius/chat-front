<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";

import Nav from "./components/NavbarComponent.vue";
import Footer from "./components/Footer.vue";
</script>

<template>
  <div class="vintage main">
    <div class="center">
      <Nav class="nav" style="" />
    </div>
    <router-view></router-view>
    <div class="footer">
      <Footer />

    </div>
  </div>
</template>

<style scoped>
@media (min-width: 1200px) {
  .main {
    min-height: 100vh;
    padding: 0;
  }

  .center {

    display: flex;
    justify-content: center;
  }

  .nav {
    margin-top: 1vh;
  }
}

@media (max-width: 767px) {
  .main {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    min-height: 100vh;
    padding: 0;
  }
}

@media (min-width: 768px) and (max-width: 979px) {
  .main {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    min-height: 100vh;
    padding: 0;
  }
}

@media (max-width: 480px) {
  .center {}

  .main {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    min-height: 100vh;
    padding: 0;
  }

  .nav {
    padding: 0;
    margin: 0;
  }
}
</style>
