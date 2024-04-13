import "./assets/style.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import PrimeVue from "primevue/config";
import "primevue/resources/themes/aura-light-green/theme.css";
import Dialog from "primevue/dialog";
import Card from "primevue/card";
import Button from 'primevue/button';


const app = createApp(App);
app.use(router);
app.use(PrimeVue);
app.component("Dialog", Dialog);
app.component("Card", Card);
app.component("Button", Button);
app.mount("#app");
