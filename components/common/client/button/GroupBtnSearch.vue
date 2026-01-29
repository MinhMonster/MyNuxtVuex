<template>
  <v-col
    :cols="hiddenReset ? 2 : 6"
    :sm="hiddenReset ? 2 : 4"
    :md="hiddenReset ? 1 : 3"
    :lg="hiddenReset ? 1 : 2"
    class="d-flex"
  >
    <div class="is-search" :class="{ 'hidden-reset': hiddenReset }">
      <v-btn
        v-if="isLoadingSearch && !isReset"
        color="primary"
        class="search-btn text-white text-not-shadow w-100"
      >
        <Loading button></Loading>
      </v-btn>
      <v-btn
        v-else
        type="submit"
        color="primary"
        class="search-btn text-white text-not-shadow w-100"
      >
        <i class="fa fa-search"></i> Tìm
      </v-btn>
    </div>
    <div class="is-reset" v-if="!hiddenReset">
      <v-btn
        v-if="isLoadingSearch && isReset"
        color="error"
        class="search-btn text-white text-not-shadow w-100"
      >
        <Loading button></Loading>
      </v-btn>
      <v-btn
        v-else
        color="error"
        class="btn btn-danger btn-search text-not-shadow text-white w-100"
        @click="reset()"
      >
        <i class="fa fa-list"></i> Đặt lại
      </v-btn>
    </div>
  </v-col>
</template>

<script>
import { mapFields } from "vuex-map-fields";
import Loading from "@/components/global/molecules/common/Loading";

export default {
  components: { Loading },
  watch: {
    isLoadingSearch: {
      async handler(newValue, oldValue) {
        if (!this.isLoadingSearch) {
          this.isReset = false;
        }
      },
    },
  },
  data() {
    return {
      isReset: false,
    };
  },
  props: {
    hiddenReset: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapFields("global", {
      isLoadingSearch: "isLoadingSearch",
    }),
  },
  methods: {
    search() {
      this.$emit("search");
    },
    async reset() {
      this.isReset = true;
      this.$emit("reset");
    },
  },
};
</script>
<style lang="scss" scoped>
.is-search {
  width: calc(50% - 3px);
  @media (min-width: 601px) {
    width: calc(50% - 12px);
  }
  &.hidden-reset {
    width: 100% !important;
  }
}
.is-reset {
  width: calc(50% - 3px);
  margin-left: 6px;
  @media (min-width: 601px) {
    width: calc(50% - 12px);
    margin-left: 24px;
  }
}
</style>
