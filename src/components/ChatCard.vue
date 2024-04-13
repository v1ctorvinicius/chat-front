<script setup lang="ts">

const props = defineProps({
  chatName: String,
});

const emit = defineEmits(["changeVisible"]);

function cardClickHandler() {
  emit("changeVisible");
}
</script>

<template>
  <Card style="width: 15rem; height: 17rem; overflow: hidden" @click="cardClickHandler" class="card-container">
    <template #header>
      <img alt="user header" src="https://primefaces.org/cdn/primevue/images/usercard.png" style="width: 100%; " />
    </template>
    <template #title>{{ props.chatName }}</template>
    <template #subtitle>Card subtitle</template>
    <template #content>
      <p class="m-0">
        created by: user_name <br>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam
        deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate
        neque
        quas!
      </p>
    </template>
    <template #footer>
      <div class="flex gap-3 mt-1">
        <Button label="Cancel" severity="secondary" outlined class="w-full" />
        <Button label="Save" class="w-full" />
      </div>
    </template>
  </Card>
  <!-- <div @click="cardClickHandler">

    <main class=" card-container">
      <div class="title">
        <h3>{{ props.chatName }}</h3>
      </div>
      <div class="body">created by: user_name</div>
    </main>
  </div> -->
</template>

<style scoped>
.card-container {
  background-color: rgba(9, 36, 43, 0.7);
  /* width: 10px; */
  /* height: 50px; */
  /* border-radius: 10%; */
  margin: 10px;
}

.card-container:hover {
  box-shadow: rgba(240, 46, 170, 0.4) 5px 5px, rgba(240, 46, 170, 0.3) 10px 10px,
    rgba(240, 46, 170, 0.2) 15px 15px, rgba(240, 46, 170, 0.1) 20px 20px,
    rgba(240, 46, 170, 0.05) 25px 25px;
  transform: translate3d(-5px, -5px, 0);
}

.title {
  color: tomato;
  /* height: 10vh;
  width: 50%;
  padding: 1%; */
}

.body {
  padding: 1%;
}
</style>
