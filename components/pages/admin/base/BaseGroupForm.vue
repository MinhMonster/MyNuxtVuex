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
      <form-validator v-if="form.value" :name="form.value">
        <BaseInput
          v-if="form.type === 'cash'"
          :name="form.value"
          v-model="dataForm[form.value]"
          :label="form.title"
          :disabled="form.disabled || (is_create && form.value === 'ID')"
          @change="onChange"
        />
        <v-text-field
          v-if="form.type === 'number' || form.type === 'text'"
          :name="form.value"
          v-model="dataForm[form.value]"
          :type="form.type"
          :label="form.title"
          :disabled="form.disabled || (is_create && form.value === 'ID')"
          @change="updateForm()"
        ></v-text-field>
        <v-select
          v-if="form.type === 'select-options'"
          v-model="dataForm[form.value]"
          density="compact"
          :label="form.title"
          :placeholder="form.placeholder"
          :items="form.options"
          @change="updateForm()"
        ></v-select>
        <ContentEditer
          v-if="form.type === 'content-editer'"
          :name="form.value"
          v-model="dataForm[form.value]"
          :label="form.title"
          :disabled="form.disabled"
          @input="updateForm()"
        ></ContentEditer>
      </form-validator>
    </v-col>
  </v-row>
</template>
<script>
import FormValidator from "@/components/pages/admin/Shared/form/FormValidator";
import ContentEditer from "@/components/pages/admin/Shared/nuxt-editor/CkEditorNuxt.vue";
import BaseInput from "@/components/pages/admin/base/BaseInput";

export default {
  components: {
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
    max-height: 200px !important;
  }
}
</style>