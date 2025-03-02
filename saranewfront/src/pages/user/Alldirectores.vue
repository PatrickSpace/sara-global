<template>
  <Defaultlayout v-bind:titulo="titulo">
    <template #contenido>
      <Datatable
        v-bind:titulo="tableTitulo"
        v-bind:labelbusqueda="labelbusqueda"
        v-bind:cabecera="headers"
        v-bind:valores="getUsers"
        v-bind:loading="loading"
        v-bind:tipodedato="tipo"
      />
      <Adduser />
    </template>
  </Defaultlayout>
</template>
<script>
import Defaultlayout from "@/layouts/Defaultlayout.vue";
import Datatable from "@/components/Common/DataTable.vue";
import Adduser from "@/components/Modulos/User/Adduser.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Alldirectores",
  components: {
    Datatable,
    Defaultlayout,
    Adduser,
  },
  data() {
    return {
      titulo: "Directores",
      loading: false,
      tableTitulo: "Todos los directores",
      labelbusqueda: "Buscar por nombre",
      tipo: "usuario",
      headers: [
        {
          title: "Nombre",
          align: "start",
          key: "nombre",
        },
        { title: "Usuario", key: "usuario" },
        { title: "Detalle", key: "actions", sortable: false },
      ],
    };
  },
  methods: {
    ...mapActions({
      getUsersfromapi: "usuario/getDirectores",
    }),
    async obtenenerdatos() {
      try {
        this.loading = true;
        await this.getUsersfromapi();
      } catch (e) {
        console.log(e);
      } finally {
        this.loading = false;
      }
    },
  },
  computed: {
    ...mapGetters({
      getUsers: "usuario/getDirectores",
    }),
  },
  created() {
    this.obtenenerdatos();
  },
};
</script>