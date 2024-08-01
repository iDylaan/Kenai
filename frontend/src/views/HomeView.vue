<script setup>
// Importaciones
import { ref, onMounted, onUnmounted, computed, watch, nextTick } from "vue";
import { useScrollStore } from "@/stores/scroll";
import { useNavbarStore } from "@/stores/navbar";
import { useMobileStore } from "@/stores/mobile";
import kenaiAvatar from "@/assets/imgs/Kenai-Logo.png";
// Variables
const scrollStore = useScrollStore();
const items = ref([
  { route: "#kenai", label: "Kenai", materialIcon: "home" },
  { route: "#proposito", label: "Propósito", materialIcon: "adjust" },
  { route: "#modelo", label: "Modelo", materialIcon: "pets" },
  { route: "#aplicaciones", label: "Aplicaciones", materialIcon: "grid_view" },
  { route: "#contenido", label: "Contenido", materialIcon: "layers" },
]);

const isMenuOpen = ref(false);
const isMobileNavbarOpen = ref(false); // Nueva propiedad
const animationKenaiClass = ref('');
const carousel = ref(null);
const animateDescription = ref('animate__animated animate__fadeInUp');
const animateImage = ref('animate__animated animate__fadeIn');
const navbarStore = useNavbarStore();
const mobileStore = useMobileStore();

// Parallax values
const titleParallax = computed(() => {
  if (scrollStore.downScrolling) return scrollStore.scrollPosition >= 0 && scrollStore.scrollPosition <= 350; // Desaparece para scroll abajo
  else if (scrollStore.upScrolling) return scrollStore.scrollPosition >= 0 && scrollStore.scrollPosition <= 135; // Aparece
});
const propParallax = computed(() => {
  if (scrollStore.downScrolling) return scrollStore.scrollPosition >= 70 && scrollStore.scrollPosition <= 1200;
  else if (scrollStore.upScrolling) return scrollStore.scrollPosition >= 80 && scrollStore.scrollPosition <= 1100; // Aparece
});
const modParallax = computed(() => {
  if (scrollStore.downScrolling) return scrollStore.scrollPosition >= 0 && scrollStore.scrollPosition <= 1830;
  else if (scrollStore.upScrolling) return scrollStore.scrollPosition >= 720 && scrollStore.scrollPosition <= 2000; // Aparece
});
const appParallax = computed(() => {
  if (scrollStore.downScrolling) return scrollStore.scrollPosition >= 0 && scrollStore.scrollPosition <= 2900;
  else if (scrollStore.upScrolling) return scrollStore.scrollPosition >= 1900 && scrollStore.scrollPosition <= 2800; // Aparece
});
const contentParallax = computed(() => {
  if (scrollStore.downScrolling) return scrollStore.scrollPosition >= 0 && scrollStore.scrollPosition <= 3800;
  else if (scrollStore.upScrolling) return scrollStore.scrollPosition >= 2560 && scrollStore.scrollPosition <= 3400; // Aparece
});

// Animacion en el carrusel
const handleNextClick = () => {
  animateDescription.value = '';
  animateImage.value = '';
  setTimeout(() => {
    animateDescription.value = 'animate__animated animate__fadeInUp';
    animateImage.value = 'animate__animated animate__fadeIn';
  }, 100);
};

onMounted(async () => {
  mobileStore.initWidthWatch();
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

// Scroll por seccion
const activeSection = ref("#kenai");
const navbar = ref(null);

const scrollToSection = (route) => {
  const sectionId = route.substring(1);
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
  isMobileNavbarOpen.value = false;
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      activeSection.value = `/#${entry.target.id}`;
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
  updateNavbarHighlight();
  mobileStore.initWidthWatch();
});

onUnmounted(() => {
  mobileStore.destroyWidthWatch();
  items.value.forEach(item => {
    const section = document.getElementById(item.route.substring(1));
    if (section) {
      observer.unobserve(section);
    }
  });
});

// Imgenes carrusel
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
});

onUnmounted(() => {
  scrollStore.destroyScrollWatch();
});

watch(titleParallax, (newVal) => {
  if (newVal) {
    animationKenaiClass.value = 'animate__animated animate__fadeInUp';

    setTimeout(() => {
      animationKenaiClass.value = 'kenai-glow__animation'
    }, 600);
  } else {
    animationKenaiClass.value = 'animate__animated animate__fadeOutUp';
  }
});

