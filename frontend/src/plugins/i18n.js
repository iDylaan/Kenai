import { createI18n } from "vue-i18n";
import es from "@/lang/es.json" assert { type: 'json' };
import en from "@/lang/en.json" assert { type: 'json' };

const messages = { es, en };

const i18n = createI18n({
    legacy: false,
    locale: 'en',
    fallbackLocale: 'en',
    messages: messages,
})

export default i18n;