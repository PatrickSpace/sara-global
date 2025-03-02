<template>
  <v-alert
    style="transition: 1s"
    transition="slide-x-reverse-transition"
    :type="tipo"
    :color="color"
    :v-model="visible"
    tag="div"
    elevation="6"
    closable
  >
    {{ msg }}
  </v-alert>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Notification",
  data() {
    return {};
  },
  props: {
    tipo: String,
    color: String,
    msg: String,
    visible: Boolean,
    index: Number,
  },
  methods: {
    ...mapActions({
      quitar: "noti/ocultarNotificacion",
    }),
  },
};
</script>
