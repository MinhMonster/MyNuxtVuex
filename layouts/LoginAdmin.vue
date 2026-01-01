<template>
  <v-app >
    <!-- <v-container> -->
        <Nuxt />
      <!-- </v-container> -->
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  middleware: ['un_authentication'],
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  }
}
</script>
