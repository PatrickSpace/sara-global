<template>
  <v-list>
    <v-list-item
      v-for="(item, i) in items"
      :key="i"
      :value="item"
      :to="item.link"
    >
      <template v-slot:prepend>
        <v-icon :icon="item.icon"></v-icon>
      </template>
      <v-list-item-title>
        {{ item.title }}
      </v-list-item-title>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  name: "DirectorNav",
  data() {
    return {
      items: [
        {
          title: "Home",
          icon: "mdi-home",
          link: "/",
        },
        {
          title: "Proyectos",
          icon: "mdi-file-document-multiple",
          link: "/proyectos",
        },
        {
          title: "Alumnos",
          icon: "mdi-view-dashboard",
          link: "/profesores",
        },
        {
          title: "Profesores",
          icon: "mdi-account-group",
          link: "/coordinadores",
        },
        {
          title: "Directores",
          icon: "mdi-file-document-multiple",
          link: "/directores",
        },
      ],
    };
  },
};
</script>

<style>
</style>