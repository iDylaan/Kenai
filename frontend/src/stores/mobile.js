import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export const useMobileStore = defineStore('mobile', () => {
    const windowWidth = ref(window.innerWidth);
    const isMobile = ref(windowWidth.value < 800);

    watch(windowWidth, (newWidth) => {
        isMobile.value = newWidth < 800;
        updateWidth();
    });

    const updateWidth = () => {
        windowWidth.value = window.innerWidth;
    };

    const initWidthWatch = () => {
        window.addEventListener('resize', updateWidth);
    }

    const destroyWidthWatch = () => {
        window.removeEventListener('resize', updateWidth);
    }

    return {
        isMobile,
        windowWidth,
        initWidthWatch,
        destroyWidthWatch
    }
});