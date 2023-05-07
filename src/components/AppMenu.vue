<script setup lang="ts">
import { ref } from "vue";

import AppMenuItem from "./AppMenuItem.vue";

const model = ref([
  {
    label: "Home",
    items: [{ label: "Dashboard", icon: "pi pi-fw pi-home", to: "/admin" }],
  },
  {
    label: "Coming",
    items: [
      {
        label: "Приход",
        icon: "pi pi-fw pi-arrow-circle-down",
        to: "/admin/income",
      },
    ],
  },
  {
    label: "Sales",
    items: [
      { label: "Продажа", icon: "pi pi-fw pi-dollar", to: "/admin/sales" },
    ],
  },
  {
    label: "Settings",
    items: [
      { label: "Users", icon: "pi pi-fw pi-users", to: "/admin/user" },
      { label: "Roles", icon: "pi pi-fw pi-lock", to: "/admin/role" },
      { label: "Product", icon: "pi pi-fw pi-box", to: "/admin/product" },
      { label: "Category", icon: "pi pi-fw pi-list", to: "/admin/category" },
      { label: "Type", icon: "pi pi-fw pi-file", to: "/admin/type" },
      { label: "Marking", icon: "pi pi-fw pi-bookmark", to: "/admin/marking" },
      { label: "Country", icon: "pi pi-fw pi-flag", to: "/admin/country" },
      { label: "Side", icon: "pi pi-fw pi-directions", to: "/admin/side" },
    ],
  },
]);
</script>

<template>
  <ul class="layout-menu">
    <template v-for="(item, i) in model" :key="item">
      <app-menu-item :item="item" :index="i"></app-menu-item>
    </template>
  </ul>
</template>
