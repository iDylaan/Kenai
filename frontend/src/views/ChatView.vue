<template>
  <Toast />
  <PageLoader :loading="pageLoading" />

  <Dialog v-model:visible="renameTitle.visible" :draggable="false" modal :showHeader="false"
    :style="{ width: '25rem', overflow: 'hidden' }">
    <ProgressBar mode="indeterminate" class="rename-dialog-bar" v-if="renameTitle.fetching"></ProgressBar>
    <h2>{{ t('chat.edit_chat_title') }}</h2>
    <span class="second-title">{{ t('chat.update_title_description') }}</span>
    <div class="title-input__container">
      <label for="title" class="font-semibold w-6rem">{{ t('chat.new_title_label') }}</label>
      <InputText v-model="renameTitle.title" :invalid="renameTitle.invalid" id="new-chat-title" autocomplete="off" />
      <small id="username-help" v-if="renameTitle.invalid">{{
        renameTitle.message
      }}</small>
    </div>
    <div class="new-title__btns-container">
      <Button type="button" :label="t('prime_ui.cancel')" severity="secondary" @click="closeRenameDialog"></Button>
      <Button type="button" :label="t('prime_ui.edit')" @click="handleChangeChatTitle"></Button>
    </div>
  </Dialog>

  <main class="main-container">
    <Sidebar v-model:visible="navbarStore.extended" class="mobile-navbar" v-if="mobileStore.isMobile">
      <template #header>
        <div class="mobile-navbar__header">
          <Avatar :image="kenaiAvatar" />
          <router-link to="/">
            <Button severity="secondary" text>
              <span :style="[{ 'font-size': '1.2rem', fontWeight: '500' }]">KenAI</span>
            </Button>
          </router-link>
        </div>
      </template>

      <section class="navbar__header">
        <div class="new-btn__container">
          <Button severity="secondary" @click="chatStore.newChat()" :disabled="!sessionStore.isAuthenticated || chatStore.getActiveChatID() === null
            " size="small" v-tooltip.bottom="t('chat.new_chat')" class="new-btn" rounded outlined>
            <span class="material-icons">add</span>
            <span class="text animate__animated animate__fadeIn">
              {{ t('chat.new_chat') }}
            </span>
          </Button>
        </div>
      </section>

      <section class="navbar__body animate__animated animate_fadeIn">
        <span class="reciente-txt" v-if="sessionStore.isAuthenticated && chatStore.chats.length">
          {{ t('chat.recent') }}
        </span>
        <div class="chats-skeleton" v-if="sessionStore.isAuthenticated && (pageLoading || chatStore.loading)">
          <Skeleton class="animate__animated animate__fadeInLeft ske-chat-1" height="40px"></Skeleton>
          <Skeleton class="animate__animated animate__fadeInLeft ske-chat-2" height="40px" style="margin-top: 10px">
          </Skeleton>
          <Skeleton class="animate__animated animate__fadeInLeft ske-chat-3" height="40px" style="margin-top: 10px">
          </Skeleton>
          <Skeleton class="animate__animated animate__fadeInLeft ske-chat-4" height="40px" style="margin-top: 10px">
          </Skeleton>
        </div>
        <div class="chats__container" v-if="sessionStore.isAuthenticated && !pageLoading && !chatStore.loading">
          <SplitButton v-for="chat in chatStore.chats" :key="chat.id_chat" icon="pi pi-check" :severity="chat.id_chat === chatStore.getActiveChatID() ? 'primary' : 'secondary'
            " class="chat-btn" menuButtonIcon="pi pi-ellipsis-v" @click="chatStore.updateChatMessages(chat.id_chat)"
            v-tooltip="{ value: chat.chat_name, showDelay: 300 }" :model="getChatOptions(chat.id_chat)">
            <span class="material-icons-outlined chat-icon">mark_chat_unread</span>
            <span class="text chat-name">{{ chat.chat_name }}</span>
          </SplitButton>
        </div>
      </section>

      <section class="navbar__footer">
        <Button label="Secondary" severity="secondary" text class="settings-btn" rounded @click="toggleSettingsPopup"
          v-tooltip.top="{
            value: t('chat.settings'),
          }" aria-haspopup="true" aria-controls="overlay_menu">
          <span class="material-icons-outlined chat-icon">settings</span>
          <span class="text">
            {{ t('chat.settings') }}
          </span>
        </Button>
        <Dialog v-model:visible="menuSettings" :header="t('chat.settings')" :style="{ width: '25rem' }"
          position="bottomleft" :modal="true" :draggable="false">
          <label for="language" :style="{ marginBottom: '10px', marginLeft: '5px' }">{{ t('chat.language') }}</label>
          <Dropdown v-model="siteLanguage" name="language" @change="handleLanguageChange" :style="{ width: '100%' }"
            :options="languages" optionLabel="name">
            <template #value="slotProps">
              <div v-if="siteLanguage" :style="{ display: 'flex', alignItems: 'center' }">
                <country-flag :country='siteLanguage.flag' size='small' />
                <div>{{ siteLanguage.name }}</div>
              </div>
              <span v-else>
                {{ t('chat.select_a_lang') }}
              </span>
            </template>
            <template #option="slotProps">
              <div :style="{ display: 'flex', alignItems: 'center' }">
                <country-flag :country='slotProps.option.flag' size='small' />
                <div>{{ slotProps.option.name }}</div>
              </div>
            </template>
          </Dropdown>
        </Dialog>
      </section>
    </Sidebar>

    <section :class="['navbar__container', !navbarStore.extended ? 'not-extended' : '']" v-if="!mobileStore.isMobile">
      <section class="navbar__header">
        <div class="menu-btn__container">
          <Button severity="secondary" size="small" text rounded @click="toggleNavbarExtended" v-tooltip="{
            value: navbarStore.extended ? t('chat.collapse_menu') : t('chat.expand_menu'),
          }">
            <span class="material-icons menu-icon">menu</span>
          </Button>
        </div>

        <div class="new-btn__container">
          <Skeleton height="40px" borderRadius="100px" v-if="pageLoading"></Skeleton>

          <Button severity="secondary" size="small" class="new-btn" rounded outlined v-else :disabled="!sessionStore.isAuthenticated || chatStore.getActiveChatID() === null
            " v-tooltip.bottom="t('chat.new_chat')" @click="chatStore.newChat()">
            <span class="material-icons">add</span>
            <span class="text animate__animated animate__fadeIn" v-if="navbarStore.extended">
              {{ t('chat.new_chat') }}
            </span>
          </Button>
        </div>
      </section>

      <section class="navbar__body animate__animated animate_fadeIn" v-if="navbarStore.extended">
        <span class="reciente-txt" v-if="sessionStore.isAuthenticated && chatStore.chats.length">
          {{ t('chat.recent') }}
        </span>
        <div class="chats-skeleton" v-if="sessionStore.isAuthenticated && (pageLoading || chatStore.loading)">
          <Skeleton class="animate__animated animate__fadeInLeft ske-chat-1" height="40px"></Skeleton>
          <Skeleton class="animate__animated animate__fadeInLeft ske-chat-2" height="40px" style="margin-top: 10px">
          </Skeleton>
          <Skeleton class="animate__animated animate__fadeInLeft ske-chat-3" height="40px" style="margin-top: 10px">
          </Skeleton>
          <Skeleton class="animate__animated animate__fadeInLeft ske-chat-4" height="40px" style="margin-top: 10px">
          </Skeleton>
        </div>
        <div class="chats__container" v-if="sessionStore.isAuthenticated && !pageLoading && !chatStore.loading">
          <SplitButton v-for="chat in chatStore.chats" :key="chat.id_chat" icon="pi pi-check" :severity="chat.id_chat === chatStore.getActiveChatID() ? 'primary' : 'secondary'
            " class="chat-btn" menuButtonIcon="pi pi-ellipsis-v" @click="chatStore.updateChatMessages(chat.id_chat)"
            v-tooltip="{
              value: chat.chat_name,
              showDelay: 300,
            }" :model="getChatOptions(chat.id_chat)">
            <span class="material-icons-outlined chat-icon">mark_chat_unread</span>
            <span class="text chat-name">{{ chat.chat_name }}</span>
          </SplitButton>
        </div>
      </section>

      <section class="navbar__footer">
        <Button label="Secondary" severity="secondary" text class="settings-btn" rounded @click="toggleSettingsPopup"
          v-tooltip.top="{
            value: t('chat.settings'),
          }" aria-haspopup="true" aria-controls="overlay_menu">
          <span class="material-icons-outlined chat-icon">settings</span>
          <span class="text" v-if="navbarStore.extended">
            {{ t('chat.settings') }}
          </span>
        </Button>
        <Dialog v-model:visible="menuSettings" :header="t('chat.settings')" :style="{ width: '25rem' }"
          position="bottomleft" :modal="true" :draggable="false">
          <label for="language" :style="{ marginBottom: '10px', marginLeft: '5px' }">{{ t('chat.language') }}</label>
          <Dropdown v-model="siteLanguage" name="language" @change="handleLanguageChange" :style="{ width: '100%' }"
            :options="languages" optionLabel="name">
            <template #value="slotProps">
              <div v-if="siteLanguage" :style="{ display: 'flex', alignItems: 'center' }">
                <country-flag :country='siteLanguage.flag' size='small' />
                <div>{{ siteLanguage.name }}</div>
              </div>
              <span v-else>
                {{ t('chat.select_a_lang') }}
              </span>
            </template>
            <template #option="slotProps">
              <div :style="{ display: 'flex', alignItems: 'center' }">
                <country-flag :country='slotProps.option.flag' size='small' />
                <div>{{ slotProps.option.name }}</div>
              </div>
            </template>
          </Dropdown>
        </Dialog>
      </section>
    </section>

    <!-- CONTENT AREA -->
    <section class="chat__container">
      <div class="chat__header">
        <router-link to="/" v-if="!mobileStore.isMobile">
          <Button severity="secondary" text>
            <h1 style="padding: 0; margin: 0">KenAI</h1>
          </Button>
        </router-link>
        <Button v-else @click="toggleMobileNavbar" v-tooltip="{
          value: navbarStore.extended ? t('chat.collapse_menu') : t('chat.expand_menu'),
        }" severity="secondary" text rounded aria-label="Menu" size="large">
          <span class="material-icons menu-icon">menu</span>
        </Button>

        <div class="profile__container">
          <Skeleton shape="circle" size="3rem" v-if="pageLoading"></Skeleton>
          <Button severity="secondary" text rounded :style="[{ padding: '5px' }]" v-else>
            <Avatar :image="sessionStore.isAuthenticated ? sessionStore.user.picture : defaultAvatar
              " size="default" shape="circle" @click="toggle" />
          </Button>
          <OverlayPanel ref="op" showCloseIcon :style="[{ width: mobileStore.isMobile ? '100dvw' : '436px' }]">
            <GoogleLogin />
          </OverlayPanel>
        </div>
      </div>

      <div class="chat__body">
        <div class="firt-chat" :class="fistChatClasses" v-if="
          (chatStore.getActiveChatID() === null ||
            chatStore.isNewChat ||
            chatStore.chatHistory.length === 0) &&
          !chatStore.getChatLoading() &&
          !chatStore.newMessageSent
        ">
          <div class="title_new-chat__container">
            <p class="new-chat-title" v-if="!pageLoading">{{ t('chat.nice_to_see_you') }}</p>
            <p class="new-chat-subtitle" v-if="!pageLoading">
              {{ t('chat.what_you_want_to_talk') }}
            </p>
          </div>

          <div class="presets animate__fadeIn animate__animated" v-if="!pageLoading">
            <label class="presets-label">{{ t('chat.recomendations') }}</label>
            <Carousel class="carrousel" :value="presets" :numVisible="3" :numScroll="1"
              :responsiveOptions="responsiveOptions" circular :autoplayInterval="3000">
              <template #item="slotProps">
                <Button label="Contrast" class="pre-prompt__container" severity="contrast" outlined>
                  <div class="level__container">
                    <Tag :severity="slotProps.data.level === 0
                      ? 'success'
                      : slotProps.data.level === 1
                        ? 'info'
                        : 'warning'
                      " rounded style="display: flex; justify-content: center; gap: 5px">
                      <span class="material-icons" style="font-size: 1rem">translate</span>
                      {{
                        slotProps.data.level === 0
                          ? t('chat.basic')
                          : slotProps.data.level === 1
                            ? t('chat.intermediate')
                            : t('chat.advanced')
                      }}
                    </Tag>
                  </div>

                  <div class="prompt__container">"{{ slotProps.data.prompt_title }}"</div>
                </Button>
              </template>
            </Carousel>
          </div>
        </div>
        <!-- END FIRTS CHAT -->

        <!-- MESSAGES LOADING -->
        <div class="chat-messages-loading messages__container" v-else-if="chatStore.getChatLoading()">
          <div class="message__container user-message__container">
            <Fieldset class="user-message">
              <template #legend>
                <div class="top-fieldset-user">
                  <Skeleton shape="circle" size="2rem"></Skeleton>
                </div>
              </template>
              <Skeleton width="300px" height="4rem" style="margin-top: 20px"></Skeleton>
            </Fieldset>
          </div>

          <div class="message__container">
            <Fieldset class="message">
              <template #legend>
                <div class="top-fieldset">
                  <Skeleton shape="circle" size="2rem" style="margin-top: 3px"></Skeleton>
                </div>
              </template>
              <Skeleton width="100%" height="4rem" style="margin-top: 10px"></Skeleton>
            </Fieldset>
          </div>
        </div>
        <!-- END MESSAGES LOADING -->

        <!-- CHAT CONTAINER -->
        <div class="messages__container animate__animated animate__fadeIn" v-else>
          <div v-for="(chat, index) in chatStore.chatHistory" :key="index">
            <div class="message__container user-message__container">
              <Fieldset class="user-message">
                <template #legend>
                  <div class="top-fieldset-user">
                    <Avatar :image="sessionStore.isAuthenticated
                      ? sessionStore.user.picture
                      : defaultAvatar
                      " shape="circle" />
                  </div>
                </template>
                <p v-html="chat.user.message" class="message-content"></p>
              </Fieldset>
            </div>

            <div class="message__container" :id="index === chatStore.chatHistory.length - 1 ? 'last-message' : ''">
              <Fieldset class="message">
                <template #legend>
                  <div class="top-fieldset">
                    <Avatar :image="kenaiAvatar" />
                  </div>
                </template>
                <div class="loader" v-if="chat.kenai.loading" :style="[
                  {
                    display: 'flex',
                    gap: '5px',
                    'flex-direction': 'column',
                    alignContent: 'flex-start',
                  },
                ]">
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
        <!-- END CHAT CONTAINER -->
      </div>

      <div class="chat__footer">
        <Toolbar class="prompt-tools" id="tools-bar">
          <template #start>
            <Skeleton shape="circle" size="42px" v-if="pageLoading"></Skeleton>
            <Button label="Secondary" severity="secondary" rounded text class="prompt-tool-btn" v-tooltip.top="{
              value: t('chat.record_audio'),
            }" :disabled="promptFetching" v-else>
              <span class="material-icons-outlined chat-icon">mic</span>
            </Button>
          </template>

          <template #center>
            <Skeleton height="35px" style="margin-bottom: 7px" v-if="pageLoading"></Skeleton>
            <Textarea type="text" @input="handleInput" v-else @keydown.enter="handleEnter"
              :placeholder="t('chat.type_a_message')" v-model="prompt" :disabled="promptFetching" size="small"
              variant="filled" rows="1" />
            <div class="char-counter">{{ charCount }}/{{ promptMaxLenght }}</div>
          </template>

          <template #end>
            <Skeleton shape="circle" size="42px" v-if="pageLoading"></Skeleton>
            <Button severity="primary" v-else rounded class="prompt-tool-btn" text @click="handleSendPrompt"
              v-tooltip.top="{
                value: t('chat.send'),
              }" :disabled="promptFetching">
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
import { deleteChat } from "@/api/chat";
import { useSessionStore } from "@/stores/session";
import { useNavbarStore } from "@/stores/navbar";
import { useMobileStore } from "@/stores/mobile";
import { useChatStore } from "@/stores/chat";
import { useScrollStore } from "@/stores/scroll";
import { useLangStore } from "@/stores/lang";
import { useToast } from "primevue/usetoast";
import { useI18n } from 'vue-i18n';

