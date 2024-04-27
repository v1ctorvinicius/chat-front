<script setup lang="ts">
import { ref, watch } from "vue";

import axios from "axios";

import ChatCard from "@/components/ChatCard.vue";
import type chat from "../types/chat";

import { useToast } from 'primevue/usetoast';
const toastSuccess = useToast();
const toastError = useToast();
const toastErrorNameTooLarge = useToast();

const chats = ref<chat[]>([]);
const selectedCard = ref<chat | null>(null);
let chatCount = 0;
let cardIndex = 0;

let newChatName = "";
const modalChatName = ref("");
const modalVisibility = ref(false);
const newMessage = ref("");

const url: string = import.meta.env.VITE_API_BASE_URL
//TODO: cachear a lista de chats
axios.get(url + "/chats/").then((res) => (chats.value = res.data));

const createChat = () => {
  if (newChatName.length > 50) {
    toastErrorNameTooLarge.add({ severity: 'error', summary: 'Error', life: 0, detail: 'Chat name cannot be longer than 50 characters, got:  ' + newChatName.length });
    return
  }

  axios.post(url + "/chats/", { name: newChatName }).then((res) => {
    chats.value.push(res.data);
    showSuccessToast();
  }).catch((err) => { console.error(err), showErrorToast() });
};

const showSuccessToast = () => {
  toastSuccess.add({ severity: 'success', summary: 'Chat Created', life: 5000 });
};

const showErrorToast = () => {
  toastError.add({ severity: 'error', summary: 'Error', life: 0 });
};

function changeVisibleHandler(chatName: string) {
  modalVisibility.value = !modalVisibility.value;
  modalChatName.value = chatName;
}

function changeModalVisibility() {
  modalVisibility.value = !modalVisibility.value;
}

function handleKeyboardKeypess(event: KeyboardEvent) {
  if (event.key === "Escape" && modalVisibility.value == true) {
    changeModalVisibility();
    selectedCard.value = null;
  }

  if (event.key === "Enter" && modalVisibility.value == false) {
    createChat();
  }
}

function modalCloseButtonHandler() {
  changeModalVisibility();
  selectedCard.value = null;
}

document.addEventListener("keydown", handleKeyboardKeypess);

const items = ref([
  {
    label: "Forums",
    icon: "pi pi-user-edit"
  },
  {
    label: "Chats",
    icon: "pi pi-comments",
  },
  {
    label: "Radio",
    icon: "pi pi-headphones",
  }
])
</script>

<template>

  <div class="text-white vintage">

    <header>
      <Menubar
        :pt="{ icon: (options) => ({ style: { 'margin-right': '15%' } }), menuitem: (options) => ({ style: { 'display': 'flex', 'justify-content': 'center', 'width': '10vw' } }), label: (options) => ({ style: { 'margin-right': '15px' } }) }"
        :model="items" class="blue-whale-alpha margin-5 border-radius-10" />
    </header>
    <main id="rooms" class="blue-whale-alpha padding-3 margin-5 border-radius-10">
      <h2 v-if="chats.length == 0">There are no chats 😐 </h2>
      <section class="chats-container">
        <ChatCard class="h-2rem" v-for="chat in chats" @change-visible="changeVisibleHandler" :chatObject="chat"
          @click="selectedCard = chat" :selected="selectedCard == chat" />

      </section>
    </main>
    <section id="create" class="blue-whale-alpha margin-5">
      <table>
        <tr>
          <td>
            <InputText type="text" v-model="newChatName" placeholder="Enter chat name"
              @keydown="handleKeyboardKeypess" />

            <Button @click="createChat" label="create chat" icon="pi pi-plus" severity="success" />
          </td>
          <td>
            <a href="">buscar</a>
          </td>
        </tr>
      </table>
    </section>
  </div>

  <Dialog :visible="modalVisibility" modal maximizable :header="modalChatName"
    :pt:mask:style="{ 'backdrop-filter': 'blur(5px)' }" :pt:title:style="'color:tomato;'"
    :pt:header:style="'color: white;'" :pt:closeButton:onClick="modalCloseButtonHandler">
    <h2 style="margin: 0 0 20px 0;">{{ selectedCard }} </h2>
    <div class="p-fluid">
      <div class="p-field">
        <FloatLabel>
          <Textarea v-model="newMessage" rows="5" cols="30" />
          <label>Enter your message</label>
        </FloatLabel>
      </div>
    </div>
    <template #footer>
      <div class="p-d-flex p-jc-end">
        <Button label="Enviar" icon="pi pi-send" />
      </div>
    </template>

  </Dialog>
  <!-- TODO: remove style -->
  <Toast position="bottom-left" />
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
</style>
