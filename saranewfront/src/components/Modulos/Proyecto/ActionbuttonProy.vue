<template>
  <div>
    <v-speed-dial location=" bottom right " transition="scale-transition">
      <template v-slot:activator="{ props: activatorProps }">
        <v-fab
          location="bottom right"
          v-bind="activatorProps"
          color="primary"
          :app="true"
          icon
        >
          <v-icon>{{ open ? "mdi-close" : "mdi-apps" }}</v-icon>
          <v-speed-dial
            v-model="open"
            location="top center"
            transition="fade"
            activator="parent"
          >
            <v-btn key="1" color="red" icon @click.stop="deldialog = true">
              <v-icon size="24">$error</v-icon>
            </v-btn>

            <v-btn key="2" color="info" icon @click.stop="editdialog = true">
              <v-icon size="24">mdi-pencil</v-icon>
            </v-btn>
          </v-speed-dial>
        </v-fab>
      </template>
    </v-speed-dial>
    <v-dialog v-model="editdialog" max-width="450" persistent>
      <v-card class="pa-3">
        <v-card-title> Actualizar proyecto </v-card-title>
        <v-form
          ref="form"
          v-model="validupdate"
          @submit.prevent="editproyecto()"
          class="px-3"
        >
          <v-card-text class="pt-2">
            <v-text-field
              :loading="editloading"
              prepend-inner-icon="mdi-alphabetical-variant"
              v-model="proyecto.nombre"
              counter="50"
              clearable
              :rules="nameRules"
              label="Nombre del proyecto"
              required
            ></v-text-field>
            <v-text-field
              :loading="editloading"
              prepend-inner-icon="mdi-identifier"
              v-model="proyecto.codigo"
              counter="30"
              clearable
              :rules="codRules"
              label="Código"
              required
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red" dark @click="cancelar()"> Cancelar </v-btn>
            <v-btn color="primary" :loading="editloading" type="submit">
              Actualizar
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
    <v-dialog v-model="deldialog" max-width="490" persistent>
      <v-card :loading="delloading" :disabled="delloading">
        <v-card-title>
          ¿Estas seguro que desea eliminar el proyecto?
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="gray darken-1" text @click="deldialog = false">
            Cancelar
          </v-btn>
          <v-btn color="red darken-1" text @click.stop="borrarproyecto()">
            Borrar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "ActionProyectButton",
  props: {
    id: String,
    proyectofrompage: Object,
  },
  data() {
    return {
      open: false,
      actionbtn: false,
      proyecto: {
        nombre: "",
        codigo: "",
      },
      //delete
      deldialog: false,
      delloading: false,

      //update
      editdialog: false,
      editloading: false,
      validupdate: true,
      nameRules: [
        (v) => !!v || "Este campo es obligatorio",
        (v) =>
          (v && v.length <= 50) ||
          "Este campo debe contener como máximo 50 caracteres",
        (v) =>
          (v && v.length >= 5) ||
          "Este campo debe contener como mínimo 5 caracteres",
      ],
      codRules: [
        (v) => !!v || "Este campo es obligatorio",
        (v) =>
          (v && v.length >= 5) ||
          "Este campo debe contener como mínimo 5 caracteres",
        (v) =>
          (v && v.length <= 30) ||
          "Este campo debe contener como máximo 30 caracteres",
      ],
    };
  },
  methods: {
    ...mapActions({
      borrarproyectofromAPI: "proyecto/DeleteProject",
      updateproyectofromAPI: "proyecto/updateproyecto",
    }),
    async borrarproyecto() {
      try {
        this.delloading = true;
        await this.borrarproyectofromAPI(this.id);
        this.$router.push({ name: "Allproyectos" });
      } catch (e) {
        console.log(e);
      } finally {
        this.delloading = false;
      }
    },
    async editproyecto() {
      try {
        this.editloading = true;
        const payload = {
          nombre: this.proyecto.nombre,
          codigo: this.proyecto.codigo,
          id: this.id,
        };
        await this.updateproyectofromAPI(payload);
        this.cancelar();
        setTimeout(() => {
          this.$router.go();
        }, 3000);
      } catch (e) {
        console.log(e);
      } finally {
        this.editloading = false;
      }
    },
    cancelar() {
      this.editdialog = false;
      this.$refs.form.reset();
    },
    setItems() {
      try {
        const { nombre, codigo } = this.proyectofrompage;
        this.proyecto.nombre = nombre;
        this.proyecto.codigo = codigo;
      } catch (e) {
        console.log(e);
      }
    },
  },
  mounted() {
    this.setItems();
  },
};
</script>

<style>
</style>