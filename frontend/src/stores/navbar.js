import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useNavbarStore = defineStore('navbar', () => {
    const extended = ref(false);

    const loadNavbar = () => {
        const storedExtended = localStorage.getItem('kenai_navbar_extended');
        if (storedExtended) extended.value = JSON.parse(storedExtended);
        else localStorage.setItem('kenai_navbar_extended', JSON.stringify(false));
    }

    const toggleExtended = () => {
        extended.value = !extended.value;
        localStorage.setItem('kenai_navbar_extended', JSON.stringify(extended.value));
    }

    const closeExtended = () => {
        extended.value = false;
        localStorage.setItem('kenai_navbar_extended', JSON.stringify(false));
    }

    return {
        extended,
        loadNavbar,
        toggleExtended,
        closeExtended
    }
});