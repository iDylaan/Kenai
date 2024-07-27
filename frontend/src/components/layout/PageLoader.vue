<template>
  <transition name="custom-fade">
    <div v-if="loading" class="loading-screen animate__animated">
      <div class="logo-container animate__animated">
        <svg viewBox="0 0 800 570" xmlns="http://www.w3.org/2000/svg" class="loader-logo">
          <path
            class="cls-1"
            d="M614.36,476.01c-26.71-45.53-38.01-118.14-38.01-118.14-45.14,18.81-114.38,61.7-114.38,61.7,0,0,19.95,26.33,52.4,68.67,32.46,42.33,41.67,37.43,41.67,37.43h115.88c0-55.68-57.56-49.66-57.56-49.66Z"
          />
          <path
            class="cls-1"
            d="M400,133.32c0-19.11,15.5-34.61,34.61-34.61-9.55,0-18.21-3.88-24.48-10.15-6.25-6.25-10.13-14.92-10.13-24.48,0,9.56-3.88,18.23-10.13,24.48-6.27,6.27-14.93,10.15-24.48,10.15,9.55,0,18.21,3.88,24.48,10.13,6.25,6.27,10.13,14.92,10.13,24.48Z"
          />
          <path
            class="cls-1"
            d="M501.86,84.03c0-11.01,8.92-19.95,19.93-19.95-5.51,0-10.48-2.23-14.1-5.83-3.6-3.62-5.83-8.59-5.83-14.1,0,5.51-2.23,10.48-5.85,14.1-3.62,3.6-8.6,5.83-14.1,5.83,5.5,0,10.48,2.23,14.1,5.85s5.85,8.6,5.85,14.1Z"
          />
          <path
            class="cls-1"
            d="M726.71,246.04s-15.98-9.4-43.83-32.92c3.57-30.47-29.35-49.66-44.21-60.77.74-17.12-2.64-33.11-27.47-39.5-33.3-7.33-44.96,24.64-44.96,24.64-60.62-27.86-102.48-19.83-147.07-.35-44.59,19.46-56.73,11.85-82.13,10.72-119.37-30.2-159.16-7.06-204.86,27.94-45.72,34.99-51.83,100.18-43.65,138.85,12.42,26.81,3.4,38.1-3.95,68.29-3.66,11.56-12.7,40.63-12.13,83.81,3.95,53.63,42.05,58.93,42.05,58.93h105.25c0-44.35-34.7-47.55-34.7-47.55h-25.4c0-41.06,31.89-68.57,31.89-68.57,71.11.55,106.94-70.83,109.77-108.46,5.26,15.24,3.95,47.04,3.95,47.04,5.64-2.52,14.55-9.08,23.71-16.52,5.18,23.75-2.26,44.69-18.85,63.55-.98.76-1.97,1.52-2.96,2.3-1.53,1.21-3.09,2.41-4.72,3.47-28.3,18.59-16.77,52.07-10.13,70.89,17.5,52.49,46.42,53.84,46.42,53.84h112.18c3.09-33.16-23.12-49.54-61.88-49.54-11.28-63.58,37.63-83.91,53.61-95.19,74.88-50.23,152.96-69.05,152.96-69.05,0,0,35.18,7.35,64.9-.74,79.77-23.14,66.22-65.1,66.22-65.1ZM463.23,251.71c0-12.73-5.16-24.25-13.5-32.59-8.34-8.34-19.86-13.5-32.59-13.5,12.73,0,24.25-5.16,32.59-13.5,8.34-8.35,13.5-19.87,13.5-32.6,0,12.73,5.16,24.25,13.5,32.6,8.34,8.34,19.87,13.5,32.6,13.5-25.46,0-46.1,20.63-46.1,46.09ZM653.87,242.63c-6.31,0-11.43-5.42-11.43-12.13s5.12-12.13,11.43-12.13,11.42,5.42,11.42,12.13-5.12,12.13-11.42,12.13Z"
          />
        </svg>
      </div>
      <div class="lights">
        <div class="light light1"></div>
        <div class="light light2"></div>
        <div class="light light3"></div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import "animate.css";

const props = defineProps({
  loading: {
    type: Boolean,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
@import "animate.css";

.loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 9999;
  overflow: hidden;
}

.logo-container {
  width: 150px;
  height: 150px;
}

.loader-logo {
  width: 100%;
  height: 100%;
}

.cls-1 {
  fill: #f39200;
  stroke-width: 0px;
}

.lights {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
}

.light {
  position: absolute;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(65, 107, 192, 0.2), rgba(65, 107, 192, 0));
  opacity: 0;
  filter: blur(50px);
  animation: flicker 2s infinite ease-in-out;
}

.light1 {
  top: 0%;
  left: 5%;
  animation-delay: 0.2s;
}

.light2 {
  top: 30%;
  left: 30%;
  animation-delay: 0.5s;
}

.light3 {
  top: 60%;
  left: 55%;
  animation-delay: 0.8s;
}

@keyframes flicker {
  0%,
  100% {
    opacity: 0;
  }

  50% {
    opacity: 1;
  }
}

.custom-fade-enter-active {
  animation: customSlideIn 0.5s ease-out forwards, customPosition 1s ease-in-out forwards;
}

.custom-fade-leave-active {
  animation: customSlideOut 0.5s ease-in forwards, customPosition 1s ease-in-out forwards;
}

@keyframes customSlideIn {
  0% {
    transform: translateX(-100%) rotate(-30deg);
    opacity: 0;
  }

  100% {
    transform: translateX(0) rotate(0deg);
    opacity: 1;
  }
}

@keyframes customSlideOut {
  0% {
    transform: translateX(0) rotate(0deg);
    opacity: 1;
  }

  100% {
    transform: translateX(100%) rotate(30deg);
    opacity: 0;
  }
}

@keyframes customPosition {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(0);
  }
}
</style>
