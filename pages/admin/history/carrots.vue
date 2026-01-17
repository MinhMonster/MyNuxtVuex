<template>
  <AdminIndex
    ref="table"
    title="Carrot Transections"
    module="admin/histories/carrots"
    :actions="actions"
  />
</template>

<script>
import AdminIndex from "@/components/base/AdminIndex";

export default {
  layout: "adminDev",
  name: "CarotTransactions",
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
