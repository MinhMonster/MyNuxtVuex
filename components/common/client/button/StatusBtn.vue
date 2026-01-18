<template>
  <div v-if="setStatus.icon">
    <v-icon :color="setStatus.color" small>
      {{ setStatus.icon }}
    </v-icon>
    <span>{{ setStatus.text }}</span>
  </div>
  <v-badge
    v-else
    :color="setStatus.color"
    :content="setStatus.text"
    class="pointer"
  ></v-badge>
</template>

<script>
export default {
  name: "StatusBtn",
  props: {
    status: {
      type: [String, Number],
      default: "0",
    },
  },
  async mounted() {},
  computed: {
    setStatus() {
      switch (this.status) {
        case "0":
        case "pending":
          return {
            text: "Warning",
            color: "warning",
          };
        case "1":
        case "success":
          return {
            text: "Success",
            color: "success",
          };
        case "locked":
          return {
            text: "",
            color: "error",
            icon: "mdi-lock",
          };
        case "active":
          return {
            text: "",
            color: "",
          };
        case "2":
        case "failed":
        default:
          return {
            text: "Failed",
            color: "error",
          };
      }
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep {
  .v-badge__badge {
    inset: auto auto calc(100% - 6px) 0 !important;
  }
}
</style>
