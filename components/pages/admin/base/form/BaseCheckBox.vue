<template>
  <v-switch
    v-model="selected"
    color="primary"
    :name="name"
    :label="label"
    :placeholder="placeholder"
    :disabled="disabled"
    @change="onChange"
  ></v-switch>
</template>

<script>
export default {
  name: "BaseInput",
  props: {
    name: {
      type: [String, Number],
    },
    value: Boolean,
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
      selected: false,
    };
  },
  watch: {
    value: {
      async handler(newValue, oldValue) {
        this.selected = this.value;
      },
    },
  },
  computed: {},
  created() {},
  mounted() {
    this.selected = this.value;
  },
  methods: {
    onChange() {
      console.log(" this.selected", this.selected);
      this.$emit("change", this.selected);
    },
  },
};
</script>

<style scoped lang="scss">
.theme--dark {
  &.v-input--switch {
    ::v-deep {
      .v-input--switch__track {
        color: #a1a1a1 !important;
      }
    }
  }
}
</style>