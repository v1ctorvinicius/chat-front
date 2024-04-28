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
      <Menubar :pt="{
        button: (options) => ({
          style: {
            'border-radius': '5px',
            'width': '100%',
            // 'display': 'flex',
            // 'justify-content': 'space-around',
          },
        }),
        icon: (options) => ({
          style: {
            'margin-right': '5%'
          }
        }), label: (options) => ({
          style: { 'margin-right': '15px' }
        })
      }" :model="items" class="blue-whale-alpha margin-5 border-radius-10" :breakpoint="'480px'" />
    </header>
  </div>
</template>

<style scoped>
.nav {
  z-index: 9999;
  position: fixed;
  margin-top: 5vh;
}

@media (min-width: 768px) and (max-width: 979px) {
  .nav {
    margin-top: 1vh;
  }
}

@media (max-width: 767px) {
  .nav {
    margin-top: 1vh;
    width: 70vw;
  }
}

@media (max-width: 480px) {
  .nav {
    margin-top: 1vh !important;
  }
}
</style>
