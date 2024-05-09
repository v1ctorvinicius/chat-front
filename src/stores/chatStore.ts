import type Chat from "@/types/chat";
import { defineStore } from "pinia";
import { ref } from "vue";
import axiosInstance from "@/plugins/axiosConfig";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export const useChatStore = defineStore("chatStore", () => {
  const chats = ref<Chat[]>([]);
  const openChats = ref<Chat[]>([]);

  function updateChats() {
    axiosInstance
      .get(apiBaseUrl + "/chats/")
      .then((data) => (chats.value = data.data));
  }

  function removeOpenChat(chat: Chat) {
    const index = openChats.value.findIndex((c) => c.id === chat.id);
    if (index !== -1) {
      openChats.value.splice(index, 1);
    }
  }

  return { openChats, removeOpenChat, chats, updateChats };
});
