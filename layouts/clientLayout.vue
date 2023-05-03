<template>
  <v-app>
    <HeaderHome></HeaderHome>
    <v-main class="bg-white">
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <MenuBottom></MenuBottom>
  </v-app>
</template>

<script>
import HeaderHome from "@/components/pages/client/layout/HeaderHome";
import MenuBottom from "@/components/pages/client/layout/MenuBottom";
export default {
  name: "ClientLayout",
  components: {
    HeaderHome,
    MenuBottom,
  },
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: "mdi-apps",
          title: "Welcome",
          to: "/",
        },
        {
          icon: "mdi-chart-bubble",
          title: "Inspire",
          to: "/inspire",
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Vuetify.js",
    };
  },
};
</script>
