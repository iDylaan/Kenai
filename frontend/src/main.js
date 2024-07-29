import './assets/main.css';

import './registerServiceWorker';

import { createApp, watch } from 'vue';
import { createPinia } from 'pinia';

import PrimeVue from 'primevue/config';
import Tooltip from 'primevue/tooltip';
import Ripple from 'primevue/ripple'
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';

import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "material-icons/iconfont/material-icons.css";

import i18n from "@/plugins/i18n";

import CountryFlag from 'vue-country-flag-next'

import App from './App.vue';
import router from './router';
import vue3GoogleLogin from 'vue3-google-login';

const app = createApp(App);

const primevueConfig = {
    ripple: true,
    theme: "dark",
    locale: 'es',
};

// const CLIENT_ID = import.meta.env.CLIENT_ID;
const CLIENT_ID = "1026982493501-dtfakdlnkf309l7a5gv80acqacqj80l7.apps.googleusercontent.com";

app.use(createPinia());
app.use(router);
app.use(PrimeVue, primevueConfig);
app.use(ToastService);
app.directive('ripple', Ripple);
app.directive('tooltip', Tooltip);
app.component('Toast', Toast);
app.component('CountryFlag', CountryFlag);
app.use(i18n);
app.use(vue3GoogleLogin, {
    clientId: CLIENT_ID,
});
app.mount('#app');
