import { defineStore } from 'pinia';
import { ref, reactive } from 'vue';
import i18n from '@/plugins/i18n';
import es from "@/lang/es.json" assert { type: 'json' };
import en from "@/lang/en.json" assert { type: 'json' };

export const useLangStore = defineStore('lang', () => {
    const langCode = ref('es');
    const langMessages = reactive({ es, en });

    const loadLang = async () => {
        const storedLang = localStorage.getItem('kenai_lang');
        if (storedLang) {
            langCode.value = storedLang;
        } else {
            localStorage.setItem('kenai_lang', 'es');
        }
        i18n.global.locale.value = langCode.value;
    };

    const changeLang = (language) => {
        langCode.value = language;
        localStorage.setItem('kenai_lang', langCode.value);
        i18n.global.locale.value = langCode.value;
    };

    return {
        langMessages,
        langCode,
        loadLang,
        changeLang,
    };
});
