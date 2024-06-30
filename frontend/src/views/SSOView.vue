<script setup>
import { ref } from 'vue';

import GoogleLoginComponent from '@/components/GoogleLogin.vue';

const loggedIn = ref(false);
const user = ref(null);

const logout = () => {
    googleLogout();
    loggedIn.value = false;
    user.value = null;
};
</script>

<template>
    <GoogleLoginComponent />
</template>

<style lang="css" scoped></style>
