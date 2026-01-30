<template>
  <v-btn
    :color="status.color"
    :content="status.text"
    overlap
    class="pd-5px"
    :class="value === 'failed' ? '' : 'text-black'"
  >
    {{ status.text }}
  </v-btn>
</template>
<script>
export default {
  props: {
    value: {
      type: String,
      default: () => "pending",
    },
  },
  computed: {
    status() {
      return this.getStatus(this.value);
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
