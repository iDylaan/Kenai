import { useSessionStore } from '@/stores/session';

const sessionStore = useSessionStore();

export async function getUserChats() {
    try {
        if (!sessionStore.isAuthenticated) return [];

        const response = await fetch('/chat/', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${sessionStore.token}`,
                'Content-Type': 'application/json'
            }
        })
        if (!response.ok) throw new Error(response.statusText);
        const result = await response.json();
        if (!result.success) return [];
        return result.data;
    } catch (error) {
        return [];
    }
}


export async function getChatMessages(chatID) {
    try {
        if (!sessionStore.isAuthenticated) return [];

        const response = await fetch('/chat/messages/' + chatID, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${sessionStore.token}`,
                'Content-Type': 'application/json'
            }
        })
        if (!response.ok) throw new Error(response.statusText);
        const result = await response.json();
        if (!result.success) return [];
        return result.data;
    } catch (error) {
        return [];
    }
}


export async function deleteChat(chatID) {
    try {
        if (!sessionStore.isAuthenticated) return false;

        const response = await fetch('/chat/delete/' + chatID, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${sessionStore.token}`,
                'Content-Type': 'application/json'
            }
        })
        if (!response.ok) throw new Error(response.statusText);
        const result = await response.json();
        if (!result.success) return false;
        return result.data;
    } catch (error) {
        return false;
    }
}


export async function renameChatWithChatID(chatID, newName) {
    try {
        if (!sessionStore.isAuthenticated) return false;

        const response = await fetch('/chat/rename/' + chatID, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${sessionStore.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'title': newName })
        })
        if (!response.ok) throw new Error(response.statusText);
        const result = await response.json();
        if (!result.success) return false;
        return result.data;
    } catch (error) {
        return false;
    }
}
