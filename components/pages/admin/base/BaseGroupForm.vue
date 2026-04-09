<template>
  <v-row class="bg-editor bg-account row" justify="center">
    <v-col
      v-for="(form, index) in processedForms"
      :key="index"
      v-bind="form.layout"
      class="code-title"
    >
      <div v-if="form.type === 'blank'" />

      <v-row v-else-if="form.type === 'forms'">
        <v-col
          v-for="(subForm, subIndex) in processForms(form.forms)"
          :key="subIndex"
          v-bind="subForm.layout"
          class="code-title"
        >
          <GroupForm
            :form="subForm"
            :index="subIndex"
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
    isCreate() {
      return this.$route.path.includes("/new");
    },

    processedForms() {
      return this.processForms(this.forms);
    },
  },

  methods: {
    processForms(forms = []) {
      return forms.filter(this.shouldRenderForm).map(this.normalizeLayout);
    },

    shouldRenderForm(form) {
      if (this.isTablet && form.cols === 0) {
        return false;
      }

      if (form.type === "blank") {
        return true;
      }

      return this.evaluateCondition(form.condition);
    },

    evaluateCondition(condition) {
      if (!condition) return true;

      if (typeof condition === "boolean") {
        return condition;
      }

      if (condition.and) {
        return condition.and.every((item) => this.evaluateCondition(item));
      }

      if (condition.or) {
        return condition.or.some((item) => this.evaluateCondition(item));
      }

      if (condition.not) {
        return !this.evaluateCondition(condition.not);
      }

      const fieldValue = this.dataForm?.[condition.field];

      switch (condition.operator) {
        case "truthy":
          return !!fieldValue;

        case "falsy":
          return !fieldValue;

        case "equals":
          return fieldValue === condition.value;

        case "not_equals":
          return fieldValue !== condition.value;

        case "in":
          return (
            Array.isArray(condition.value) &&
            condition.value.includes(fieldValue)
          );

        case "not_in":
          return (
            Array.isArray(condition.value) &&
            !condition.value.includes(fieldValue)
          );

        case "includes":
          return (
            Array.isArray(fieldValue) && fieldValue.includes(condition.value)
          );

        case "gt":
          return fieldValue > condition.value;

        case "gte":
          return fieldValue >= condition.value;

        case "lt":
          return fieldValue < condition.value;

        case "lte":
          return fieldValue <= condition.value;

        default:
          return true;
      }
    },

    normalizeLayout(form) {
      return {
        ...form,
        layout: {
          cols: form.cols ?? 6,
          md: form.md ?? 3,
        },
      };
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
