import "./ext";
import pinia from "@/store";
import router from "@/router";
import "./axios";
import type { App } from "vue";
import install from "./primevue";

export function registerPlugins(app: App) {
  install(app).use(router).use(pinia);
}
