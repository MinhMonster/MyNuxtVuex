<template>
  <NavAdmin
    :title="title"
    goBack
    next-page
    :new-page="newPage"
    filter
    @newPage="$router.push(path + '/new')"
    reload
    @reload="fetchDataIndex()"
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
        <template #thumbnail="{ row }">
          <slot name="actions" :row="row">
            <div class="d-flex align-items-start" :title="row.fileName">
              <ViewImage
                :image="row.thumbnail"
                class="mr-2 border d-flex align-items-end justify-content-end"
              />
            </div>
          </slot>
        </template>
        <template #status="{ row }">
          <StatusBtn :status="row.status" />
        </template>
        <template #amount="{ row }">
          <div v-if="row.direction === 'out'" class="text-danger">
            - {{ format_number(row.amount) }}
          </div>
          <div v-else-if="row.direction === 'in'" class="text-success">
            + {{ format_number(row.amount) }}
          </div>
          <div v-else>
            {{ format_number(row.amount) }}
          </div>
        </template>
        <template #user="{ row }">
          <div class="text-primary cursor-pointer" @click="showUser(row)">
            {{ row.user.name }}
          </div>
        </template>
        <template #is_active="{ row }">
          <BaseCheckBox :value="row.is_active" @change="onActive(row.id)" />
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
        @updated="fetchDataIndex()"
      />

      <ActionsModal
        v-if="actions.length"
        v-model="actionItem"
        :actions="actions"
        @action="handleAction"
      />
      <UserInfo ref="modalUser" :user="user" />
      <slot></slot>
    </template>
  </NavAdmin>
</template>

<script>
import NavAdmin from "@/components/pages/admin/layout/NavAdmin";
import AdminBaseTable from "@/components/pages/admin/base/AdminBaseTable";
import FormModal from "@/components/pages/admin/base/modal/FormModal";
import ActionsModal from "@/components/base/ActionsModal";
import UserInfo from "@/components/pages/admin/users/UserInfo";
import StatusBtn from "@/components/common/client/button/StatusBtn";
import BaseCheckBox from "@/components/pages/admin/base/form/BaseCheckBox";
import ViewImage from "@/components/global/molecules/media/ViewImage";

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
    UserInfo,
    StatusBtn,
    BaseCheckBox,
    ViewImage,
  },
  data() {
    return {
      currentAction: null,
      actionItem: null,
      user: {},
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
    fetchDataIndex() {
      this.$refs.table.fetchDataIndex();
    },
    async showModal(payload) {
      await this.updateStateQueryItem(payload);
      this.$nextTick(() => {
        this.$refs.modal && (this.$refs.modal.dialog = true);
      });
    },

    openActions(row) {
      this.actionItem = row;
    },

    mergeModalData(formData, item, mergeConfig = []) {
      const merged = { ...formData };

      mergeConfig.forEach((map) => {
        Object.entries(map).forEach(([targetKey, sourceKey]) => {
          merged[targetKey] = item?.[sourceKey];
        });
      });

      return merged;
    },

    async handleAction({ action, item }) {
      this.currentAction = action;

      if (action.method) {
        const payload = {
          id: item.id,
          ...action.payload,
        };

        await this.updateStateQueryItem(payload);
        await this.executeAction(action.method);
        this.fetchDataIndex();
        return;
      }

      if (action.type === "onDelete") {
        this.onDelete(item.id, action.label);
        return;
      }

      if (action.modal) {
        const config = this.modalConfigs[action.type];
        let payload = config?.key ? item[config.key] : item;
        if (!payload) {
          this.showSwal({
            title: "Dữ liệu lỗi!",
            text: "Vui lòng kiểm tra lại!",
            type: "error",
            confirmButtonText: "OK",
          });
          return;
        }

        if (config?.merge) {
          payload = this.mergeModalData(payload, item, config.merge || []);
        }

        this.showModal(payload);
        return;
      }

      this.$emit("action", { action, item });
    },
    showUser(row) {
      this.user = row.user;
      this.$refs.modalUser.show();
    },
  },
};
</script>
<style></style>
