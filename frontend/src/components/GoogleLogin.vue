<script setup>
import { GoogleLogin } from 'vue3-google-login'

const handleLoginSuccess = async (googleUser) => {

    try {
        const profile = googleUser.getBasicProfile()
        const token = googleUser.getAuthResponse().id_token
        console.log(`ID de usuario: ${profile.getId()}`)
        console.log(`Nombre: ${profile.getName()}`)
        console.log(`Token de autenticación: ${token}`)
    } catch (error) {
        coonsole.log(error);
    }
}

</script>

<template>
    <div class="login-container">
        <google-login @login-success="handleLoginSuccess" />
    </div>
</template>

<style scoped>
.g-btn-wrapper {
    display: inline-block;
}
</style>
