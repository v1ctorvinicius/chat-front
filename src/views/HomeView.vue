<script setup lang="ts">
import { ref } from "vue";
import ChatRoomCard from "@/components/ChatRoomCard.vue";
import { NButton, NInput } from "naive-ui";
import axios from "axios";
import type ChatRoom from "../types/ChatRoom";

let chats = ref<ChatRoom[]>([]);
let chatCount = 0;
let newRoomName = "";

axios.get("http://localhost:8081/chats/").then((res) => (chats.value = res.data));

const createChat = () => {
  axios.post("http://localhost:8081/chats/", { name: newRoomName }).then((res) => {
    chats.value.push(res.data);
  });
  console.log("chats: ", chats.value[0]);
};
</script>

<template>
  <div class="text-white">
    
    <header>
      <h1 class="blue-whale-alpha margin-5 padding-3 border-radius-10">
        Web Chat Home
      </h1>
    </header>
    <main id="rooms" class="blue-whale-alpha padding-3 margin-5 border-radius-10">
      <h2>Chats:</h2>
      <section class="chats-container">
        <ChatRoomCard v-for="chat in chats" :chatName="chat.name" />
      </section>
    </main>
    <section id="create" class="blue-whale-alpha margin-5">
      <table>
        <tr>
          <td>
            <input type="text" v-model="newRoomName">
            <n-button @click="createChat" type="info"> Criar chat </n-button>
          </td>
          <td>
            <a href="">buscar</a>
          </td>
        </tr>
      </table>
    </section>
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

.border-radius-10 {
  border-radius: 10px;
}

.margin-5 {
  margin: 0 5vw 2vw 5vw;
}

.padding-3 {
  padding: 3vw;
}

.borda {
  border: 1px solid red;
}
</style>
