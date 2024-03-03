<template>
  <select v-model="selectedValue" :class="className">
    <option
      v-for="(option, index) in options"
      :key="index"
      :value="option.value"
    >
      {{ option.text }}
    </option>
  </select>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: [String, Number],
      default: null,
    },
    options: {
      type: Array,
      required: true,
    },
    className: {
      type: String,
      default: 'form-select',
    },
  },
  computed: {
    selectedValue: {
      get() {
        return this.modelValue;
      },
      set(newValue) {
        this.$emit('input', newValue);
      },
    },
  },
};
</script>