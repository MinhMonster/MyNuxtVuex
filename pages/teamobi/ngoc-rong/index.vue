<template>
  <client-only>
    <HomePage
      title="Nick Ngọc Rồng Online"
      goBack
      reload
      @reload="reload()"
      notBoder
    >
      <template #body>
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
import { mapActions } from "vuex";
import AccountDragonBallSearch from "@/components/pages/client/game/dragon_balls/AccountDragonBallSearch";
import AccountDragonBallList from "@/components/pages/client/game/dragon_balls/AccountDragonBallList";

export default {
  layout: "clientLayout",

  components: {
    HomePage,
    AccountDragonBallSearch,
    AccountDragonBallList,
  },
  async mounted() {
    await this.resetQuery();
    await this.resetAccountDragonBalls();
    await this.fetchAccountDragonBalls();
  },
  methods: {
    ...mapActions("home/game/dragon_balls", [
      "resetQuery",
      "setQuery",
      "resetAccountDragonBalls",
      "fetchAccountDragonBalls",
    ]),
    async search() {
      await this.resetAccountDragonBalls();
      await this.fetchAccountDragonBalls();
    },
    async reload() {
      await this.resetQuery();
      await this.resetAccountDragonBalls();
      await this.fetchAccountDragonBalls();
    },
  },
  data() {
    return {
      title:
        "ShopNick.Online - Shop Nick Ngọc Rồng Online Tự Động - Shop Mua Bán Nick Ngọc Rồng Online VIP Giá Rẻ, Uy Tín Nhất MXH",
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