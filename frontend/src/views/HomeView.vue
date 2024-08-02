<script setup>
// Importaciones
import { ref, onMounted, onUnmounted, computed, watch, nextTick } from "vue";
import { useScrollStore } from "@/stores/scroll";
import { useHomeNavbarStore } from "@/stores/home/navbar";
import { useMobileStore } from "@/stores/mobile";
import kenaiAvatar from "@/assets/imgs/Kenai-Logo.png";
// Variables
const items = ref([
  { route: "#kenai", label: "Kenai", materialIcon: "home" },
  { route: "#modelo", label: "Modelo", materialIcon: "pets" },
  { route: "#proposito", label: "Propósito", materialIcon: "adjust" },
  { route: "#aplicaciones", label: "Aplicaciones", materialIcon: "grid_view" },
  { route: "#contenido", label: "Contenido", materialIcon: "layers" },
]);

const isMenuOpen = ref(false);
const isMobileNavbarOpen = ref(false); // Nueva propiedad
const animationKenaiClass = ref('');
const carousel = ref(null);
const animateDescription = ref('animate__animated animate__fadeInUp');
const animateImage = ref('animate__animated animate__fadeIn');
const scrollStore = useScrollStore();
const navbarStore = useHomeNavbarStore();
const mobileStore = useMobileStore();

