<template>
  <v-col cols="6" sm="6" md="2" class="d-flex">
    <div class="is-search">
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
    <div class="is-reset">
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
        <i class="fa fa-list"></i> Xóa
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
  margin-right: 3px;
}
.is-reset {
  width: calc(50% - 3px);
  margin-left: 3px;
}
@media (min-width: 601px) {
  .is-search {
    width: calc(50% - 12px);
    margin-right: 12px;
  }
  .is-reset {
    width: calc(50% - 12px);
    margin-left: 12px;
  }
}
</style>
