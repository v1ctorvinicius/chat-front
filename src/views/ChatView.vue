<template>
    <main class="vintage main">
        <div class="messages-container" />
        <div class="keyboard">
            <input type="text">
        </div>
    </main>
</template>

<style scoped>
.main {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}

.messages-container {
    background-color: rgba(9, 36, 43, 0.7);
    height: 60vh;
    width: 90%;

}

.keyboard {
    margin: auto;
    width: 90%;
}

.keyboard>input {
    background-color: rgba(59, 59, 59, 0.7);
    width: 100%;
    height: 10vh;
}
</style>