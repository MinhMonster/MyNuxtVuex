<template>
  <v-badge
    :color="setStatus.color"
    :content="setStatus.text"
    class="pointer"
  ></v-badge>
</template>

<script>

export default {
  components: {},
  name: "StatusDeposit",
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
        case "pending":
          return {
            text: "Pending",
            color: "warning",
          };
        case "success":
          return {
            text: "Success",
            color: "success",
          };
        case "failed":
          return {
            text: "Failed",
            color: "error",
          };
      }
    },
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
::v-deep {
  .v-badge__badge {
    inset: auto auto calc(100% - 6px) 0 !important;
  }
}
</style>
