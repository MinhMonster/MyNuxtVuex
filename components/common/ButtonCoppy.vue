<template>
  <v-btn
    v-if="content"
    icon
    v-clipboard:copy="content"
    v-clipboard:success="onCopy(true)"
    v-clipboard:error="onCopy(false)"
    class="mb-1"
  >
    <v-icon v-if="!isCheck">mdi-content-copy</v-icon>
    <v-icon v-else :class="{ 'v-icon-success': isCheck }"
      >mdi-check-circle-outline</v-icon
    >
  </v-btn>
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
  components: {},
  computed: {},
  mounted() {},
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

    &.mdi.mdi-content-copy {
      color: #561d00;
    }

    &.mdi-check-circle-outline {
      &.v-icon-success {
        color: #28a745;
      }
    }
  }
}
</style>