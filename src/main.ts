import "./assets/style.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import PrimeVue from "primevue/config";
import 'primevue/resources/themes/aura-light-green/theme.css'
import Dialog from 'primevue/dialog';

const app = createApp(App);

app.use(PrimeVue);
app.use(router);

app.component('Dialog', Dialog);

app.mount("#app");
