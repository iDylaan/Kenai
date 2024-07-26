<script setup>
// Importaciones
import { ref, onMounted, onUnmounted, computed, watch, nextTick } from "vue";
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

const animationKenaiClass = ref('');
const carousel = ref(null);
const animateTitle = ref('animate__animated animate__fadeInUp');
const animateDescription = ref('animate__animated animate__fadeInUp');
const animateImage = ref('animate__animated animate__fadeInUp');

// Parallax values
const titleParallax = computed(() => {
  if (scrollStore.downScrolling) return scrollStore.scrollPosition >= 0 && scrollStore.scrollPosition <= 350; //Desaparece para scroll abajo
  else if (scrollStore.upScrolling) return scrollStore.scrollPosition >= 0 && scrollStore.scrollPosition <= 135; //Aparece
})
const spanParallax = computed(() => {
  if (scrollStore.downScrolling) return scrollStore.scrollPosition >= 0 && scrollStore.scrollPosition <= 690;
  else if (scrollStore.upScrolling) return scrollStore.scrollPosition >= 80 && scrollStore.scrollPosition <= 660;//Aparece
})
const cardParallax = computed(() => {
  if (scrollStore.downScrolling) return scrollStore.scrollPosition >= 80 && scrollStore.scrollPosition <= 1600
  else if (scrollStore.upScrolling) return scrollStore.scrollPosition >= 910 && scrollStore.scrollPosition <= 1500;//Aparece
})
// Animacion en el carrusel


const handleNextClick = () => {
  animateTitle.value = '';
  animateDescription.value = '';
  animateImage.value = '';
  setTimeout(() => {
    animateTitle.value = 'animate__animated animate__fadeInUp';
    animateDescription.value = 'animate__animated animate__fadeInUp';
    animateImage.value = 'animate__animated animate__fadeInUp';
  }, 100);
};

onMounted(async () => {
  await nextTick();
  if (carousel.value && carousel.value.$el) {
    const nextButton = carousel.value.$el.querySelector('.p-carousel-next');
    const prevButton = carousel.value.$el.querySelector('.p-carousel-prev');

    if (nextButton) {
      nextButton.addEventListener('click', handleNextClick);
    }

    if (prevButton) {
      prevButton.addEventListener('click', handleNextClick);
    }

    carousel.value.$el.addEventListener('change', handleNextClick);
    console.log(carousel.value.$el);
  }
});
//Scroll por seccion
const scrollToSection = (route) => {
  const sectionId = route.substring(1);
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
};

