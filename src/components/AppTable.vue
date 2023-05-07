<script setup lang="ts">
import { ref, defineEmits, watch } from "vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import InputText from "primevue/inputtext";
import MultiSelect from "primevue/multiselect";
import Toolbar from "primevue/toolbar";
import FileUpload from "primevue/fileupload";
import Button from "primevue/button";
import Toast from "primevue/toast";
import Dialog from "primevue/dialog";
import { useToast } from "primevue/usetoast";
import { useRoute, useRouter } from "vue-router";

export interface Query {
  page: number;
  perPage: number;
}

export interface Props {
  items: any[];
  selected?: boolean;
  totalRecords?: number;
  columns: any[];
  heading: string;
  multiple?: boolean;
  newBtn?: boolean;
  searchMode?: boolean;
}

const emits = defineEmits(["page", "create", "update", "remove", "find"]);

const props = defineProps<Props>();

const items = ref(props.items);
const selectedProducts = ref(null);
const mobileScrollable: any = ref("scroll");
const item: any = ref({});
const itemDialog = ref(false);
const editDialog = ref(false);
const deleteItemDialog = ref(false);
const loading = ref(false);
const paginationNum = ref(10);
const rowsRes = ref(5);
const search = ref("");
const pagination = ref(true);

const router = useRouter();
const route = useRoute();

const toast = useToast();

const selectedColumns = ref(props.columns);

function onToggle(value: any) {
  selectedColumns.value = props.columns.filter((col) => value.includes(col));
}

function save(item: any) {
  props.items.push(item);
  emits("create", { item: item });
  toast.add({
    severity: "success",
    summary: "Successful",
    detail: "Item Updated",
    life: 3000,
  });
  itemDialog.value = false;
}

function editItem(item: any) {
  props.items.push(item);
  emits("update", { id: item?.id, item: item });
  editDialog.value = false;
  toast.add({
    severity: "success",
    summary: "Successful",
    detail: "Item Updated",
    life: 3000,
  });
}

const hideDialog = () => {
  itemDialog.value = false;
};

const hideEditDialog = () => {
  editDialog.value = false;
};

const deleteItem = (item: any) => {
  items.value = items.value.filter((val) => val.id != item?.id);
  emits("remove", { id: item?.id });

  deleteItemDialog.value = false;
  item.value = {};
  toast.add({
    severity: "success",
    summary: "Successful",
    detail: "Item Deleted",
    life: 3000,
  });
};

function delPagination() {
  if (search.value.length > 0) {
    pagination.value = false;
  } else {
    pagination.value = true;
  }
}

const confirmDeleteItem = (editItem: any) => {
  item.value = editItem;
  deleteItemDialog.value = true;
};

if (window.innerWidth < 900) {
  paginationNum.value = 3;
  rowsRes.value = 3;
  mobileScrollable.value = "stack";
}

function openNew() {
  item.value = {};
  itemDialog.value = true;
}

const edit = (editItem: any) => {
  item.value = editItem;
  editDialog.value = true;
};

async function changePage(params: { page: number; rows: number }) {
  router.push({
    query: { page: params.page, perPage: params.rows },
  });
  emits("page", { page: params.page, perPage: params.rows });
}

const { page = 0, perPage = 5 } = route.query as any;
// @ts-ignore
changePage({ page, perPage });

watch(search, (name: string) => {
  if (name.length >= 2) {
    emits("find", { name });
  }
});
</script>

