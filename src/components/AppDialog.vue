<script setup lang="ts">
import Dialog from "primevue/dialog";
import { defineProps } from "vue";

export interface Props {
  productDialog: boolean;
}

const props = defineProps<Props>();
</script>

<template>
  <Dialog
    v-model:visible="props.productDialog"
    :style="{ width: '450px' }"
    header="Product Details"
    :modal="true"
    class="p-fluid"
  >
    <img width="150" class="mt-0 mx-auto mb-5 block shadow-2" />
    <div class="field">
      <label for="name">Name</label>
      <InputText id="name" required="true" autofocus />
    </div>
    <div class="field">
      <label for="description">Description</label>
      <Textarea id="description" required="true" rows="3" cols="20" />
    </div>

    <div class="field">
      <label for="inventoryStatus" class="mb-3">Inventory Status</label>
      <Dropdown
        id="inventoryStatus"
        optionLabel="label"
        placeholder="Select a Status"
      >
        <template #value="slotProps">
          <div v-if="slotProps.value && slotProps.value.value">
            <span :class="'product-badge status-' + slotProps.value.value">{{
              slotProps.value.label
            }}</span>
          </div>
          <div v-else-if="slotProps.value && !slotProps.value.value">
            <span
              :class="'product-badge status-' + slotProps.value.toLowerCase()"
              >{{ slotProps.value }}</span
            >
          </div>
          <span v-else>
            {{ slotProps.placeholder }}
          </span>
        </template>
      </Dropdown>
    </div>

    <div class="field">
      <label class="mb-3">Category</label>
      <div class="formgrid grid">
        <div class="field-radiobutton col-6">
          <RadioButton id="category1" name="category" value="Accessories" />
          <label for="category1">Accessories</label>
        </div>
        <div class="field-radiobutton col-6">
          <RadioButton id="category2" name="category" value="Clothing" />
          <label for="category2">Clothing</label>
        </div>
        <div class="field-radiobutton col-6">
          <RadioButton id="category3" name="category" value="Electronics" />
          <label for="category3">Electronics</label>
        </div>
        <div class="field-radiobutton col-6">
          <RadioButton id="category4" name="category" value="Fitness" />
          <label for="category4">Fitness</label>
        </div>
      </div>
    </div>

    <div class="formgrid grid">
      <div class="field col">
        <label for="price">Price</label>
        <InputNumber
          id="price"
          mode="currency"
          currency="USD"
          locale="en-US"
          :required="true"
        />
        <small class="p-invalid">Price is required.</small>
      </div>
      <div class="field col">
        <label for="quantity">Quantity</label>
        <InputNumber id="quantity" integeronly />
      </div>
    </div>
    <template #footer>
      <Button label="Cancel" icon="pi pi-times" class="p-button-text" />
      <Button label="Save" icon="pi pi-check" class="p-button-text" />
    </template>
  </Dialog>
</template>
