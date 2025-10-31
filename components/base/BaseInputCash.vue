<template>
  <input
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
  name: "BaseInputCash",
  props: {
    name: {
      type: [String, Number],
    },
    value: {
      type: [String, Number],
      default: "",
    },
    label: {
      type: [String, Number],
    },
    placeholder: String,
    disabled: Boolean,
  },
  data() {
    return {
      formattedNumber: this.formatNumber(this.value),
    };
  },
  watch: {
    value(newVal) {
      this.formattedNumber = this.formatNumber(newVal);
    },
  },
  methods: {
    formatNumber(val) {
      const num = (val || "").toString().replace(/[^0-9]/g, "");
      return num ? num.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "";
    },

    onInput(e) {
      const raw = e.target.value.replace(/[^0-9]/g, "");
      const formatted = this.formatNumber(raw);
      this.formattedNumber = formatted;
      e.target.value = formatted;

      this.$emit("input", raw);
      this.$emit("change", this.name, raw);
    },
  },
};
</script>
