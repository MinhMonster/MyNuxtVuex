<template>
  <div v-if="selected.icon">
    <v-icon :color="selected.color" small>
      {{ selected.icon }}
    </v-icon>
    <span>{{ selected.text }}</span>
  </div>
  <v-badge
    v-else
    :color="selected.color"
    :content="selected.text"
    class="pointer"
  ></v-badge>
</template>

<script>
export default {
  name: "OptionDisplay",
  props: {
    value: {
      type: [String, Number],
      default: "0",
    },
    options: {
      type: Array,
      default: () => [],
    },
  },
  async mounted() {},
  computed: {
    selected() {
      const option = this.options.find((opt) => opt.value === this.value);
      return (
        option || {
          text: this.value,
          color: "",
        }
      );
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep {
  .v-badge__badge {
    inset: auto auto calc(100% - 6px) 0 !important;
  }
}
</style>
