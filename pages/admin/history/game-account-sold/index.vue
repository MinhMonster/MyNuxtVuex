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
          condition: (row) =>
            row.status === "completed" ||
            (row.account_type !== "dragon_ball" &&
              row.status === "installment_first"),
        },
        {
          type: "updatePrice",
          label: "Update History",
          icon: "mdi-cash",
          color: "blue",
          modal: true,
        },
        {
          type: "updateStatus",
          label: "Complete",
          method: "updateStatus",
          payload: { status: "completed" },
          icon: "mdi-check-circle-outline",
          color: "green",
          condition: (row) => row.status !== "completed",
        },
        {
          label: "Cancel",
          method: "updateStatus",
          payload: { status: "cancelled" },
          icon: "mdi-close-circle-outline",
          color: "red",
          condition: (row) =>
            row.status !== "cancelled" && row.status !== "cancelled_refunded",
        },
        {
          label: "Cancel & Refund",
          method: "cancelAndRefund",
          icon: "mdi-cash-refund",
          color: "red",
          condition: (row) =>
            row.type !== "normal" &&
            row.status !== "cancelled_refunded" &&
            row.status !== "completed",
        },
        {
          type: "onDelete",
          label: "Delete",
          icon: "mdi-delete",
          color: "red",
          danger: true,
          condition: (row) => !row.deleted_at,
        },
        {
          type: "onRestore",
          label: "Restore",
          icon: "mdi-restore",
          color: "blue",
          condition: (row) => row.deleted_at,
        },
      ],
      modalConfigs: {
        updateAccount: {
          key: "account",
          merge: [{ history_id: "id" }, { history_status: "status" }],
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
