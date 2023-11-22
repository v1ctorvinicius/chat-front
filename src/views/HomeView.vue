<script setup lang="ts">
import { ref } from "vue";
import Footer from "../components/Footer.vue";
import ChatRoomCard from "@/components/ChatRoomCard.vue";
import { NButton, affixProps } from "naive-ui";
let chats = ref([]);

function createChat () {
  
}


</script>

<template>
  <div class="vintage text-white">
    <header>
      <h1 class="blue-whale-alpha padding-3 margin-5">Web Chat Home</h1>
    </header>
    <main id="rooms" class="blue-whale-alpha padding-3 margin-5">
      <h2>Salas:</h2>
      <section class="chats-container">
        <ChatRoomCard />
        <ChatRoomCard />
        <ChatRoomCard />
        <ChatRoomCard />
        <ChatRoomCard />
        <ChatRoomCard />
        <ChatRoomCard />
        <ChatRoomCard />
        <ChatRoomCard />
        <ChatRoomCard />
        <ChatRoomCard />
        <ChatRoomCard />
        <ChatRoomCard />
        <ChatRoomCard />
        <ChatRoomCard />
        <ChatRoomCard />
        <ChatRoomCard />
        <ChatRoomCard />
        <ChatRoomCard />
        <ChatRoomCard />
      </section>
    </main>
    <section id="create" class="blue-whale-alpha margin-5">
      <table>
        <tr>
          <td>
            <n-button @click="createChat()" type="info" > Criar sala </n-button>
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

.chats-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

ChatRoomCard {
  margin: 10px;
}
</style>
