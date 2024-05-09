import type Chat from "@/types/chat";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useChatStore = defineStore("chatStore", () => {
  const chats = ref<Chat[]>([]);
  const openChats = ref<Chat[]>([]);

  function removeOpenChat(chat: Chat) {
    const index = openChats.value.findIndex((c) => c.id === chat.id);
    if (index !== -1) {
      openChats.value.splice(index, 1);
    }
  }

  return { openChats, removeOpenChat, chats };
});
