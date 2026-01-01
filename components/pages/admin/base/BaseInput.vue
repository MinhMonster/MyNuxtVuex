<template>
  <v-text-field
    v-model="formattedNumber"
    :name="name"
    :label="label"
    :placeholder="placeholder"
    :disabled="disabled"
    @input="formatInput"
  />
</template>

<script>
export default {
  name: "BaseInput",
  props: {
    name: {
      type: [String, Number],
    },
    value: {
      type: [String, Number],
    },
    label: {
      type: [String, Number],
    },
    placeholder: {
      type: [String, Number],
    },
    errors: {
      type: [String, Boolean, Array],
    },
    disabled: Boolean,
  },
  data() {
    return {
      number: "",
      formattedNumber: this.value.toString(),
    };
  },
  watch: {
    value: {
      async handler(newValue, oldValue) {
        this.formattedNumber = this.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      },
    },
  },
  computed: {
  },
  created() {
    this.formattedNumber = this.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    this.formatInput();
  },
  methods: {
    formatInput() {
      const cleanedValue = this.formattedNumber.replace(/[^0-9]/g, "");

      this.formattedNumber = cleanedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      this.number = cleanedValue;

      this.$emit("change", this.name, this.number);
    },
  },
};
</script>

<style scoped lang="scss">
</style>
