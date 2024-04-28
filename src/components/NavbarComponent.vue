<script setup lang="ts">
import { ref } from "vue";
const items = ref([
  {
    label: "Forums",
    icon: "pi pi-user-edit"
  },
  {
    label: "Chats",
    icon: "pi pi-comments",
  },
  {
    label: "Radio",
    icon: "pi pi-headphones",
    items: [
      {
        label: "playing now",
        icon: "pi pi-fw pi-volume-up"
      }
    ]
  }
])
</script>

<template>
  <div class="nav ">

    <header>
      <Menubar
        :pt="{ icon: (options) => ({ style: { 'margin-right': '15%' } }), menuitem: (options) => ({ style: { 'display': 'flex', 'justify-content': 'center', 'width': '10vw', 'height': '4vh' } }), label: (options) => ({ style: { 'margin-right': '15px' } }) }"
        :model="items" class="blue-whale-alpha margin-5 border-radius-10" :breakpoint="'480px'" />
    </header>
  </div>
</template>

<style scoped>
.nav {
  z-index: 9999;
  position: fixed;
  /* min-height: 4vh; */
  margin-top: 5vh;

}

@media (max-width: 480px) {
  .nav {
    margin-top: 1vh;
  }
}
</style>
