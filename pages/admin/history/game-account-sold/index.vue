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
              <v-btn light icon @click="showActions(props.row)">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
          </AdminBaseTable>
        </v-col>
      </v-row>
      <FormModal
        ref="modal"
        :title="'ID: ' + format_number(queryGameAccountSold.idnick)"
        :id="queryGameAccountSold.ID"
        :min-height="update === 'info' ? '280px' : '100px'"
        module="admin/histories/game_account_sold"
        repository="adminGameAccountSold"
        :store="{
          state: 'queryGameAccountSold',
          module: 'admin.histories.game_account_sold',
          form: update === 'info' ? 'formAccountSold' : 'formAccountPrice',
          // action: 'fetchGameAccountSold',
          update: 'updateGameAccountSold',
        }"
        @updated="fetchData()"
      />
      <ActionsModal
        ref="modalActions"
        :item="history"
        @updateInfo="showUpdateInfo"
        @updatePrice="updatePrice"
        @onDelete="onDelete"
      ></ActionsModal>
    </template>
  </NavAdmin>
</template>

<script>
import { mapFields } from "vuex-map-fields";
import NavAdmin from "@/components/pages/admin/layout/NavAdmin";
import AdminBaseTable from "@/components/pages/admin/base/AdminBaseTable";
import FormModal from "@/components/pages/admin/base/modal/FormModal";
import ActionsModal from "@/components/pages/admin/histories/game_account_sold/ActionsModal";
export default {
  layout: "adminDev",
  components: {
    NavAdmin,
    AdminBaseTable,
    FormModal,
    ActionsModal,
  },
  name: "AdminSoldNinjas",
  data() {
    return {
      columns: [
        {
          key: "ID",
          label: "ID",
          attributes: {
            style: {
              width: "50px",
            },
          },
        },
        {
          key: "idnick",
          label: "ID Nick",
          type: "number",
          copy: true,
          attributes: {
            style: {
              minWidth: "100px",
            },
          },
        },
        {
          key: "taikhoan",
          label: "Account",
          copy: true,
          attributes: {
            style: {
              minWidth: "170px",
            },
          },
        },
        {
          key: "giatien",
          label: "Price",
          type: "number",
          attributes: {
            style: {
              minWidth: "120px",
            },
          },
        },
        {
          key: "gianhap",
          label: "Cost",
          type: "number",
          attributes: {
            style: {
              minWidth: "120px",
            },
          },
        },
        {
          key: "type",
          label: "Game",
          attributes: {
            style: {
              minWidth: "150px",
            },
          },
        },
        {
          key: "name",
          label: "User",
          attributes: {
            style: {
              minWidth: "150px",
            },
          },
        },
        {
          key: "uid",
          label: "UID",
        },
        {
          key: "time",
          label: "Time",
          attributes: {
            style: {
              minWidth: "150px",
            },
          },
        },
        {
          key: "action",
          label: "Actions",
          type: "actions",
          fixed: "right",
          attributes: {
            style: {
              minWidth: "30px",
            },
          },
        },
      ],
      history: null,
      isShowActions: false,
      update: "info",
    };
  },
  computed: {
    ...mapFields("admin/histories/game_account_sold", {
      queryGameAccountSold: "queryGameAccountSold",
    }),
  },
  async mounted() {},
  methods: {
    showUpdateInfo(row) {
      this.update = "info";
      this.$refs.modal.dialog = true;
      this.queryGameAccountSold = row;
    },
    updatePrice(row) {
      this.update = "price";
      this.$refs.modal.dialog = true;
      this.queryGameAccountSold = row;
    },
    fetchData() {
      this.$refs.table.fetchData();
    },
    async showActions(history) {
      this.history = history;
      this.$refs.modalActions.show();
    },
    async onDelete(history) {
      this.$swal
        .fire({
          title: `Delete ID: ${history.ID} ?`,
          text: "",
          icon: "question",
          type: "warning",
          showDenyButton: false,
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Accept",
          cancelButtonText: "Cancel",
          timer: 5000,
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            try {
              const res =
                await this.$repositories.adminGameAccountSold.destroyGameAccountSold(
                  history.ID
                );
              if (res.data.code === 200) {
                await this.$toasted.success(res.data.message);
                this.fetchData();
              }
            } catch (e) {
              console.log(e);
            }
          }
        });
    },
  },
};
</script>
