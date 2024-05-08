<script setup lang="ts">
import type Chat from '@/types/chat';
import { useChatStore } from '@/stores/openChatsStore';
import { useUserStore } from '@/stores/userStore';
import { onMounted, ref } from 'vue';
import type message from '@/types/message';
import io from "socket.io-client";
import Message from './Message.vue';

const props = defineProps(['visible', 'chat']);
const visible = ref(props.visible);

const chatStore = useChatStore();
const userStore = useUserStore();

const socket = io(import.meta.env.VITE_BASE_URL);

const draft = ref("");
const messages = ref<message[]>(props.chat.messages);

const sendMessage = (chatId: string) => {

  console.log("abertos: ", chatStore.openChats);


  let newMessage: message = {
    chatId: chatId,
    userId: userStore.userId,
    content: draft.value,
    username: userStore.username,
    timestamp: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
  }

  socket.emit("message", newMessage);
  messages.value.push(newMessage);
  draft.value = "";
}

const closeModal = () => {
  chatStore.removeOpenChat(props.chat);
}

</script>

<template>
  <!-- modal for opening chat -->

  <!-- "sidebar how to remove mask"  -->
  <!--  -->
  <!--  -->
  <!--  https://forum.primefaces.og/viewtopic.php?t=60072 -->
  <!--  -->
  <Dialog :position="'bottom'" :visible="visible" :modal=false :header="props.chat.name" :pt:title:style="'color:tomato;'"
    :pt:header:style="'color: white;'" :pt:content:style="'padding-top: 10px; display: flex; flex-direction: column;'"
    :pt:closeButton:onClick="closeModal">

    <div class="messages-container">
      <Message v-for="message in messages" :message="message" />
    </div>
    <div style="display: flex;">
      <InputText v-model="draft" class="input-text" id="new-chat-name-input-text" type="text" :pt:root:autofocus="true"
        :invalid="false" @keydown.enter="($event) => { if ($event.repeat) return; sendMessage(chat.id) }" />
      <Button @click="sendMessage(chat.id)" :loading="false" label="Send" severity="success" icon="pi pi-send" />
    </div>
    <template #footer></template>
  </Dialog>
</template>
