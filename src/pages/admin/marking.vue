<script lang="ts" setup>
import AppTable from "@/components/AppTable.vue";
import InputText from "primevue/inputtext";
import { ref } from "vue";
import { markingService } from "../../service/MarkingService";
let cols = ref([{ field: "name", header: "Название" }]);

let markings = ref();

async function getMarking(perPage: number = 5, page: number = 1) {
  markings.value = (await markingService.find(page, perPage)).data;
}

function changePage(params: { page: number; perPage: number }) {
  getMarking(params.perPage, params.page);
}

function updateItem(params: { id: number; item: any }) {
  markingService.update(params.id, params.item);
}

function removeItem(id: number) {
  markingService.delete(id);
}

async function findMarking(filter: { name: string }) {
  const response = await markingService.findByName(filter.name);
  markings.value = {
    data: response.data,
    total: response.data.length,
  };
}
</script>

<template>
  <AppTable
    :columns="cols"
    :items="markings.data"
    :total-records="markings.total"
    heading="Marking"
    :search-mode="true"
    @find="findMarking"
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
