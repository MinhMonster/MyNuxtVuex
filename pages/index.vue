<template>
  <div class="container-fluid">
    <div class="p-4 justify-content-center"></div>
    <h1>okok</h1>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  layout: "clientLayout",
  
  components: {},

  created() {},

  computed: {
    ...mapState("admin/topics", ["topics"]),
  },
  methods: {
    ...mapActions("admin/topics", ["get_topics"]),
  },
};
</script>

<style>
</style>