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
    value: {
      type: [String, Number],
      default: "0",
    },
    type: {
      type: String,
      default: "status",
    },
  },
  async mounted() {},
  computed: {
    setStatus() {
      switch (this.type) {
        case "status":
          return this.getStatus();
        case "type":
          return this.getType();
        default:
          return {
            text: this.value,
            color: "",
          };
      }
    },
  },
  methods: {
    getStatus() {
      switch (this.value) {
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
        case "completed":
          return {
            text: "Completed",
            color: "success",
          };
        case "cancelled":
          return {
            text: "Cancelled",
            color: "error",
          };
        case "installment_first":
          return {
            text: "Installment First",
            color: "orange",
          };
        case "deposit":
          return {
            text: "Deposit",
            color: "warning",
          };
        case "cancelled_refund_pending":
          return {
            text: "Cancelled & Refund Pending",
            color: "error",
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
    getType() {
      switch (this.value) {
        case "normal":
          return {
            text: "Normal",
            color: "success",
          };
        case "deposit":
          return {
            text: "Deposit",
            color: "warning",
          };
        case "installments":
          return {
            text: "Installments",
            color: "orange",
          };
        default:
          return {
            text: this.value,
            color: "",
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
