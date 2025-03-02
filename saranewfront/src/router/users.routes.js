import Allusers from "@/pages/user/Allusers.vue";
import Allprofesores from "@/pages/user/Allprofesores.vue";
import AllDirectores from "@/pages/user/Alldirectores.vue";
import Allcoordinadores from "@/pages/user/Allcoordinadores.vue";
import userDetail from "@/pages/user/UserbyId.vue";

export default {
  all: {
    name: "Allusers",
    path: "/usuarios",
    component: Allusers,
    meta: { protegida: true },
  },
  detalle: {
    name: "UserDetail",
    path: "/usuarios/:id",
    component: userDetail,
    meta: { protegida: true },
  },
  profesores: {
    name: "Profesores",
    path: "/profesores",
    component: Allprofesores,
    meta: { protegida: true },
  },
  coordinadores: {
    name: "Coordinadores",
    path: "/coordinadores",
    component: Allcoordinadores,
    meta: { protegida: true },
  },
  directores: {
    name: "Directores",
    path: "/directores",
    component: AllDirectores,
    meta: { protegida: true },
  },
};
