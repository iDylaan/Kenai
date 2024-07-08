<script setup>
// IMPORTACIONES
import { ref, onMounted } from 'vue';
import { GoogleLogin } from "vue3-google-login";
import { decodeCredential } from 'vue3-google-login'
import { useSessionStore } from "@/stores/session";

// VARIABLES
const store = useSessionStore();
const loading = ref(false);

// FUNCIONES
onMounted(() => {
    store.loadSession();
})

const callback = async (response) => {
    loading.value = true;
    const userData = decodeCredential(response.credential);
    try {
        await store.login(userData);
    } catch (error) {
        console.log(error);
    } finally {
        loading.value = false;
    }
};
</script>   

<template>

    <main class="sso-main">
        <div class="sso__container">
            <section class="title__container">
                <span class="material-icons">person</span>
                <h1 class="title__text">Login</h1>
            </section>

            <section class="form__container">
                <GoogleLogin :callback="callback" v-if="!store.isAuthenticated" />
                <Button v-if="store.isAuthenticated" @click="store.logout()">Logout</Button>
                <div class="authed__container" v-if="store.isAuthenticated">
                    {{ store.user.given_name }}
                    <Avatar :image="store.user.picture" alt="User Avatar" round />
                </div>
            </section>


            <section class="footer__container">
                <!-- <Button>Sign in</Button> -->
                <ProgressBar mode="indeterminate" style="height: 6px" v-if="loading"></ProgressBar>
            </section>
        </div>
    </main>

</template>

<style lang="scss" scoped>
.sso-main {
    width: 100dvw;
    height: 100dvh;
    display: grid;
    place-content: center;
}

.sso__container {
    display: flex;
    flex-direction: column;
    background-color: #26324b15;
    backdrop-filter: blur(10px) saturate(180%);
    padding: 10px;
    border-radius: 20px;
    min-width: 300px;
    max-width: 700px;
    width: 97dvw;
    border: 2px solid #fca21138;
    margin-top: -150px;

    .title__container {
        display: flex;
        gap: 10px;
        align-items: center;
        justify-content: center;
        padding: 5px;

        span {
            font-size: 30px;
            color: white;
        }
    }

    .form__container {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        gap: 20px;
    }
}
</style>
