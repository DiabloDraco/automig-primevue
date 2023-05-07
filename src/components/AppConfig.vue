<script setup lang="ts">
import Button from "primevue/button";
import Sidebar from "primevue/sidebar";
import { ref } from "vue";
import { useLayout } from "./composables/layout";

import Themes from "./composables/theme";

defineProps({
  simple: {
    type: Boolean,
    default: false,
  },
});

const visible = ref(false);

const { changeThemeSettings } = useLayout();

const onConfigButtonClick = () => {
  visible.value = !visible.value;
};

const link = document.getElementById("theme-css")!;

link.addEventListener("load", () => {});

link.addEventListener("error", () => {
  link.setAttribute("href", `/themes/lara-light-indigo/theme.css`);
  localStorage.setItem("theme", `/themes/lara-light-indigo/theme.css`);
  changeThemeSettings("lara-light-indigo", false);
});

const onChangeTheme = (theme: string, isLight: boolean) => {
  link.setAttribute("href", `/themes/${theme}/theme.css`);
  localStorage.setItem("theme", `/themes/${theme}/theme.css`);
  changeThemeSettings(theme, isLight);
};
</script>

<template>
  <button
    class="layout-config-button p-link"
    type="button"
    @click="onConfigButtonClick()"
  >
    <i class="pi pi-cog"></i>
  </button>

  <Sidebar
    v-model:visible="visible"
    position="right"
    :transitionOptions="'.3s cubic-bezier(0, 0, 0.2, 1)'"
    class="layout-config-sidebar w-20rem"
  >
    <template v-for="theme of Themes">
      <h5>{{ theme.title }}</h5>
      <div class="grid">
        <div v-for="item of theme.items" class="col-3">
          <button
            class="p-link w-2rem h-2rem"
            @click="onChangeTheme(item.name, item.isLight)"
          >
            <img :src="item.src" class="w-2rem h-2rem" :alt="item.alt" />
          </button>
        </div>
      </div>
    </template>
  </Sidebar>
</template>
