import type Chat from "@/types/chat";
import { defineStore } from "pinia";
import { ref } from "vue";
import axiosInstance from "@/plugins/axiosConfig";
import { arraysEqual } from "@/util/arrays";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export const useChatStore = defineStore("chatStore", () => {
  const chats = ref<Chat[]>([]);
  const openChats = ref<Chat[]>([]);

  function updateChats() {
    axiosInstance
      .get(apiBaseUrl + "/chats/")
      .then((response) => {
        const newData = response.data; // Novos dados da API

        // Converter 'chats.value' de 'Proxy' para um array simples
        const currentChats = Array.from(chats.value);

        // Verificar se os novos dados são diferentes dos dados atuais
        if (!arraysEqual(currentChats, newData)) {
          chats.value = newData; // Atualizar o estado apenas se os dados forem diferentes
          // console.log("Dados atualizados:", chats.value);
        } else {
          console.log("Dados não mudaram.");
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
