<script lang="ts" setup>
import AppTable from "@/components/AppTable.vue";
import InputText from "primevue/inputtext";
import MultiSelect from "primevue/multiselect";
import { userService } from "@/service/UserService";
import { ref } from "vue";
let cols = ref([
  { field: "fio", header: "ФИО" },
  { field: "description", header: "Описание" },
  { field: "login", header: "Логин" },
  { field: "created_at", header: "Дата создание" },
  { field: "updated_at", header: "Дата обновление" },
  { field: "last_visit", header: "Дата входа" },
]);

let selecteds = ref([]);

let users = ref();

async function getUser(perPage: number = 5, page: number = 1) {
  users.value = (await userService.find(page, perPage)).data;
}

function changePage(params: { page: number; perPage: number }) {
  getUser(params.perPage, params.page);
}

async function findUser(filter: { name: string }) {
  const response = await userService.findByName(filter.name);
  users.value = {
    data: response.data,
    total: response.data.length,
  };
}

function updateItem(params: { id: number; item: any }) {
  userService.update(params.id, params.item);
}

function removeItem(id: number) {
  userService.delete(id);
}

let roles = ref([
  {
    name: "Admin",
    description: "Может менять все",
  },
  {
    name: "Seo",
    description: "Может только реадктировать",
  },
  {
    name: "User",
    description: "В режиме чтение",
  },
]);
</script>

<template>
  <AppTable
    :columns="cols"
    :items="users?.data"
    :total-records="users?.total"
    heading="Marking"
    :new-btn="true"
    :search-mode="true"
    @page="changePage"
    @find="findUser"
    @update="updateItem"
    @remove="removeItem"
  >
    <template #category="{ item }">
      <div class="flex gap-2">
        <Chip class="p-2" label="Text">
          {{ item.name }}
        </Chip>
      </div>
    </template>

    <template #updated_at="{ item }">
      <div class="flex gap-2">
        <Chip class="p-2" label="Text">
          {{ item.updated_at || "Не было обновлений" }}
        </Chip>
      </div>
    </template>

    <template #last_visit="{ item }">
      <div class="flex gap-2">
        <Chip class="p-2" label="Text">
          {{ item.last_visit || "Не было заходов" }}
        </Chip>
      </div>
    </template>

    <template #create="{ item }">
      <h5>ФИО</h5>
      <InputText v-model="item.fio" />
      <h5>Описание</h5>
      <InputText v-model="item.description" />
      <h5>Логин</h5>
      <InputText v-model="item.login" />
      <MultiSelect
        v-model="selecteds"
        :options="roles"
        optionLabel="name"
        :filter="true"
        placeholder="Select Roles"
        style="width: 100%; margin-top: 2rem"
      />
      <label>Пароль</label>
      <InputText v-model="item.password" />
    </template>

    <template #edit="{ item }">
      <h5>ФИО</h5>
      <InputText v-model="item.fio" />
      <h5>Описание</h5>
      <InputText v-model="item.description" />
      <h5>Логин</h5>
      <InputText v-model="item.login" />
      <MultiSelect
        v-model="selecteds"
        :options="roles"
        :filter="true"
        optionLabel="name"
        placeholder="Select Roles"
        style="width: 100%; margin-top: 2rem"
      />
    </template>
  </AppTable>
</template>

<style></style>
