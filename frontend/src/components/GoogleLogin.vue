<script setup>
import { GoogleLogin } from "vue3-google-login";
import { decodeCredential } from 'vue3-google-login'

const callback = async (response) => {
  const userData = decodeCredential(response.credential);
  console.log("Handle the userData", userData);
};
</script>

<template>
  <div class="login-container">
    <GoogleLogin :callback="callback" />
  </div>
</template>

<style scoped>
.g-btn-wrapper {
  display: inline-block;
}
</style>