// VARIABLES
const { t, locale } = useI18n();
const promptFetching = ref(false);
const menuSettings = ref(false);
const toast = useToast();
const renameTitle = reactive({
  visible: false,
  title: null,
  idChat: null,
  invalid: false,
  message: null,
  fetching: false,
});
const lastChatIndex = ref(0);
const fistChatClasses = ref("");
const presets = ref([
  {
    prompt_title: "Hola, como estás?",
    level: 0,
  },
  {
    prompt_title: "Hola, me ayudas a practicar?",
    level: 1,
  },
  {
    prompt_title: "Hola, por que el cielo es azul?",
    level: 2,
  },
  {
    prompt_title: "Hola, como aprend verbos irregulares?",
    level: 0,
  },
  {
    prompt_title: "Hola, quiero practicar ingles",
    level: 1,
  },
  {
    prompt_title: "Hola, Nivel B2, simulacion de entrevista laboral",
    level: 2,
  },
]);
const responsiveOptions = ref([
  {
    breakpoint: "1400px",
    numVisible: 2,
    numScroll: 1,
  },
  {
    breakpoint: "1199px",
    numVisible: 3,
    numScroll: 1,
  },
  {
    breakpoint: "767px",
    numVisible: 2,
    numScroll: 1,
  },
  {
    breakpoint: "575px",
    numVisible: 1,
    numScroll: 1,
  },
]);
const getChatOptions = (chatId) => {
  return [
    {
      label: t('chat.rename'),
      icon: "pi pi-pencil",
      command: () => {
        try {
          resetRenameDialog();
          renameTitle.visible = true;
          renameTitle.idChat = chatId;
        } catch (error) {
          console.log(error);
        }
      },
    },
    {
      label: t('chat.delete'),
      icon: "pi pi-times",
      command: async () => {
        try {
          chatStore.setLoading(true);
          const deleted = await deleteChat(chatId);
          if (deleted) {
            await chatStore.loadChats();
            if (chatId === chatStore.getActiveChatID()) {
              chatStore.newChat();
            }
            toast.add({
              severity: "success",
              summary: t('chat.deleted'),
              detail: t('chat.success.deleted'),
              life: 3000,
            });
          } else {
            toast.add({
              severity: "error",
              summary: "Error",
              detail: t('chat.error.no_chat_deleted'),
              life: 3000,
            });
          }
        } catch (error) {
          toast.add({
            severity: "error",
            summary: "Error",
            detail: t('chat.error.no_chat_deleted'),
            life: 3000,
          });
          console.log(error);
        }
      },
    },
  ];
};

