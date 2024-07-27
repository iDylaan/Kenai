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
  if (scrollStore.downScrolling) return scrollStore.scrollPosition >= 0 && scrollStore.scrollPosition <= 800;
  else if (scrollStore.upScrolling) return scrollStore.scrollPosition >= 80 && scrollStore.scrollPosition <= 760;//Aparece
})
const cardParallax = computed(() => {
  if (scrollStore.downScrolling) return scrollStore.scrollPosition >= 1370 && scrollStore.scrollPosition <= 2280
  else if (scrollStore.upScrolling) return scrollStore.scrollPosition >= 1269 && scrollStore.scrollPosition <= 2100;//Aparece
})
const contentParallax = computed(() => {
  if (scrollStore.downScrolling) return scrollStore.scrollPosition >= 1986 && scrollStore.scrollPosition <= 2600
  else if (scrollStore.upScrolling) return scrollStore.scrollPosition >= 2090 && scrollStore.scrollPosition <= 2599;//Aparece
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
      <div class=" text_content">
        <span :class="spanParallax ? 'animate__slideInUp' : 'animate__slideOutDown'"
          class="animate__animated title_text_content">Simple Card
        </span>
        <p :class="spanParallax ? 'animate__slideInUp' : 'animate__fadeOut'"
          class="animate__animated m-0 p_text_content">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam
          deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate
          neque
          quas!
        </p>
      </div>
      
      <div class="panel__horizontal">
        <div class="card__horizontal">
          <div class="img__horizontal">
            <img src="https://vimond.academy/wp-content/uploads/2024/02/placeholder.png.webp" alt="Imagen 1">
          </div>

          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing.
          </p>

        </div>
        <div class="card__horizontal">
          <div class="img__horizontal">
            <img src="https://vimond.academy/wp-content/uploads/2024/02/placeholder.png.webp" alt="Imagen 1">
          </div class="text__horizontal">

          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing.
          </p>

        </div>
        <div class="card__horizontal">
          <div class="img__horizontal">
            <img src="https://vimond.academy/wp-content/uploads/2024/02/placeholder.png.webp" alt="Imagen 1">
          </div>

          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing.
          </p>

        </div>
      </div>

    </section>
    <!-- Modelo -->

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
                  <img :src="slotProps.data.src" :alt="slotProps.data.alt" class="carousel-image" />
                </div>
              </div>
            </div>
          </template>
        </Carousel>
      </div>
    </section>
    <!-- Aplicaciones -->
    
    <section id="aplicaciones">
      <div class=" text_content">
        <span class="animate__animated title_text_content">Simple Card
        </span>
        <p class="animate__animated m-0 p_text_content">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam
          deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate
          neque
          quas!
        </p>
      </div>
      
      <div class="card__content ">
        <div :class="cardParallax ? 'animate__fadeIn' : 'animate__fadeOut '" class=" animate__animated gradient-border">
          <Card :class="cardParallax ? 'animate__fadeIn' : 'animate__fadeOut '" class="animate__animated custom__card ">
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
        <div :class="cardParallax ? 'animate__fadeInUp' : 'animate__fadeOut '"
          class="animate__animated gradient-border">
          <Card :class="cardParallax ? 'animate__fadeInUp' : 'animate__fadeOut '"
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
        <div :class="cardParallax ? 'animate__fadeInUp' : 'animate__fadeOut '"
          class="animate__animated gradient-border">
          <Card :class="cardParallax ? 'animate__fadeInUp' : 'animate__fadeOut '"
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
      <div class=" text_content">
        <span :class="contentParallax ? 'animate__fadeInUp' : 'animate__fadeOutDown '" class="animate__animated title_text_content">Contenido
        </span>
      </div>
      
      <div class="panel__horizontal">
        <div :class="contentParallax ? 'animate__fadeInUp' : 'animate__fadeOutDown '"
          class="animate__animated card__horizontal">
          <div class="img__horizontal">
            <img src="https://vimond.academy/wp-content/uploads/2024/02/placeholder.png.webp" alt="Imagen 1">
          </div>

          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing.
          </p>

        </div>
        <div :class="contentParallax ? 'animate__fadeInUp' : 'animate__fadeOutDown '"
          class="animate__animated card__horizontal">
          <div class="img__horizontal">
            <img src="https://vimond.academy/wp-content/uploads/2024/02/placeholder.png.webp" alt="Imagen 1">
          </div class="text__horizontal">

          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing.
          </p>

        </div>
        <div :class="contentParallax ? 'animate__fadeInUp' : 'animate__fadeOutDown '"
          class="animate__animated card__horizontal">
          <div class="img__horizontal">
            <img src="https://vimond.academy/wp-content/uploads/2024/02/placeholder.png.webp" alt="Imagen 1">
          </div>

          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing.
          </p>

        </div>
      </div>
    </section>
    <footer class="footer__content">
      <div class="firts__column">
        <h2>Nombre de Equipo </h2>
        <ul>
          <li>Dani</li>
          <li>Lorem, ipsum dolor.</li>
          <li>Lorem, ipsum dolor.</li>
          <li>Lorem, ipsum dolor.</li>
        </ul>
      </div>
      <div class="second__column">
        <img src="@/assets/imgs/Kenai-Logo.png" alt="Kenai">
        <h1>Kenai</h1>
      </div>

    </footer>
  </main>
</template>
