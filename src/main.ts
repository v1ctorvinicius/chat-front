import "./assets/style.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import PrimeVue from "primevue/config";
import "primevue/resources/themes/aura-dark-purple/theme.css";
import "primeicons/primeicons.css";
import Dialog from "primevue/dialog";
import Card from "primevue/card";
import Button from "primevue/button";
import Textarea from "primevue/textarea";
import FloatLabel from "primevue/floatlabel";
import Menubar from "primevue/menubar";
import Toast from "primevue/toast";
import ToastService from "primevue/toastservice";

const app = createApp(App);
app.use(router);
app.use(PrimeVue);
app.component("Dialog", Dialog);
app.component("Card", Card);
app.component("Button", Button);
app.component("Textarea", Textarea);
app.component("FloatLabel", FloatLabel);
app.component("Menubar", Menubar);
app.component("Toast", Toast);
app.use(ToastService);
app.mount("#app");
