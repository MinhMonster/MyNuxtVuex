<template>
  <AdminIndex
    ref="table"
    title="Users"
    module="admin/users"
    :actions="actions"
    :modal-configs="modalConfigs"
  />
</template>

<script>
import AdminIndex from "@/components/base/AdminIndex";

export default {
  name: "Users",
  layout: "adminDev",
  components: { AdminIndex },
  data() {
    return {
      actions: [
        {
          type: "update",
          label: "Update Info",
          icon: "mdi-lead-pencil",
          color: "blue",
          modal: true,
        },
        {
          type: "updateCash",
          label: "Update Cash",
          icon: "mdi-cash",
          color: "blue",
          modal: true,
        },
        {
          type: "updateStatus",
          label: "Lock",
          method: "updateStatus",
          payload: { status: "locked" },
          icon: "mdi-lock",
          color: "red",
          condition: (row) => row.status === "active",
        },
        {
          type: "updateStatus",
          label: "Unlock",
          method: "updateStatus",
          payload: { status: "unlocked" },
          icon: "mdi-lock-open",
          color: "blue",
          condition: (row) => row.status === "locked",
        },
      ],
      modalConfigs: {
        update: { store: { modify: "update" } },
        updateCash: {
          store: { formItem: "formItemCash", modify: "updateCash" },
        },
      },
    };
  },
};
</script>
