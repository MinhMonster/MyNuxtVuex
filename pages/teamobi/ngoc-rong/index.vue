<template>
  <AccountIndex
    title="Nick Ngọc Rồng Online"
    module="client/game/dragonBalls"
  />
</template>

<script>
import AccountIndex from "@/components/common/client/account/AccountIndex";

export default {
  layout: "clientLayout",

  components: { AccountIndex },
  data() {
    return {
      title: "MuaBanNick.Pro - Shop Nick Ngọc Rồng Online",
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
