<script lang="ts" setup>
import AppTable from "@/components/AppTable.vue";
import InputText from "primevue/inputtext";
import { ref } from "vue";
import { categoryService } from "../../service/CategoryService";

let cols = ref([{ field: "name", header: "Название" }]);

let categories = ref();

async function getCategory(perPage: number = 5, page: number = 1) {
  categories.value = (await categoryService.find(page, perPage)).data;
}

function changePage(params: { page: number; perPage: number }) {
  getCategory(params.perPage, params.page);
}

function updateItem(params: { id: number; item: any }) {
  categoryService.update(params.id, params.item);
}

function createItem(item: any) {
  categoryService.create(item);
}

function removeItem(id: number) {
  categoryService.delete(id);
}

async function findCategory(filter: { name: string }) {
  const response = await categoryService.findByName(filter.name);
  categories.value = {
    data: response.data,
    total: response.data.length,
  };
}
</script>

<template>
  <AppTable
    :columns="cols"
    :items="categories?.data"
    :total-records="categories?.total"
    heading="Categories"
    :new-btn="true"
    :search-mode="true"
    @page="changePage"
    @find="findCategory"
    @update="updateItem"
    @remove="removeItem"
    @create="createItem"
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
