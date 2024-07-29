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
const propParallax = computed(() => {
  if (scrollStore.downScrolling) return scrollStore.scrollPosition >= 70 && scrollStore.scrollPosition <= 1100;
  else if (scrollStore.upScrolling) return scrollStore.scrollPosition >= 80 && scrollStore.scrollPosition <= 880;//Aparece
})
const modParallax = computed(() => {
  if (scrollStore.downScrolling) return scrollStore.scrollPosition >= 0 && scrollStore.scrollPosition <= 1830;
  else if (scrollStore.upScrolling) return scrollStore.scrollPosition >= 720 && scrollStore.scrollPosition <= 2000;//Aparece
})
const appParallax = computed(() => {
  if (scrollStore.downScrolling) return scrollStore.scrollPosition >= 0 && scrollStore.scrollPosition <= 2900
  else if (scrollStore.upScrolling) return scrollStore.scrollPosition >= 1900 && scrollStore.scrollPosition <= 2590;//Aparece
})
const contentParallax = computed(() => {
  if (scrollStore.downScrolling) return scrollStore.scrollPosition >= 0 && scrollStore.scrollPosition <= 3200
  else if (scrollStore.upScrolling) return scrollStore.scrollPosition >= 2560 && scrollStore.scrollPosition <= 3200;//Aparece
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
  }
});
//Scroll por seccion

const activeSection = ref("#kenai");
const navbar = ref(null);

const scrollToSection = (route) => {
  const sectionId = route.substring(1);
  const section = document.getElementById(sectionId);
  console.log(section);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      activeSection.value = `/#${entry.target.id}`;
      console.log(activeSection.value );
      updateNavbarHighlight();
    }
  });
}, { threshold: 0.5 });

const updateNavbarHighlight = () => {
  if (navbar.value) {
    nextTick(() => {
      const items = navbar.value.querySelectorAll('li');
      const inkBar = navbar.value.querySelector('.p-tabmenu-ink-bar');
      items.forEach(item => {
        const link = item.querySelector('a');
        if (link) {
          console.log(link);
          const isActive = link.getAttribute('href') == activeSection.value;
          if (isActive) {
            item.classList.add('p-highlight'); // Add class if active
            item.setAttribute('data-p-highlight', 'true');
            if (inkBar) {
              const rect = item.getBoundingClientRect();
              const navRect = navbar.value.getBoundingClientRect();
              const offset = rect.left - navRect.left;
              inkBar.style.width = `${rect.width}px`;
              inkBar.style.left = `${offset}px`;
            }
          } else {
            item.classList.remove('p-highlight'); // Remove class if not active
            item.removeAttribute('data-p-highlight');
          }
          console.log(isActive);
        }
      });
    });
  }
};

onMounted(() => {
  items.value.forEach(item => {
    const section = document.getElementById(item.route.substring(1));
    if (section) {
      observer.observe(section);
    }
  });
  updateNavbarHighlight(); // Ensure initial update
});

