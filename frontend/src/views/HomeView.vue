<script setup lang="ts">
// Importaciones
import { ref } from "vue";
// Componentes
// Variables
// Funciones reservadas
// Funcinoes
const items = ref([
  { label: "Kenai", materialIcon: "home" },
  { label: "Propósito", materialIcon: "adjust" },
  { label: "Modelo", materialIcon: "pets" },
  { label: "Aplicaciones", materialIcon: "grid_view" },
  { label: "Contenido", materialIcon: "layers" },
]);
</script>

<template>
  <main>
    <!-- Title -->
    <section class="title__section">
      <div class="title-lights">
        <figure id="firt-light"></figure>
      </div>
      <div class="title__container">
        <h1>
          <span class="animate__animated animate__fadeInUp first-title"
            >Bienvenido a</span
          >
          <span
            class="animate__animated animate__fadeInUp second-title"
            id="kenai_title"
            >Kenai</span
          >
        </h1>

        <div
          class="get-started__container animate__animated animate__fadeInUp third-title"
        >
          <Button outlined severity="contrast" class="get-started__btn">
            <span slot="label">Comenzar</span>
            <span class="material-icons material-icons-right" slot="icon"
              >arrow_forward</span
            >
          </Button>
        </div>
      </div>
    </section>

    <!-- NAVBAR -->
    <nav class="landing-navbar">
      <Button class="nav-btn" label="Kenai" severity="secondary" text />
      <Button class="nav-btn" label="Propósito" severity="secondary" text />
      <Button class="nav-btn" label="Modelo" severity="secondary" text />
      <Button class="nav-btn" label="Aplicaciones" severity="secondary" text />
      <Button class="nav-btn" label="Contenido" severity="secondary" text />
    </nav>
    <nav class="landing-navbar">
      <TabMenu :model="items">
        <template #item="{ item, props }">
          <router-link
            v-if="item.route"
            v-slot="{ href, navigate }"
            :to="item.route"
            custom
          >
            <a v-ripple :href="href" v-bind="props.action" @click="navigate">
              <span class="material-icons">{{ item.materialIcon }}</span>
              <span v-bind="props.label">{{ item.label }}</span>
            </a>
          </router-link>
          <a
            v-else
            v-ripple
            :href="item.url"
            :target="item.target"
            v-bind="props.action"
          >
            <span class="material-icons">{{ item.materialIcon }}</span>
            <span v-bind="props.label">{{ item.label }}</span>
          </a>
        </template>
      </TabMenu>
    </nav>
    <!-- END NAVBAR -->

    <!-- Content -->
  </main>
</template>

<style scoped lang="scss">
.get-started__btn {
  padding: calc(10px + 5dvw / 10) calc(30px + 1dvw);
  border-radius: 100px;
  width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  font-weight: 600;
  transition: all 0.1s ease-in-out;

  &:hover {
    gap: 40px;
  }
}

.landing-navbar {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border: 2px solid #161a22;
  width: min-content;
  border-radius: 100px;
}

.nav-btn {
  border-radius: 100px;
}

.get-started__btn .material-icons-right {
  margin-left: 12px;
}

.get-started__container {
  width: 100%;
  display: grid;
  place-items: center;
  margin-top: calc(50px - 10dvw);
}

.title__section {
  max-width: 90dvw;
  width: 100%;
  margin: 0 auto;
  min-height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.animate__animated.animate__fadeInUp.first-title {
  animation-name: fadeInUp;
  animation-duration: 500ms;
  animation-delay: 0ms;
}

.animate__animated.animate__fadeInUp.second-title {
  animation-name: fadeInUp;
  animation-duration: 500ms;
  animation-delay: 100ms;
}

.animate__animated.animate__fadeInUp.third-title {
  animation-name: fadeInUp;
  animation-duration: 500ms;
  animation-delay: 300ms;
}

.title__container h1 {
  font-size: min(max(60px, 11.111vw), 160px);
  line-height: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  font-weight: 400;
  letter-spacing: -5px;
  word-spacing: -4px;
}
.title__container h1 span {
  text-wrap: nowrap;
}

#kenai_title {
  font-size: min(max(80px, 13vw), 160px);
  color: orange;
  font-weight: 600;
}

.title-lights {
  position: absolute;
  top: -100%;
  left: -50%;
  width: 200%;
  height: 250%;
  z-index: -1;
  background: radial-gradient(circle, #416bc031 0%, transparent 50%);
  transform: rotate(0deg);
}
</style>
