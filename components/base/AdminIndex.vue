<template>
  <NavAdmin
    :title="title"
    goBack
    next-page
    :new-page="newPage"
    filter
    @newPage="$router.push(path + '/new')"
    reload
    @reload="$refs.table.fetchDataIndex()"
  >
    <template #body>
      <AdminBaseTable ref="table" :module="module">
        <template #id="{ row }">
          <nuxt-link
            v-if="isModify"
            class="flex"
            light
            :to="path + `/${row.id}`"
          >
            #{{ format_number(row.id) }}
          </nuxt-link>
        </template>
        <template #actions="{ row }">
          <slot name="actions" :row="row">
            <v-btn v-if="actions.length" light icon @click="openActions(row)">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </slot>
        </template>
      </AdminBaseTable>
      <FormModal
        v-if="stateQueryItem?.id"
        ref="modal"
        :width="modalConfig?.style?.width || '500px'"
        :minHeight="modalConfig?.style?.minHeight || '150px'"
        :title="modalTitle"
        :id="stateQueryItem.id"
        :module="module"
        :store="modalConfig?.store"
        @updated="$refs.table.fetchDataIndex()"
      />

      <ActionsModal
        v-if="actions.length"
        v-model="actionItem"
        :actions="actions"
        @action="handleAction"
      />
    </template>
  </NavAdmin>
</template>

<script>
import NavAdmin from "@/components/pages/admin/layout/NavAdmin";
import AdminBaseTable from "@/components/pages/admin/base/AdminBaseTable";
import FormModal from "@/components/pages/admin/base/modal/FormModal";
import ActionsModal from "@/components/base/ActionsModal";
import adminCrud from "@/mixins/adminCrud";

const DEFAULT_MODAL_CONFIG = {
  store: {
    queryItem: "queryItem",
    formItem: "formItemModal",
    modify: "modify",
  },
  style: {
    width: "500px",
    minHeight: "150px",
  },
};

export default {
  mixins: [adminCrud],
  components: {
    NavAdmin,
    AdminBaseTable,
    FormModal,
    ActionsModal,
  },
  data() {
    return {
      currentAction: null,
      actionItem: null,
    };
  },
  props: {
    title: {
      type: String,
      default: "Game List",
      required: true,
    },
    module: {
      type: String,
      required: true,
    },
    actions: {
      type: Array,
      default: () => [],
    },
    modalConfigs: {
      type: Object,
      default: () => ({}),
    },
    isModify: Boolean,
    newPage: Boolean,
  },
  computed: {
    modalConfig() {
      if (!this.currentAction) return DEFAULT_MODAL_CONFIG;
      return this.modalConfigs[this.currentAction.type] || DEFAULT_MODAL_CONFIG;
    },
    modalTitle() {
      const label = this.currentAction?.label || "Update";
      const id = this.stateQueryItem?.id;
      return id ? `${label} ID: ${this.format_number(id)}` : label;
    },
  },
  methods: {
    async showModal(payload) {
      await this.updateStateQueryItem(payload);
      this.$nextTick(() => {
        this.$refs.modal && (this.$refs.modal.dialog = true);
      });
    },

    openActions(row) {
      this.actionItem = row;
    },

    handleAction({ action, item }) {
      this.currentAction = action;

      if (action.type === "onDelete") {
        this.onDelete(item.id);
        return;
      }

      if (action.modal) {
        const config = this.modalConfigs[action.type];
        const payload = config?.key ? item[config.key] : item;
        if (!payload) {
          this.showSwal({
            title: "Dữ liệu lỗi!",
            text: "Vui lòng kiểm tra lại!",
            type: "error",
            confirmButtonText: "OK",
          });
          return;
        }
        this.showModal(payload);
        return;
      }

      this.$emit("action", { action, item });
    },
  },
};
</script>
<style></style>
