<template>
  <main class="main-container">
    <section
      :class="['navbar__container', !navbarExtended ? 'not-extended' : '']"
    >
      <section class="navbar__header">
        <div class="menu-btn__container">
          <Button
            severity="secondary"
            size="small"
            text
            rounded
            @click="toggleNavbarExtended"
          >
            <span class="material-icons menu-icon">menu</span>
          </Button>
        </div>

        <div class="new-btn__container">
          <Button
            severity="secondary"
            size="small"
            class="new-btn"
            rounded
            outlined
          >
            <span class="material-icons">add</span>
            <span
              class="text animate__animated animate__fadeInLeft"
              v-if="navbarExtended"
              >New chat</span
            >
          </Button>
        </div>
      </section>

      <section class="navbar__body" v-if="navbarExtended">
        <span class="reciente-txt animate__animated animate_fadeInUp"
          >Recent</span
        >

        <div class="chats__container animate__animated animate_fadeInUp">
          <Button severity="primary" class="chat-btn">
            <span class="material-icons-outlined chat-icon"
              >mark_chat_unread</span
            >
            <span class="text">Chat</span>
          </Button>

          <Button severity="secondary" class="chat-btn">
            <span class="material-icons-outlined chat-icon"
              >mark_chat_unread</span
            >
            <span class="text">Chat</span>
          </Button>

          <Button severity="secondary" class="chat-btn">
            <span class="material-icons-outlined chat-icon"
              >mark_chat_unread</span
            >
            <span class="text">Chat</span>
          </Button>

          <Button severity="secondary" class="chat-btn">
            <span class="material-icons-outlined chat-icon"
              >mark_chat_unread</span
            >
            <span class="text">Chat</span>
          </Button>

          <Button severity="secondary" class="chat-btn">
            <span class="material-icons-outlined chat-icon"
              >mark_chat_unread</span
            >
            <span class="text">Chat</span>
          </Button>
        </div>
      </section>

      <section class="navbar__footer"></section>
    </section>

    <!-- CONTENT AREA -->
    <section class="chat__container">
      <div class="chat__header"></div>

      <div class="chat__body"></div>

      <div class="chat__footer">
        <InputText type="text" placeholder="Prompt" v-model="prompt" size="large" variant="filled" />
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
// IMPORTACIONES
import { ref } from "vue";

// COMPONENTES
import Chat from "@/components/layout/Chat.vue";

// VARIABLES
const navbarExtended = ref(true);
const prompt = ref(null);

// FUNCIONES RESERVADAS

// FUNCIONES
const toggleNavbarExtended = () =>
  (navbarExtended.value = !navbarExtended.value);
</script>

<style scoped lang="scss">
.main-container {
  display: flex;
}

.chat__container {
  height: 100dvh;
  width: 100%;
  display: ;

  .chat__footer {
    width: 100%;
    .p-inputtext.p-inputtext-lg {
      width: 100%;
      border-radius: 100px;
      padding: 0.7rem 1.5rem;
    }
  }
}

.navbar__container {
  padding: 10px;
  height: 100dvh;
  width: 300px;
  background-color: rgba(73, 73, 73, 0.171);
  transition: width 0.3s ease-in-out, opacity 0.3s ease-in-out;
}

.not-extended {
  width: 80px;
}

.navbar__header {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 40px;
  padding-bottom: 15px;

  .menu-btn__container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;

    .menu-icon {
      color: white;
    }
  }

  .new-btn__container {
    width: 100%;
    display: flex;
    align-items: center;

    .new-btn {
      display: flex;
      align-items: center;
      gap: 10px;
      height: 39.14px;

      .animate__animated.animate__fadeInLeft.text {
        animation-name: fadeInLeft;
        animation-duration: 500ms;
        animation-delay: 70ms;
      }

      .text {
        font-weight: 500;
        font-size: 1rem;
      }
    }
  }
}

.navbar__body {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;

  .chats__container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 100%;
    gap: 10px;

    .chat-btn {
      display: flex;
      align-items: center;
      gap: 10px;

      .chat-icon {
        font-size: 0.9rem;
      }
    }
  }

  .animate__animated.animate_fadeInUp.reciente-txt {
    animation-name: fadeInUp;
    animation-duration: 400ms;
    animation-delay: 300ms;
  }
  .animate__animated.animate_fadeInUp.chats__container {
    animation-name: fadeInUp;
    animation-duration: 400ms;
    animation-delay: 350ms;
  }

  .reciente-txt {
    font-weight: 600;
    font-size: 0.85rem;
    margin-bottom: 4px;
    margin-left: 10px;
  }
}
</style>
