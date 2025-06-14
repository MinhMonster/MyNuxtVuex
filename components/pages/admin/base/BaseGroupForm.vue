<template>
  <v-row class="bg-editor bg-account row" justify="center">
    <v-col
      v-for="(form, index) in forms"
      :key="index"
      :cols="form.cols ? form.cols : 6"
      :sm="form.sm ? form.sm : 4"
      :md="form.md ? form.md : 3"
      :lg="form.lg ? form.lg : 2"
      class="code-title"
    >
      <v-row v-if="form.type == 'forms'">
        <v-col
          v-for="(formItem, indexFormItem) in form.forms"
          :key="indexFormItem"
          :cols="formItem.cols ? formItem.cols : 6"
          :sm="formItem.sm ? formItem.sm : 4"
          :md="formItem.md ? formItem.md : 3"
          :lg="formItem.lg ? formItem.lg : 2"
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
  components: {
    GroupForm,
    FormValidator,
    ContentEditer,
    BaseInput,
  },
  name: "BaseGroupForm",
  props: {
    dataForm: {
      type: Object,
      default: () => {
        return {};
      },
      require: true,
    },
    forms: {
      type: Array,
      default: () => {
        return [];
      },
      require: true,
    },
  },
  data() {
    return {};
  },
  computed: {
    is_create() {
      const path = this.$route.path;
      return path.includes("/new");
    },
  },
  async mounted() {},
  methods: {
    onChange(name, value) {
      this.dataForm[name] = value;
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
</style>
