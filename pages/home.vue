<template>
  <client-only>
    <HomePage
      title="Trang Chủ - Danh Vụ Game"
      titleHead="Shop Mua Bán Nick Ninja School, Ngọc Rồng, Avatar Uy Tín Nhất MXH"
      :loading="!ready"
      goBack
      reload
      @reload="search()"
      notBoder
    >
      <template v-if="ready" #body>
        <div class="mt-4">
          <HomeGame></HomeGame>
          <b-row>
            <b-col cols="12" sm="12" md="6"> <HistoryBuyAccount /> </b-col>
            <b-col cols="12" sm="12" md="6"> <HistoryDeposit /></b-col> 
          </b-row>
        </div>
      </template>
    </HomePage>
  </client-only>
</template>

<script>
import HomePage from "@/components/pages/home/HomePage";
import HistoryBuyAccount from "@/components/pages/home/HistoryBuyAccount";
import HistoryDeposit from "@/components/pages/home/HistoryDeposit";

import { mapFields } from "vuex-map-fields";

import { mapActions } from "vuex";
import HomeGame from "@/components/pages/home/HomeGame";
import Loading from "@/components/global/molecules/common/Loading";

export default {
  layout: "clientLayout",

  components: {
    HomePage,
    HomeGame,
    Loading,
    HistoryBuyAccount,
    HistoryDeposit,
  },
  computed: {
    ...mapFields("global", {
      ready: "ready",
    }),
  },
  async mounted() {
    this.search();
  },
  methods: {
    
    async search() {
      this.ready = false;
      setTimeout(() => {
        this.ready = true;
      }, 200);
    },
  },
};
</script>
<style lang="scss" scoped>
.col-xl,
.col-xl-auto,
.col-xl-12,
.col-xl-11,
.col-xl-10,
.col-xl-9,
.col-xl-8,
.col-xl-7,
.col-xl-6,
.col-xl-5,
.col-xl-4,
.col-xl-3,
.col-xl-2,
.col-xl-1,
.col-lg,
.col-lg-auto,
.col-lg-12,
.col-lg-11,
.col-lg-10,
.col-lg-9,
.col-lg-8,
.col-lg-7,
.col-lg-6,
.col-lg-5,
.col-lg-4,
.col-lg-3,
.col-lg-2,
.col-lg-1,
.col-md,
.col-md-auto,
.col-md-12,
.col-md-11,
.col-md-10,
.col-md-9,
.col-md-8,
.col-md-7,
.col-md-6,
.col-md-5,
.col-md-4,
.col-md-3,
.col-md-2,
.col-md-1,
.col-sm,
.col-sm-auto,
.col-sm-12,
.col-sm-11,
.col-sm-10,
.col-sm-9,
.col-sm-8,
.col-sm-7,
.col-sm-6,
.col-sm-5,
.col-sm-4,
.col-sm-3,
.col-sm-2,
.col-sm-1,
.col,
.col-auto,
.col-12,
.col-11,
.col-10,
.col-9,
.col-8,
.col-7,
.col-6,
.col-5,
.col-4,
.col-3,
.col-2,
.col-1 {
  padding: 9px;
}
</style>