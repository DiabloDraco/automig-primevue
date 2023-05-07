import { createRouter, createWebHistory, RouteMeta } from "vue-router";
import routes from "~pages";
import { useAuthStore } from "@/store/auth";
import AppLayout from "@/components/AppLayout.vue";

const adminRoutes = routes.filter((router) => {
  if (router.path.startsWith("/admin")) {
    router.path = router.path.slice(1);
    return true;
  }
});

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/admin",
      component: AppLayout,
      children: adminRoutes,
    },
    ...routes.filter((router) => router.path === "/login"),
  ],
});

interface NewRouteMeta extends RouteMeta {
  prefix: string;
  auth: boolean;
  roles?: string[];
}

router.beforeEach((to, from, next) => {
  if(true) return next()
  const meta = to.meta as NewRouteMeta;

  if (!meta.auth) {
    return next();
  }

  const auth = useAuthStore();

  if (!auth.getToken || !auth.valid) {
    return next("/login");
  }

  const { roles } = auth.getUser;

  if (
    roles.some((role) => meta.roles?.some((name: string) => name == role.name))
  ) {
    return next();
  }

  return next("/403");
});

export default router;
