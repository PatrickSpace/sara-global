import Home from "@/pages/proyecto/Allproyectos.vue";
import Detail from "@/pages/proyecto/ProyectobyId.vue";
import Misproyectos from "@/pages/profesor/Myprojects.vue";

export default {
  home: {
    name: "Allproyectos",
    path: "/proyectos",
    component: Home,
    meta: { protegida: true },
  },
  proyectodetalle: {
    name: "ProyectDetalle",
    path: "/proyectos/:id",
    component: Detail,
    meta: { protegida: true },
  },
  proyectosporprofe: {
    name: "Myprojects",
    path: "/misproyectos",
    component: Misproyectos,
    meta: { protegida: true },
  },
};
