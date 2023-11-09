<script setup lang="ts">
import { ref } from "vue";
import Footer from "../components/Footer.vue";
let chats = ref([]);
</script>

<template>
  <div class="vintage text-white">
    <header>
      <h1 class="blue-whale-alpha padding-3 margin-5">Web Chat Home</h1>
    </header>
    <main id="rooms" class="blue-whale-alpha padding-3 margin-5">
      <h2>Salas:</h2>
      <div></div>
    </main>
    <section id="create" class="blue-whale-alpha margin-5">
      <table>
        <tr>
          <td>
            <a href="">criar</a>
          </td>
          <td>
            <a href="">buscar</a>
          </td>
        </tr>
      </table>
    </section>
    <Footer />
  </div>
</template>

<style scoped>
a {
  color: white;
}
</style>
