import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getChatMessages, getUserChats } from '@/api/chat.js';

export const useChatStore = defineStore('chat', () => {
    const chats = ref([]);
    const activeChatID = ref(null);
    const loading = ref(false);
    const chatHistory = ref([]);
    const chatLoading = ref(false);

    const loadChats = async () => {
        chatHistory.value = [];
        loading.value = true;
        const userChats = await getUserChats();
        chats.value = userChats;
        loading.value = false;
    }

    const updateChatMessages = async (chatID) => {
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
    }

    const getChatHistory = () => chatHistory.value;

    const getChats = () => chats.value;

    const setActiveChatID = (newChatID) => activeChatID.value = newChatID;
    const getActiveChatID = () => activeChatID.value;

    const newChat = () => {
        chatLoading.value = true;
        activeChatID.value = null;
        chatHistory.value = [];
        loading.value = false;
        chatLoading.value = false;
    }

    const getChatLoading = () => chatLoading.value;

    return {
        chats,
        chatHistory,
        getChatLoading,
        loadChats,
        getChats,
        setActiveChatID,
        getActiveChatID,
        newChat,
        updateChatMessages,
        getChatHistory
    }
});