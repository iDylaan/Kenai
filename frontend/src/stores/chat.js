import { defineStore } from 'pinia';
import { ref, reactive } from 'vue';
import { getChatMessages, getUserChats, renameChatWithChatID } from '@/api/chat.js';
import { useScrollStore } from './scroll';
import { useToast } from 'primevue/usetoast';

export const useChatStore = defineStore('chat', () => {
    const toast = useToast();
    const scrollStore = useScrollStore();
    const chats = ref([]);
    const activeChatID = ref(null);
    const loading = ref(false);
    const chatHistory = ref([]);
    const chatLoading = ref(false);
    const isNewChat = ref(true);
    const newMessageSent = ref(false);

    const loadChats = async () => {
        loading.value = true;
        const userChats = await getUserChats();
        chats.value = userChats;
        loading.value = false;
    }

    const setLoading = (value) => loading.value = value;

    const renameChat = async (chatID, newTitle, t) => {
        try {
            const renamed = await renameChatWithChatID(chatID, newTitle);
            if (renamed) {
                toast.add({ severity: 'success', summary: t('chat.done'), detail: t('chat.success.chat_name_updated'), life: 3000 });
            } else {
                toast.add({ severity: 'error', summary: 'Error', detail: t('chat.error.no_chat_deleted'), life: 3000 });
            }
        } catch (error) {
            console.log(error);
            toast.add({ severity: 'error', summary: 'Error', detail: t('chat.error.request'), life: 3000 });
        }
    }

    const updateChatMessages = async (chatID) => {
        if (chatID === activeChatID.value) return;

        isNewChat.value = false;
        chatLoading.value = true;
        activeChatID.value = chatID;
        chatHistory.value = [];
        const messages = await getChatMessages(chatID);
        chatHistory.value = messages.map(message => ({
            index: message.iteration,
            user: {
                message: message.prompt,
                sentAt: message.prompt_timestamp,
                audio: message.prompt_audio_link
            },
            kenai: {
                response: message.response,
                renderedResponse: message.response,
                audio: message.response_audio_link,
                loading: false,
                respondedAt: message.response_timestamp,
                error: false,
                errorMessage: ""
            }
        }));
        chatLoading.value = false;
        setTimeout(() => {
            scrollStore.scrollToLastMessage();
        }, 200);
    }

    const getChatHistory = () => chatHistory.value;

    const getChats = () => chats.value;

    const setActiveChatID = (newChatID) => activeChatID.value = newChatID;
    const getActiveChatID = () => activeChatID.value;

    const newChat = () => {
        isNewChat.value = true;
        chatLoading.value = true;
        activeChatID.value = null;
        chatHistory.value = [];
        loading.value = false;
        chatLoading.value = false;
    }

    const desactivateNewChat = () => isNewChat.value = false;

    const getChatLoading = () => chatLoading.value;
    const setNewMessageSent = (value) => newMessageSent.value = value;

    return {
        chats,
        chatHistory,
        loading,
        isNewChat,
        newMessageSent,
        desactivateNewChat,
        getChatLoading,
        loadChats,
        getChats,
        setActiveChatID,
        getActiveChatID,
        newChat,
        updateChatMessages,
        getChatHistory,
        setLoading,
        setNewMessageSent,
        renameChat
    }
});
