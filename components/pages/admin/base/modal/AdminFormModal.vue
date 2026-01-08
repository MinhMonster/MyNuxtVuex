<template>
  <ModalPayload
    v-if="stateQuery"
    ref="modal"
    width="100%"
    :max-width="width"
    :title="title"
    :isBtnClose="false"
  >
    <template #content>
      <AdminBaseForm
        v-if="isForm"
        ref="form"
        :id="id"
        :module="module"
        :repository="repository"
        :store="store"
      ></AdminBaseForm>
      <slot v-else name="show"></slot>
    </template>
    <template #footer-content>
      <div class="text-right right w-100">
        <v-btn color="red" class="text-white" @click="dialog = false">
          Close
        </v-btn>
        <v-btn
          v-if="isForm"
          type="submit"
          color="primary"
          class="text-white"
          @click="onUpdate()"
        >
          Submit
        </v-btn>
        <v-btn v-if="isShow" color="primary" class="text-white left">
          <v-icon v-if="isForm" @click="isForm = false" title="Display">
            mdi-eye
          </v-icon>
          <v-icon v-else @click="isForm = true" title="Edit"> mdi-pen </v-icon>
        </v-btn>
        <slot name="btn-footer"></slot>
      </div>
    </template>
  </ModalPayload>
</template>
<script>
import ModalPayload from "@/components/common/ModalPayload";

import BaseGroupForm from "@/components/pages/admin/base/BaseGroupForm.vue";
import BaseCheckBox from "@/components/pages/admin/base/form/BaseCheckBox";
import AdminBaseForm from "@/components/pages/admin/base/AdminBaseForm";

import { mapState } from "vuex";

export default {
  components: { ModalPayload, BaseGroupForm, BaseCheckBox, AdminBaseForm },
  props: {
    title: {
      type: String,
      default: "Title",
      require: false,
    },
    subTitle: {
      type: String,
      default: "",
      require: false,
    },
    id: {
      type: [String, Number],
      defualt: null,
      require: false,
    },
    store: {
      type: Object,
      default: () => {
        return {};
      },
      required: true,
    },
    module: {
      type: String,
      default: "",
      require: true,
    },
    repositories: {
      type: String,
      default: "repositories",
      require: false,
    },
    repository: {
      type: String,
      default: "",
      require: false,
    },
    minHeight: {
      type: String,
      default: "300px",
      require: false,
    },
    maxHeight: {
      type: String,
      default: "500px",
      require: false,
    },
    width: {
      type: String,
      default: "300px",
      require: false,
    },
    reset: Boolean,
    isShow: Boolean,
  },
  data() {
    return {
      dialog: false,
      cash: 0,
      isForm: true,
    };
  },
  computed: {},
  mounted() {},
  methods: {
    show() {
      this.$refs.modal.show();
      if (this.isShow) {
        this.isForm = false;
      }
      if (this.reset) {
        this.resetDataForm();
      }
    },
    close() {
      this.$refs.modal.close();
    },
    async onUpdate() {
      try {
        const result = await this.repositoryKey[this.repo][this.store.update]({
          id: this.id,
          input: this.stateQuery,
        });
        const data = result.data;
        // if (data.code === 200) {
        // this.$toasted.success(data.message);
        this.$emit("updated");

        // if (this.id !== data.response.ID) {
        //   this.$router.push(this.path.replace(this.id, data.response.ID));
        // }
        if (data.response) {
          this.updateState(data.response);
        }
        // }
      } catch (error) {}
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep {
  .tab-scroll {
    height: auto !important;
    min-height: 200px;
  }
}
</style>
