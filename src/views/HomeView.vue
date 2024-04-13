<script setup lang="ts">
import { ref } from "vue";

import axios from "axios";
import ChatCard from "@/components/ChatCard.vue";
import type chat from "../types/chat";

let chats = ref<chat[]>([]);
let chatCount = 0;
let newChatName = "";
const visible = ref(false);

axios.get("http://localhost:8080/chats/").then((res) => (chats.value = res.data));

const createChat = () => {
  axios.post("http://localhost:8080/chats/", { name: newChatName }).then((res) => {
    chats.value.push(res.data);
  }).catch((err) => console.error(err));
};

const changeVisibleHandler = () => {
  visible.value = !visible.value
  console.log(visible.value);

}
</script>

<template>
  <div class="text-white vintage">

    <header>
      <h1 class="blue-whale-alpha margin-5 padding-3 border-radius-10">
        Web Chat Home
      </h1>
    </header>
    <main id="rooms" class="blue-whale-alpha padding-3 margin-5 border-radius-10">
      <h2>Chats:</h2>
      <section class="chats-container">
        <ChatCard v-for="chat in chats" :chatName="chat.name" @change-visible="changeVisibleHandler" />
      </section>
    </main>
    <section id="create" class="blue-whale-alpha margin-5">
      <table>
        <tr>
          <td>
            <input type="text" v-model="newChatName">
            <Button @click="createChat" label="create chat" icon="pi pi-plus" severity="success" />
          </td>
          <td>
            <a href="">buscar</a>
          </td>
        </tr>
      </table>
    </section>
  </div>

  <Dialog :visible="visible" modal :closable="true" header="chat modal" :style="{ width: '25rem' }">
    <div class="p-fluid">
      <div class="p-field">
        <label for="messageInput">Digite sua mensagem:</label>
      </div>
    </div>
    <template #footer>
      <div class="p-d-flex p-jc-end">
        <Button label="Enviar" icon="pi pi-send" />
        <Button label="Fechar" icon="pi pi-times" class="p-button-secondary" />
      </div>
    </template>

  </Dialog>
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
../types/chat