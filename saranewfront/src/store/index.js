import { createStore } from "vuex";
import axios from "@/plugins/axios";
import router from "@/router";
import usuarioStore from "./usuarioStore";
import NotificationStore from "./NotificationStore";
import proyectoStore from "./proyectoStore";

const buscarRol = (roles) => {
  let rol = "Director";
  if (roles) {
    roles = roles.map((rol) => rol.nombre);
    if (roles.includes("director")) rol = "Director";
    else if (roles.includes("coordinador")) rol = "Coordinador";
    else if (roles.includes("profesor")) rol = "Profesor";
  }
  return rol;
};

const store = createStore({
  state() {
    return {
      token: null,
      currentusuario: {
        nombre: "",
        rol: "",
        id: 0,
      },
    };
  },
  getters: {
    getToken: (state) => state.token,
    getCurrentUser: (state) => state.currentusuario,
    getCurrentUserRol: (state) => state.currentusuario.rol,
  },
  mutations: {
    setToken(state, payload) {
      state.token = payload;
    },
    setCurrentUsername(state, payload) {
      state.currentusuario.nombre = payload;
    },
    setCurrentRol(state, payload) {
      state.currentusuario.rol = payload;
    },
    setCurrentId(state, payload) {
      state.currentusuario.id = payload;
    },
  },
  actions: {
    async Login({ dispatch, commit }, usuario) {
      try {
        const result = await axios.post("/auth/login", {
          usuario: usuario.user,
          password: usuario.psw,
        });
        const token = result.data.token;
        dispatch("setLocalToken", token);

        const expira = Date.now() + 86400000; // 24h
        localStorage.setItem("expira", expira);

        const rol = buscarRol(result.data.rol);
        const nombre = result.data.nombre;
        const id = result.data.id;
        const globaluser = { nombre, rol, id };
        dispatch("setGlobalUser", globaluser);

        commit("setCurrentUsername", nombre);
        commit("setCurrentRol", rol);
        commit("setCurrentId", id);

        dispatch(
          "noti/agregarNotificacionExitosa",
          "Inició sesión correctamente"
        );
        router.push("/");
      } catch (error) {
        dispatch(
          "noti/agregarNotificacionErronea",
          error.response?.data?.msg || "Error desconocido"
        );
      }
    },
    leerToken({ dispatch }) {
      const token = localStorage.getItem("token");
      const expira = localStorage.getItem("expira");
      if (!token || Date.now() > expira) {
        dispatch("logout");
        dispatch(
          "noti/agregarNotificacionErronea",
          "Su sesión ha expirado, por favor inicie sesión de nuevo"
        );
        router.push("/login");
      } else {
        dispatch("setLocalToken", token);
      }
    },
    logout({ commit }) {
      localStorage.removeItem("token");
      localStorage.removeItem("expira");
      commit("setToken", null);
    },
    setLocalToken({ commit }, token) {
      localStorage.setItem("token", token);
      commit("setToken", token);
      axios.defaults.headers["x-access-token"] = token;
    },
    leerGlobalUser({ commit }) {
      const nombre = localStorage.getItem("usuario");
      const rol = localStorage.getItem("rol");
      const id = localStorage.getItem("id");
      commit("setCurrentUsername", nombre);
      commit("setCurrentRol", rol);
      commit("setCurrentId", id);
    },
    setGlobalUser({ commit }, user) {
      localStorage.setItem("usuario", user.nombre);
      localStorage.setItem("rol", user.rol);
      localStorage.setItem("id", user.id);
      commit("setCurrentUsername", user.nombre);
      commit("setCurrentRol", user.rol);
      commit("setCurrentId", user.id);
    },
    readbadnotifications({ dispatch }, error) {
      let errores = [];
      if (error.response.data.msg) {
        errores = error.response.data.msg;
      }
      if (errores.length > 0) {
        errores.forEach((e) => {
          dispatch("noti/agregarNotificacionErronea", e);
        });
      } else {
        dispatch("noti/agregarNotificacionErronea", null);
      }
    },
  },
  modules: {
    usuario: usuarioStore,
    noti: NotificationStore,
    proyecto: proyectoStore,
  },
});

export default store;
