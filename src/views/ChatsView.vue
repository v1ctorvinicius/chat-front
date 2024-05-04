<script setup lang="ts">
import { computed, onMounted, ref } from "vue";

import axios from "axios";

import ChatCard from "@/components/ChatCard.vue";
import type chat from "../types/chat";

import InputText from "primevue/inputtext";
import FloatLabel from "primevue/floatlabel";
import { useToast } from 'primevue/usetoast';

const toastSuccess = useToast();
const toastError = useToast();
const toastErrorNameTooLarge = useToast();

const chats = ref<chat[]>([]);
const selectedCard = ref<chat | null>(null);
let chatCount = 0;
let cardIndex = 0;

const newChatName = ref("");
const newChatPassword = ref("");
const modalTitle = ref("New chat");
const isModalVisible = ref(false);
const isNewChatPasswordInvalid = computed(() => newChatPassword.value.length > 50);
const isNewChatNameInvalid = computed(() => newChatName.value.length > 50);

const url: string = import.meta.env.VITE_API_BASE_URL;

//TODO: cachear a lista de chats
const axiosInstance = axios.create({ timeout: 10000 });
axiosInstance.get(url + "/api/chats/").then((res) => (chats.value = res.data));

const createChatLoading = ref(false);

// setInterval(() => {
//   axiosInstance.get(url + "/chats/").then((res) => chats.value = res.data);
// }, 10000);

const createChat = () => {
  createChatLoading.value = true;

  if (newChatName.value.length > 50) {
    toastErrorNameTooLarge.add({ severity: 'error', summary: 'Error', life: 0, detail: 'Chat name cannot be longer than 50 characters, got:  ' + newChatName.value.length });
    createChatLoading.value = false;
    return;
  }

  axiosInstance
    .post(url + "/api/chats/", { name: newChatName.value, password: newChatPassword.value, creator: "guest" })
    .then((res) => {
      createChatLoading.value = false;
      //TODO: check if res.data is valid
      showSuccessToast();
      newChatName.value = "";
      newChatPassword.value = "";
      isModalVisible.value = false;
    })
    .catch((err) => { console.error(err); createChatLoading.value = false; showErrorToast(err); });
};

const showSuccessToast = () => {
  toastSuccess.add({ severity: 'success', summary: 'Chat Created', life: 5000 });
};

const showErrorToast = (message: string) => {
  toastError.add({ severity: 'error', summary: 'Error', life: 0, detail: message });
};

function changeModalVisibility() {
  isModalVisible.value = !isModalVisible.value;
}

function handleKeyboardKeydown(event: KeyboardEvent) {

  if (event.repeat) return;
  if (event.key === "Escape") {
    isModalVisible.value = false;
    selectedCard.value = null;
  }
}

function modalCloseButtonHandler() {
  changeModalVisibility();
  selectedCard.value = null;
}

document.addEventListener("keydown", (event) => {
  handleKeyboardKeydown(event);
});
;
// document.addEventListener("keydown", (event) => handleKeyboardKeydown);

function showMenuInput() {

}

const showSearchInput = () => {

}


import io from "socket.io-client";

let socket = null;

socket = io(url)

socket.on("chatCreated", (res) => {
  chats.value = res;
})

</script>

<template>

  <div class="container text-white">


    <section class="chat-cards-section blue-whale-alpha" :class="{ 'empty': chats.length == 0 }">
      <div v-if="chats.length == 0">

        <h2>There are no chats 😐 </h2>

        <Button @click="changeModalVisibility" label="new chat" icon="pi pi-plus" severity="success"
          style="width: 100%; margin-top: 10%;" />

      </div>

      <main v-else>
        <div class="menu card flex justify-content-center" style="margin-bottom: 2vh;">
          <ButtonGroup>
            <Button icon="pi pi-plus" @click="changeModalVisibility" />
            <Button icon="pi pi-search" />
            <Button icon="pi pi-cog" />
          </ButtonGroup>
        </div>
        <div class="chat-cards-container">

          <ChatCard class="chat-card" v-for="chat in chats" @change-visible="" :chatObject="chat"
            @click="selectedCard = chat" :selected="selectedCard == chat" />

        </div>
      </main>
    </section>
  </div>

  <Dialog :visible="isModalVisible" modal :header="modalTitle" :pt:mask:style="{ 'backdrop-filter': 'blur(5px)' }"
    :pt:title:style="'color:tomato;'" :pt:header:style="'color: white;'"
    :pt:closeButton:onClick="modalCloseButtonHandler">
    <div class="d-flex flex-column justify-content-between" style="margin-top: 10px;">
      <FloatLabel class="float-label">
        <label for="new-chat-name-txt">Enter new chat name</label>
        <InputText :pt:root:autofocus="true" class="input-text" id="new-chat-name-txt" type="text"
          :invalid="isNewChatNameInvalid" v-model="newChatName" @keydown.enter="(event) => {
            if (event.repeat) return;
            createChat()
          }" />

      </FloatLabel>

      <FloatLabel class="float-label">
        <label for="new-chat-password-txt">Enter password</label>
        <InputText class="input-text" id="new-chat-password-txt" type="text" :invalid="isNewChatPasswordInvalid"
          v-model="newChatPassword" @keydown.enter="(event) => {
            if (event.repeat) return;
            createChat()

          }" />

      </FloatLabel>
    </div>
    <template #footer>
      <div class="p-d-flex p-jc-end">
        <Button @click="createChat" :loading="createChatLoading" label="Create" severity="success" icon="pi pi-check" />
      </div>
    </template>

  </Dialog>
  <Toast position="bottom-left" />
