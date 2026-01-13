<template>
  <v-dialog v-model="dialog" scrollable :max-width="width" light>
    <v-card v-if="stateQuery">
      <v-card-title class="title-modal center">
        {{ title }} <br />
        {{ subTitle }}
      </v-card-title>
      <v-card-text
        :style="{ 'min-height': minHeight, 'max-height': maxHeight }"
      >
        <div class="modal-body">
          <form v-if="isForm" @submit.prevent="onModify()">
            <BaseGroupForm
              :data-form="dataForm"
              :forms="stateForms"
              @updated="updateForm"
            />
            <v-btn
              v-show="false"
              type="submit"
              color="primary"
              class="text-white"
            >
            </v-btn>
          </form>
          <slot v-else name="show"></slot>
        </div>
      </v-card-text>
      <v-card-actions class="text-right right gap-10">
        <div class="text-right right w-100">
          <v-btn color="red" class="text-white" @click="dialog = false">
            Close
          </v-btn>
          <v-btn
            v-if="isForm"
            type="submit"
            color="primary"
            class="text-white"
            @click="onModify()"
          >
            Submit
          </v-btn>
          <v-btn v-if="isShow" color="primary" class="text-white left">
            <v-icon v-if="isForm" @click="isForm = false" title="Display">
              mdi-eye
            </v-icon>
            <v-icon v-else @click="isForm = true" title="Edit">
              mdi-pen
            </v-icon>
          </v-btn>
          <slot name="btn-footer"></slot>
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import BaseGroupForm from "@/components/pages/admin/base/BaseGroupForm.vue";
import adminCrud from "@/mixins/adminCrud";

export default {
  mixins: [adminCrud],
  components: { BaseGroupForm },
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
      isForm: true,
    };
  },
  mounted() {},
  methods: {
    show() {
      this.dialog = true;
      if (this.isShow) {
        this.isForm = false;
      }
      if (this.reset) {
        this.resetDataForm();
      }
    },
  },
};
</script>
<style lang="scss" scoped>
form {
  padding: 0px;
  background: #ffffff;
}

::v-deep {
  .form-group {
    margin-bottom: 0 !important;
  }
}

.v-card.v-sheet.theme--dark {
  border: 1px solid #a4a4a4;
}
</style>