onUnmounted(() => {
  items.value.forEach(item => {
    const section = document.getElementById(item.route.substring(1));
    if (section) {
      observer.unobserve(section);
    }
  });
});
//Imgenes carrusel
const slides = ref([
  {
    description: 'Kenai ha sido creado utilizando LLaMA3, el LLM (Large Language Model) liberado por Meta. Este modelo avanzado es el núcleo de mi funcionamiento, permitiéndome ofrecerte una experiencia de aprendizaje de alta calidad.',
    src: 'https://hackernoon.imgix.net/images/oS3VPBDztmPNM9laovQw4x5lwE83-fqh3eg3.jpeg',
    alt: 'Image 1'
  },
  {
    description: 'LLaMA3 está diseñado para analizar grandes cantidades de datos y aprender patrones complejos del lenguaje. Esto me permite generar respuestas coherentes y contextualmente apropiadas, mejorando tu experiencia de aprendizaje con KenAI.',
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlCf2gjRY7VEYhKnj4eg-ab5poYVPq6dfa_Q&s', alt: 'Image 2'
  },
  {
    description: 'Gracias a la dedicación del equipo de IT Solutions, puedo interactuar contigo de manera natural y eficiente. Además, con la integración de Google Speech to Text, puedo comprender y responder a tus audios, mejorando tu práctica de pronunciación y escucha.',
    src: 'https://miro.medium.com/v2/resize:fit:1400/1*-V47O9e3T_LxR3P-lcpR0g.png', alt: 'Image 3'
  },
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
      <nav class="landing-navbar" ref="navbar">
        <TabMenu :model="items" class="nav-tab-menu">
          <template #item="{ item, props }">
            <router-link v-if="item.route" v-slot="{ href }" :to="item.route" custom>
              <a v-ripple :href="href" v-bind="props.action" @click.prevent="scrollToSection(item.route)"
                :class="{ 'active': activeSection === item.route }">
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
    {{ scrollStore.scrollPosition }}
    <section id="proposito" class="secciones">
      <div class=" text_content">
        <span :class="propParallax ? 'animate__slideInUp' : 'animate__slideOutDown'"
          class="animate__animated title_text_content">¡Hola! Soy Kenai
        </span>
        <p :class="propParallax ? 'animate__slideInUp' : 'animate__fadeOut'"
          class="animate__animated m-0 p_text_content">
          Soy tu compañero de ingles, una Inteligencia Artificial diseñada para ayudarte a aprender y practicar inglés
          de
          una manera
          divertida y segura. Mi objetivo es hacer que te sientas cómodo y confiado al hablar inglés, sin importar tu
          nivel
          de habilidad.
        <p>
          Fui creado por un talentoso grupo de estudiantes de la Universidad Tecnológica de Nezahualcóyotl, conocidos
          como <b> Equipo IT Solutions</b>.
        <p>Ellos se dieron cuenta de que muchos estudiantes, como tú, se sienten
          inseguros
          al
          hablar inglés debido a los prejuicios y la falta de confianza. Por eso, decidieron crearme para brindarte un
          espacio
          amigable y seguro donde puedas mejorar tus habilidades sin temor a ser juzgado.
        </p>
        </p>
        </p>
      </div>
      <br>
      <h3 :class="propParallax ? 'animate__slideInUp' : 'animate__slideOutDown'" class="animate__animated sub__prop">
        ¿Cómo
        puedo
        ayudarte?</h3>
      <div :class="propParallax ? 'animate__slideInUp' : 'animate__fadeOut'"
        class="animate__animated panel__horizontal">
        <div class="card__horizontal">
          <div class="img__horizontal">
            <img src="@/assets/imgs/img1.png" alt="Imagen 1">
          </div>
          <p>
            Estoy aquí para charlar sobre cualquier tema que te interese.Puedes hablar conmigo a través de texto o
            audio.
          </p>
        </div>
        <div class="card__horizontal">
          <div class="img__horizontal">
            <img src="@/assets/imgs/img2.png" alt="Imagen 1">
          </div class="text__horizontal">

          <p>
            Te sugiero temas de conversación y te doy ideas para que siempre tengas algo nuevo que practicar.
          </p>

        </div>
        <div class="card__horizontal">
          <div class="img__horizontal">
            <img src="@/assets/imgs/img3.png" alt="Imagen 1">
          </div>

          <p>
            Te ayudo a mejorar en todas las áreas del inglés: lectura, escritura, escucha y habla.
          </p>

        </div>
      </div>

    </section>

    {{ scrollStore.scrollPosition }}

    <!-- Modelo -->

    <section id="modelo" class="secciones">
      <div class=" text_content">
        <span :class="modParallax ? 'animate__fadeInUp' : 'animate__fadeOut'"
          class="animate__animated title_text_content">La Tecnología Detrás de Kenai</span>
        <p :class="modParallax ? 'animate__fadeInUp' : 'animate__fadeOut'" class="animate__animated m-0 p_text_content">
          Para la creación de Kenai, el equipo de IT Solutions utilizó un fundamento conocido como PLMs (Pretrained
          Language
          Models), que son modelos previamente entrenados por un tercero.
        </p>
      </div>
      <div class="carousel-container">
        <Carousel ref="carousel" :value="slides" :numVisible="1" :numScroll="1" :responsiveOptions="responsiveOptions"
          circular :autoplayInterval="5000" @update:page="handleNextClick">
          <template #item="slotProps">
            <div class="carousel-item">
              <div class="carousel-content">
                <div class="text-content">
                  <h3 :class="animateDescription">{{ slotProps.data.description }}</h3>
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

    {{ scrollStore.scrollPosition }}
    <!-- Aplicaciones -->

    <section id="aplicaciones" class="secciones">
      <div class=" text_content">
        <span class="title_text_content">Simple Card
        </span>
        <p class="animate__animated m-0 p_text_content">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae
          numquam
          deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse,
          cupiditate
          neque
          quas!
        </p>
      </div>

      <div class="card__content ">
        <div :class="appParallax ? 'animate__fadeInUp' : 'animate__fadeOut '"
          class=" animate__animated gradient-border">
          <Card :class="appParallax ? 'animate__fadeInUp' : 'animate__fadeOut '"
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
        <div :class="appParallax ? 'animate__fadeInUp' : 'animate__fadeOut '" class="animate__animated gradient-border">
          <Card :class="appParallax ? 'animate__fadeInUp' : 'animate__fadeOut '" class="animate__animated custom__card">
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
        <div :class="appParallax ? 'animate__fadeInUp' : 'animate__fadeOut '" class="animate__animated gradient-border">
          <Card :class="appParallax ? 'animate__fadeInUp' : 'animate__fadeOut '" class="animate__animated custom__card">
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

    {{ scrollStore.scrollPosition }}
    <!-- Contenido -->

    <section id="contenido" class="secciones">
      <div class=" text_content">
        <span :class="contentParallax ? 'animate__fadeInUp' : 'animate__fadeOutDown '"
          class="animate__animated title_text_content">Contenido
        </span>
        <p :class="contentParallax ? 'animate__fadeInUp' : 'animate__fadeOutDown'"
          class="animate__animated m-0 p_text_content">
          Soy tu compañero de ingles, una Inteligencia Artificial diseñada para ayudarte a aprender .
        </p>
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
    {{ scrollStore.scrollPosition }}
    <footer class="footer__content">
      <div class="firts__column">
        <h2>IT Solutions </h2>
        <ul class="list">
          <li>Campos Figueroa Brandon</li>
          <li>Chaparro Marin Daniel</li>
          <li>Cruz Hernández Génesis Uriel Yair</li>
          <li>Cortes Islas Brandon</li>
        </ul>
      </div>
      <div class="second__column">
        <img src="@/assets/imgs/Kenai-Logo.png" alt="Kenai">
        <h1>Kenai</h1>
      </div>

    </footer>
  </main>
</template>