const languages = ref([
  {
    name: t("chat.english"),
    icon: "translate",
    flag: "us",
    code: 'en'
  },
  {
    name: t("chat.spanish"),
    icon: "translate",
    flag: "mx",
    code: 'es'
  },
])
const prompt = ref("");
const promptMaxLenght = 300;
const pageLoading = ref(false);
const sessionStore = useSessionStore();
const navbarStore = useNavbarStore();
const mobileStore = useMobileStore();
const chatStore = useChatStore();
const scrollStore = useScrollStore();
const langStore = useLangStore();
const siteLanguage = ref(langStore.langCode);
const op = ref();

// COMPONENTES
import PageLoader from "@/components/layout/PageLoader.vue";
import GoogleLogin from "@/components/GoogleLogin.vue";

// FUNCIONES RESERVADAS
onMounted(async () => {
  mobileStore.initWidthWatch();
  pageLoading.value = true;
  try {
    await sessionStore.loadSession();
    navbarStore.loadNavbar();
    await chatStore.loadChats();
    langStore.loadLang();
    locale.value = langStore.langCode;
    languages.value.forEach((lang) => {
      if (lang.code === langStore.langCode) {
        siteLanguage.value = lang;
      }
    })
  } catch (error) {
    console.log(error);
  } finally {
    pageLoading.value = false;
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
const toggle = (event) => {
  op.value.toggle(event);
};

const closeRenameDialog = () => {
  renameTitle.visible = false;
  resetRenameDialog();
};

const resetRenameDialog = () => {
  renameTitle.title = null;
  renameTitle.idChat = null;
  renameTitle.invalid = false;
  renameTitle.message = null;
  renameTitle.fetching = false;
};

const handleChangeChatTitle = async () => {
  if (!renameTitle.title || renameTitle.title.trim() === "") {
    renameTitle.invalid = true;
    renameTitle.message = t('chat.error.no_title');
    return;
  } else {
    renameTitle.fetching = true;
    renameTitle.invalid = false;
    renameTitle.message = null;
    await chatStore.renameChat(renameTitle.idChat, renameTitle.title, t);
    renameTitle.fetching = false;
    closeRenameDialog();
    chatStore.loadChats();
  }
};

const toggleMobileNavbar = () => {
  navbarStore.toggleExtended();
};

const printMessageWithDelay = async (chatRow, message) => {
  chatRow.kenai.renderedResponse += message;
  await new Promise((resolve) => setTimeout(resolve, 30));
};

const handleSendPrompt = async () => {
  if (chatStore.isNewChat) {
    chatStore.desactivateNewChat();
  }

  if (prompt.value.length > 0) {
    promptFetching.value = true;

    const userPrompt = prompt.value.replace(/\n/g, "<br>");
    const chatRow = reactive({
      index: lastChatIndex.value,
      user: {
        message: userPrompt,
        username: sessionStore.isAuthenticated ? sessionStore.user.give_name : null,
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

    chatStore.chatHistory.push(chatRow);
    prompt.value = "";
    // Animar el cambio de interfaz
    fistChatClasses.value = "animate__animated animate__fadeOut";
    setTimeout(() => {
      chatStore.setNewMessageSent(true);
      scrollStore.scrollToLastMessage();
    }, 700);

    try {
      const kenaiResponse = await sendPrompt({
        prompt: userPrompt,
        user_id: sessionStore.isAuthenticated ? sessionStore.user.id : null,
        username: sessionStore.isAuthenticated ? sessionStore.user.username : null,
        chat_id: chatStore.getActiveChatID(),
      });

      chatRow.kenai.loading = false;
      chatRow.kenai.respondedAt = new Date();
      chatRow.kenai.response = kenaiResponse.response.map((r) => r);
      chatStore.getActiveChatID();

      for (const text of kenaiResponse.response) {
        await printMessageWithDelay(chatRow, text);
      }

      lastChatIndex.value++;

      if (chatStore.getActiveChatID() === null) {
        chatStore.chats.unshift(kenaiResponse.chat);
        chatStore.setActiveChatID(kenaiResponse.chat_id);
      } else {
        const chatIndex = chatStore.chats.findIndex(
          (chat) => chat.id_chat === kenaiResponse.chat_id
        );

        if (chatIndex !== -1) {
          const [chat] = chatStore.chats.splice(chatIndex, 1);
          chatStore.chats.unshift(chat);
        }
      }
    } catch (error) {
      chatRow.kenai.error = true;
      chatRow.kenai.errorMessage = error.message || "An error occurred";
      chatRow.kenai.loading = false;
      console.error(error.message);
    } finally {
      promptFetching.value = false;
      chatStore.setNewMessageSent(false);
      fistChatClasses.value = "";
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
  menuSettings.value = !menuSettings.value;
};

const handleLanguageChange = (event) => {
  const selectedLanguage = event.value;
  langStore.changeLang(selectedLanguage.code);
  siteLanguage.value = selectedLanguage;
};
</script>

<style scoped lang="scss">
@import "@/assets/chat.scss";
</style>
