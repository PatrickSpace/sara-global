<template>
  <Defaultlayout :titulo="titulo">
    <template #contenido>
      <v-container>
        <div v-if="loading">
          <v-row>
            <v-col xl="6" md="5" sm="12">
              <v-skeleton-loader type="card, article"></v-skeleton-loader>
            </v-col>
            <v-col xl="6" md="7" sm="12">
              <v-skeleton-loader
                type="paragraph, list-item"
              ></v-skeleton-loader>
            </v-col>
          </v-row>
        </div>

        <v-fade-transition>
          <div v-if="!loading">
            <v-row>
              <v-col xl="6" md="5" sm="12">
                <h2 class="text-h2 font-weight-regular">Datos</h2>
                <v-divider class="mb-5"></v-divider>
                <p class="text-body-1">
                  <span class="font-weight-medium"> Nombre Completo: </span>
                  {{ usuario.nombre }}
                </p>
                <p class="text-body-1">
                  <span class="font-weight-medium"> Usuario: </span>
                  {{ usuario.usuario }}
                </p>
                <p class="text-body-1">
                  <span class="font-weight-medium"> Rol: </span>
                  {{ usuario.rol }}
                </p>
              </v-col>

              <v-col v-if="usuario.rol === 'Profesor'" xl="6" md="7" sm="12">
                <h2 class="text-h2 font-weight-regular">Proyectos asignados</h2>
                <v-divider class="mb-5"></v-divider>
                <v-container class="py-0" v-if="usuario.proyectos.length > 0">
                  <v-card
                    elevation="2"
                    v-for="(p, i) in usuario.proyectos"
                    :key="i"
                    class="mb-3"
                  >
                    <v-list-item>
                      <v-list-item__content>
                        <v-list-item-title>{{ p.nombre }}</v-list-item-title>
                        <v-list-item-subtitle>{{
                          p.codigo
                        }}</v-list-item-subtitle>
                      </v-list-item__content>
                    </v-list-item>
                  </v-card>
                </v-container>
                <v-alert
                  class="mt-5"
                  variant="tonal"
                  type="warning"
                  density="compact"
                  v-else
                >
                  No se han asignado proyectos
                </v-alert>
              </v-col>
            </v-row>

            <ActionbuttonUser :id="id" :usuariofromcomponent="usuario" />
          </div>
        </v-fade-transition>
      </v-container>
    </template>
  </Defaultlayout>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import Defaultlayout from "@/layouts/Defaultlayout.vue";
import ActionFButton from "@/components/Common/ActionFButton.vue";
import ActionbuttonUser from "@/components/Modulos/User/ActionbuttonUser.vue";

export default {
  name: "UserbyId",
  components: {
    Defaultlayout,
    ActionFButton,
    ActionbuttonUser,
  },
  setup() {
    const store = useStore();
    const route = useRoute();

    const titulo = ref("Detalle del usuario");
    const loading = ref(false);
    const usuario = ref({
      nombre: "Julio Quispi",
      usuario: "user",
      rol: "Profesor",
      proyectos: [],
    });
    const id = ref(route.params.id);

    const rol = computed(() => store.getters.getCurrentUserRol);

    const getUser = async (id) => {
      try {
        loading.value = true;
        const userfound = await store.dispatch("usuario/getUserbyID", id);
        usuario.value = userfound;
      } catch (e) {
        console.error(e);
      } finally {
        loading.value = false;
      }
    };

    onMounted(() => {
      getUser(id.value);
    });

    return {
      titulo,
      loading,
      usuario,
      id,
      rol,
    };
  },
};
</script>