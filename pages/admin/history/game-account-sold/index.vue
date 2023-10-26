<template>
  <NavAdmin
    title="Game Accoutn Solds"
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
            module="admin/histories/game_account_sold"
            repository="adminGameAccountSold"
            :columns="columns"
            :store="{
              state: 'queryGameAccountSolds',
              module: 'admin.histories.game_account_sold',
              action: 'fetchGameAccountSolds',
            }"
          >
            <template #action="props">
              <v-btn light icon @click="showModal(props.row)">
                <v-icon>mdi-pencil-box-multiple-outline</v-icon>
              </v-btn>
            </template>
          </AdminBaseTable>
        </v-col>
      </v-row>
      <FormModal
        ref="modal"
        :title="'ID: ' + format_number(queryGameAccountSold.idnick)"
        :id="queryGameAccountSold.ID"
        height="500px"
        module="admin/histories/game_account_sold"
        repository="adminGameAccountSold"
        :store="{
          state: 'queryGameAccountSold',
          module: 'admin.histories.game_account_sold',
          form: 'formAccountSold',
          // action: 'fetchGameAccountSold',
          update: 'updateGameAccountSold',
        }"
        @updated="fetchData()"
      />
    </template>
  </NavAdmin>
</template>

<script>
import { mapFields } from "vuex-map-fields";
import NavAdmin from "@/components/pages/admin/layout/NavAdmin";
import AdminBaseTable from "@/components/pages/admin/base/AdminBaseTable";
import FormModal from "@/components/pages/admin/base/modal/FormModal";

export default {
  layout: "adminDev",
  components: {
    NavAdmin,
    AdminBaseTable,
    FormModal,
  },
  name: "AdminSoldNinjas",
  data() {
    return {
      columns: [
        {
          key: "ID",
          label: "ID",
          attributes: {
            align: "center",
          },
        },
        {
          key: "action",
          label: "Actions",
          type: "actions",
          attributes: {
            minWidth: "120",
          },
        },
        {
          key: "taikhoan",
          label: "Account",
        },
        {
          key: "giatien",
          label: "Price",
          type: "number",
        },
        {
          key: "idnick",
          label: "ID Nick",
          type: "number",
        },
        {
          key: "type",
          label: "Game",
        },
        {
          key: "name",
          label: "User",
        },
        {
          key: "uid",
          label: "UID",
        },
      ],
    };
  },
  computed: {
    ...mapFields("admin/histories/game_account_sold", {
      queryGameAccountSold: "queryGameAccountSold",
    }),
  },
  async mounted() {},
  methods: {
    showModal(row) {
      this.$refs.modal.dialog = true;
      this.queryGameAccountSold = row;
    },
    fetchData() {
      this.$refs.table.fetchData();
    },
  },
};
</script>

</style>