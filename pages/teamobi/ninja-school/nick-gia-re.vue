<template>
  <AccountIndex
    title="Nick Ninja School Giá Rẻ"
    module="client/game/ninjaSchools"
    :params="[
      {
        query: 'type',
        data: 2,
      },
    ]"
  />
</template>

<script>
import AccountIndex from "@/components/common/client/account/AccountIndex";
export default {
  layout: "clientLayout",
  components: { AccountIndex },
  data() {
    return {
      title: "MuaBanNick.Pro - Shop Nick Ninja School Online",
      description:
        "WEB Mua Bán Nick Ninja School, Tài Khoản Ninja School, Dịch Vụ Game Ninja School, Shop Nick Ninja School, Shop Nick Nso, Mua Bán Acc Ninja School, Shop Acc Ninja School của TeaMobi - Uy Tín - Giá rẻ",
    };
  },
  head() {
    return {
      title: this.title,
      meta: [
        { hid: "description", name: "description", content: this.description },
        { property: "og:title", content: this.description },
        { property: "og:description", content: this.title },
        {
          property: "og:image",
          content: "/images/banners/banner_ninja_cheap_min.jpg",
        },
        {
          property: "og:image:alt",
          content: "Shop Nick Ninja School Online Giá Rẻ - NSO",
        },
        {
          name: "keywords",
          content:
            "nick ninja, shop nick ninja, mua nick ninja, mua nick ninja school, shop nick ninja school, shop acc ninja, nick ninja teamobi, shop nick ninja teamobi, nick ninja gia re, nick ninja vip",
        },
      ],
    };
  },
};
</script>
