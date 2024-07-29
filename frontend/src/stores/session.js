import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useChatStore } from './chat';
import { useToast } from 'primevue/usetoast';

export const useSessionStore = defineStore('session', () => {
    const user = ref(null);
    const token = ref(null);
    const isAuthenticated = computed(() => token.value !== null && user.value !== null);
    const chatStore = useChatStore();
    const toast = useToast();


    const login = async (googleCredentials, t) => {
        try {
            const response = await fetch('http://localhost:5000/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(googleCredentials)
            });


            if (!response.ok) throw new Error(response.statusText);

            const result = await response.json();

            if (!result.success) throw new Error(result.error.message);

            user.value = result.data.user;
            token.value = result.data.token;

            // Guardar el token en el localStorage para persistencia
            localStorage.setItem('kenai_token', result.data.token);

            // Opcional: guardar el usuario en el localStorage
            localStorage.setItem('kenai_user', JSON.stringify(result.data.user));
            toast.add({ severity: 'success', summary: t('auth.welcome'), detail: `${t("auth.success.login_as")} ${user.value.given_name}`, life: 3000 });
            return result.success;
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            toast.add({ severity: 'error', summary: 'Error', detail: t('auth.error.login'), life: 3000 });
        } finally {
            if (isAuthenticated.value) {
                chatStore.loadChats();
            }
        }
    };

    const logout = (t) => {
        user.value = null;
        token.value = null;
        localStorage.removeItem('kenai_token');
        localStorage.removeItem('kenai_user');
        toast.add({ severity: 'info', summary: t('auth.session_closed'), detail: t('auth.success.logout'), life: 3000 });
    };

    const loadSession = async () => {
        const storedUser = localStorage.getItem('kenai_user');
        const storedToken = localStorage.getItem('kenai_token');

        if (storedUser && storedToken) {
            token.value = storedToken;
            const isValid = await validateSession();
            if (isValid) {
                user.value = JSON.parse(storedUser);
            }
        }
    };

    const validateSession = async () => {
        try {
            const response = await fetch('http://localhost:5000/auth/jwt_check', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token.value}`
                }
            });

            if (!response.ok) throw new Error(response.statusText);

            const result = await response.json();

            if (!result.success) throw new Error(result.error.message);

            if (!result.data.valid) throw new Error('La sesión ha expirado. Inicia sesión nuevamente.');

            return true;
        } catch (error) {
            console.error('Error al validar la sesión:', error.message);
            logout();
            return false;
        }
    };

    return {
        user,
        token,
        isAuthenticated,
        login,
        logout,
        loadSession,
    };
});
