<template>
  <main class="main-container">
    <ChatNavbar :items="items" />

    <section class="chat__container"></section>
  </main>
</template>

<script setup lang="ts">
// IMPORTACIONES
import { ref } from "vue";

// COMPONENTES
import ChatNavbar from "@/components/layout/Navbar.vue";

// VARIABLES
const items = ref([
  {
    label: "Files",
    icon: "pi pi-file",
    items: [
      {
        label: "Documents",
        icon: "pi pi-file",
        items: [
          {
            label: "Invoices",
            icon: "pi pi-file-pdf",
            items: [
              {
                label: "Pending",
                icon: "pi pi-stop",
              },
              {
                label: "Paid",
                icon: "pi pi-check-circle",
              },
            ],
          },
          {
            label: "Clients",
            icon: "pi pi-users",
          },
        ],
      },
      {
        label: "Images",
        icon: "pi pi-image",
        items: [
          {
            label: "Logos",
            icon: "pi pi-image",
          },
        ],
      },
    ],
  },
  {
    label: "Cloud",
    icon: "pi pi-cloud",
    items: [
      {
        label: "Upload",
        icon: "pi pi-cloud-upload",
      },
      {
        label: "Download",
        icon: "pi pi-cloud-download",
      },
      {
        label: "Sync",
        icon: "pi pi-refresh",
      },
    ],
  },
  {
    label: "Devices",
    icon: "pi pi-desktop",
    items: [
      {
        label: "Phone",
        icon: "pi pi-mobile",
      },
      {
        label: "Desktop",
        icon: "pi pi-desktop",
      },
      {
        label: "Tablet",
        icon: "pi pi-tablet",
      },
    ],
  },
]);

// FUNCIONES RESERVADAS

// FUNCIONES
</script>

<style scoped lang="scss">
.main-container {
  display: grid;
  grid-template-columns: 300px 90.9%;
  grid-template-rows: 1fr;
  gap: 0px 0px;
  grid-auto-flow: row;
  grid-template-areas: "navbar__container chat__container";
}

.navbar__container {
  grid-area: navbar__container;
  padding: 10px;
}

.chat__container {
  grid-area: chat__container;
}
</style>
