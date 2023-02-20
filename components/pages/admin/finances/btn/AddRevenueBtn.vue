<template>
  <client-only>
    <div class="d-flex">
      <v-btn @click="addAction(`revenue`)" color="primary"> Add Revenue </v-btn>
      <v-spacer/>
      <v-btn @click="addAction(`expense`)" color="primary">
        Add Expenses
      </v-btn>
    </div>
  </client-only>
</template>

<script>
import { mapActions } from "vuex";

export default {
  methods: {
    ...mapActions("admin/finances/edit", [
      "addAction"
    ]),
  },
};
</script>
