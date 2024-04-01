<template>
  <span
    v-if="content"
    v-clipboard:copy="content"
    v-clipboard:success="onCopy(true)"
    v-clipboard:error="onCopy(false)"
    class="mb-1"
  >
    <BaseSvg v-if="!isCheck" name="content-copy" class="btn-copy" />
    <BaseSvg v-else :class="{ 'v-icon-success': isCheck }" name="check" />
  </span>
</template>
<script>
export default {
  props: {
    content: {
      type: [String, Number],
      default: "",
    },
  },
  data() {
    return {
      isCheck: false,
    };
  },
  methods: {
    onCopy(result) {
      const self = this;
      return () => {
        if (result === true) {
          this.isCheck = true;
          setTimeout(() => {
            this.isCheck = false;
          }, 1500);
        } else {
          return self.$toasted.error("error");
        }
      };
    },
  },
};
</script>
<style lang="scss" scoped>
.v-btn--icon.v-size--default {
  height: 25px !important;
  width: 25px !important;
  .v-icon {
    font-size: 18px !important;
  }
}
</style>