<script setup lang="ts">
import { computed, ref } from "vue";

import axios from "axios";

import ChatCard from "@/components/ChatCard.vue";
import type chat from "../types/chat";

import InputText from "primevue/inputtext";
import FloatLabel from "primevue/floatlabel";
import { useToast } from 'primevue/usetoast';
import process from "process";

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

const url: string = process.env.VITE_API_BASE_URL;
console.log('url: ' + url);

//TODO: cachear a lista de chats
const axiosInstance = axios.create({ timeout: 10000 });
axiosInstance.get(url + "/chats/").then((res) => (chats.value = res.data));

const createChatLoading = ref(false);
const createChat = () => {
  createChatLoading.value = true;

  if (newChatName.value.length > 50) {
    toastErrorNameTooLarge.add({ severity: 'error', summary: 'Error', life: 0, detail: 'Chat name cannot be longer than 50 characters, got:  ' + newChatName.value.length });
    createChatLoading.value = false;
  }

  axiosInstance
    .post(url + "/chats/", { name: newChatName.value, password: newChatPassword.value })
    .then((res) => {
      chats.value.push(res.data);
      showSuccessToast();
      createChatLoading.value = false;
      newChatName.value = "";
      newChatPassword.value = "";
    })
    .catch((err) => { console.error(err); showErrorToast(err) });
};

const showSuccessToast = () => {
  toastSuccess.add({ severity: 'success', summary: 'Chat Created', life: 5000 });
};

const showErrorToast = (message: string) => {
  toastError.add({ severity: 'error', summary: 'Error', life: 0, detail: message });
};



function changeModalVisible() {
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
  changeModalVisible();
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

</script>

<template>

  <div class="container text-white">


    <section class="chat-cards-section blue-whale-alpha" :class="{ 'empty': chats.length == 0 }">
      <div v-if="chats.length == 0">

        <h2>There are no chats 😐 </h2>

        <Button @click="changeModalVisible" label="new chat" icon="pi pi-plus" severity="success"
          style="width: 100%; margin-top: 10%;" />

      </div>

      <main v-else>
        <div class="menu card flex justify-content-center" style="margin-bottom: 2vh;">
          <ButtonGroup>
            <Button icon="pi pi-plus" @click="changeModalVisible" />
            <Button icon="pi pi-search" />
            <Button icon="pi pi-cog" />
          </ButtonGroup>
        </div>
        <div class="chat-cards-container">

          <ChatCard class="chat-card" v-for="chat in chats" @change-visible="" :chatObject="chat"
            @click="selectedCard = chat" :selected="selectedCard == chat" />

        </div>
      </main>

      <!-- <section id="menu" class="blue-whale-alpha ">
        <InputText type="text" v-model="newChatName" placeholder="Enter chat name" @keydown="handleKeyboardKeypess" />
  
        <Button @click="createChat" label="create chat" icon="pi pi-plus" severity="success" />
      </section> -->
    </section>



  </div>

  <Dialog :visible="isModalVisible" modal :header="modalTitle" :pt:mask:style="{ 'backdrop-filter': 'blur(5px)' }"
    :pt:title:style="'color:tomato;'" :pt:header:style="'color: white;'"
    :pt:closeButton:onClick="modalCloseButtonHandler">
    <div class="d-flex flex-column justify-content-between" style="margin-top: 10px;">
      <FloatLabel class="float-label">
        <label for="new-chat-name-txt">Enter new chat name</label>
        <InputText class="input-text" id="new-chat-name-txt" type="text" :invalid="isNewChatNameInvalid"
          v-model="newChatName" @keydown.enter="(event) => {
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

@media screen and (min-width: 1000px) {

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
    align-items: center;
    grid-template-columns: repeat(5, 1fr);

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

.border-radius-10 {
  border-radius: 10px;
}
</style>
