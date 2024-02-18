<template>
  <v-row class="group-btn mt--6">
    <v-col cols="12" sm="12" md="2"></v-col>
    <v-col cols="3" sm="3" md="2">
      <div :class="{ 'nuxt-link-exact-active': isVip }">
        <v-btn
          class="btn active-btn w-100"
          @click="nextPath('VIP', '/teamobi/ninja-school/nick-vip')"
          >Nick VIP</v-btn
        >
      </div>
    </v-col>
    <v-col cols="3" sm="3" md="2">
      <div :class="{ 'nuxt-link-exact-active': isCheap }">
        <v-btn
          class="btn active-btn w-100"
          @click="nextPath('cheap', '/teamobi/ninja-school/nick-gia-re')"
          >Giá Rẻ</v-btn
        >
      </div>
    </v-col>
    <v-col cols="3" sm="3" md="2">
      <div :class="{ 'nuxt-link-exact-active': isAll }">
        <v-btn
          class="btn active-btn w-100"
          @click="nextPath(null, '/teamobi/ninja-school')"
          >Tất cả</v-btn
        >
      </div>
    </v-col>
    <v-col cols="3" sm="3" md="2">
      <v-btn
        class="btn btn-info search-btn text-white w-100"
        @click="isSearch = !isSearch"
      >
        <span> {{ isSearch ? "Ẩn Tìm" : "Tìm Nick" }} </span>
        <!-- <v-icon>mdi-filter-multiple-outline </v-icon> -->
      </v-btn>
    </v-col>
    <v-col v-if="isSearch" cols="12">
      <FormSearch
        :type="type"
        @close="isShow = false"
        @search="$emit('search')"
      ></FormSearch>
    </v-col>
    <v-col v-if="isQuery" cols="12">
      <div class="title text-center text-danger">Kết quả tìm kiếm...</div>
    </v-col>
  </v-row>
</template>

<script>
import ninjas_mixins from "@/mixins/ninjas_mixins";
import { mapFields } from "vuex-map-fields";
import FormValidator from "@/components/global/form/FormValidator";
import FormSearch from "@/components/pages/client/game/ninjas/FormSearch";
// import { mapActions } from "vuex";

export default {
  mixins: [ninjas_mixins],

  components: { FormValidator, FormSearch },
  props: {
    type: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      isSearch: true,
    };
  },
  created() {},

  computed: {
    ...mapFields("global", {
      ready: "ready",
    }),
    path() {
      const path = this.$route.path;
      return path;
    },
    isQuery() {
      const query = this.$route.query;
      return !_.isEmpty(query);
    },
    queryForm() {
      return _.cloneDeep(this.query);
    },
    isCheap() {
      return (
        this.path.includes("/nick-ninja-gia-re") || this.path.includes("gia-re")
      );
    },
    isVip() {
      return this.path.includes("/nick-ninja-vip") || this.path.includes("vip");
    },
    isAll() {
      return (
        this.path.includes("/nick-ninja/") ||
        this.path.includes("/nick-ninja.") ||
        this.path == "/teamobi/ninja-school" ||
        this.path == "/teamobi/ninja-school/"
      );
    },
  },
  mounted() {},
  methods: {
    async nextPath(type, path) {
      await this.$router.push(path);
      if (this.type !== type) return;
      this.reloadNinja(this.type);
    },
  },
};
</script>

<style lang="scss" scoped>
.account-search {
  margin-bottom: 20px;
  margin: -3px -3px 15px -3px;
  border: 1px solid #663019;
  background: #ffefa3;
  border-radius: 5px;
  padding: 3px;
  .col-6,
  .col-3,
  .col-2,
  .col-1 {
    padding: 3px;
    border-radius: 3px;
    width: 100%;
  }
  .form-control {
    height: 30px !important;
    padding: 3px 6px;
    font-size: 15px;
    font-weight: 400;
    /* line-height: 1.5; */
    border: 1px solid #ced4da;
  }
}
.btn-search {
  width: 100%;
  height: 30px;
  padding: 3px !important;
  border-radius: 5px;
}
.form-group {
  margin-bottom: 0;
}

.group-btn {
  padding: 3px;
  margin-bottom: 5px;
}

.col-3,
.col-md-2,
.col-sm-3 {
  padding: 6px;
}
</style>
