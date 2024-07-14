<template>
  <PageLoader :loading="pageLoading" />

  <main class="main-container">
    <Sidebar v-model:visible="navbarStore.extended" class="mobile-navbar" v-if="mobileStore.isMobile">
      <template #header>
        <div class="mobile-navbar__header">
          <Avatar :image="kenaiAvatar" />
          <span :style="[{ 'font-size': '1.2rem', fontWeight: '500' }]">KenAI</span>
        </div>
      </template>

      <section class="navbar__header">
        <div class="new-btn__container">
          <Button severity="secondary" size="small" class="new-btn" rounded outlined>
            <span class="material-icons">add</span>
            <span class="text animate__animated animate__fadeIn">{{
              $t("chat.new_chat")
            }}</span>
          </Button>
        </div>
      </section>

      <section class="navbar__body animate__animated animate_fadeIn">
        <span class="reciente-txt">{{ $t("chat.recent") }}</span>
        <div class="chats__container">
          <SplitButton label="Save" icon="pi pi-check" severity="primary" class="chat-btn"
            menuButtonIcon="pi pi-ellipsis-v" @click="switchChat" :model="chatOptions">
            <span class="material-icons-outlined chat-icon">mark_chat_unread</span>
            <span class="text">Chat</span>
          </SplitButton>

          <SplitButton label="Save" icon="pi pi-check" severity="secondary" class="chat-btn"
            menuButtonIcon="pi pi-ellipsis-v" @click="switchChat" :model="chatOptions">
            <span class="material-icons-outlined chat-icon">mark_chat_unread</span>
            <span class="text">Chat</span>
          </SplitButton>

          <SplitButton label="Save" icon="pi pi-check" severity="secondary" class="chat-btn"
            menuButtonIcon="pi pi-ellipsis-v" @click="switchChat" :model="chatOptions">
            <span class="material-icons-outlined chat-icon">mark_chat_unread</span>
            <span class="text">Chat</span>
          </SplitButton>

          <SplitButton label="Save" icon="pi pi-check" severity="secondary" class="chat-btn"
            menuButtonIcon="pi pi-ellipsis-v" @click="switchChat" :model="chatOptions">
            <span class="material-icons-outlined chat-icon">mark_chat_unread</span>
            <span class="text">Chat</span>
          </SplitButton>
        </div>
      </section>

      <section class="navbar__footer">
        <Button label="Secondary" severity="secondary" text class="settings-btn" rounded @click="toggleSettingsPopup"
          aria-haspopup="true" aria-controls="overlay_menu">
          <span class="material-icons-outlined chat-icon">settings</span>
          <span class="text">{{ $t("chat.settings") }}</span>
        </Button>
        <Menu ref="menuSettings" id="overlay_menu_settings" :model="settingsItems" :popup="true">
          <template #item="{ item, props }" class="config-option">
            <a v-bind="props.action" @click.stop>
              <template v-if="item.type === 'button'" class="config-option">
                <span>{{ $t("chat." + item.label) }}</span>
              </template>
              <template v-else-if="item.type === 'switch'" class="config-option">
                <span>{{ $t("chat." + item.label) }}</span>
                <InputSwitch v-model="darkThemeChecked" />
              </template>
              <template v-else-if="item.type === 'select'" class="config-option">
                <span>{{ $t("chat." + item.label) }}</span>
                <Dropdown v-model="siteLanguage" :options="item.children" optionLabel="label"
                  @change="handleLanguageChange">
                  <template #item="{ option }">
                    <span>{{ $t("chat." + option.label) }}</span>
                  </template>
                </Dropdown>
              </template>
            </a>
          </template>
        </Menu>
      </section>
    </Sidebar>

    <section :class="['navbar__container', !navbarStore.extended ? 'not-extended' : '']" v-if="!mobileStore.isMobile">
      <section class="navbar__header">
        <div class="menu-btn__container">
          <Button severity="secondary" size="small" text rounded @click="toggleNavbarExtended">
            <span class="material-icons menu-icon">menu</span>
          </Button>
        </div>

        <div class="new-btn__container">
          <Skeleton height="40px" borderRadius="100px" v-if="pageLoading"></Skeleton>

          <Button severity="secondary" size="small" class="new-btn" rounded outlined v-else>
            <span class="material-icons">add</span>
            <span class="text animate__animated animate__fadeIn" v-if="navbarStore.extended">{{ $t("chat.new_chat")
              }}</span>
          </Button>
        </div>
      </section>

      <section class="navbar__body animate__animated animate_fadeIn" v-if="navbarStore.extended">
        <span class="reciente-txt">{{ $t("chat.recent") }}</span>
        <div class="chats-skeleton" v-if="pageLoading">
          <Skeleton height="40px"></Skeleton>
          <Skeleton height="40px" style="margin-top: 10px;"></Skeleton>
          <Skeleton height="40px" style="margin-top: 10px;"></Skeleton>
          <Skeleton height="40px" style="margin-top: 10px;"></Skeleton>
        </div>
        <div class="chats__container" v-else>
          <SplitButton label="Save" icon="pi pi-check" severity="primary" class="chat-btn"
            menuButtonIcon="pi pi-ellipsis-v" @click="switchChat" :model="chatOptions">
            <span class="material-icons-outlined chat-icon">mark_chat_unread</span>
            <span class="text">Chat</span>
          </SplitButton>

          <SplitButton label="Save" icon="pi pi-check" severity="secondary" class="chat-btn"
            menuButtonIcon="pi pi-ellipsis-v" @click="switchChat" :model="chatOptions">
            <span class="material-icons-outlined chat-icon">mark_chat_unread</span>
            <span class="text">Chat</span>
          </SplitButton>

          <SplitButton label="Save" icon="pi pi-check" severity="secondary" class="chat-btn"
            menuButtonIcon="pi pi-ellipsis-v" @click="switchChat" :model="chatOptions">
            <span class="material-icons-outlined chat-icon">mark_chat_unread</span>
            <span class="text">Chat</span>
          </SplitButton>

          <SplitButton label="Save" icon="pi pi-check" severity="secondary" class="chat-btn"
            menuButtonIcon="pi pi-ellipsis-v" @click="switchChat" :model="chatOptions">
            <span class="material-icons-outlined chat-icon">mark_chat_unread</span>
            <span class="text">Chat</span>
          </SplitButton>
        </div>
      </section>

      <section class="navbar__footer">
        <Button label="Secondary" severity="secondary" text class="settings-btn" rounded @click="toggleSettingsPopup"
          aria-haspopup="true" aria-controls="overlay_menu">
          <span class="material-icons-outlined chat-icon">settings</span>
          <span class="text" v-if="navbarStore.extended">{{
            $t("chat.settings")
          }}</span>
        </Button>
        <Menu ref="menuSettings" id="overlay_menu_settings" :model="settingsItems" :popup="true">
          <template #item="{ item, props }" class="config-option">
            <a v-bind="props.action" @click.stop>
              <template v-if="item.type === 'button'" class="config-option">
                <span>{{ $t("chat." + item.label) }}</span>
              </template>
              <template v-else-if="item.type === 'switch'" class="config-option">
                <span>{{ $t("chat." + item.label) }}</span>
                <InputSwitch v-model="darkThemeChecked" />
              </template>
              <template v-else-if="item.type === 'select'" class="config-option">
                <span>{{ $t("chat." + item.label) }}</span>
                <Dropdown v-model="siteLanguage" :options="item.children" optionLabel="label"
                  @change="handleLanguageChange">
                  <template #item="{ option }">
                    <span>{{ $t("chat." + option.label) }}</span>
                  </template>
                </Dropdown>
              </template>
            </a>
          </template>
        </Menu>
      </section>
    </section>

    <!-- CONTENT AREA -->
    <section class="chat__container">
      <div class="chat__header">
        <h1 v-if="!mobileStore.isMobile">KenAI</h1>
        <Button v-else @click="toggleMobileNavbar" severity="secondary" text rounded aria-label="Menu" size="large">
          <span class="material-icons menu-icon">menu</span>
        </Button>

        <div class="profile__container">
          <Skeleton shape="circle" size="3rem" v-if="pageLoading"></Skeleton>
          <Button severity="secondary" text rounded :style="[{ 'padding': '5px' }]" v-else>
            <Avatar :image="sessionStore.isAuthenticated ? sessionStore.user.picture : defaultAvatar" size="default"
              shape="circle" @click="toggle" />
          </Button>
          <OverlayPanel ref="op" showCloseIcon :style="[{ width: mobileStore.isMobile ? '100dvw' : '436px' }]">
            <GoogleLogin />
          </OverlayPanel>
        </div>
      </div>

      <div class="chat__body">
        <div class="messages__container">
          <div v-for="(chat, index) in chatHistory" :key="index">
            <div class="message__container user-message__container">
              <Fieldset class="user-message">
                <template #legend>
                  <div class="top-fieldset-user">
                    <Avatar :image="sessionStore.isAuthenticated ? sessionStore.user.picture : defaultAvatar"
                      shape="circle" />
                  </div>
                </template>
                <p v-html="chat.user.message" class="message-content"></p>
              </Fieldset>
            </div>

            <div class="message__container">
              <Fieldset class="message">
                <template #legend>
                  <div class="top-fieldset">
                    <Avatar :image="kenaiAvatar" />
                  </div>
                </template>
                <div class="loader" v-if="chat.kenai.loading"
                  :style="[{ 'display': 'flex', 'gap': '5px', 'flex-direction': 'column', 'alignContent': 'flex-start' }]">
                  <Skeleton></Skeleton>
                  <Skeleton width="70%"></Skeleton>
                  <Skeleton width="40%"></Skeleton>
                </div>
                <InlineMessage v-if="chat.kenai.error" severity="error">{{
                  chat.kenai.errorMessage
                }}</InlineMessage>
                <p class="response" v-html="marked(chat.kenai.renderedResponse)"></p>
              </Fieldset>
            </div>
          </div>
        </div>
      </div>

      <div class="chat__footer">
        <Toolbar class="prompt-tools" id="tools-bar">
          <template #start>
            <Skeleton shape="circle" size="42px" v-if="pageLoading"></Skeleton>
            <Button label="Secondary" severity="secondary" rounded text class="prompt-tool-btn"
              :disabled="promptFetching" v-else>
              <span class="material-icons-outlined chat-icon">mic</span>
            </Button>
          </template>

          <template #center>
            <Skeleton height="35px" style="margin-bottom: 7px;" v-if="pageLoading"></Skeleton>
            <Textarea type="text" @input="handleInput" v-else @keydown.enter="handleEnter"
              :placeholder="$t('chat.type_a_message')" v-model="prompt" :disabled="promptFetching" size="small"
              variant="filled" rows="1" />
            <div class="char-counter">
              {{ charCount }}/{{ promptMaxLenght }}
            </div>
          </template>

          <template #end>
            <Skeleton shape="circle" size="42px" v-if="pageLoading"></Skeleton>
            <Button severity="primary" v-else rounded class="prompt-tool-btn" text @click="handleSendPrompt"
              :disabled="promptFetching">
              <span class="material-icons-outlined">send</span>
            </Button>
          </template>
        </Toolbar>
      </div>
    </section>
  </main>
