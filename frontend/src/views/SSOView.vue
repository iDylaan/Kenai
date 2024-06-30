<script setup>
import { ref } from 'vue';

import GoogleLoginComponent from '@/components/GoogleLogin.vue';

const loggedIn = ref(false);
const user = ref(null);

const callback = (response) => {
    console.log("logged in");
    loggedIn.value = true;
    console.log(response);
    user.value = decodeCredential(response.credential);
};

const logout = () => {
    googleLogout();
    loggedIn.value = false;
    user.value = null;
};
</script>

<template>
    <div>
        <h1>Wenas wenas w</h1>
    </div>

    <GoogleLoginComponent />

<!--     <div v-if="loggedIn">
        <button @click="logout">Logout</button>
        <h2>The name is: {{ user.name }}</h2>
        <h2>The email is: {{ user.email }}</h2>
        <img :src="user.picture" alt="User Image" />
    </div>
    <div v-else>
        <GoogleLogin callback="callback" pormpt auto-login />
    </div> -->
</template>

<style lang="css" scoped></style>
