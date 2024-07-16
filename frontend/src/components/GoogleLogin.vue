<script setup>
// IMPORTACIONES
import { ref, onMounted, onUnmounted } from 'vue';
import { GoogleLogin } from "vue3-google-login";
import { decodeCredential } from 'vue3-google-login'
import { useSessionStore } from "@/stores/session";
import { useMobileStore } from "@/stores/mobile";

// VARIABLES
const store = useSessionStore();
const mobileStore = useMobileStore();
const loading = ref(false);

// FUNCIONES
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
    <ProgressBar mode="indeterminate" class="loading-bar"
      :style="[{ width: mobileStore.isMobile ? '100dvw' : '436px' }]" v-if="loading"></ProgressBar>

    <div class="sso__container">
      <section class="user-email" v-if="store.isAuthenticated">
        {{ store.user.email }}
      </section>

      <section class="title__container" v-if="!store.isAuthenticated">
        <span class="material-icons">person</span>
        <h1 class="title__text">Login</h1>
      </section>

      <section class="user-details" v-if="store.isAuthenticated">
        <div class="authed__container">
          <Avatar :image="store.user.picture" alt="User Avatar" shape="circle" size="xlarge"
            style="height: 80px; width: 80px" />
          <span class="hi-user">!Hola, {{ store.user.given_name }}¡</span>
        </div>
      </section>

      <section class="form__container">
        <GoogleLogin :callback="callback" v-if="!store.isAuthenticated" />
        <Button class="logout-btn" v-if="store.isAuthenticated" @click="store.logout()" rounded outlined>
          <span class="material-icons-outlined icon">logout</span>
          Logout
        </Button>
      </section>


      <section class="footer__container" :style="[{ flexDirection: mobileStore.isMobile ? 'column' : '' }]">
        <Button class="footer-btn" label="Políticas de privacidad" severity="secondary" text size="small" />
        <Divider layout="vertical" v-if="!mobileStore.isMobile" />
        <Button class="footer-btn" label="Condiciones del servicio" severity="secondary" text size="small" />
      </section>
    </div>
  </main>

</template>

<style lang="scss" scoped>
.sso-main {
  width: 100%;
  height: 100%;
  display: grid;
  place-content: center;
  position: relative;

  .loading-bar {
    height: 2px;
    top: -11px;
    left: -10px;
    position: absolute;
  }
}

.sso__container {
  display: flex;
  flex-direction: column;
  min-width: 412px;

  .logout-btn {
    width: 263px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    position: relative;

    .icon {
      font-size: 22px;
      position: absolute;
      left: 22px;
    }
  }

  .user-email {
    width: 100%;
    text-align: center;
    font-size: 0.9rem;
    font-weight: 500;
  }

  .user-details {

    .authed__container {
      width: 100%;
      margin-top: 22px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;

    }

    .hi-user {
      font-size: 22px;
      width: 100%;
      margin: 8px auto;
      text-align: center;
    }
  }

  .title__container {
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: center;

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
    margin-top: 10px;
  }

  .footer__container {
    margin-top: 30px;
    display: flex;
    align-items: center;
    justify-content: center;

    .footer-btn {
      height: 27px;
      font-size: 12px;
      color: white;
      font-weight: 500;
      opacity: 0.7;
    }
  }
}
</style>