// Funciones adicionales
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const toggleMobileNavbar = () => {
  isMobileNavbarOpen.value = !isMobileNavbarOpen.value;
  updateNavbarHighlight(); // Ensure highlight updates on toggle
};

const toggleNavbarExtended = () => {
  navbarStore.toggleExtended();
};
const displayTextH3 = ref('');
const displayTextP = ref('');
const displayTextP2 = ref('');
const displayTextP3 = ref('');
const isTypingH3 = ref(true);
const isTypingP = ref(true);
const isTypingP2 = ref(true);
const isTypingP3 = ref(true);

const fullTextH3 = "¡Hola! 👋 Soy KenAI";
const fullTextP = "Soy tu compañero de inglés, una Inteligencia Artificial diseñada para ayudarte a aprender y practicar inglés de una manera divertida y segura. Mi objetivo es hacer que te sientas cómodo y confiado al hablar inglés, sin importar tu nivel de habilidad.🤓";
const fullTextP2 = "Fui creado por un talentoso grupo de estudiantes de la Universidad Tecnológica de Nezahualcóyotl, conocidos como Equipo IT Solutions.";
const fullTextP3 = "Ellos se dieron cuenta de que muchos estudiantes, como tú, se sienten inseguros 🙁 al hablar inglés debido a los prejuicios y la falta de confianza. Por eso, decidieron crearme para brindarte un espacio amigable y seguro donde puedas mejorar tus habilidades sin temor a ser juzgado. 🤗";

let indexH3 = ref(0);
let indexP = ref(0);
let indexP2 = ref(0);
let indexP3 = ref(0);
const animateNextFieldset = ref(false);

const resetTextAndIndices = () => {
  displayTextH3.value = '';
  displayTextP.value = '';
  displayTextP2.value = '';
  displayTextP3.value = '';

  indexH3.value = 0;
  indexP.value = 0;
  indexP2.value = 0;
  indexP3.value = 0;

  isTypingH3.value = true;
  isTypingP.value = true;
  isTypingP2.value = true;
  isTypingP3.value = true;

  animateNextFieldset.value = false;
};

const typeText = (indexRef, fullText, isTypingRef, displayTextRef, callback) => {
  if (indexRef.value < fullText.length) {
    displayTextRef.value += fullText.charAt(indexRef.value);
    indexRef.value++;
    setTimeout(() => typeText(indexRef, fullText, isTypingRef, displayTextRef, callback), 15);
  } else {
    isTypingRef.value = false;
    if (callback) callback();
  }
};

const startTypingInNextFieldset = () => {
  typeText(indexP2, fullTextP2, isTypingP2, displayTextP2, () => {
    setTimeout(() => typeText(indexP3, fullTextP3, isTypingP3, displayTextP3), 500);
  });
};

watch(animateNextFieldset, (newValue) => {
  if (newValue) {
    startTypingInNextFieldset();
  }
});

watch(propParallax, (newValue) => {
  if (newValue) {
    // Resetear los textos e índices cuando propParallax sea true
    resetTextAndIndices();
    // Iniciar el efecto de escritura
    typeText(indexH3, fullTextH3, isTypingH3, displayTextH3, () => {
      typeText(indexP, fullTextP, isTypingP, displayTextP, () => {
        animateNextFieldset.value = true;
      });
    });
  } else {
    // Resetear los textos cuando propParallax sea false
    resetTextAndIndices();
  }
});
onMounted(() => {
  typeText(indexH3, fullTextH3, isTypingH3, displayTextH3, () => {
      typeText(indexP, fullTextP, isTypingP, displayTextP, () => {
        animateNextFieldset.value = true;
      });
    });
});

</script>


