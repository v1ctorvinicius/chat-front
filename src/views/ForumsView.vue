<script setup lang="ts">
import { useForumStore } from "@/stores/forumStore";
import useUserStore from "@/stores/userStore";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";


const forumStore = useForumStore();
const router = useRouter();
const userStore = useUserStore();
const isCreateForumModalVisible = ref(false);


onMounted(() => {
  forumStore.updateForums();
  console.log("forums: ", forumStore.forums);
    
});

function changeCreateForumModalVisibility(value?: boolean) {
  if (value) {
    isCreateForumModalVisible.value = !isCreateForumModalVisible.value;
    return;
  }
  isCreateForumModalVisible.value = value!;
}

const login = () => {
  router.push("/login");
};

</script>

<template>
  <div class="message-container">
    <Message class="message" v-if="!userStore.isAuthenticated" severity="info"
      :pt:text:style="'padding: 0 1vw ; display: flex; align-items: center'"> Now authenticated as guest
      <Button @click="login" label="login" style="margin-left: 10px" />
    </Message>
  </div>
  <div class="container text-white">
    <section class="chat-cards-section blue-whale-alpha" :class="{ 'empty': forumStore.forums.length == 0 }">
      <div v-if="forumStore.forums.length == 0">
        <h2>There are no forums 😐 </h2>
        <Button @click="changeCreateForumModalVisibility(true)" label="new chat" icon="pi pi-plus" severity="success"
          style="width: 100%; margin-top: 10%;" />
      </div>

      <main v-else>
        <div class="menu card flex justify-content-center" style="margin-bottom: 2vh;">
          <ButtonGroup>
            <Button icon="pi pi-plus" @click="changeCreateForumModalVisibility(true)" />
            <Button icon="pi pi-search" />
            <Button icon="pi pi-cog" />
          </ButtonGroup>
        </div>
        <div class="chat-cards-container">
          <ForumCard v-for="forum in forumStore.forums" :key="forum.id" @forum-card-click="" :forumObject="forum"></ForumCard>

          <!-- <ForumCard :class="{ 'on-chats-open': chatStore.openChats.includes(chat) }" v-for="chat in forumStore.forums"
              @chat-card-click="(chatObject) => chatCardClickHandler(chatObject)" :chatObject="chat"
              :selected="chatStore.openChats.includes(chat)" /> -->
        </div>
      </main>
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

.message-container {
  position: absolute;
  right: 0;
  margin: 1vh;
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