<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <Toast />
        <Toolbar class="mb-4">
          <template v-slot:start>
            <div class="my-2">
              <Button
                v-if="props.newBtn"
                @click="openNew"
                label="New"
                icon="pi pi-plus"
                class="p-button-success mr-2"
              />
            </div>
          </template>

          <template v-slot:end>
            <FileUpload
              mode="basic"
              accept="image/*"
              :maxFileSize="1000000"
              label="Import"
              chooseLabel="Import"
              class="mr-2 inline-block"
            />
            <Button label="Export" icon="pi pi-upload" class="p-button-help" />
          </template>
        </Toolbar>
        <DataTable
          @page="changePage"
          breakpoint="960px"
          class="p-datatable-lg"
          :loading="loading"
          :value="props.items"
          v-model:selection="selectedProducts"
          :paginator="pagination"
          :page-link-size="paginationNum"
          :rows="rowsRes"
          :totalRecords="props.totalRecords"
          :rowsPerPageOptions="[5, 10, 25]"
          :responsive-layout="mobileScrollable"
          lazy
        >
          <template #header>
            <div
              class="flex flex-column md:flex-row md:justify-content-between md:align-items-center"
            >
              <h5 class="m-0">{{ heading }}</h5>
              <div class="flex flex-column md:flex-row gap-3">
                <span
                  v-if="props.searchMode"
                  class="block mt-2 md:mt-0 p-input-icon-left"
                >
                  <i class="pi pi-search" />
                  <InputText
                    @input="delPagination"
                    v-model.trim="search"
                    placeholder="Search..."
                    debounce="2000"
                  />
                </span>
                <MultiSelect
                  v-if="props.multiple"
                  :modelValue="selectedColumns"
                  :options="columns"
                  optionLabel="header"
                  @update:modelValue="onToggle"
                  placeholder="Select Columns"
                  style="width: 20em"
                />
              </div>
            </div>
          </template>

          <Column v-if="props.selected" selectionMode="multiple"></Column>
          <Column
            header="№"
            :sortable="true"
            headerStyle="width:14%; min-width:10rem;"
          >
            <template #body="slotProps">
              {{ slotProps.index + 1 }}
            </template>
          </Column>

          <Column
            v-for="(col, index) of selectedColumns"
            :field="col.field"
            :header="col.header"
            :key="index"
            headerStyle="width:14%; min-width:10rem;"
          >
            <template #body="{ data, field }">
              <slot :name="field" :item="data">
                <Chip class="p-2" label="Text">
                  {{ data[field] }}
                </Chip>
              </slot>
            </template>
          </Column>

          <Column
            class="btn__wrapper"
            header="Действие"
            headerStyle="width:14%; min-width:10rem;"
          >
            <template #body="{ data }">
              <div>
                <Button
                  icon="pi pi-pencil"
                  class="p-button-rounded p-button-success mr-2"
                  @click="edit(data)"
                />
                <Button
                  icon="pi pi-trash"
                  class="p-button-rounded p-button-warning"
                  @click="confirmDeleteItem(data)"
                />
              </div>
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
  </div>

  <Dialog
    v-model:visible="itemDialog"
    :style="{ width: '450px' }"
    header="Детали Продукта"
    :modal="true"
    class="p-fluid"
    placeholder
  >
    <slot name="create" :item="item" />

    <template #footer>
      <Button
        label="Cancel"
        icon="pi pi-times"
        class="p-button-text"
        @click="hideDialog"
      />
      <Button
        label="Save"
        icon="pi pi-check"
        class="p-button-text"
        @click="save(item)"
      />
    </template>
  </Dialog>

  <Dialog
    v-model:visible="editDialog"
    :style="{ width: '450px' }"
    header="Product Details"
    :modal="true"
    class="p-fluid"
    placeholder
  >
    <slot name="edit" :item="item" />

    <template #footer>
      <Button
        label="Cancel"
        icon="pi pi-times"
        class="p-button-text"
        @click="hideEditDialog"
      />
      <Button
        label="Save"
        icon="pi pi-check"
        class="p-button-text"
        @click="editItem(item)"
      />
    </template>
  </Dialog>

  <Dialog
    v-model:visible="deleteItemDialog"
    :style="{ width: '450px' }"
    header="Confirm"
    :modal="true"
  >
    <div class="flex align-items-center justify-content-center">
      <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
      <span v-if="item"
        >Are you sure you want to delsete <b>{{ item.name }}</b
        >?</span
      >
    </div>
    <template #footer>
      <Button
        label="No"
        icon="pi pi-times"
        class="p-button-text"
        @click="deleteItemDialog = false"
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        class="p-button-text"
        @click="deleteItem(item)"
      />
    </template>
  </Dialog>
</template>

<style>
@media only screen and (max-width: 900px) {
  /* MOBILE */

  .btn__wrapper {
    display: flex;
    flex-direction: column;
  }

  .btn__wrapper div {
    width: 100%;
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
  }

  .p-paginator-rpp-options {
    display: none;
  }

  .p-paginator-prev {
    display: none;
  }

  .p-paginator-next {
    display: none;
  }
}
</style>
