<template>
  <AdminIndex
    ref="table"
    title="Game Account Solds"
    module="admin/histories/gameAccountSolds"
    :actions="actions"
    :modal-configs="modalConfigs"
  />
</template>

<script>
import AdminIndex from "@/components/base/AdminIndex";

export default {
  name: "AdminSoldNinjas",
  layout: "adminDev",
  components: { AdminIndex },

  data() {
    return {
      actions: [
        {
          type: "updateAccount",
          label: "Update Account",
          icon: "mdi-lead-pencil",
          color: "blue",
          modal: true,
        },
        {
          type: "updatePrice",
          label: "Update History",
          icon: "mdi-cash",
          color: "blue",
          modal: true,
        },
        {
          type: "onDelete",
          label: "Delete",
          icon: "mdi-delete",
          color: "red",
          danger: true,
        },
      ],
      modalConfigs: {
        updateAccount: {
          key: "account",
          merge: [{ history_id: "id" }],
          store: { formItem: "formAccount", modify: "updateAccount" },
          style: { minHeight: "280px", width: "400px" },
        },
        updatePrice: {
          store: { formItem: "formPriceItem", modify: "update" },
          style: { minHeight: "65vh", maxHeight: "80vh", width: "800px" },
        },
      },
    };
  },
};
</script>
