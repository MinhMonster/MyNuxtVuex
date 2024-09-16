<template>
  <client-only>
    <HomePage
      title="Nick Ngọc Rồng Online"
      :loading="!ready"
      goBack
      reload
      @reload="reload()"
      notBoder
    >
      <template v-if="ready" #body>
        <div class="mt-4">
          <AccountDragonBallSearch @search="search()"></AccountDragonBallSearch>
          <AccountDragonBallList></AccountDragonBallList>
        </div>
      </template>
    </HomePage>
  </client-only>
</template>

<script>
import HomePage from "@/components/pages/home/HomePage";
import { mapFields } from "vuex-map-fields";
import { mapActions } from "vuex";
import AccountDragonBallSearch from "@/components/pages/client/game/dragon_balls/AccountDragonBallSearch";
import AccountDragonBallList from "@/components/pages/client/game/dragon_balls/AccountDragonBallList";
import Loading from "@/components/global/molecules/common/Loading";

export default {
  layout: "clientLayout",

  components: {
    HomePage,
    AccountDragonBallSearch,
    AccountDragonBallList,
    Loading,
  },
  computed: {
    ...mapFields("global", {
      ready: "ready",
    }),
  },
  async mounted() {
    this.ready = false;
    await this.resetQuery();
    await this.resetAccountDragonBalls();
    await this.fetchAccountDragonBalls();
    this.ready = true;
  },
  methods: {
    ...mapActions("home/game/dragon_balls", [
      "resetQuery",
      "setQuery",
      "resetAccountDragonBalls",
      "fetchAccountDragonBalls",
    ]),
    async search() {
      this.ready = false;
      await this.resetAccountDragonBalls();
      await this.fetchAccountDragonBalls();
      this.ready = true;
    },
    async reload() {
      this.ready = false;
      await this.resetQuery();
      await this.resetAccountDragonBalls();
      await this.fetchAccountDragonBalls();
      this.ready = true;
    },
  },
  data() {
    return {
      title:
        "MuaBanNick.Pro - Shop Nick Ngọc Rồng Online Tự Động - Shop Mua Bán Nick Ngọc Rồng Online VIP Giá Rẻ, Uy Tín Nhất MXH",
      description:
        "WEB Mua Bán Nick Game, Tài Khoản Game, Dịch Vụ Game Online, Ninja School - Nso, Ngọc Rồng - Nro, Avatar SX Diệu Kỳ, Uy Tín - Giá rẻ",
    };
  },
  head() {
    return {
      title: this.title,
      meta: [
        { hid: "description", name: "description", content: this.description },
        { property: "og:title", content: this.title },
        { property: "og:description", content: this.description },
        { property: "og:image", content: "/images/banners/banner_nro_min.jpg" },
        {
          property: "og:image:alt",
          content: "Shop Nick Ngọc Rồng Online VIP Giá Rẻ - NRO",
        },
      ],
    };
  },
};
</script>