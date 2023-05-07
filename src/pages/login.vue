<script setup lang="ts">
import axios from "@/plugins/axios";
import Password from "primevue/password";
import InputText from "primevue/inputtext";
import Checkbox from "primevue/checkbox";
import Button from "primevue/button";
import { useAuthStore } from "@/store/auth";

import { ref } from "vue";
import User from "@/models/user";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();
const checked = ref(false);
const loading = ref(false);

const user = ref({
  login: "",
  password: "",
  hash: "",
  result: "",
});

const secure = ref({
  data: "",
  hash: "",
});

async function login(user: any) {
  try {
    loading.value = true;
    const { data } = await axios.post("v1/users/sign-in", user);

    const { token } = data as { token: string };

    token.base64Encode().setItem("token");

    const currentUser = token
      .toItem(".", 1)
      .base64Decode()
      .toObject<User>("user")
      .setItem<User>("user", (itm: string) => itm.base64Encode());

    authStore.setToken(token);
    authStore.setUser(currentUser);

    setTimeout(() => {
      router.push("/admin");
    }, 2000);
  } catch (error) {
    captcha();
  } finally {
    setTimeout(() => {
      loading.value = false;
    }, 2000);
  }
}

async function captcha() {
  try {
    const { data } = await axios.post("v1/users/captcha");
    secure.value = data;
    user.value.hash = data.hash;
  } catch (error) {}
}

captcha();
</script>

<template>
  <div
    class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden"
  >
    <div class="flex flex-column align-items-center justify-content-center">
      <div class="login-border">
        <div
          class="w-full surface-card py-8 px-5 sm:px-8"
          style="border-radius: 53px"
        >
          <div class="text-center mb-5">
            <div class="text-900 text-3xl font-medium mb-3">
              Welcome, Isabel! %lastdate%
            </div>
          </div>

          <div>
            <label for="email1" class="block text-900 text-xl font-medium mb-2"
              >Email</label
            >
            <InputText
              v-model="user.login"
              id="email1"
              type="text"
              placeholder="Email address"
              class="w-full md:w-30rem mb-5"
              style="padding: 1rem"
            />

            <label
              for="password1"
              class="block text-900 font-medium text-xl mb-2"
              >Password</label
            >
            <Password
              id="password1"
              v-model="user.password"
              placeholder="Password"
              :toggleMask="true"
              class="w-full mb-3"
              inputClass="w-full"
              inputStyle="padding:1rem"
            />

            <label
              for="captcha"
              class="block text-900 font-medium text-xl mb-2 mt-3"
            >
              <img :src="secure.data" />
            </label>
            <InputText
              v-model="user.result"
              id="captcha"
              type="text"
              placeholder="Введите правильный ответ"
              class="w-full md:w-30rem mb-5"
              style="padding: 1rem"
            />
            <div
              class="flex align-items-center justify-content-between mb-5 gap-5"
            >
              <div class="flex align-items-center">
                <Checkbox
                  v-model="checked"
                  id="rememberme1"
                  binary
                  class="mr-2"
                ></Checkbox>
                <label for="rememberme1">Remember me</label>
              </div>
              <a
                class="font-medium no-underline ml-2 text-right cursor-pointer"
                style="color: var(--primary-color)"
                >Forgot password?</a
              >
            </div>
            <Button
              :loading="loading"
              @click="login(user)"
              label="Sign In"
              class="w-full p-3 text-xl"
            ></Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.p-password {
  .pi-eye {
    transform: scale(1.6) !important;
    margin-right: 0.5rem !important;
  }

  .pi-eye-slash {
    transform: scale(1.6) !important;
    margin-right: 0.5rem !important;
  }

  .p-password-input {
    padding-right: 3rem !important;
  }
}

.login-border {
  border-radius: 56px;
  padding: 0.3rem;
  background: linear-gradient(
    180deg,
    var(--primary-color) 10%,
    rgba(33, 150, 243, 0) 30%
  );
}
</style>
