import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export const useScrollStore = defineStore('scroll', () => {
    const scrollPosition = ref(0);
    const downScrolling = ref(true);
    const upScrolling = ref(false);

    watch(scrollPosition, (newWidth, oldWidth) => {
        downScrolling.value = oldWidth < newWidth;
        upScrolling.value = oldWidth > newWidth;
        updateScroll();
    });

    const scrollToLastMessage = () => {
        const lastMessageElement = document.getElementById('last-message');
        if (lastMessageElement) {
            lastMessageElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const updateScroll = () => {
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
        scrollToLastMessage,
        scrollPosition,
        upScrolling,
        downScrolling
    }
});