// Parallax values
const titleParallax = computed(() => {
  if (scrollStore.downScrolling) return scrollStore.scrollPosition >= 0 && scrollStore.scrollPosition <= 350; // Desaparece para scroll abajo
  else if (scrollStore.upScrolling) return scrollStore.scrollPosition >= 0 && scrollStore.scrollPosition <= 135; // Aparece
});
const propParallax = computed(() => {
  if (scrollStore.downScrolling) return scrollStore.scrollPosition >= 1400 && scrollStore.scrollPosition <= 2600;
  else if (scrollStore.upScrolling) return scrollStore.scrollPosition >= 1000 && scrollStore.scrollPosition <= 2300; // Aparece
});
const modParallax = computed(() => {
  if (scrollStore.downScrolling) return scrollStore.scrollPosition >= 580 && scrollStore.scrollPosition <= 1580;
  else if (scrollStore.upScrolling) return scrollStore.scrollPosition >= 520 && scrollStore.scrollPosition <= 1530; // Aparece
});
const appParallax = computed(() => {
  if (scrollStore.downScrolling) return scrollStore.scrollPosition >= 2250 && scrollStore.scrollPosition <= 3500;
  else if (scrollStore.upScrolling) return scrollStore.scrollPosition >= 2150 && scrollStore.scrollPosition <= 3450; // Aparece
});
const contentParallax = computed(() => {
  return scrollStore.scrollPosition >= 3350;
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
    description: 'KenAI fue reforzado mediante Fine-Tuning mediante materiales nativos en inglés de conversaciones y transcripciones de clases y reuniones de trabajo.',
    src: 'https://media.discordapp.net/attachments/915663431120609300/1268864818253922375/Kenai_Logo.png?ex=66adf9f3&is=66aca873&hm=6610eb188391f4f43d1055b968a6248b3a208c93608d82623e0a5c64265c22e6&=&format=webp&quality=lossless&width=912&height=671',
    alt: 'KenAI Logo',
  },
  {
    description: 'El reforzamiento se ha realizado gracias a datasets obtenidos en Hugging Face y Kaggle, estos datasets se enfocaron en la interacción nativa en inglés e interpretación de emociones con emojis😁🌞.',
    src: 'https://miro.medium.com/v2/resize:fit:1358/1*fX7vpC0o6pxy08AGlL60Yg.png',
    alt: 'Hugging Face',
  },
  {
    description: 'KenAI utiliza LLaMA3, el último Large Language Model (LLM) liberado por Meta. Este modelo avanzado es el núcleo de su funcionamiento, permitiendo ofrecer una experiencia de aprendizaje de alta calidad.',
    src: 'https://www.mlwires.com/wp-content/uploads/2024/04/Llama_3_featured_image-fs8.png',
    alt: 'LLaMA3'
  },
  {
    description: 'Las tecnologías web con las que se ha llevado acabo el proyecto son Flask para el backend y Vue.Js en el frontend, con Python para el proceso de entrenamiento y comunicación con el modelo KenAI.',
    src: 'https://images.velog.io/images/ba93love/post/d596a6bf-dcaf-42ff-bc19-3bab2840270d/news.png',
    alt: 'Flask & Vue.js'
  },
  {
    description: '¡KenAI está en la nube! El sistema se ejecuta sobre una instancia de una Virtual Machine (VM) y esto con el apoyo de la plataforma de Oracle Cloud Infraestructure (OCI).',
    src: 'https://www.tecnovait.com/wp-content/uploads/2023/11/oracle-servicio-cloud.png',
    alt: 'OCI'
  },
  {
    description: '!Ahora disponible con Alexa! Se ha creado una skill para amazon alexa la cual nos permite comunicarnos con KenAI desde la comodida de nuestros dispositivos inteligentes Echo, simplemente diciendo "Alexa, abre kenai chat".',
    src: 'https://ds6yc8t7pnx74.cloudfront.net/es-ES/alexa/alexa-skills-kit.thumb.800.480.png?ck=1595957409',
    alt: 'Amazon Alexa'
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
const displayTextP = ref('');
const displayTextP2 = ref('');
const displayTextP3 = ref('');
const isTypingP = ref(true);
const isTypingP2 = ref(true);
const isTypingP3 = ref(true);

const fullTextP = "Soy tu compañero de inglés, una Inteligencia Artificial diseñada para ayudarte a aprender y practicar inglés de una manera divertida y segura. Mi objetivo es hacer que te sientas cómodo y confiado al hablar inglés, sin importar tu nivel de habilidad.🤓";
const fullTextP2 = "Fui creado por un talentoso grupo de estudiantes de la Universidad Tecnológica de Nezahualcóyotl, conocidos como Equipo IT Solutions.";
const fullTextP3 = "Ellos se dieron cuenta de que muchos estudiantes, como tú, se sienten inseguros 🙁 al hablar inglés debido a los prejuicios y la falta de confianza. Por eso, decidieron crearme para brindarte un espacio amigable y seguro donde puedas mejorar tus habilidades sin temor a ser juzgado. 🤗";

let indexP = ref(0);
let indexP2 = ref(0);
let indexP3 = ref(0);
const animateNextFieldset = ref(false);

const resetTextAndIndices = () => {
  displayTextP.value = '';
  displayTextP2.value = '';
  displayTextP3.value = '';

  indexP.value = 0;
  indexP2.value = 0;
  indexP3.value = 0;

  isTypingP.value = true;
  isTypingP2.value = true;
  isTypingP3.value = true;

  animateNextFieldset.value = false;
};

const typeText = (indexRef, fullText, isTypingRef, displayTextRef, callback) => {
  if (indexRef.value < fullText.length) {
    displayTextRef.value += fullText.charAt(indexRef.value);
    indexRef.value++;
    setTimeout(() => typeText(indexRef, fullText, isTypingRef, displayTextRef, callback), 5);
  } else {
    isTypingRef.value = false;
    if (callback) callback();
  }
};

const startTypingInNextFieldset = () => {
  typeText(indexP2, fullTextP2, isTypingP2, displayTextP2, () => {
    setTimeout(() => typeText(indexP3, fullTextP3, isTypingP3, displayTextP3), 200);
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
    typeText(indexP, fullTextP, isTypingP, displayTextP, () => {
      animateNextFieldset.value = true;
    });
  } else {
    // Resetear los textos cuando propParallax sea false
    resetTextAndIndices();
  }
});
onMounted(() => {
  typeText(indexP, fullTextP, isTypingP, displayTextP, () => {
    animateNextFieldset.value = true;
  });
});

</script>


<template>
  <main>
    <Button v-if="mobileStore.isMobile" @click="navbarStore.toggleExtended()" severity="secondary" text rounded
      aria-label="Menu" size="large" class="fixed-button">
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

    <!-- NAVBAR DESKTOP -->
    <div class="nav__container" v-if="!mobileStore.isMobile">
      <nav class="landing-navbar" ref="navbar">
        <TabMenu :model="items" class="nav-tab-menu">
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
    </div>

    <!-- NAVBAR MOVIL -->
    <div class="navbar__container" v-else>

      <Sidebar v-model:visible="navbarStore.extended" class="mobile-navbar home"
        @update:visible="navbarStore.closeExtended()">
        <template #header>
          <div class="mobile-navbar__header">
            <Avatar :image="kenaiAvatar" />
            <Button severity="secondary" text>
              <span :style="[{ 'font-size': '1.2rem', fontWeight: '500' }]">KenAI</span>
            </Button>
          </div>
        </template>

        <TabMenu :model="items" class="mobile-navigator-buttons">
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
      </Sidebar>
    </div>


    <!-- END NAVBAR -->

    <!-- Modelo -->
    <section id="modelo" class="secciones">
      <div class=" text_content">
        <span :class="modParallax ? 'animate__fadeInUp' : 'animate__fadeOut'" class="title_text_content">La Tecnología
          Detrás de KenAI</span>
        <p :class="modParallax ? 'animate__fadeInUp' : 'animate__fadeOut'" class="animate__animated p_text_content">
          Para la creación de KenAI, el equipo de IT Solutions utilizó un fundamento conocido como PLMs (Pretrained
          Language
          Models), que son modelos previamente entrenados por un tercero.
        </p>
      </div>
      <div class="carousel-container animate__animated" :class="modParallax ? 'animate__fadeInUp' : 'animate__fadeOut'">
        <Carousel ref="carousel" :value="slides" :numVisible="1" :numScroll="1" :responsiveOptions="responsiveOptions"
          circular :autoplayInterval="5000" @update:page="handleNextClick">
          <template #item="slotProps">
            <div class="carousel-item">
              <div class="carousel-content">
                <div class="text-content">
                  <h3>{{ slotProps.data.description }}</h3>
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

    <!-- Content -->
    <section id="proposito" class="secciones">
      <h3 style="text-align: center; font-size: 3rem" class="animate__animated animate__fadeInLeft">¡Hola! 👋 Soy KenAI
      </h3>
      <div class="text_content">
        <Fieldset :class="propParallax ? 'animate__fadeInUp' : 'animate__fadeOutUp'"
          class="animate__animated text_content">
          <template #legend>
            <div>
              <Avatar :image="kenaiAvatar" style="margin: 0px 10px" />
            </div>
          </template>
          <div style="display: flex; align-items: flex-start; flex-direction: column;">
            <p style="text-align: left;" :class="{ 'typing': isTypingP }">{{ displayTextP }}</p>
            <p style="text-align: left;" :class="{ 'typing': isTypingP2 }">{{ displayTextP2 }}</p>
            <p style="text-align: left;" :class="{ 'typing': isTypingP3 }">{{ displayTextP3 }}</p>
          </div>
        </Fieldset>
      </div>
    </section>

    <!-- Aplicaciones -->

    <section id="aplicaciones" class="secciones">
      <div class=" text_content">
        <span class="title_text_content animate__animated"
          :class="appParallax ? 'animate__fadeInUp' : 'animate__fadeOut '">Descubre Cómo Usar KenAI
        </span>
        <p class="animate__animated animate__animated p_text_content"
          :class="appParallax ? 'animate__fadeInUp' : 'animate__fadeOut '">Aquí te presento cómo puedes usarme para
          sacar el
          máximo
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
              <p>Las escuelas pueden integrar a KenAI en sus aulas para complementar las lecciones de
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
              <p>Los profesores pueden usar KenAI como asistente para proporcionar ejercicios personalizados
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

    <footer class="footer__content">
      <Divider />
      <div class="footer_data">
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
      </div>
      <Divider />
      <div class="footer__base">
        <span>© 2024 - IT Solutions </span>

        <Divider v-if="!mobileStore.isMobile" layout="vertical" />
        <div class="terms">
          <Button size="small">Politicas de Privacidad</Button>
          <Button size="small">Terminos y Condiciones</Button>
        </div>
      </div>
    </footer>
  </main>
</template>

<style scoped lang="scss">
/* Style Home */
@import '@/assets/home.scss';
</style>
