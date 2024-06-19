import "./assets/main.css";

import i18n, { getLocale } from "./i18n";
import type { PrimeVueLocaleOptions } from "@/lang/types";

import { createApp, watch } from "vue";
import { createPinia } from "pinia";

import PrimeVue from "primevue/config";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "material-icons/iconfont/material-icons.css";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(i18n);

const primevueConfig = {
  ripple: true,
  theme: "dark",
  locale: getLocale(),
};

app.use(PrimeVue, primevueConfig);
app.mount("#app");

watch(
  () => i18n.global.locale,
  () => {
    app.config.globalProperties.$primevue.config.locale = getLocale();
  }
);
