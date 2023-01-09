<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card class="logo py-4 d-flex justify-center">
        <NuxtLogo />
        <VuetifyLogo />
      </v-card>
      <h1>{{ this.test }}</h1>
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "IndexPage",
  computed: mapState(["test"]),
  created() {
    // console.log(this.test)
    // this.setTest('ok1')
    // console.log(this.$store.state.test)
  },
  methods: {
    ...mapActions(["setTest"]),
  },
};
</script>