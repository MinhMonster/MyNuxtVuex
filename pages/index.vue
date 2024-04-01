<template>
  <client-only>
    <HomePage notBoder>
      <template #body>
        <div class="mt-1">
          <HomeGame></HomeGame>
        </div>
      </template>
    </HomePage>
  </client-only>
</template>

<script>
import HomePage from "@/components/pages/home/HomePage";
import HomeGame from "@/components/pages/home/HomeGame";

export default {
  layout: "clientLayout",

  components: {
    HomePage,
    HomeGame,
  },
  data() {
    return {
      title:
        "ShopNick.Online | Shop Nick Tự Động - Shop Mua Bán Nick Ninja School Online, Ngọc Rồng Online, Avatar, Đại Tây Du Giá Rẻ, Uy Tín Nhất MXH",
      description:
        "WEB Mua Bán Nick Game, Tài Khoản Game, Account Game, Dịch Vụ Game Online, Nick Ninja School - Nso, Nick Ngọc Rồng - Nro, Nick Avatar SX Diệu Kỳ (2x) của TeaMobi - Uy Tín - Giá rẻ",
    };
  },
  head() {
    return {
      title: this.title,
      meta: [
        { hid: "description", name: "description", content: this.description },
        { property: "og:title", content: this.title },
        { property: "og:description", content: this.description },
        { property: "og:image", content: "/images/banners/banner-blue.png" },
        {
          property: "og:image:alt",
          content: "ShopNick.Online - Shop Nick Tự Động",
        },
        {
          name: "keywords",
          content:
            "nick ninja, shop nick ninja, mua nick ninja, shop acc ninja, mua acc ninja, shop nick ninja, mua bán nick ninja, shop nick ninja không chiết khấu, acc ninja, mua ních ninja, bán nick ninja, shop ninja sv4, mua nick ninja trả góp, shop nick ninja giá rẻ, xu5sv, shop nick ninja sv world, nick avatar, nick dai tay du, nick avatar dk, shop nick avatar 2x, mua nick avatar dk, mua nick avatar 2x, shop acc avatar dk, shop acc avatar 2x, nick avatar dk teamobi, shop nick avatar 2x teamobi",
        },
      ],
    };
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