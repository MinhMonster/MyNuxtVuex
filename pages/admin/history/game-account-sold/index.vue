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
            module="admin/histories/gameAccountSolds"
            :store="{
              state: 'queryGameAccountSolds',
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
        v-if="history"
        :title="`History ID: ${format_number(history.id)}`"
        :id="history.id"
        :min-height="formConfig.minHeight"
        :width="formConfig.width"
        module="admin/histories/gameAccountSolds"
        :store="{
          state: formConfig.state,
          form: formConfig.form,
          update: formConfig.action,
        }"
        @updated="fetchData"
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

const UPDATE_CONFIG = {
  account: {
    state: "queryGameAccountSold",
    form: "formAccountSold",
    action: "updateAccount",
    minHeight: "280px",
    width: "400px",
  },
  history: {
    state: "queryPriceGameAccountSold",
    form: "formAccountPrice",
    action: "update",
    minHeight: "80vh",
    width: "800px",
  },
};

export default {
  name: "AdminSoldNinjas",
  layout: "adminDev",
  components: {
    NavAdmin,
    AdminBaseTable,
    FormModal,
    ActionsModal,
  },
  data() {
    return {
      history: null,
      update: "account",
    };
  },
  computed: {
    ...mapFields("admin/histories/gameAccountSolds", {
      queryGameAccountSold: "queryGameAccountSold",
      queryPriceGameAccountSold: "queryPriceGameAccountSold",
    }),

    formConfig() {
      return UPDATE_CONFIG[this.update];
    },
  },
  methods: {
    fetchData() {
      this.$refs.table?.fetchData();
    },

    showActions(history) {
      this.history = history;
      this.$refs.modalActions.show();
    },

    openModal(type, payload) {
      this.update = type;
      this[this.formConfig.state] = payload;
      this.$refs.modal.open?.() || this.$refs.modal.show();
    },

    showUpdateInfo(row) {
      this.openModal("account", row.account);
    },

    updatePrice(row) {
      this.openModal("history", row);
    },

    async onDelete(history) {
      const result = await this.$swal.fire({
        title: `Delete History ID: ${history.id} ?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Accept",
        cancelButtonText: "Cancel",
        timer: 5000,
      });

      if (!result.isConfirmed) return;
      try {
        const { data } =
          await this.$repositories.adminGameAccountSold.destroyGameAccountSold(
            history.id
          );
        this.$toasted.success(data.message);
        this.fetchData();
      } catch (err) {
        console.error(err);
      }
    },
  },
};
</script>
