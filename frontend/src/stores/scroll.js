import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export const useScrollStore = defineStore('scroll', () => {
    const scrollPosition = ref(0);
    const prevPosition = ref(0);
    const downScrolling = ref(true);
    const upScrolling = ref(false);

    watch(scrollPosition, (newWidth) => {
        downScrolling.value = prevPosition.value < newWidth;
        upScrolling.value = prevPosition.value > newWidth;
        updateScroll();
    });


    const updateScroll = () => {
        prevPosition.value = scrollPosition.value;
        scrollPosition.value = window.scrollY;
    };

    const initScrollWatch = () => {
        window.addEventListener('scroll', updateScroll);
    }

    const destroyScrollWatch = () => {
        window.removeEventListener('scroll', updateScroll);
    }

    return {
        initScrollWatch,
        destroyScrollWatch,
        scrollPosition,
        upScrolling,
        downScrolling
    }
});