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
            module="admin/histories/carots"
            repository="adminCarots"
            :columns="columns"
            :store="{
              state: 'queryCarots',
              module: 'admin.histories.carots',
              action: 'fetchCarots',
            }"
          >
            <template #status="props">
              <div @click="confirm(props.row)">
                <StatusBtn :status="props.row.status" />
              </div>
            </template>
            <template #action="props">
              <v-btn light icon @click="showActions(props.row)">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
          </AdminBaseTable>
          <!-- </v-card> -->
        </v-col>
      </v-row>
      <ActionsModal
        ref="modalActions"
        :item="history"
        @updateStatus="updateStatus"
        @onDelete="onDelete"
      ></ActionsModal>
      <ModalUpdateStatus
        ref="modal"
        :record="selected"
        @confirmed="fetchData()"
      />
    </template>
  </NavAdmin>
</template>

<script>
import { mapFields } from "vuex-map-fields";

import NavAdmin from "@/components/pages/admin/layout/NavAdmin";
import AdminBaseTable from "@/components/pages/admin/base/AdminBaseTable";
import ModalUpdateStatus from "@/components/pages/admin/histories/carots/ModalUpdateStatus";
import StatusBtn from "@/components/common/client/button/StatusBtn";
import ActionsModal from "@/components/pages/admin/histories/carots/ActionsModal";

export default {
  layout: "adminDev",
  components: {
    NavAdmin,
    AdminBaseTable,
    ModalUpdateStatus,
    StatusBtn,
    ActionsModal,
  },
  name: "Carots",
  data() {
    return {
      selected: {},
      columns: [
        {
          key: "id",
          label: "ID",
          type: "number",
          fixed: "left",
          attributes: {
            align: "center",
            style: {
              minWidth: "50px",
            },
          },
        },
        {
          key: "status",
          label: "Status",
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
          key: "price",
          label: "Price",
          type: "number",
          attributes: {
            style: {
              minWidth: "100px",
            },
          },
        },
        {
          key: "game_type",
          label: "Game",
          attributes: {
            style: {
              minWidth: "80px",
            },
          },
        },
        {
          key: "username",
          label: "Username",
          attributes: {
            style: {
              minWidth: "100px",
            },
          },
        },
        {
          key: "server",
          label: "Server",
          attributes: {
            style: {
              minWidth: "50px",
            },
          },
        },
        {
          key: "uid",
          label: "ID User",
          attributes: {
            style: {
              minWidth: "100px",
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
    };
  },
  methods: {
    fetchData() {
      this.$refs.table.fetchData();
    },
    updateStatus(row) {
      this.selected = row;
      this.$refs.modal.dialog = true;
    },
    async showActions(history) {
      this.history = history;
      this.$refs.modalActions.show();
    },
    async onDelete(history) {
      this.$swal
        .fire({
          title: `Delete ID: ${history.id} ?`,
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
                  history.id
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
<style lang="scss" scoped>
</style>
