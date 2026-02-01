<template>
  <form-validator :name="name">
    <v-text-field
      v-model="model"
      :type="form.type || 'text'"
      :label="form.title"
      :placeholder="form.placeholder"
      :disabled="form.disabled"
      density="compact"
      @change="emitUpdate"
    />
  </form-validator>
</template>

<script>
import FormValidator from "@/components/global/form/FormValidator";

export default {
  name: "TextField",
  components: { FormValidator },

  props: {
    modelValue: [String, Number],
    form: Object,
    name: String,
  },

  computed: {
    model: {
      get() {
        return this.modelValue;
      },
      set(val) {
        this.$emit("update:modelValue", val);
      },
    },
  },

  methods: {
    emitUpdate() {
      this.$emit("updated");
    },
  },
};
</script>