<template>
  <main style="overflow-x: hidden;">
    <Button v-if="mobileStore.isMobile" @click="toggleMobileNavbar" severity="secondary" text rounded aria-label="Menu"
      size="large" class="fixed-button">
      <span class="material-icons menu-icon">menu</span>
    </Button>
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
        <!-- VISTA ESCRITORIO -->
        <TabMenu v-if="!mobileStore.isMobile" :model="items" class="nav-tab-menu">
          <template #item="{ item, props }">
            <router-link v-if="item.route" v-slot="{ href }" :to="item.route" custom>
              <a v-ripple :href="href" v-bind="props.action" @click.prevent="scrollToSection(item.route)"
                :class="{ 'active': activeSection === item.route }">
                <span class="material-icons-outlined">{{ item.materialIcon }}</span>
                <span class="nav-label" v-bind="props.label">{{ item.label }}</span>
              </a>
            </router-link>
            <a v-else v-ripple :href="item.url" :target="item.target" v-bind="props.action">
              <span class="material-icons-outlined">{{ item.materialIcon }}</span>
              <span v-bind="props.label">{{ item.label }}</span>
            </a>
          </template>
        </TabMenu>
      </nav>
      <!-- VISTA MOVIL -->
      <div :class="['navbar__container', { 'open': isMobileNavbarOpen }]">
        <div class="mobile-navbar__header mobile__home">
          <Avatar :image="kenaiAvatar" class="avatar__home" />
          <span :style="[{ 'font-size': '1.2rem', fontWeight: '500' }]">KenAI</span>
          <span class="close-btn material-icons" @click="toggleMobileNavbar">close</span>
        </div>
        <TabMenu :model="items" class="nav-tab-menu">
          <template #item="{ item, props }">
            <router-link v-if="item.route" v-slot="{ href }" :to="item.route" custom>
              <a v-ripple :href="href" v-bind="props.action" @click.prevent="scrollToSection(item.route)"
                :class="{ 'active': activeSection === item.route }" class="p__menulink">
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
      </div>
    </div>


    <!-- END NAVBAR -->


    <!-- Content -->
    {{ scrollStore.scrollPosition }}
    <section id="proposito" class="secciones">
      <div class="text_content">
        <Fieldset :class="propParallax ? 'animate__slideInUp' : 'animate__slideOutDown'"
          class="animate__animated text_content">
          <template #legend>
            <div class="flex align-items-center pl-2">
              <Avatar :image="kenaiAvatar" shape="circle" />
              <span class="font-bold">KenAI</span>
            </div>
          </template>
          <div class="m-0">
            <h3 :class="{ 'typing': isTypingH3 }">{{ displayTextH3 }}</h3>
            <p :class="{ 'typing': isTypingP }">{{ displayTextP }}</p>
          </div>
        </Fieldset>
        <Fieldset :class="animateNextFieldset ? 'animate__fadeInUp' : 'animate__fadeOut'" class="animate__animated text_content">
          <template #legend>
            <div class="flex align-items-center pl-2">
              <Avatar :image="kenaiAvatar" shape="circle" />
              <span class="font-bold">KenAI</span>
            </div>
          </template>
          <div class="m-0">
            <p :class="{ 'typing': isTypingP2 }">{{ displayTextP2 }}</p>
            <p :class="{ 'typing': isTypingP3 }">{{ displayTextP3 }}</p>
          </div>
        </Fieldset>
      </div>
    </section>

    {{ scrollStore.scrollPosition }}

    <!-- Modelo -->

    <section id="modelo" class="secciones">
      <div class=" text_content">
        <span :class="modParallax ? 'animate__fadeInUp' : 'animate__fadeOut'"
          class="animate__animated title_text_content">La Tecnología Detrás de KenAI</span>
        <p :class="modParallax ? 'animate__fadeInUp' : 'animate__fadeOut'" class="animate__animated m-0 p_text_content">
          Para la creación de KenAI, el equipo de IT Solutions utilizó un fundamento conocido como PLMs (Pretrained
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
                <div class="image-content" :class="animateImage">
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
        <span class="title_text_content">Descubre Cómo Usar KenAI
        </span>
        <p class="animate__animated m-0 p_text_content">Aquí te presento cómo puedes usarme para sacar el máximo
          provecho de
          nuestras interacciones:
        </p>
      </div>

      <div class="card__content ">
        <div :class="appParallax ? 'animate__fadeInUp' : 'animate__fadeOut '"
          class=" animate__animated gradient-border">
          <Card :class="appParallax ? 'animate__fadeInUp' : 'animate__fadeOut '"
            class="animate__animated custom__card ">
            <template #header>
              <div class="card__header ">
                <img alt="Aplicación Gemini" src="@/assets/imgs/undraw_browsing_online_re_umsa.svg"
                  class="card__imagen " />
              </div>
            </template>
            <template #title>Herramienta Educativa en Escuelas</template>
            <template #content>
              <p class="m-0">Las escuelas pueden integrar a KenAI en sus aulas para complementar las lecciones de
                inglés, permitiendo a los estudiantes practicar conversaciones, mejorar su pronunciación y desarrollar
                habilidades lingüísticas en un entorno interactivo y atractivo.</p>
            </template>
          </Card>
        </div>
        <div :class="appParallax ? 'animate__fadeInUp' : 'animate__fadeOut '" class="animate__animated gradient-border">
          <Card :class="appParallax ? 'animate__fadeInUp' : 'animate__fadeOut '" class="animate__animated custom__card">
            <template #header>
              <div class="card__header ">
                <img alt="Espacio de trabajo" src="@/assets/imgs/undraw_teacher_re_sico.svg" class="card__imagen " />
              </div>
            </template>
            <template #title>Apoyo para Profesores</template>
            <template #content>
              <p class="m-0">Los profesores pueden usar KenAI como asistente para proporcionar ejercicios personalizados
                y retroalimentación instantánea a los estudiantes, facilitando una enseñanza más efectiva y adaptada a
                las necesidades individuales de cada alumno.</p>
            </template>
          </Card>
        </div>
        <div :class="appParallax ? 'animate__fadeInUp' : 'animate__fadeOut '" class="animate__animated gradient-border">
          <Card :class="appParallax ? 'animate__fadeInUp' : 'animate__fadeOut '" class="animate__animated custom__card">
            <template #header>
              <div class="card__header ">
                <img alt="Anuncios" src="@/assets/imgs/undraw_speech_to_text_re_8mtf.svg" class="card__imagen " />
              </div>
            </template>
            <template #title>Recurso en Universidades</template>
            <template #content>
              <p class="m-0">Universidades pueden implementar a KenAI para ofrecer soporte adicional a sus estudiantes,
                mejorando sus habilidades de inglés de manera autónoma y eficiente, y preparándolos mejor para sus
                estudios y futuras oportunidades profesionales.</p>
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
          class="animate__animated title_text_content">Descubre lo que puedo hacer por ti
        </span>
        <p :class="contentParallax ? 'animate__fadeInUp' : 'animate__fadeOutDown'"
          class="animate__animated m-0 p_text_content">
          Explora las funcionalidades que tengo para ofrecerte:
        </p>
      </div>

      <div class="panel__horizontal">
        <div :class="contentParallax ? 'animate__fadeInUp' : 'animate__fadeOutDown '"
          class="animate__animated card__horizontal">
          <div class="img__horizontal">
            <img src="@/assets/imgs/img2.png" alt="Imagen 1">
          </div>
          <p>
          <h4>Práctica de Conversaciones:</h4>
          <h5 class="p_horizontal"> Chatea conmigo en inglés utilizando frases cotidianas y emojis para que nuestras
            charlas
            sean más dinámicas.</h5>
          </p>
        </div>
        <div :class="contentParallax ? 'animate__fadeInUp' : 'animate__fadeOutDown '"
          class="animate__animated card__horizontal">
          <div class="img__horizontal">
            <img src="@/assets/imgs/img3.png" alt="Imagen 1">
          </div class="text__horizontal">

          <p>
          <h4>Desarrollo Integral de Habilidades:</h4>
          <h5 class="p_horizontal"> Trabajemos juntos en tu lectura, escritura, escucha y habla para que logres un
            aprendizaje completo.</h5>
          </p>

        </div>
        <div :class="contentParallax ? 'animate__fadeInUp' : 'animate__fadeOutDown '"
          class="animate__animated card__horizontal">
          <div class="img__horizontal">
            <img src="@/assets/imgs/img1.png" alt="Imagen 1">
          </div>

          <p>
          <h4>Seguimiento de Progreso: </h4>
          <h5 class="p_horizontal">Crea una cuenta para guardar el historial de nuestras conversaciones y organizar los
            temas que quieras practicar.</h5>
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
        <img :src="kenaiAvatar" alt="Kenai">
        <h1>KenAI</h1>
      </div>
    </footer>
  </main>
</template>

<style scoped lang="scss">
/* Style Home */
@import '@/assets/home.scss';
</style>
