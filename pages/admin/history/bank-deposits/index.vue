<template>
  <AdminIndex
    ref="table"
    title="Bank Deposits"
    module="admin/histories/bankDeposits"
  >
    <template #actions="props">
      <div @click="confirm(props.row)">
        <StatusDeposit :status="props.row.status" />
      </div>
    </template>
    <template>
      <FormConfirm ref="modal" :record="selected" @confirmed="$refs.table.fetchDataIndex()" />
    </template>
  </AdminIndex>
</template>

<script>
import AdminIndex from "@/components/base/AdminIndex";
import FormConfirm from "@/components/pages/admin/histories/bank-deposits/FormConfirm";
import StatusDeposit from "@/components/pages/admin/histories/bank-deposits/StatusDeposit";

export default {
  layout: "adminDev",
  name: "BankDeposits",
  components: { AdminIndex, FormConfirm, StatusDeposit },
  data() {
    return {
      selected: {},
    };
  },
  methods: {
    confirm(row) {
      this.selected = row;
      this.$refs.modal.dialog = true;
    },
  },
};
</script>
