<template>
  <NavAdmin
    title="Wallet Transactions"
    goBack
    next-page
    filter
    reload
    @reload="fetchData()"
  >
    <template #body>
      <v-row>
        <v-col cols="12" md="12" sm="12">
          <AdminBaseTable
            ref="table"
            module="admin/histories/walletTransactions"
            :store="{
              state: 'queryWalletTransactions',
              action: 'fetchWalletTransactions',
            }"
          >
            <template #amount="props">
              <div v-if="props.row.direction === 'decrease'" class="text-danger">
                - {{ format_number(props.row.amount) }}
              </div>
              <div v-else class="text-success">
                + {{ format_number(props.row.amount) }}
              </div>
            </template>
            <template #user="props">
              <div
                class="text-primary cursor-pointer"
                @click="showUser(props.row)"
              >
                {{ props.row.user.name }}
              </div>
            </template>
          </AdminBaseTable>
        </v-col>
      </v-row>
      <UserInfo ref="modalUser" :user="user" />
      <FormConfirm ref="modal" :record="selected" @confirmed="fetchData()" />
    </template>
  </NavAdmin>
</template>

<script>
import NavAdmin from "@/components/pages/admin/layout/NavAdmin";
import AdminBaseTable from "@/components/pages/admin/base/AdminBaseTable";
import FormConfirm from "@/components/pages/admin/histories/bank-deposits/FormConfirm";
import StatusDeposit from "@/components/pages/admin/histories/bank-deposits/StatusDeposit";
import UserInfo from "@/components/pages/admin/users/UserInfo";

export default {
  layout: "adminDev",
  components: {
    NavAdmin,
    AdminBaseTable,
    FormConfirm,
    StatusDeposit,
    UserInfo,
  },
  name: "Avatars",
  computed: {},
  data() {
    return {
      selected: {},
      user: {},
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
    showUser(row) {
      this.user = row.user;
      this.$refs.modalUser.show();
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
