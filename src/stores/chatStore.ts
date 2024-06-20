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
      .then((response) => {
        const newData = response.data as Chat[]; // Asserting the response type
        const currentChats = chats.value;

        const newChats = newData.filter((chat) => {
          return !currentChats.some(
            (currentChat) => currentChat.id === chat.id
          );
        });

        console.log("newChats: ", newChats);

        if (newChats.length > 0) {
          chats.value.push(...newChats);
        }
      })
      .catch((error) => {
        console.error("Erro ao obter dados:", error);
      });
  }

  function closeChat(chat: Chat) {
    const index = openChats.value.findIndex((c) => c.id === chat.id);
    if (index !== -1) {
      openChats.value.splice(index, 1);
    }
  }

  return { openChats, closeChat, chats, updateChats };
});
