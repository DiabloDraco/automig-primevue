<script lang="ts" setup>
import AppTable from "@/components/AppTable.vue";
import InputText from "primevue/inputtext";
import Chip from "primevue/chip";
import { ref } from "vue";
import { typeService } from "@/service/TypeService";
let cols = ref([{ field: "name", header: "Название" }]);

const types = ref();

async function getTypes(perPage: number = 5, page: number = 1) {
  types.value = (await typeService.find(page, perPage)).data;
}

function updateItem(params: { id: number; item: any }) {
  typeService.update(params.id, params.item);
}

function removeItem(id: number) {
  typeService.delete(id);
}

function changePage(params: { page: number; perPage: number }) {
  getTypes(params.perPage, params.page);
}

async function findType(filter: { name: string }) {
  const response = await typeService.findByName(filter.name);
  types.value = {
    data: response.data,
    total: response.data.length,
  };
}
</script>

<template>
  <AppTable
    :columns="cols"
    :items="types.data"
    :total-records="types.total"
    heading="Type"
    :new-btn="true"
    :search-mode="true"
    @page="changePage"
    @find="findType"
    @update="updateItem"
    @remove="removeItem"
  >
    <template #name="{ item }">
      {{ item.name }}
    </template>

    <template #create="{ item }">
      <h5>Название</h5>
      <InputText id="CreateBrand" v-model="item.name" />
    </template>

    <template #edit="{ item }">
      <h5>Название</h5>
      <InputText v-model="item.name" />
    </template>
  </AppTable>
</template>

<style></style>
