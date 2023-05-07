<script lang="ts" setup>
import AppTable from "@/components/AppTable.vue";
import { ref } from "vue";
import InputText from "primevue/inputtext";
import { countryService } from "@/service/CountryService";
let cols = ref([{ field: "name", header: "Название" }]);

let countries = ref();

async function getCountry(perPage: number = 5, page: number = 1) {
  countries.value = (await countryService.find(page, perPage)).data;
}

function updateItem(params: { id: number; item: any }) {
  countryService.update(params.id, params.item);
}

function removeItem(id: number) {
  countryService.delete(id);
}

function changePage(params: { page: number; perPage: number }) {
  getCountry(params.perPage, params.page);
}

async function findCountry(filter: { name: string }) {
  const response = await countryService.findByName(filter.name);
  countries.value = {
    data: response.data,
    total: response.data.length,
  };
}
</script>

<template>
  <AppTable
    :columns="cols"
    :items="countries?.data"
    :total-records="countries?.total"
    :search-mode="true"
    heading="Country"
    :new-btn="true"
    @find="findCountry"
    @page="changePage"
    @update="updateItem"
    @remove="removeItem"
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
