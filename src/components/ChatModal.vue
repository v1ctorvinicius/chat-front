<script setup lang="ts">
import type Chat from '@/types/chat';
import { useChatStore } from '@/stores/chatStore';
import useUserStore from '@/stores/userStore';
import { onMounted, ref } from 'vue';
import type message from '@/types/message';

import Message from './Message.vue';
import axiosInstance from '@/plugins/axiosConfig';
import { watch } from 'vue';

const apiBaseUrl: string = import.meta.env.VITE_API_BASE_URL;

const props = defineProps(['visible', 'chat', 'socket']);
const emit = defineEmits(['closeModal']);

const visible = ref(props.visible);

const chatStore = useChatStore();
const userStore = useUserStore();

const draft = ref("");
const messages = ref<message[]>(props.chat.messages);

const socket = props.socket;

onMounted(() => {
  axiosInstance.get(apiBaseUrl + "/chats/" + props.chat.id + "/messages").then((res) => {
    messages.value = res.data;
  })
})

socket.on("chatupdated", (data: any) => {
  if (data.id !== props.chat.id) return;
  const newMessageContent = data.messages[data.messages.length - 1];
  messages.value.push(newMessageContent);
});

const sendMessage = (chatId: string) => {
  let newMessage: message = {
    chatId: chatId,
    userId: userStore.userId,
    content: draft.value,
    username: userStore.username,
    userImg: userStore.imageUrl,
    timestamp: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
  }

  socket.emit("message", newMessage);
  draft.value = "";
}

const closeModal = () => {
  chatStore.removeOpenChat(props.chat);
}

const notMaximized = ref(true);

</script>

<template>
  <!-- modal for opening chat -->

  <!-- "sidebar how to remove mask"  -->
  <!--  -->
  <!--  -->
  <!--  https://forum.primefaces.og/viewtopic.php?t=60072 -->
  <!--  -->

  <div style="position: absolute; top: 0;">

    <Dialog @maximize="notMaximized = false" @unmaximize="notMaximized = true" style="min-width: 25vw;" maximizable
      autoZIndex :position="'bottom'" :visible="visible" :modal=false :header="props.chat.name"
      :pt:title:style="'color:tomato;'" :pt:header:style="'color: white;'"
      :pt:content:style="' background-color: #0F0F12; display: flex; flex-direction: column-reverse; min-height: 10vh;'"
      :pt:footer:style="'display:flex; flex-direction: column; padding: 10px;'" :pt:closeButton:onClick="closeModal">

      <div class="messages-container" :class="notMaximized ? 'not-maximized' : ''">
        <Message v-for="message in messages" :message="message" />
      </div>

      <template #footer>
        <div style=" display: flex; justify-content: center;">
          <InputText style="flex-grow: 2; margin: 0; padding: 3%; width: 10px;" v-model="draft" type="text"
            :pt:root:autofocus="true" :invalid="false"
            :pt:root:style="' height: 10vh; padding: 1vw; border: 1px solid tomato;'"
            @keydown.enter="($event) => { if ($event.repeat) return; sendMessage(chat.id) }" />
          <Button @click="sendMessage(chat.id)" :loading="false" label="Send" severity="success" icon="pi pi-send" />
        </div>
      </template>
    </Dialog>
  </div>
</template>

<style scoped>
.not-maximized {
  max-width: 45vw;
}
</style>
