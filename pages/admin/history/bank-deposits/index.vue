<template>
  <NavAdmin
    title="Bank Deposits"
    goBack
    next-page
    filter
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
            :repositories="repositories"
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
            <template #user="props">
              <div
                class="text-primary cursor-pointer"
                @click="showUser(props.row)"
              >
                {{ props.row.user.name }}
              </div>
            </template>
          </AdminBaseTable>
          <!-- </v-card> -->
        </v-col>
      </v-row>
      <UserInfo ref="modalUser" :user="user" />
      <FormConfirm ref="modal" :record="selected" @confirmed="fetchData()" />
    </template>
  </NavAdmin>
</template>

<script>
import { mapFields } from "vuex-map-fields";
import { mapState } from "vuex";
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
  computed: {
    ...mapState("admin/mms", ["repositories"]),
  },
  data() {
    return {
      selected: {},
      user: {},
      columns: [
        {
          key: "id",
          label: "ID",
          type: "number",
          attributes: {
            style: {
              minWidth: "50px",
            },
          },
        },
        {
          key: "actions",
          label: "Actions",
          type: "actions",
          attributes: {
            style: {
              minWidth: "80px",
            },
          },
        },
        {
          key: "amount",
          label: "Amount",
          type: "number",
          attributes: {
            style: {
              minWidth: "100px",
            },
          },
        },
        {
          key: "user",
          label: "User",
          attributes: {
            style: {
              minWidth: "100px",
            },
          },
        },
        {
          key: "transaction_at",
          label: "Time",
          attributes: {
            style: {
              minWidth: "100px",
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
    showUser(row) {
      this.user = row.user;
      this.$refs.modalUser.show();
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
