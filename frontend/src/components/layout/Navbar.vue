<script setup lang="ts">
// IMPORTACIONES

// COMPONENTES

// VARIABLES
const props = defineProps<{
  items: Array<{
    label: string;
    icon?: string;
    items?: Array<any>;
    badge?: string;
    shortcut?: string;
  }>;
}>();

// FUNCIONES RESERVADAS

// FUNCIONES
</script>

<template>
  <section class="navbar__container">
    <section class="navbar__header">
      <div class="menu-btn__container">
        <Button severity="secondary" size="small" text rounded>
          <span class="material-icons menu-icon">menu</span>
        </Button>
      </div>

      <div class="new-btn__container">
        <Button severity="secondary" size="small" class="new-btn" rounded outlined>
          <span class="material-icons">add</span> <span class="text">New chat</span>
        </Button>
      </div>
    </section>

    <section class="navbar__body">
      <span class="reciente-txt">Recent</span>

      <div class="chats__container">
        <Button severity="primary" class="chat-btn">
          <span class="material-icons-outlined chat-icon">mark_chat_unread</span>
          <span class="text">Chat</span>
        </Button>

        <Button severity="secondary" class="chat-btn">
          <span class="material-icons-outlined chat-icon">mark_chat_unread</span>
          <span class="text">Chat</span>
        </Button>

        <Button severity="secondary" class="chat-btn">
          <span class="material-icons-outlined chat-icon">mark_chat_unread</span>
          <span class="text">Chat</span>
        </Button>

        <Button severity="secondary" class="chat-btn">
          <span class="material-icons-outlined chat-icon">mark_chat_unread</span>
          <span class="text">Chat</span>
        </Button>

        <Button severity="secondary" class="chat-btn">
          <span class="material-icons-outlined chat-icon">mark_chat_unread</span>
          <span class="text">Chat</span>
        </Button>
      </div>
    </section>

    <section class="navbar__footer"></section>
  </section>
</template>

<style lang="scss" scoped>
.navbar__container {
  height: 100dvh;
  background-color: rgba(73, 73, 73, 0.171);
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

  .reciente-txt {
    font-weight: 600;
    font-size: 0.85rem;
    margin-bottom: 4px;
    margin-left: 10px;
  }
}
</style>
