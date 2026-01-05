<template>
  <v-row class="bg-editor bg-account row" justify="center">
    <v-col
      v-for="(form, index) in visibleForms"
      :key="index"
      v-bind="form.layout"
      class="code-title"
    >
      <div v-if="form.type === 'blank'"></div>
      <v-row v-else-if="form.type === 'forms'">
        <v-col
          v-for="(formItem, indexFormItem) in visibleSubForms(form.forms)"
          :key="indexFormItem"
          v-bind="formItem.layout"
          class="code-title"
        >
          <GroupForm
            :form="formItem"
            :index="indexFormItem"
            :keyForm="form.value"
            :dataForm="dataForm"
            @updated="updateForm"
          />
        </v-col>
      </v-row>
      <GroupForm
        v-else
        :form="form"
        :dataForm="dataForm"
        @updated="updateForm"
      />
    </v-col>
  </v-row>
</template>

<script>
import GroupForm from "@/components/pages/admin/base/form/GroupForm";
import FormValidator from "@/components/pages/admin/Shared/form/FormValidator";
import ContentEditer from "@/components/pages/admin/Shared/nuxt-editor/CkEditorNuxt.vue";
import BaseInput from "@/components/pages/admin/base/BaseInput";

export default {
  name: "BaseGroupForm",
  components: {
    GroupForm,
    FormValidator,
    ContentEditer,
    BaseInput,
  },
  props: {
    dataForm: {
      type: Object,
      required: true,
      default: () => ({}),
    },
    forms: {
      type: Array,
      required: true,
      default: () => [],
    },
  },

  computed: {
    is_create() {
      return this.$route.path.includes("/new");
    },
    visibleForms() {
      return this.forms
        .filter((form) => (this.isTablet ? form.cols !== 0 : true))
        .map((form) => this.normalizeLayout(form));
    },
  },

  methods: {
    normalizeLayout(form) {
      return {
        ...form,
        layout: {
          cols: form.cols ?? 6,
          md: form.md ?? 3,
        },
      };
    },
    visibleSubForms(forms = []) {
      return forms
        .filter((form) => (this.isTablet ? form.cols !== 0 : true))
        .map((form) => this.normalizeLayout(form));
    },

    onChange(name, value) {
      this.$set(this.dataForm, name, value);
      this.updateForm();
    },
    updateForm() {
      this.$emit("updated", this.dataForm);
    },
  },
};
</script>

<style lang="scss" scoped>
.bg-editor ::v-deep {
  .ck.ck-content.ck-editor__editable.ck-rounded-corners {
    max-height: 500px !important;
  }

  .full-height
    + .ck.ck-reset.ck-editor.ck-rounded-corners
    .ck.ck-content.ck-editor__editable.ck-rounded-corners {
    height: 500px !important;
    max-height: 500px !important;
  }
}

::v-deep {
  @media (max-width: 768px) {
    .col-xl,
    .col-xl-auto,
    .col-xl-12,
    .col-xl-11,
    .col-xl-10,
    .col-xl-9,
    .col-xl-8,
    .col-xl-7,
    .col-xl-6,
    .col-xl-5,
    .col-xl-4,
    .col-xl-3,
    .col-xl-2,
    .col-xl-1,
    .col-lg,
    .col-lg-auto,
    .col-lg-12,
    .col-lg-11,
    .col-lg-10,
    .col-lg-9,
    .col-lg-8,
    .col-lg-7,
    .col-lg-6,
    .col-lg-5,
    .col-lg-4,
    .col-lg-3,
    .col-lg-2,
    .col-lg-1,
    .col-md,
    .col-md-auto,
    .col-md-12,
    .col-md-11,
    .col-md-10,
    .col-md-9,
    .col-md-8,
    .col-md-7,
    .col-md-6,
    .col-md-5,
    .col-md-4,
    .col-md-3,
    .col-md-2,
    .col-md-1,
    .col-sm,
    .col-sm-auto,
    .col-sm-12,
    .col-sm-11,
    .col-sm-10,
    .col-sm-9,
    .col-sm-8,
    .col-sm-7,
    .col-sm-6,
    .col-sm-5,
    .col-sm-4,
    .col-sm-3,
    .col-sm-2,
    .col-sm-1,
    .col,
    .col-auto,
    .col-12,
    .col-11,
    .col-10,
    .col-9,
    .col-8,
    .col-7,
    .col-6,
    .col-5,
    .col-4,
    .col-3,
    .col-2,
    .col-1 {
      padding: 4px !important;
    }

    #admin {
      .row {
        margin: 0 -4px !important;
      }
    }
  }
}
</style>
