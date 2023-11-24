<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';
import { NButton } from 'naive-ui';
import type Message from '../types/Message';

let messages = ref<Message[]>([]);

//TODO: implementar rolagem de dados generica, tem apenas 2d6
const rollDice = () => {
    axios.get("http://localhost:8081/dices/2d6").then((res) => {
        let message = "dado 1: " + res.data.dices[0] + "\n dado 2: " + res.data.dices[1] + "\ntotal: " + res.data.total;
        let newMessage: Message = {
            id: Math.random().toString(),
            sender: "localhost",
            content: message,
            timestamp: Date.now(),
        }
        messages.value.push(newMessage);
    })
}
</script>

<template>
    <main class="vintage main-container">
        <div class="messages-container" />

        <div class="panel">
            <div class="new-message">
                <textarea v-if="messages[0]" v-model="messages[0].content"></textarea>
            </div>
            <div class="actions">
                <n-button @click="rollDice" type="primary">Rolar dados</n-button>
            </div>

        </div>
    </main>
</template>

<style scoped>
.main-container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    border: 10px solid yellow;
}

.messages-container {
    background-color: rgba(9, 36, 43, 0.7);
    min-height: 70vh;

}

.new-message {
    background-color: rgba(9, 36, 43, 0.7);

    flex-grow: 1;

    border: 3px solid red;

}

.new-message textarea {
    width: 100%;
    height: 100%;
    background-color: rgba(9, 36, 43, 0.7);
    color: white;
    border: none;

}

.panel {
    border: 5px solid blue;
    display: flex;
    height: 30vh;
}

.actions {
    border: 5px solid yellow;
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>