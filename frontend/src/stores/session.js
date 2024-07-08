import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useSessionStore = defineStore('session', () => {
    const user = ref(null);
    const token = ref(null);
    const isAuthenticated = computed(() => token.value !== null && user.value !== null);

    const login = async (googleCredentials) => {
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
            console.log(result);

            if (!result.success) throw new Error(result.error.message);

            user.value = result.data.user;
            token.value = result.data.token;

            // Guardar el token en el localStorage para persistencia
            localStorage.setItem('kenai_token', result.data.token);

            // Opcional: guardar el usuario en el localStorage
            localStorage.setItem('kenai_user', JSON.stringify(result.data.user));

            return result.success;
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            throw error.message;
        }
    };

    const logout = () => {
        user.value = null;
        token.value = null;
        localStorage.removeItem('kenai_token');
        localStorage.removeItem('kenai_user');
    };

    const loadSession = () => {
        const storedUser = localStorage.getItem('kenai_user');
        const storedToken = localStorage.getItem('kenai_token');

        if (storedUser && storedToken) {
            user.value = JSON.parse(storedUser);
            token.value = storedToken;
            // validateSession();
        }
    };

    const validateSession = async () => {
        try {
            const response = await fetch('http://localhost:5000/auth/validate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token.value}`
                }
            });

            if (!response.ok) {
                logout();
                throw new Error('Token no válido');
            }

            const result = await response.json();

            if (!result.valid) {
                logout();
                throw new Error('Token no válido');
            }
        } catch (error) {
            console.error('Error al validar la sesión:', error);
            logout();
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