</template>

<script setup>
// IMPORTACIONES
import { ref, watch, computed, onMounted, onUnmounted, reactive } from "vue";
import kenaiAvatar from "@/assets/imgs/Kenai-Logo.png";
import defaultAvatar from "@/assets/imgs/profile-pic-default.svg";
import { sendPrompt } from "@/api/kenai.js";
import { marked } from "marked";
import { useSessionStore } from "@/stores/session";
import { useNavbarStore } from "@/stores/navbar";
import { useMobileStore } from "@/stores/mobile";

// VARIABLES
const chatID = ref("");
const promptFetching = ref(false);
const darkThemeChecked = ref(false);
const menuSettings = ref(null);
const lastChatIndex = ref(0);
const chatOptions = ref([
  {
    label: "Rename",
    icon: "pi pi-pencil",
    command: () => { },
  },
  {
    label: "Delete",
    icon: "pi pi-times",
    command: () => { },
  },
]);
const settingsItems = ref([
  {
    items: [
      {
        label: "dark_theme",
        icon: "dark_mode",
        type: "switch",
      },
      {
        label: "language",
        icon: "language",
        type: "select",
        children: [
          {
            label: "English",
            icon: "translate",
            lang_code: "en",
          },
          {
            label: "Spanish",
            icon: "translate",
            lang_code: "es",
          },
        ],
      },
    ],
  },
]);
const prompt = ref("");
const chatHistory = ref([]);
const promptMaxLenght = 300;
const pageLoading = ref(false);
const sessionStore = useSessionStore();
const navbarStore = useNavbarStore();
const mobileStore = useMobileStore();
const op = ref();

