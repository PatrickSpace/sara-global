<template>
  <v-app>
    <v-main class="d-flex align-center">
      <v-card
        class="mx-auto my-auto px-5 pb-10"
        max-width="400"
        :loading="loading"
      >
        <v-card-title class="pt-10">Iniciar sesión</v-card-title>
        <v-form ref="form" v-model="validlogin" @submit.prevent="login">
          <v-container>
            <v-text-field
              prepend-icon="mdi-account"
              v-model="usuario.user"
              counter
              clearable
              :rules="userRules"
              label="Usuario"
              required
            ></v-text-field>
            <v-text-field
              prepend-icon="mdi-lock"
              v-model="usuario.psw"
              :append-inner-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show ? 'text' : 'password'"
              :rules="pswRules"
              label="Contraseña"
              clearable
              required
              @click:append-inner="show = !show"
            ></v-text-field>
          </v-container>
          <v-card-actions>
            <v-btn :loading="loading" color="primary" type="submit" block>
              Ingresar
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-main>
    <NotificationList />
  </v-app>
</template>

<script>
import NotificationList from "@/components/Common/NotificationList.vue";
import { mapActions } from "vuex";

export default {
  name: "Loginview",
  components: {
    NotificationList,
  },
  data: () => ({
    loading: false,
    validlogin: true,
    show: false,
    msg: "",
    usuario: {
      user: "",
      psw: "",
    },
    userRules: [(v) => !!v || "Este campo es obligatorio"],
    pswRules: [(v) => !!v || "Este campo es obligatorio"],
  }),
  methods: {
    ...mapActions({
      Login: "Login",
    }),
    async login() {
      try {
        this.loading = true;
        const isValid = await this.$refs.form.validate();
        if (!isValid) return;

        await this.Login(this.usuario);
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>