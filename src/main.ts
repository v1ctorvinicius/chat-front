import "./assets/style.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import { createPinia } from "pinia";
const pinia = createPinia();

import PrimeVue from "primevue/config";
import "primevue/resources/themes/aura-dark-purple/theme.css";
import "primeicons/primeicons.css";
import Dialog from "primevue/dialog";
import Card from "primevue/card";
import Button from "primevue/button";
import ButtonGroup from "primevue/buttongroup";
import Textarea from "primevue/textarea";
import FloatLabel from "primevue/floatlabel";
import Menubar from "primevue/menubar";
import Toast from "primevue/toast";
import ToastService from "primevue/toastservice";
import InputText from "primevue/inputtext";
import Skeleton from "primevue/skeleton";
import Message from "primevue/message";
import useUserStore from "./stores/userStore";
import { isTokenExpired } from "./auth/auth";

const app = createApp(App);
app.use(router);
app.use(PrimeVue);
app.use(pinia);
app.component("Dialog", Dialog);
app.component("Card", Card);
app.component("Button", Button);
app.component("ButtonGroup", ButtonGroup);
app.component("Textarea", Textarea);
app.component("FloatLabel", FloatLabel);
app.component("Menubar", Menubar);
app.component("Toast", Toast);
app.component("InputText", InputText);
app.component("Skeleton", Skeleton);
app.component("Message", Message);
app.use(ToastService);
app.mount("#app");

const userStore = useUserStore();

const token = localStorage.getItem("token");
if (!token) {
  userStore.setIsAuthenticated(false);
} else if (isTokenExpired()) {
  console.log("Token expired");
  userStore.setIsAuthenticated(false);
  
} else {
  userStore.setIsAuthenticated(true);
  userStore.setUsername(localStorage.getItem("username") ?? "");
  userStore.setImageUrl(localStorage.getItem("imageUrl") ?? "");
}
