<template>
  <v-text-field
    :value="formattedNumber"
    :name="name"
    :label="label"
    :placeholder="placeholder"
    :disabled="disabled"
    @input="onInput"
  />
</template>

<script>
export default {
  name: "BaseInput",
  props: {
    name: [String, Number],
    value: [String, Number],
    label: [String, Number],
    placeholder: [String, Number],
    disabled: Boolean,
  },
  computed: {
    formattedNumber() {
      const val = this.value ?? "";
      return val
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },
  methods: {
    onInput(val) {
      const cleaned = val.replace(/[^0-9]/g, "");

      // emit cho v-model
      this.$emit("input", cleaned);

      // nếu vẫn cần name
      this.$emit("change", this.name, cleaned);
    },
  },
};
</script>
