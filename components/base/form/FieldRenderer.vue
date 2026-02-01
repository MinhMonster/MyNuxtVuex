<template>
  <component
    :is="component"
    v-model="modelValue"
    :form="form"
    :name="name"
    :dataForm="dataForm"
    @updated="emitUpdate"
  />
</template>

<script>
import TextField from "@/components/fields/TextField.vue";
import SelectField from "@/components/fields/SelectField.vue";
import CashField from "@/components/fields/CashField.vue";

const FIELD_MAP = {
  text: TextField,
  number: TextField,
  select: SelectField,
  cash: CashField,
};

export default {
  name: "FieldRenderer",

  props: {
    form: { type: Object, required: true },
    name: { type: String, required: true },
    dataForm: { type: Object, required: true },
  },

  computed: {
    component() {
      return (
        this.form.component ||
        FIELD_MAP[this.form.type] ||
        TextField
      );
    },

    modelValue: {
      get() {
        return this.dataForm?.[this.name] ?? this.form.default ?? "";
      },
      set(val) {
        this.$set(this.dataForm, this.name, val);
      },
    },
  },

  methods: {
    emitUpdate(payload) {
      this.$emit("updated", {
        name: this.name,
        value: this.modelValue,
        form: this.form,
        dataForm: this.dataForm,
        ...payload,
      });
    },
  },
};
</script>
