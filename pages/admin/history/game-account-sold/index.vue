<template>
  <NavAdmin
    title="Game Account Solds"
    goBack
    next-page
    filter
    reload
    @reload="fetchData"
  >
    <template #body>
      <v-row>
        <v-col cols="12">
          <AdminBaseTable
            ref="table"
            module="admin/histories/gameAccountSolds"
            :store="{
              state: 'queryGameAccountSolds',
              action: 'fetchGameAccountSolds',
            }"
          >
            <template #action="{ row }">
              <v-btn light icon @click="openActions(row)">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
          </AdminBaseTable>
        </v-col>
      </v-row>

      <!-- ACTION MODAL -->
      <ActionsModal
        v-model="actionItem"
        :actions="ACTIONS"
        @action="handleAction"
      />

      <!-- FORM MODAL -->
      <FormModal
        ref="modal"
        v-if="history"
        :title="`History ID: ${history.id}`"
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
      actionItem: null,
      history: null,
      update: "account",
      ACTIONS: [
        {
          type: "updateInfo",
          label: "Update Account",
          icon: "mdi-lead-pencil",
          color: "blue",
        },
        {
          type: "updatePrice",
          label: "Update History",
          icon: "mdi-cash",
          color: "blue",
        },
        {
          type: "onDelete",
          label: "Delete",
          icon: "mdi-delete",
          color: "red",
          danger: true,
        },
      ],
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

    openActions(row) {
      this.actionItem = row;
    },

    handleAction({ type, item }) {
      if (type === "updateInfo") {
        this.openForm("account", item.account);
        return;
      }

      if (type === "updatePrice") {
        this.openForm("history", item);
        return;
      }

      if (type === "onDelete") {
        this.onDelete(item);
      }
    },

    openForm(type, payload) {
      this.update = type;
      this.history = payload;
      this[this.formConfig.state] = payload;
      this.$nextTick(() => {
        this.$refs.modal.open?.() || this.$refs.modal.show();
      });
    },

    async onDelete(item) {
      const result = await this.$swal.fire({
        title: `Delete History ID: ${item.id}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Accept",
        cancelButtonText: "Cancel",
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

