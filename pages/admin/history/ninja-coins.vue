<template>
  <AdminIndex
    ref="table"
    title="Ninja Coin Transections"
    module="admin/histories/ninjaCoins"
    :actions="actions"
  />
</template>

<script>
import AdminIndex from "@/components/base/AdminIndex";

export default {
  layout: "adminDev",
  name: "NinjaCoinTransactions",
  components: { AdminIndex},
  data() {
    return {
      selected: {},
      actions: [
        {
          type: "updateStatus",
          label: "Confirm",
          method: "updateStatus",
          payload: { status: "confirmed" },
          icon: "mdi-check",
          color: "blue",
        },
        {
          type: "updateStatus",
          label: "Cancel",
          method: "updateStatus",
          payload: { status: "cancelled" },
          icon: "mdi-close",
          color: "red",
        },
      ],
    };
  },
  methods: {
  },
};
</script>