const toggle = (event) => {
  op.value.toggle(event);
}

// COMPONENTES
import PageLoader from "@/components/layout/PageLoader.vue";
import GoogleLogin from "@/components/GoogleLogin.vue";

// FUNCIONES RESERVADAS
onMounted(async () => {
  mobileStore.initWidthWatch();
  pageLoading.value = true;
  try {
    await sessionStore.loadSession();
    if (sessionStore.isAuthenticated) {
      console.log(sessionStore.user);
    }
    navbarStore.loadNavbar();
  } catch (error) {
    console.log(error);
  } finally {
    setTimeout(() => {
      pageLoading.value = false;
    }, 1000);
  }
});

onUnmounted(() => {
  mobileStore.destroyWidthWatch();
});

watch(prompt, (newVal) => {
  const textarea = document.querySelector(".p-inputtextarea");
  if (textarea) {
    if (newVal === "") {
      textarea.style.height = "22px";
    } else {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }

  const promptBar = document.querySelector("#tools-bar");
  if (textarea.style.height === "22px") {
    promptBar.style.borderRadius = "3rem";
  } else {
    promptBar.style.borderRadius = "1.6rem";
  }
});

// FUNCIONES
const toggleMobileNavbar = () => {
  navbarStore.toggleMobileNavbar();
};

const printMessageWithDelay = async (chatRow, message) => {
  chatRow.kenai.renderedResponse += message;
  await new Promise((resolve) => setTimeout(resolve, 30));
};

const handleSendPrompt = async () => {
  if (prompt.value.length !== 0) {
    promptFetching.value = true;

    const userPrompt = prompt.value.replace(/\n/g, "<br>");
    const chatRow = reactive({
      index: lastChatIndex.value,
      user: {
        message: userPrompt,
        username: "Anonymous",
        sentAt: new Date(),
      },
      kenai: {
        response: "",
        renderedResponse: "",
        loading: true,
        respondedAt: null,
        error: false,
        errorMessage: "",
      },
    });
    chatHistory.value.push(chatRow);
    prompt.value = "";

    try {
      const kenaiResponse = await sendPrompt(userPrompt);

      chatRow.kenai.loading = false;
      chatRow.kenai.respondedAt = new Date();
      chatRow.kenai.response = kenaiResponse.response.map((r) => r);
      console.log(chatRow.kenai.response);

      for (const text of kenaiResponse.response) {
        await printMessageWithDelay(chatRow, text);
      }

      lastChatIndex.value++;
    } catch (error) {
      chatRow.kenai.error = true;
      chatRow.kenai.errorMessage = error.message || "An error occurred";
      chatRow.kenai.loading = false;
      console.error(error.message);
    } finally {
      promptFetching.value = false;
    }
  }
};

const handleEnter = (event) => {
  if (!event.shiftKey) {
    event.preventDefault();
    handleSendPrompt();
  }
};

const handleInput = (event) => {
  const inputText = event.target.value;
  if (inputText.length > promptMaxLenght) {
    prompt.value = inputText.slice(0, promptMaxLenght);
    event.target.value = prompt.value;
  } else {
    prompt.value = inputText;
  }
};
const charCount = computed(() => prompt.value.length);

const toggleNavbarExtended = () => {
  navbarStore.toggleExtended();
};

const toggleSettingsPopup = (event) => {
  menuSettings.value.toggle(event);
};

const switchChat = (id_chat) => {
  console.log(id_chat);
};

const handleLanguageChange = (event) => {
  // Cambiar el lenguaje
};
</script>

<style scoped lang="scss">
.main-container {
  display: flex;
}

.mobile-navbar {
  .navbar__body {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 100%;
    height: calc(100dvh - 185px);
  }
}

.open-mobile-button {
  display: flex;
  align-items: center;
  justify-content: center;

  .menu-icon {
    color: white;
    margin-left: -10px;
  }
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
    margin: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0px 20px;

    .user-image__container {
      display: flex;
      justify-content: center;
      align-items: center;

      #user-image {
        width: 40px;
        height: 40px;
        border-radius: 100px;
        object-fit: cover;
      }
    }
  }

  .chat__body {
    grid-area: chat__body;
    overflow-y: auto;
    display: flex;
    align-items: baseline;
    justify-content: center;

    .messages__container {
      max-width: 900px;
      width: 95%;
    }

    .user-message__container {
      width: 95%;
      padding-top: 20px;
      display: flex;
      justify-content: flex-end;

      .message-content {
        word-break: break-word;
        overflow-wrap: anywhere;
      }
    }

    .message__container {
      margin: 15px auto;
      max-width: 95%;
      min-width: 85%;

      .message {
        max-width: 95%;
      }

      .user-message {
        max-width: 75%;
        min-width: 75px;

        position: relative;

        p {
          margin-top: 30px;
          text-align: left;
        }
      }

      .top-fieldset {
        display: flex;
        align-items: center;
        padding: 0px 10px;
      }

      .top-fieldset-user {
        position: absolute;
        top: -20px;
        right: 10px;
        background-color: #18181b;
        display: flex;
        align-items: center;
        padding: 0px 10px;
        border-radius: 6px;
        height: 38px;
      }
    }
  }

  @media (min-width: 1800px) {
    .messages__container {
      width: 880px;
    }
  }

  @media (max-width: 1800px) {
    .messages__container {
      margin: 0px calc(18dvw);
    }
  }

  @media (max-width: 1200px) {
    .messages__container {
      margin: 0px calc(15dvw);
    }
  }

  @media (max-width: 1000px) {
    .messages__container {
      margin: 0px calc(10dvw);
    }
  }

  @media (max-width: 800px) {
    .messages__container {
      margin: 0px calc(5dvw);
    }
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
      position: relative;
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

    .char-counter {
      position: absolute;
      bottom: 0px;
      right: 80px;
      font-size: 0.8rem;
      color: rgba(255, 255, 255, 0.5);
      font-weight: 600;
    }
  }
}

.navbar__container {
  padding: 10px;
  height: 100dvh;
  width: 300px;
  background-color: rgba(73, 73, 73, 0.171);
  transition: width 0.4s ease, opacity 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.not-extended {
  width: 80px;
}

.mobile-navbar__header {
  display: flex;
  align-items: center;
  gap: 10px;
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
  height: 100%;

  .chats__container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 100%;
    gap: 10px;

    .chat-icon {
      font-size: 0.9rem;
    }
  }

  .reciente-txt {
    font-weight: 600;
    font-size: 0.85rem;
    margin-bottom: 4px;
    margin-left: 10px;
  }
}

.navbar__footer {
  .settings-btn {
    display: flex;
    width: 100%;
    gap: 5px;
  }

  .p-menu .p-menuitem>.p-menuitem-content .p-menuitem-link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 40px;
  }
}
</style>
