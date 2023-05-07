import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import pages from "vite-plugin-pages";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    pages({
      importMode(filepath, options) {
        return "async";
      },
      extendRoute: (route, parent) => {
        const { path } = route;
        if (path.startsWith("/admin")) {
          const { meta } = route;
          return {
            ...route,
            meta: {
              ...meta,
              auth: true,
              roles: ["ADMIN"],
              prefix: "admin",
            },
          };
        }
      },
    }),
    {
      name: "transform-file",
      transformIndexHtml(html) {
        return html.replace("%__ANALYTICS_URL__%", "");
      },
      transform(code, id, options) {
        if (code.includes("%lastdate%")) {
          return code.replace("%lastdate%", new Date().toDateString());
        }
      },
    },
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
