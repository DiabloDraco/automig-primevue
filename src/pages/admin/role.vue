<script lang="ts" setup>
import AppTable from "@/components/AppTable.vue";
import { roleService } from "@/service/RoleService";
import InputText from "primevue/inputtext";
import { ref } from "vue";
let cols = ref([
  { field: "name", header: "Название" },
  { field: "description", header: "Описание" },
]);

let roles = ref();

async function getRole() {
  roles.value = await roleService.find();
  console.log(roles.value);
}

getRole();
</script>

<template>
  <AppTable :columns="cols" :items="roles.data" heading="Marking">
    <template #create="{ item }">
      <h5>Название</h5>
      <InputText id="name" v-model="item.name" />
      <h5>Описание</h5>
      <InputText id="description" v-model="item.description" />
    </template>

    <template #edit="{ item }">
      <h5>Название</h5>
      <InputText id="nameEdit" disabled="true" v-model="item.name" />
      <h5>Описание</h5>
      <InputText id="descriptionEdit" v-model="item.description" />
    </template>
  </AppTable>
</template>

<style></style>
