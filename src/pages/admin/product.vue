<script lang="ts" setup>
import AppTable from "@/components/AppTable.vue";
import InputText from "primevue/inputtext";
import Chip from "primevue/chip";
import MultiSelect from "primevue/multiselect";
import Dropdown from "primevue/dropdown";
import { ref } from "vue";
import { productService } from "@/service/ProductService";

const country = ref();
const sides = ref();
const marks = ref();
const models = ref();
const codes = ref();
const categories = ref();

let cols = ref([
  { field: "name", header: "Название" },
  { field: "description", header: "Описание" },
  { field: "category", header: "Категория" },
  { field: "codes", header: "Коды" },
  { field: "models", header: "Модели" },
  { field: "markings", header: "Марки" },
  { field: "countries", header: "Страны" },
  { field: "sides", header: "Стороны" },
  { field: "created_at", header: "Дата создание" },
]);

const products = ref();

const selectedCountry = ref([]);
const selectedSides = ref([]);
const selectedMarking = ref([]);
const selectedModel = ref([]);
const selectedCodes = ref([]);
const selectedCategory = ref([]);

async function getProducts(perPage: number = 5, page: number = 1) {
  products.value = (await productService.find(page, perPage)).data;
}

function changePage(params: { page: number; perPage: number }) {
  getProducts(params.perPage, params.page);
}

async function findProduct(filter: { name: string }) {
  const response = await productService.findByName(filter.name);
  products.value = {
    data: response.data,
    total: response.data.length,
  };
}
</script>

<template>
  <AppTable
    :columns="cols"
    :items="products?.data"
    :total-records="products?.total"
    heading="Type"
    :new-btn="true"
    :search-mode="true"
    @page="changePage"
    @find="findProduct"
  >
    <template #codes="{ item }">
      <div class="flex gap-2">
        <Chip class="p-2" v-for="a of item.codes" label="Text">
          {{ a.name }}
        </Chip>
      </div>
    </template>

    <template #category="{ item }">
      <div class="flex gap-2">
        <Chip class="p-2" label="Text">
          {{ item?.category?.name || "Неизвестно" }}
        </Chip>
      </div>
    </template>

    <template #models="{ item }">
      <div class="flex gap-2">
        <Chip class="p-2" v-for="a of item.models" label="Text">
          {{ a.name }}
        </Chip>
      </div>
    </template>

    <template #markings="{ item }">
      <div class="flex gap-2">
        <Chip class="p-2" v-for="a of item.markings" label="Text">
          {{ a.name }}
        </Chip>
      </div>
    </template>

    <template #countries="{ item }">
      <div class="flex gap-2">
        <Chip class="p-2" v-for="a of item.countries" label="Text">
          {{ a.name }}
        </Chip>
      </div>
    </template>

    <template #sides="{ item }">
      <div class="flex gap-2">
        <Chip
          class="p-2"
          v-if="item.sides"
          v-for="a of item.sides"
          label="Text"
        >
          {{ a?.name || "Неизвестно" }}
        </Chip>
        <Chip class="p-2" v-else> Неизвестно </Chip>
      </div>
    </template>

    <template #create="{ item }">
      <h5>Название</h5>
      <InputText v-model="item.name" />
      <h5>Описание</h5>
      <InputText v-model="item.description" />
      <h5>Категория</h5>
      <Dropdown
        v-model="selectedCategory"
        :options="categories"
        :filter="true"
        placeholder="Категории"
      />
      <h5>Коды</h5>
      <MultiSelect
        v-model="selectedCodes"
        :options="codes"
        :filter="true"
        placeholder="Выберите Код"
        style="width: 100%; margin-top: 2rem"
      />
      <h5>Страны</h5>
      <MultiSelect
        v-model="selectedCountry"
        :options="country"
        :filter="true"
        placeholder="Выберите страну"
        style="width: 100%; margin-top: 2rem"
      />
      <h5>Марки</h5>
      <MultiSelect
        v-model="selectedMarking"
        :options="marks"
        :filter="true"
        placeholder="Выберите марку"
        style="width: 100%; margin-top: 2rem"
      />
      <h5>Модели</h5>
      <MultiSelect
        v-model="selectedModel"
        :options="models"
        :filter="true"
        placeholder="Выберите модель"
        style="width: 100%; margin-top: 2rem"
      />
      <h5>Стороны</h5>
      <MultiSelect
        v-model="selectedSides"
        :options="sides"
        :filter="true"
        placeholder="Выберите сторону"
        style="width: 100%; margin-top: 2rem"
      />
    </template>

    <template #edit="{ item }">
      <h5>Название</h5>
      <InputText v-model="item.name" />
      <h5>Описание</h5>
      <InputText v-model="item.description" />
      <h5>Категория</h5>
      <Dropdown
        v-model="item.category"
        :options="categories"
        :filter="true"
        placeholder="Категории"
      />
      <h5>Коды</h5>
      <MultiSelect
        v-model="item.codes"
        :options="codes"
        :filter="true"
        placeholder="Выберите Код"
        style="width: 100%; margin-top: 2rem"
      />
      <h5>Страны</h5>
      <MultiSelect
        v-model="item.countries"
        :options="country"
        :filter="true"
        placeholder="Выберите страну"
        style="width: 100%; margin-top: 2rem"
      />
      <h5>Марки</h5>
      <MultiSelect
        v-model="item.markings"
        :options="marks"
        :filter="true"
        placeholder="Выберите Марку"
        style="width: 100%; margin-top: 2rem"
      />
      <h5>Модели</h5>
      <MultiSelect
        v-model="item.models"
        :options="models"
        :filter="true"
        placeholder="Выберите модель"
        style="width: 100%; margin-top: 2rem"
      />
      <h5>Стороны</h5>
      <MultiSelect
        v-model="item.sides"
        :options="sides"
        :filter="true"
        placeholder="Выберите сторону"
        style="width: 100%; margin-top: 2rem"
      />
    </template>
  </AppTable>
</template>

<style></style>
