/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from "vue-router/auto";
//import { routes } from "vue-router/auto-routes";
import store from "@/store/index";
import Login from "@/pages/auth/Login.vue";
import Home from "@/pages/Home.vue";
import PageNotFound from "@/pages/404.vue";

import Userroutes from "@/router/users.routes.js";
import Proyectoroutes from "@/router/proyectos.routes.js";

const routes = [
  {
    path: "/",
    name: "home",
    meta: { protegida: true },
    component: Home,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  //******PROYECTOS************/
  Proyectoroutes.home,
  Proyectoroutes.proyectodetalle,
  Proyectoroutes.proyectosporprofe,

  //*******USUARIOS************/
  Userroutes.all,
  Userroutes.detalle,
  Userroutes.profesores,
  Userroutes.coordinadores,
  Userroutes.directores,

  // 404
  { path: "/:pathMatch(.*)*", name: "404", component: PageNotFound },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

/*
router.beforeEach((to, from, next) => {
  store.dispatch("leerToken", to.name);
  store.dispatch("leerGlobalUser");
  const token = store.getters.getToken;
  const isprotegida = to.matched.some((ruta) => ruta.meta.protegida);
  if (isprotegida && token === null) {
    console.log("no tienes acceso");

    if (to.name !== "home") {
      store.dispatch(
        "noti/agregarNotificacionErronea",
        "No tiene permisos para ingresar a esta ruta, inicie sesión nuevamente"
      );
    }
    next("/login");
  } else if (token && !isprotegida) {
    next();
  } else {
    next();
  }
});
*/
// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.("Failed to fetch dynamically imported module")) {
    if (!localStorage.getItem("vuetify:dynamic-reload")) {
      console.log("Reloading page to fix dynamic import error");
      localStorage.setItem("vuetify:dynamic-reload", "true");
      location.assign(to.fullPath);
    } else {
      console.error("Dynamic import error, reloading page did not fix it", err);
    }
  } else {
    console.error(err);
  }
});

router.isReady().then(() => {
  localStorage.removeItem("vuetify:dynamic-reload");
});

export default router;
