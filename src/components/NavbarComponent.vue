<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const items = ref([
  {
    label: "Home",
    icon: "pi pi-home",
    command: () => {
      router.push({ name: "home" });
    }
  },
  {
    label: "Forums",
    icon: "pi pi-user-edit",
    command: () => {
      router.push({ name: "forums" });
    }
  },
  {
    label: "Chats",
    icon: "pi pi-comments",
    command: () => {
      router.push({ name: "chats" });
    }
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
      <Menubar :model="items" class="blue-whale-alpha " :breakpoint="'480px'" :pt="{
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
      }" />
    </header>
  </div>
</template>

<style scoped>
.nav {
  z-index: 9999;
  position: fixed;
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
