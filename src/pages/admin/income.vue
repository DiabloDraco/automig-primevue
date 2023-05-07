<script lang="ts" setup>
import AppTable from "@/components/AppTable.vue";
import InputText from "primevue/inputtext";
import { ref } from "vue";

let cols = ref([{ field: "brand", header: "Название" }]);

let items = ref([
  { brand: "Volkswagen", year: 2012, color: "Orange", vin: "dsad231ff", id: 1 },
  { brand: "Audi", year: 2011, color: "Black", vin: "gwregre345", id: 2 },
  { brand: "Renault", year: 2005, color: "Gray", vin: "h354htr", id: 3 },
  { brand: "BMW", year: 2003, color: "Blue", vin: "j6w54qgh", id: 4 },
  { brand: "Mercedes", year: 1995, color: "Orange", vin: "hrtwy34", id: 5 },
  { brand: "Volvo", year: 2005, color: "Black", vin: "jejtyj", id: 6 },
  { brand: "Honda", year: 2012, color: "Yellow", vin: "g43gr", id: 7 },
  { brand: "Jaguar", year: 2013, color: "Orange", vin: "greg34", id: 8 },
  { brand: "Ford", year: 2000, color: "Black", vin: "h54hw5", id: 9 },
  { brand: "Fiat", year: 2013, color: "Red", vin: "245t2s", id: 10 },
]);

const paginationNum = 10;
</script>

<template>
  <AppTable
    :columns="cols"
    :items="items"
    :total-records="items.length"
    heading="Categories"
    :new-btn="true"
  >
    <template #create="{ item }">
      <h5>Название</h5>
      <InputText v-model="item.brand" />
    </template>

    <template #edit="{ item }">
      <h5>Название</h5>
      <InputText v-model="item.brand" />
    </template>
  </AppTable>
</template>

<style></style>
