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
import AccountDragonBallSearch from "@/components/pages/client/game/dragon_balls/AccountDragonBallSearch";
import AccountDragonBallList from "@/components/pages/client/game/dragon_balls/AccountDragonBallList";
import dragon_balls from "@/mixins/dragon_balls";

export default {
  mixins: [dragon_balls],
  layout: "clientLayout",

  components: {
    HomePage,
    AccountDragonBallSearch,
    AccountDragonBallList,
  },

  async mounted() {
    this.reload();
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
