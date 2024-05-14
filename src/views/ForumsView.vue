<script setup lang="ts">
import { ref } from "vue";
const forumStore = ref(0);

const showCreateForumModal = () => {
  showCreateForumModal
}


</script>

<template>
  <div class="container text-white">
    <section class="chat-cards-section blue-whale-alpha" :class="{ 'empty': forumStore == 0 }">
      <div v-if="forumStore == 0">
        <h2>There are no forums 😐 </h2>
        <Button @click="showCreateForumModal" label="new chat" icon="pi pi-plus" severity="success"
          style="width: 100%; margin-top: 10%;" />
      </div>

      <!-- <main v-else>
        <div class="menu card flex justify-content-center" style="margin-bottom: 2vh;">
          <ButtonGroup>
            <Button icon="pi pi-plus" @click="changeCreateChatModalVisibility" />
            <Button icon="pi pi-search" />
            <Button icon="pi pi-cog" />
          </ButtonGroup>
        </div>
        <div class="chat-cards-container">
          <ChatCard :class="{ 'on-chats-open': chatStore.openChats.includes(chat) }" v-for="chat in chatStore.chats"
            @chat-card-click="(chatObject) => chatCardClickHandler(chatObject)" :chatObject="chat"
            :selected="chatStore.openChats.includes(chat)" />
        </div>
      </main> -->
    </section>
  </div>

  <!-- modal for creating new chat -->
  <!-- <Dialog dismissableMask :visible="isCreateChatModalVisible" modal header="Create new chat"
    :pt:mask:style="{ 'backdrop-filter': 'blur(5px)' }" :pt:title:style="'color:tomato;'"
    :pt:header:style="'color: white;'" :pt:closeButton:onClick="modalCreateChatCloseButtonHandler">
    <FloatLabel class="float-label">
      <label for="new-chat-name-input-text">Enter new chat name</label>
      <InputText class="input-text" id="new-chat-name-input-text" type="text" :pt:root:autofocus="true"
        :invalid="isNewChatNameInvalid" v-model="newChatName"
        @keydown.enter="($event) => { if ($event.repeat) return; createChat() }" />
    </FloatLabel>

    <FloatLabel class="float-label">
      <label for="new-chat-password-input-text">Enter password</label>
      <InputText class="input-text" id="new-chat-password-input-text" type="text" :invalid="isNewChatPasswordInvalid"
        v-model="newChatPassword" @keydown.enter="($event) => { if ($event.repeat) return; createChat() }" />
    </FloatLabel>
    <template #footer>
      <Button @click="createChat" :loading="createChatLoading" label="Create" severity="success" icon="pi pi-check" />
    </template>

</Dialog> -->

  <!-- <ChatModal v-for="chat in chatStore.openChats" :visible="chatStore.openChats.includes(chat)" :chat="chat"
    :socket="socket" /> -->

  <Toast position="bottom-left" />
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 10vh 5vw;
  min-height: 88vh;
  
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
</style>
