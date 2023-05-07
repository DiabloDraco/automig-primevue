<script setup lang="ts">
import Login from "./pages/login.vue";
import axios from "./plugins/axios";

// async function f() {
//   const response = await axios.post("v1/users/captcha");

//   const dd = new Blob([response.data]);
//   const d2 = await dd.text();
//   console.log(new ArrayBuffer(response.data));
// }

// f();
</script>

<template>
  <RouterView></RouterView>
</template>
