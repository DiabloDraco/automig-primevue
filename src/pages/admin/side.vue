<script lang="ts" setup>
import AppTable from "@/components/AppTable.vue";
import { sideService } from "@/service/SideService";
import InputText from "primevue/inputtext";
import { ref } from "vue";
let cols = ref([{ field: "name", header: "Название" }]);

let sides = ref();

async function getSide(perPage: number = 5, page: number = 1) {
  sides.value = (await sideService.find(page, perPage)).data;
}

function updateItem(params: { id: number; item: any }) {
  console.log(params);

  sideService.update(params.id, params.item);
}

function removeItem(id: number) {
  sideService.delete(id);
}

function changePage(params: { page: number; perPage: number }) {
  getSide(params.perPage, params.page);
}

async function findSides(filter: { name: string }) {
  const response = await sideService.findByName(filter.name);
  sides.value = {
    data: response.data,
    total: response.data.length,
  };
}
</script>

<template>
  <AppTable
    :columns="cols"
    :items="sides?.data"
    :total-records="sides?.total"
    heading="Side"
    :search-mode="true"
    @find="findSides"
    @page="changePage"
    @update="updateItem"
    @remove="removeItem"
    :new-btn="true"
  >
    <template #create="{ item }">
      <h5>Название</h5>
      <InputText v-model="item.name" />
    </template>

    <template #edit="{ item }">
      <h5>Название</h5>
      <InputText v-model="item.name" />
    </template>
  </AppTable>
</template>

<style></style>