</template>

<style scoped>
a {
  color: white;
}

@media (min-width: 1200px) {

  .container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 10vh 5vw;
    /* border: 1px solid green; */
    min-height: 88vh;

  }

  .chat-cards-section {

    /* border: 1px solid red; */
    border-radius: 10px;
    padding: 2%;
    margin: 0 2%;
    flex-grow: 2;
    display: flex;
    flex-direction: column;
  }

  .empty {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .chat-cards-container {
    /* border: 1px solid blue; */
    display: grid;
    justify-items: center;
    /* align-items: center; */
    grid-template-columns: repeat(5, 1fr);
    gap: 1vw;

    box-sizing: border-box;
  }

  .chat-card {}

  #menu {
    /* border: 1px solid yellow; */
    margin: 0 2%;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
  }

  .float-label {
    margin-top: 10%;
  }

  .input-text {
    min-width: 20vw;
  }
}


@media (min-width: 768px) and (max-width: 979px) {
  .container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 8vh 5vw;
    min-height: 50vh;

  }

  .chat-cards-section {

    border-radius: 10px;
    padding: 2%;
    margin: 0 2%;
    flex-grow: 2;
    display: flex;
    flex-direction: column;
  }

  .empty {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .chat-cards-container {
    /* border: 10px solid blue; */
    display: grid;
    justify-items: center;
    /* align-items: center; */
    grid-template-columns: repeat(3, 1fr);
    gap: 3vw;
    padding: 0 2vw 5vh 2vw;
  }

  .chat-card {}

  .menu {
    margin: 1vh 2vw;
    border-radius: 10px;
    display: flex;
    justify-content: flex-end;
  }

  .float-label {
    margin-top: 10%;
  }

  .input-text {
    min-width: 20vw;
  }
}

@media (max-width: 767px) {

  .container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 8vh 5vw;
    min-height: 50vh;

  }

  .chat-cards-section {

    border-radius: 10px;
    padding: 2%;
    margin: 0 2%;
    flex-grow: 2;
    display: flex;
    flex-direction: column;
  }

  .empty {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .chat-cards-container {
    /* border: 10px solid blue; */
    display: grid;
    justify-items: center;
    /* align-items: center; */
    grid-template-columns: repeat(2, 1fr);
    gap: 3vw;
    padding: 0 2vw 5vh 2vw;
  }

  .chat-card {}

  .menu {
    margin: 1vh 2vw;
    border-radius: 10px;
    display: flex;
    justify-content: flex-end;
  }

  .float-label {
    margin-top: 10%;
  }

  .input-text {
    min-width: 20vw;
  }
}





@media (max-width: 480px) {
  .menu {
    margin-top: 1vh;
    margin-right: 2vw;
    display: flex;
    justify-content: end;
  }

  .container {
    display: flex;
    flex-direction: column;
    flex-grow: 2;
    justify-content: space-between;
    margin: 9vh 2vw;
    /* border: 1px solid green; */
    min-height: 89vh;

  }

  .chat-cards-container {
    /* border: 10px solid tomato; */
    padding: 0 2vw 5vh 2vw;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 3vw;
    /* justify-items: center; */
    /* align-items: center; */
    /* box-sizing: border-box; */

  }

  .chat-cards-section {
    border-radius: 10px;

    margin: 0;
    flex-grow: 2;
    display: flex;
    flex-direction: column;
  }

}
</style>
