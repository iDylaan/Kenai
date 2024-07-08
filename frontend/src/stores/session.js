import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSessionStore = defineStore('session', () => {
    const user = ref(null);
    const token = ref(null);

    const login = async (googleCredentials) => {
        try {
            const response = await fetch('/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(googleCredentials)
            })

            if (!response.ok) throw new Error(response.statusText);

            const result = await response.json();

            if (!result.success) throw new Error(result.error.message);

            user.value = result.data.user;
            token.value = result.data.token;

            // Guardar el token en el localStorage para persistencia
            localStorage.setItem('token', response.data.token);

            // Opcional: guardar el usuario en el localStorage
            localStorage.setItem('user', JSON.stringify(response.data.user));

            return result.success;
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            throw error.message;
        }
    };

    const logout = () => {
        user.value = null;
        token.value = null;
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    };

    const loadSession = () => {
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');

        if (storedUser && storedToken) {
            user.value = JSON.parse(storedUser);
            token.value = storedToken;
        }
    };

    return {
        user,
        token,
        login,
        logout,
        loadSession,
    };
});
