<template>
  <div>
    <b-row class="text-center account">
      <AccountNinjaCard
        v-for="(ninja, index) in accountNinjas"
        :key="index"
        :account-ninja="ninja"
      ></AccountNinjaCard>
    </b-row>
    <div v-if="isLoading" class="center mgt--50px mgb--50px">
      <Loading></Loading>
    </div>
    <v-btn
      v-if="isShowNext && accountNinjas.length && !isLoading"
      variant="danger"
      class="btn-next-more flex mt-3 mb-1"
      @click="onChange()"
    >
      <v-icon>mdi-skip-next</v-icon>
      Xem Thêm Nick Ninja
    </v-btn>
  </div>
</template>

<script>
import { mapFields } from "vuex-map-fields";
import { mapActions } from "vuex";
import mixins from "@/mixins/index";
import AccountNinjaCard from "@/components/pages/client/game/ninjas/AccountNinjaCard";
import Loading from "@/components/global/molecules/common/Loading";
export default {
  name: "AccountNinjaList",
  mixins: [mixins],

  components: { AccountNinjaCard, Loading },
  props: {
    query: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      isShowNext: true,
      isLoading: false,
    };  
  },
  async mounted() {
    // await this.resetQuery();
    // await this.setQuery(this.query);
    // await this.resetAccountNinjas();
    // await this.fetchAccountNinjas();
  },
  computed: {
    ...mapFields("home/game/ninjas", {
      accountNinjas: "accountNinjas",
      page: "query.page",
      pages: "metaNinjas.pages",
    }),
  },
  methods: {
    ...mapActions("home/game/ninjas", [
      "fetchAccountNinjas",
      "setQuery",
      "resetQuery",
      "resetAccountNinjas",
    ]),
    async onChange() {
      this.isLoading = true;
      await this.setQuery({ page: this.page + 1 });
      await this.fetchAccountNinjas();
      if (this.page >= this.pages) {
        this.isShowNext = false;
        await this.resetQuery();
      }
      this.isLoading = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.account {
  margin: -9px;
}
.btn-next-more {
  color: #ffffff;
  background: #a21d0a !important;
  text-align: center;
  margin: 0 auto;
}
</style>
