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
              class="text animate__animated animate__fadeIn"
              v-if="navbarExtended"
              >New chat</span
            >
          </Button>
        </div>
      </section>

      <section
        class="navbar__body animate__animated animate_fadeIn"
        v-if="navbarExtended"
      >
        <span class="reciente-txt">Recent</span>

        <div class="chats__container">
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
        <Toolbar class="prompt-tools" id="tools-bar">
          <template #start>
            <Button
              label="Secondary"
              severity="secondary"
              rounded
              text
              @click="toggleAttachMenu"
              aria-haspopup="true"
              aria-controls="overlay_menu"
              class="prompt-tool-btn"
            >
              <span class="material-icons-outlined chat-icon">mic</span>
            </Button>
            <Menu ref="menu" id="overlay_menu" :model="items" :popup="true" />
          </template>

          <template #center>
            <Textarea
              type="text"
              placeholder="Write a message here"
              v-model="prompt"
              size="small"
              variant="filled"
              rows="1"
              @input="[handleInput, autoResize]"
            />
          </template>

          <template #end>
            <Button severity="primary" rounded class="prompt-tool-btn" text>
              <span class="material-icons-outlined">send</span>
            </Button>
          </template>
        </Toolbar>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
// IMPORTACIONES
import { ref, watch } from "vue";

// COMPONENTES
import Chat from "@/components/layout/Chat.vue";

// VARIABLES
const navbarExtended = ref(true);
const prompt = ref("");
const menuAttach = ref();
const maxWords = 100;
const items = ref([
  {
    label: "Options",
    items: [
      {
        label: "Refresh",
        icon: "pi pi-refresh",
      },
      {
        label: "Export",
        icon: "pi pi-upload",
      },
    ],
  },
]);

// FUNCIONES RESERVADAS
watch(prompt, (newVal) => {
  const textarea = document.querySelector(
    ".p-inputtextarea"
  ) as HTMLTextAreaElement;
  if (textarea) {
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  }

  const promptBar = document.querySelector("#tools-bar") as HTMLDivElement;
  if (textarea.style.height === "22px") {
    promptBar.style.borderRadius = "3rem";
  } else {
    promptBar.style.borderRadius = "1.6rem";
  }
});

// FUNCIONES
const handleInput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement;
  const words = target.value.split(/\s+/);

  if (words.length > maxWords) {
    target.value = words.slice(0, maxWords).join(" ");
  }

  prompt.value = target.value;
};

const autoResize = (event: Event) => {
  const target = event.target as HTMLTextAreaElement;
  target.style.height = "auto";
  target.style.height = `${target.scrollHeight}px`;
};

const toggleAttachMenu = (event: any) => {
  menuAttach.value.toggle(event);
};
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
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 60px 1fr auto;
  gap: 0px 0px;
  grid-template-areas:
    "chat__header"
    "chat__body"
    "chat__footer";

  .chat__header {
    grid-area: chat__header;
    // border: 1px solid blue;
    margin: 12px;
  }

  .chat__body {
    grid-area: chat__body;
    width: auto;
    margin: 0px 6dvw;
    // border: 1px solid red;
  }

  .chat__footer {
    position: relative;
    grid-area: chat__footer;
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    justify-content: flex-end;
    padding: 40px 0px;

    .prompt-tools {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      flex-wrap: nowrap;
      gap: 10px;
      width: 90%;
      max-width: 830px;
      max-height: 236px;
      padding: 8px 10px;
      margin-top: -20px;
      border-radius: 3rem;

      .prompt-tool-btn {
        display: grid;
        place-items: center;
        width: 52px;
        height: 42px;
      }

      .p-toolbar-group-center {
        .p-inputtextarea.p-inputtext.p-component.p-variant-filled {
          height: 25px;
          margin-bottom: 10px;
          border-radius: 0px;
        }
      }
    }

    // Text area del prompt

    .p-inputtextarea.p-inputtext.p-component.p-variant-filled {
      width: 100%;
      max-height: 200px;
      height: 40px;
      overflow-y: auto;
      resize: none;
      font-weight: 500;
      padding: 0;
      font-size: 1rem;
      color: rgba(255, 255, 255, 0.863);
      outline: none;
      background-color: transparent;
      border: none;
    }
  }
}

.navbar__container {
  padding: 10px;
  height: 100dvh;
  width: 300px;
  background-color: rgba(73, 73, 73, 0.171);
  transition: width 0.4s ease, opacity 0.3s ease;
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

      .animate__animated.animate__fadeIn.text {
        animation-name: fadeIn;
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

.animate__animated.animate_fadeIn.navbar__body {
  animation-name: fadeIn;
  animation-duration: 500ms;
  animation-delay: 300ms;
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

  .reciente-txt {
    font-weight: 600;
    font-size: 0.85rem;
    margin-bottom: 4px;
    margin-left: 10px;
  }
}
</style>
