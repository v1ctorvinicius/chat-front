<script setup lang="ts">

const props = defineProps({
  chatName: String,
});

const emit = defineEmits(["changeVisible"]);

function cardClickHandler() {
  emit("changeVisible", props.chatName);
}
</script>

<template>
  <Card style=" width: 15vw; max-height: 35vh; overflow: hidden" @click="cardClickHandler" class="card-container">
    <template #header>
      <img alt="user header" src="https://primefaces.org/cdn/primevue/images/usercard.png" style="width: 100%; " />
    </template>

    <template #title>{{ props.chatName }}</template>
    <template #subtitle>Card subtitle</template>
    <template #content>
      <p class="m-0">
        created by: user_name <br>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Temporibus facilis eveniet recusandae, consequatur
        illum debitis voluptates explicabo animi atque aspernatur vitae officiis asperiores suscipit commodi amet
        voluptate libero fugit quas?
        Necessitatibus quo debitis, nobis tempore hic repellendus, harum numquam ea beatae distinctio assumenda, iure
        voluptatibus adipisci ab deleniti molestiae! Vel laudantium molestiae inventore veritatis fugiat tenetur
        similique mollitia pariatur optio.
        Eaque nihil voluptatibus vitae accusantium recusandae, voluptatum, ducimus minus voluptas et placeat autem,
        blanditiis cum assumenda? Blanditiis quam cupiditate harum nihil porro deleniti ducimus, facere voluptas
        pariatur rerum laboriosam maiores?
        Accusamus quis labore est nihil eligendi quod commodi. Impedit, fuga ab adipisci mollitia totam iure libero ea
        labore? Incidunt corporis molestiae tempora veritatis perspiciatis consequuntur delectus obcaecati quisquam
        mollitia odit?
        Voluptatem dolorem debitis omnis quibusdam, incidunt quidem architecto ex error aliquid perferendis harum quos.
        Perspiciatis, animi suscipit cupiditate dolores excepturi nisi! Explicabo temporibus vel quae eveniet eum soluta
        officia. Laborum.
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
