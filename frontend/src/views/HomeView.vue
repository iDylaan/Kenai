<script setup lang="ts"></script>

<template>
  <main>

    <section class="title__section">
      <div class="title-lights">
        <figure id="firt-light"></figure>
      </div>
      <div class="title__container">
        <h1><span>Bienvenido a</span> <span id="kenai_title">Kenai</span></h1>
      </div>
    </section>
    
  </main>
</template>

<style scoped lang="css">
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
  top: -100%; /* Ajusta según sea necesario para posicionar la "luz" */
  left: -50%; /* Ajusta según sea necesario para posicionar la "luz" */
  width: 200%; /* El ancho y alto extendidos ayudarán a crear un efecto de fondo difuso */
  height: 250%; /* El ancho y alto extendidos ayudarán a crear un efecto de fondo difuso */
  z-index: -1;
  background: radial-gradient(circle, #416bc031 0%, transparent 50%);
  transform: rotate(0deg); /* Rota la "luz" para crear un efecto más dinámico */
}
</style>
