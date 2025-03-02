/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Composables
import { createVuetify } from "vuetify";

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    light: true,
    themes: {
      light: {
        primary: "#00707e",
        secondary: "#F7A713",
      },
      dark: {
        primary: "#00707e",
        secondary: "#F7A713",
      },
    },
  },
});
