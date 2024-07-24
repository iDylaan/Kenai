import './assets/main.css';

import i18n, { getLocale } from './i18n';

import './registerServiceWorker';

import { createApp, watch } from 'vue';
import { createPinia } from 'pinia';

import PrimeVue from 'primevue/config';
import Ripple from 'primevue/ripple'
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "material-icons/iconfont/material-icons.css";

import App from './App.vue';
import router from './router';
import vue3GoogleLogin from 'vue3-google-login';

const app = createApp(App);

const primevueConfig = {
    ripple: true,
    theme: "dark",
    locale: getLocale(),
};

// const CLIENT_ID = import.meta.env.CLIENT_ID;
const CLIENT_ID = "1026982493501-dtfakdlnkf309l7a5gv80acqacqj80l7.apps.googleusercontent.com";

app.use(createPinia());
app.use(router);
app.use(i18n);
app.use(PrimeVue, primevueConfig);
app.directive('ripple', Ripple);
app.use(vue3GoogleLogin, {
    clientId: CLIENT_ID,
});
app.mount('#app');

watch(
    () => i18n.global.locale,
    () => {
        const newLocale = getLocale();
        app.config.globalProperties.$primevue.config.locale = newLocale;
    }
);