//Imgenes carrusel
const slides = ref([
  { title: 'Gemini models can generate code based on different kinds of inputs.', description: 'Gemini models can generate code based on different kinds of inputs.', src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlCf2gjRY7VEYhKnj4eg-ab5poYVPq6dfa_Q&s', alt: 'Image 1' },
  { title: 'Gemini models can generate code based on different kinds of inputs.', description: 'Gemini models can generate code based on different kinds of inputs.', src: 'https://about.fb.com/es/wp-content/uploads/sites/13/2024/04/Introducing-Llama-3.png?fit=1204%2C679', alt: 'Image 2' },
  { title: 'Gemini models can generate code based on different kinds of inputs.', description: 'Gemini models can generate code based on different kinds of inputs.', src: 'https://upload.wikimedia.org/wikipedia/commons/c/cc/Amazon_Alexa_App_Logo.png', alt: 'Image 3' },
]);


const responsiveOptions = ref([
  {
    breakpoint: '1400px',
    numVisible: 1,
    numScroll: 1
  },
  {
    breakpoint: '1199px',
    numVisible: 1,
    numScroll: 1
  },
  {
    breakpoint: '767px',
    numVisible: 1,
    numScroll: 1
  },
  {
    breakpoint: '575px',
    numVisible: 1,
    numScroll: 1
  }
]);

// Funciones reservadas
onMounted(() => {
  scrollStore.initScrollWatch();
  animationKenaiClass.value = 'animate__animated animate__fadeInUp'
  setTimeout(() => {
    animationKenaiClass.value = 'kenai-glow__animation'
  }, 600);
})

onUnmounted(() => {
  scrollStore.destroyScrollWatch();
})

watch(titleParallax, (newVal) => {
  if (newVal) {
    animationKenaiClass.value = 'animate__animated animate__fadeInUp';

    setTimeout(() => {
      animationKenaiClass.value = 'kenai-glow__animation'
    }, 600);
  } else {
    animationKenaiClass.value = 'animate__animated animate__fadeOutUp';
  }
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
      <div class="title__container">

        <h1>
          <span :class="titleParallax ? 'animate__fadeInUp' : 'animate__fadeOutUp'"
            class="first-title animate__animated">Bienvenido
            a</span>
          <span :class="animationKenaiClass" class="second-title" id="kenai_title">Kenai</span>
        </h1>

        <div :class="titleParallax ? 'animate__fadeInUp' : 'animate__fadeOutUp'"
          class="third-title get-started__container animate__animated">
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
              <a v-ripple :href="href" v-bind="props.action" @click.prevent="scrollToSection(item.route)">
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
      <div class=" proposito__content">
        <h1 :class="spanParallax ? 'animate__slideInUp' : 'animate__slideOutDown'" class="animate__animated">Simple Card
        </h1>
        <p :class="spanParallax ? 'animate__slideInUp' : 'animate__fadeOut'" class="animate__animated m-0 p__proposito">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam
          deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate
          neque
          quas!
        </p>
      </div>
    </section>
    <!-- Modelo -->
    {{ scrollStore.scrollPosition }}
    <section id="modelo">
      <div class="carousel-container">
        <Carousel ref="carousel" :value="slides" :numVisible="1" :numScroll="1" :responsiveOptions="responsiveOptions"
          circular :autoplayInterval="5000" @update:page="handleNextClick">
          <template #item="slotProps">
            <div class="carousel-item">
              <div class="carousel-content">
                <div class="text-content">
                  <h2 :class="animateTitle">{{ slotProps.data.title }}</h2>
                  <p :class="animateDescription">{{ slotProps.data.description }}</p>
                </div>
                <div class="image-content">
                  <img :src="slotProps.data.src" :alt="slotProps.data.alt" 
                    class="carousel-image" />
                </div>
              </div>
            </div>
          </template>
        </Carousel>
      </div>
    </section>
    <!-- Aplicaciones -->

    <section id="aplicaciones">
      <div class="card__content ">
        <div class="gradient-border">
          <Card :class="cardParallax ? 'animate__fadeInUp' : 'animate__fadeOutDown '"
            class="animate__animated custom__card ">
            <template #header>
              <div class="card__header ">
                <img alt="Aplicación Gemini"
                  src="https://lh3.googleusercontent.com/hRHXzqoiepyRdZldzouwopBfzZE8qrdOeo9rk1s-8M3xBCqZLAhiHftlOA1M2L-SNnQBYzEZaXmINpng1coPWwUJ1VsHH6Kkt3sTkT7pmExwu7eq=w400"
                  class="card__imagen " />
              </div>
            </template>
            <template #title>Primera</template>
            <template #content>
              <p class="m-0">Lorem, ipsum dolor...</p>
            </template>
          </Card>
        </div>
        <div class="gradient-border">
          <Card :class="cardParallax ? 'animate__fadeInUp' : 'animate__fadeOutDown '"
            class="animate__animated custom__card">
            <template #header>
              <div class="card__header ">
                <img alt="Espacio de trabajo"
                  src="https://lh3.googleusercontent.com/hRHXzqoiepyRdZldzouwopBfzZE8qrdOeo9rk1s-8M3xBCqZLAhiHftlOA1M2L-SNnQBYzEZaXmINpng1coPWwUJ1VsHH6Kkt3sTkT7pmExwu7eq=w400"
                  class="card__imagen " />
              </div>
            </template>
            <template #title>Segundo</template>
            <template #content>
              <p class="m-0">Lorem, ipsum dolor.</p>
            </template>
          </Card>
        </div>
        <div class="gradient-border">
          <Card :class="cardParallax ? 'animate__fadeInUp' : 'animate__fadeOutDown '"
            class="animate__animated custom__card">
            <template #header>
              <div class="card__header ">
                <img alt="Anuncios"
                  src="https://lh3.googleusercontent.com/hRHXzqoiepyRdZldzouwopBfzZE8qrdOeo9rk1s-8M3xBCqZLAhiHftlOA1M2L-SNnQBYzEZaXmINpng1coPWwUJ1VsHH6Kkt3sTkT7pmExwu7eq=w400"
                  class="card__imagen " />
              </div>
            </template>
            <template #title>Tercera</template>
            <template #content>
              <p class="m-0">Lorem, ipsum dolor</p>
            </template>
          </Card>
        </div>
      </div>
    </section>
    <!-- Contenido -->
    <section id="contenido">

    </section>

  </main>
</template>

<style scoped lang="scss">
#proposito {
  widows: 100%;
  margin: 100px 100px 20px;
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

.animate__animated.animate__fadeOutUp.first-title {
  animation-name: fadeOutUp;
  animation-duration: 500ms;
  animation-delay: 0ms;
}

.animate__animated.animate__fadeOutUp.second-title {
  animation-name: fadeOutUp;
  animation-duration: 500ms;
  animation-delay: 100ms;
}

.animate__animated.animate__fadeOutUp.third-title {
  animation-name: fadeOutUp;
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
  background: linear-gradient(270deg, #fca311, #fcb243, #fc9943, #fc8243, #fd950e);
  background-size: 400% 400%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
}

.kenai-glow__animation {
  animation: textGlowFadeIn 500ms ease-in-out forwards, gradientRotation 5s linear infinite 0.5s, textGlow 2s ease-in-out infinite alternate 0.5s !important;
}

@keyframes textGlowFadeIn {
  0% {
    text-shadow: none;
  }

  100% {
    text-shadow: 0 0 15px #fca21117, 0 0 10px #fca2111a, 0 0 15px #fcb24310, 0 0 20px #fc994317, 0 0 25px #fc81431c, 0 0 30px #fca21110;
  }
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

.no-visible {
  visibility: hidden;
}

//Estilos Propositos
.proposito__content {
  display: block;
  text-align: center
}

#aplicaciones {
  display: flex;
}

.card__content {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  padding: 20px 150px;
}

.custom__card {
  overflow: hidden;
  background-color: #1e1e1e;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  color: #ffffff;
  /* Texto blanco */
  position: relative;
}

.custom__card:hover {
  border-image-source: linear-gradient(to left, #743ad5, #d53a9d);
}

.card__header {
  display: flex;
  align-items: center;
  padding: 10px;
}

.custom__card .card__imagen {
  width: 100%;
  height: auto;
  border-radius: 5px;
  margin-right: 10px;
}

.custom__card .p-card-title {
  font-size: 1.2em;
  font-weight: bold;
}

.custom__card .p-card-content p {
  color: #b3b3b3;
  /* Texto gris */
}

.custom__card::after {
  font-size: 24px;
  color: #ffffff;
  position: absolute;
  bottom: 16px;
  right: 16px;
}

.p__proposito {
  padding: 0px 50px;
}

.gradient-border {
  width: 25rem;
  height: 27.6rem;
  transition: transform 0.1s;
  transform-style: preserve-3d;
  transform: rotateX(0) rotateY(0);
}

.gradient-border::before,
.gradient-border::after {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(270deg, #fca311, #fcb243, #fc9943, #fc8243, #fd950e);
  background-size: 400% 400%;
  z-index: -1;
  border-radius: 12px;
  transition: opacity 0.3s;
  opacity: 0;
  pointer-events: none;
}

.gradient-border::before {
  filter: blur(3px);
}

.gradient-border:hover::before,
.gradient-border:hover::after {
  opacity: 1;
  animation: gradientRotation 5s linear infinite;
}

@keyframes gradientRotation {
  0% {
    background-position: 0% 50%;
  }

  100% {
    background-position: 400% 50%;
  }
}


//Estilos Modelo
.carousel-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 100px;
}

.carousel-item {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
}

.carousel-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 300px;
  padding: 20px;
  box-sizing: border-box;
  background-color: #121212;
  color: #fff;
  border-radius: 8px;
}

.text-content {
  flex: 1;
  padding-right: 20px;
}

.image-content {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2px;
}

.carousel-image {
  max-width: 100%;
  border-radius: 8px;
}
</style>
