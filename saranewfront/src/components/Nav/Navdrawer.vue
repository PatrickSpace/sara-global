<template>
  <v-navigation-drawer color="#00707e" disable-route-watcher permanent>
    <v-list>
      <v-list-item
        prepend-avatar="https://cdn.vuetifyjs.com/images/john.png"
        subtitle="john@google.com"
        title="John Leider"
      >
        <template v-slot:append>
          <v-btn icon="mdi-menu-down" size="small" variant="text"></v-btn>
        </template>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>

    <DirectorNav />

    <template v-slot:append>
      <v-list>
        <v-list-item
          @click="cerrarSesion()"
          color="red-lighten-2"
          prepend-icon="mdi-power"
        >
          Cerrar sesión
        </v-list-item>
      </v-list>
    </template>
  </v-navigation-drawer>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import ProfesorNav from "@/components/Nav/NavItems/ProfesorNav.vue";
import DirectorNav from "@/components/Nav/NavItems/DirectorNav.vue";
import CoordinadorNav from "@/components/Nav/NavItems/CoordinadorNav.vue";
export default {
  name: "Navdrawer",
  components: {
    ProfesorNav,
    DirectorNav,
    CoordinadorNav,
  },
  data() {
    return {
      rol: "director",
    };
  },
  methods: {
    ...mapActions(["logout"]),
    cerrarSesion() {
      this.logout();
      this.$router.push("/login");
    },
  },
  computed: {
    ...mapGetters({ getUser: "getCurrentUser" }),
  },
};
</script>
