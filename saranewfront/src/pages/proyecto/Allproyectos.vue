<template>
  <Defaultlayout v-bind:titulo="titulo">
    <template #contenido>
      <Datatable
        v-bind:titulo="tableTitulo"
        v-bind:labelbusqueda="labelbusqueda"
        v-bind:cabecera="headers"
        v-bind:valores="getProyectos"
        v-bind:loading="loading"
        v-bind:tipodedato="tipo"
      />
      <Addproyecto />
    </template>
  </Defaultlayout>
</template>

<script>
import Defaultlayout from "@/layouts/Defaultlayout.vue";
import Datatable from "@/components/Common/DataTable.vue";
import Addproyecto from "@/components/Modulos/Proyecto/Addproyecto.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Allproyectos",
  components: {
    Defaultlayout,
    Datatable,
    Addproyecto,
  },
  data() {
    return {
      titulo: "Proyectos",
      tableTitulo: "Todos los proyectos",
      labelbusqueda: "Buscar por nombre o codigo",
      loading: false,
      tipo: "proyecto",
      headers: [
        { title: "Nombre", key: "nombre" },
        { title: "Codigo", key: "codigo" },
        { title: "Detalle", key: "actions", sortable: false },
      ],
    };
  },
  methods: {
    ...mapActions({
      obtenerproyectosfromAPI: "proyecto/getProyectos",
    }),
    obtenerproyectos: async function () {
      try {
        this.loading = true;
        await this.obtenerproyectosfromAPI();
      } catch (e) {
        console.log(e);
      } finally {
        this.loading = false;
      }
    },
  },
  computed: {
    ...mapGetters({
      getProyectos: "proyecto/getAllProyectos",
    }),
  },
  created() {
    this.obtenerproyectos();
  },
};
</script>