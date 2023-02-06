<template>
  <client-only>
    <div>
      <v-btn @click="addAction(`vue`)" color="primary"> Add Vue </v-btn>
      <v-btn @click="addAction(`javascipt`)" color="primary">
        Add javascipt
      </v-btn>
      <v-btn @click="addAction(`html`)" color="primary">
        Add html
      </v-btn>
    </div>
  </client-only>
</template>

<script>
import { mapActions } from "vuex";

export default {
  methods: {
    ...mapActions("admin/deverlopers", [
      "addAction"
    ]),
  },
};
</script>
