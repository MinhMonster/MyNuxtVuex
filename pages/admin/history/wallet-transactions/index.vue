<template>
  <AdminIndex
    ref="table"
    title="Wallet Transactions"
    module="admin/histories/walletTransactions"
  >
  </AdminIndex>
</template>

<script>
import AdminIndex from "@/components/base/AdminIndex";

export default {
  layout: "adminDev",
  name: "WalletTransactions",
  components: { AdminIndex },
};
</script>
