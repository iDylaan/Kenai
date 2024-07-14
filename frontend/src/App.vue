<script setup>
import { RouterLink, RouterView } from "vue-router";

function showNotification() {
  Notification.requestPermission((result) => {
    if (result === "granted") {
      navigator.serviceWorker.ready.then((registration) => {
        registration.showNotification("Atención", {
          body: "Esto es una notificación",
          icon: "../public/android-chrome-512x512.png",
          actions: [
            { action: "aceptar", title: "Aceptar" },
            { action: "rechazar", title: "Rechazar" },
          ],
        });
      });
    }
  });
}

showNotification();


self.addEventListener("notificationclick", function (event) {
  console.log("notificación abierta");
});

</script>

<template>
  <div id="app" class="dark-theme">
    <RouterView />
  </div>
</template>

<style scoped lang="scss">
#app {}
</style>
