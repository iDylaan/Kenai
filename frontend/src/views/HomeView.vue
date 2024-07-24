<script setup>
// Importaciones
import { ref, onMounted, onUnmounted, computed } from "vue";
import { useScrollStore } from "@/stores/scroll";

// Componentes

// Variables
const scrollStore = useScrollStore();
const items = ref([
  { route: "#kenai", label: "Kenai", materialIcon: "home" },
  { route: "#proposito", label: "Propósito", materialIcon: "adjust" },
  { route: "#modelo", label: "Modelo", materialIcon: "pets" },
  { route: "#aplicaciones", label: "Aplicaciones", materialIcon: "grid_view" },
  { route: "#contenido", label: "Contenido", materialIcon: "layers" },
]);

// Parallax values
const titleParallax = computed(() => {
  if (scrollStore.downScrolling) return scrollStore.scrollPosition >= 0 && scrollStore.scrollPosition <= 350;
  else if (scrollStore.upScrolling) return scrollStore.scrollPosition >= 0 && scrollStore.scrollPosition <= 135;
})

// Funciones reservadas
onMounted(() => {
  scrollStore.initScrollWatch();
})

onUnmounted(() => {
  scrollStore.destroyScrollWatch();
})



// Funcinoes
</script>

<template>
  <main>
    <!-- Title -->
    <section class="title__section" id="kenai">
      <div class="title-lights">
        <figure id="firt-light"></figure>
      </div>
      <div class="title__container" v-show="titleParallax">
        <h1>
          <span class="animate__animated animate__fadeInUp first-title">Bienvenido a</span>
          <span class="animate__animated animate__fadeInUp second-title" id="kenai_title">Kenai</span>
        </h1>

        <div class="get-started__container animate__animated animate__fadeInUp third-title">
          <router-link to="/chat">
            <Button outlined severity="contrast" class="get-started__btn">
              <span slot="label">Comenzar</span>
              <span class="material-icons material-icons-right" slot="icon">arrow_forward</span>
            </Button>
          </router-link>
        </div>
      </div>
    </section>

    <!-- NAVBAR -->
    <div class="nav__container">
      <nav class="landing-navbar">
        <TabMenu :model="items" class="nav-tab-menu">
          <template #item="{ item, props }">
            <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
              <a v-ripple :href="href" v-bind="props.action" @click="navigate">
                <span class="material-icons-outlined">{{ item.materialIcon }}</span>
                <span v-bind="props.label">{{ item.label }}</span>
              </a>
            </router-link>
            <a v-else v-ripple :href="item.url" :target="item.target" v-bind="props.action">
              <span class="material-icons-outlined">{{ item.materialIcon }}</span>
              <span v-bind="props.label">{{ item.label }}</span>
            </a>
          </template>
        </TabMenu>
      </nav>
    </div>
    <!-- END NAVBAR -->

    <!-- Content -->
    <section id="proposito">
      {{ scrollStore.scrollPosition }}
    </section>
  </main>
</template>

<style scoped lang="scss">
#proposito {
  min-height: 120dvh;
  widows: 100%;
  border: 1px solid red;
}

.get-started__btn {
  padding: 12px calc(30px + 1dvw);
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

a {
  text-decoration: none;
}

.landing-navbar {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: min-content;
  overflow: hidden;
  margin: auto;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.nav-tab-menu {
  width: 100%;

  ul {}
}

.nav__container {
  min-width: min-content;
  overflow: auto;
  padding: 0px 20px;
  width: 100%;
  position: sticky;
  top: 20px;
  margin-top: calc(30px + 10dvw / 10);
  z-index: 1000;
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
  margin-top: calc(30px - 10dvw / 2);
}

.title__section {
  max-width: 90dvw;
  width: 100%;
  margin: 0 auto;
  min-height: 70vh;
  overflow-y: visible;
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
  animation-delay: 350ms;
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
  background: linear-gradient(270deg, #fca311, #fcb243, #fc9943, #fc8243, #fca311);
  background-size: 400% 400%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
  animation: gradientRotation 5s linear infinite, textGlow 2s ease-in-out infinite alternate;
}

@keyframes gradientRotation {
  0% {
    background-position: 0% 50%;
  }

  100% {
    background-position: 400% 50%;
  }
}

@keyframes textGlow {
  0% {
    text-shadow: 0 0 5px #fca21117, 0 0 10px #fca2111a, 0 0 15px #fcb24310, 0 0 20px #fc994317, 0 0 25px #fc81431c, 0 0 30px #fca21110;
  }

  100% {
    text-shadow: 0 0 10px #fca21118, 0 0 20px #fca21121, 0 0 30px #fcb2431c, 0 0 40px #fc99431e, 0 0 50px #fc814318, 0 0 60px #fca21123;
  }
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

@media (width >=1024px) {
  .title-lights {
    position: absolute;
    top: -250%;
    left: -20%;
    width: 140%;
    height: 500%;
    z-index: -1;
    background: radial-gradient(circle, #416bc031 0%, transparent 50%);
    transform: rotate(0deg);
  }
}
</style>
