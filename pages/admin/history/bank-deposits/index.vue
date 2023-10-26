<template>
  <NavAdmin
    title="Bank Deposits"
    goBack
    next-page
    new-page
    filter
    @newPage="$router.push('/admin/game/avatars/new')"
    reload
    @reload="fetchData()"
  >
    <template #body>
      <v-row>
        <v-col cols="12" md="12" sm="12">
          <!-- <v-card> -->
          <AdminBaseTable
            ref="table"
            module="admin/histories/bank_deposits"
            repository="adminBankDeposits"
            :columns="columns"
            :store="{
              state: 'queryBankDeposits',
              module: 'admin.histories.bank_deposits',
              action: 'fetchBankDeposits',
            }"
          >
            <template #actions="props">
              <div @click="confirm(props.row)">
                <StatusDeposit :status="props.row.status" />
              </div>
            </template>
          </AdminBaseTable>
          <!-- </v-card> -->
        </v-col>
      </v-row>
      <FormConfirm ref="modal" :record="selected" @confirmed="fetchData()" />
    </template>
  </NavAdmin>
</template>

<script>
import { mapFields } from "vuex-map-fields";

import NavAdmin from "@/components/pages/admin/layout/NavAdmin";
import AdminBaseTable from "@/components/pages/admin/base/AdminBaseTable";
import FormConfirm from "@/components/pages/admin/histories/bank-deposits/FormConfirm";
import StatusDeposit from "@/components/pages/admin/histories/bank-deposits/StatusDeposit";

export default {
  layout: "adminDev",
  components: {
    NavAdmin,
    AdminBaseTable,
    FormConfirm,
    StatusDeposit,
  },
  name: "Avatars",
  data() {
    return {
      selected: {},
      columns: [
        {
          key: "id",
          label: "ID",
          type: "number",
          attributes: {
            align: "center",
            style: {
              width: "100px",
            },
          },
        },
        {
          key: "actions",
          label: "Actions",
          type: "actions",
          attributes: {
            style: {
              width: "100px",
            },
          },
        },
        {
          key: "sotien",
          label: "Money",
          type: "number",
          attributes: {
            style: {
              width: "120px",
            },
          },
        },
        {
          key: "tiennhan",
          label: "Change",
          type: "number",
          attributes: {
            style: {
              width: "120px",
            },
          },
        },
        {
          key: "hinhthuc",
          label: "Type",
          attributes: {
            style: {
              width: "100px",
            },
          },
        },
        {
          key: "id_nap",
          label: "ID User",
          attributes: {
            style: {
              width: "100px",
            },
          },
        },
        {
          key: "name",
          label: "User",
          attributes: {
            style: {
              width: "150px",
            },
          },
        },
        {
          key: "nguoinap",
          label: "Name",
          attributes: {
            style: {
              width: "100px",
            },
          },
        },
        {
          key: "stk",
          label: "Card NUmber",
          attributes: {
            style: {
              width: "100px",
            },
          },
        },
        {
          key: "time",
          label: "Time",
          attributes: {
            style: {
              width: "150px",
            },
          },
        },
      ],
    };
  },
  methods: {
    fetchData() {
      this.$refs.table.fetchData();
    },
    confirm(row) {
      this.selected = row;
      this.$refs.modal.dialog = true;
    },
  },
};
</script>
<style lang="scss" scoped>
</style>