import type Chat from "@/types/chat";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useChatStore = defineStore("chatStore", () => {
  const openChats = ref<Chat[]>([]);

  function removeOpenChat(chat: Chat) {
    openChats.value = openChats.value.filter((c) => c.id != chat.id);
  }

  return { openChats, removeOpenChat };
});
