<template>
  <AccountIndex title="Nick Avatar XS Diệu Kỳ" module="client/game/avatars" />
</template>

<script>
import AccountIndex from "@/components/common/client/account/AccountIndex";
export default {
  layout: "clientLayout",
  components: { AccountIndex },
  data() {
    return {
      title: "MuaBanNick.Pro - Shop Nick Avatar SX Diệu Kỳ (2x)",
      description:
        "WEB Mua Bán Nick Avatar DK (2x), Mua Bán Acc Avatar DK, Shop Acc Avatar DK (2x), Shop Nick Avatar DK (2x) của TeaMobi - Uy Tín - Giá rẻ",
    };
  },
  head() {
    return {
      title: this.title,
      meta: [
        { hid: "description", name: "description", content: this.description },
        { property: "og:title", content: this.title },
        { property: "og:description", content: this.title },
        {
          property: "og:image",
          content: "/images/banners/banner_avatar_min.jpg",
        },
        {
          property: "og:image:alt",
          content: "Shop Nick Avatar SX Diệu Kỳ (2x) VIP Giá RẺ",
        },
        {
          name: "keywords",
          content:
            " nick avatar dk, shop nick avatar 2x, mua nick avatar dk, mua nick avatar 2x, shop acc avatar dk, shop acc avatar 2x, nick avatar dk teamobi, shop nick avatar 2x teamobi",
        },
      ],
    };
  },
};
</script>
