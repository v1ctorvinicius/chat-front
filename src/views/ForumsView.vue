<script setup lang="ts">
import { useForumStore } from "@/stores/forumStore";
import useUserStore from "@/stores/userStore";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import ForumCard from "@/components/ForumCard.vue";
import InputText from "primevue/inputtext";
import FloatLabel from "primevue/floatlabel";
import { useToast } from 'primevue/usetoast';
import axiosInstance from "@/plugins/axiosConfig";
import io from "socket.io-client";



const forumStore = useForumStore();
const router = useRouter();
const userStore = useUserStore();
const isCreateForumModalVisible = ref(false);
const newForumName = ref("");
const newForumDescription = ref("");
const newForumPassword = ref("");
const isNewForumNameInvalid = ref(false);
const isNewForumPasswordInvalid = ref(false);
const isNewForumDescriptionInvalid = ref(false);
const createForumLoading = ref(false);
const toastSuccess = useToast();
const toastError = useToast();
const toastErrorNameTooLarge = useToast();
const apiBaseUrl: string = import.meta.env.VITE_API_BASE_URL;
const baseUrl: string = import.meta.env.VITE_BASE_URL;

onMounted(() => {
  forumStore.updateForums();
});

function changeCreateForumModalVisibility(value?: boolean) {
  if (value) {
    isCreateForumModalVisible.value = !isCreateForumModalVisible.value;
    return;
  }
  isCreateForumModalVisible.value = value!;
}

function login() {
  router.push("/login");
};

function modalCreateForumCloseButtonHandler() {
  changeCreateForumModalVisibility(false);
  newForumName.value = "";
  newForumDescription.value = "";
  newForumPassword.value = "";
}

function showSuccessToast() {
  toastSuccess.add({ severity: 'success', summary: 'Chat Created', life: 5000 });
};

function showErrorToast(message: string) {
  toastError.add({ severity: 'error', summary: 'Error', life: 0, detail: message });
};

function createForum() {
  createForumLoading.value = true;

  if (newForumName.value.length > 50) {
    toastErrorNameTooLarge.add({ severity: 'error', summary: 'Error', life: 0, detail: 'Forum name cannot be longer than 50 characters, got:  ' + newForumName.value.length });
    createForumLoading.value = false;
    return;
  }

  axiosInstance
    .post(apiBaseUrl + "/forums/", {
      name: newForumName.value,
      creatorId: userStore.userId,
      description: newForumDescription.value,
      password: newForumPassword.value
    })
    //TODO: check if res.data is valid
    .then((res) => {
      createForumLoading.value = false;
      showSuccessToast();
      newForumName.value = "";
      newForumPassword.value = "";
      changeCreateForumModalVisibility(false);
    })
    .catch((err) => { console.error(err); createForumLoading.value = false; showErrorToast(err); });
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
        <Button @click="changeCreateForumModalVisibility(true)" label="new forum" icon="pi pi-plus" severity="success"
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
          <ForumCard v-for="forum in forumStore.forums" :key="forum.id" @forum-card-click="" :forumObject="forum" />
        </div>
      </main>
    </section>
  </div>

  <!-- modal for creating new forum -->
  <Dialog :visible="isCreateForumModalVisible" modal header="Create new forum"
    :pt:mask:style="{ 'backdrop-filter': 'blur(5px)' }" :pt:title:style="'color:tomato;'"
    :pt:header:style="'color: white;'" :pt:closeButton:onClick="modalCreateForumCloseButtonHandler"
    :pt:root:style="'min-width: 40vw;'">
    <FloatLabel class="float-label">
      <label for="new-forum-name-input-text">Enter new forum name</label>
      <InputText class="input-text" id="new-forum-name-input-text" type="text" :pt:root:autofocus="true"
        :invalid="isNewForumNameInvalid" v-model="newForumName"
        @keydown.enter="($event) => { if ($event.repeat) return; createForum() }" />
    </FloatLabel>
    <FloatLabel class="float-label">
      <label for="new-forum-description-input-text">Enter new forum description</label>
      <InputText class="input-text" id="new-forum-description-input-text" type="text" :pt:root:autofocus="true"
        :invalid="isNewForumDescriptionInvalid" v-model="newForumDescription"
        @keydown.enter="($event) => { if ($event.repeat) return; createForum() }" />
    </FloatLabel>
    <FloatLabel class="float-label">
      <label for="new-forum-password-input-text">Enter password</label>
      <InputText class="input-text" id="new-forum-password-input-text" type="text" :invalid="isNewForumPasswordInvalid"
        v-model="newForumPassword" @keydown.enter="($event) => { if ($event.repeat) return; createForum() }" />
    </FloatLabel>

    <template #footer>
      <Button @click="createForum" :loading="createForumLoading" label="Create" severity="success" icon="pi pi-check" />
    </template>

  </Dialog>

  <!-- <ForumModal v-for="forum in forumStore.openForums" :visible="forumStore.openForums.includes(forum)" :forum="forum"
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

.float-label {
  margin-top: 3vh;
  font-size: 1em;
}

.input-text {
  width: 100%;
  margin-top: 3vh;
  /* padding: 1vh; */
  border-radius: 5px;
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
