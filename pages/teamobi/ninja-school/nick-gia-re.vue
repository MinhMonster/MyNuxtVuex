<template>
  <client-only>
    <HomePage
      title="Nick Ninja School Giá Rẻ"
      goBack
      reload
      @reload="reloadNinja('cheap')"
      notBoder
    >
      <template #body>
        <div class="mt-4">
          <AccountNinjaSearch
            type="cheap"
            @search="searchNinjas()"
          ></AccountNinjaSearch>
          <AccountNinjaList type="cheap"></AccountNinjaList>
        </div>
      </template>
    </HomePage>
  </client-only>
</template>

<script>
import ninjas_mixins from "@/mixins/ninjas_mixins";
import HomePage from "@/components/pages/home/HomePage";

import AccountNinjaSearch from "@/components/pages/client/game/ninjas/AccountNinjaSearch";
import AccountNinjaList from "@/components/pages/client/game/ninjas/AccountNinjaList";

export default {
  layout: "clientLayout",
  mixins: [ninjas_mixins],

  components: {
    HomePage,
    AccountNinjaSearch,
    AccountNinjaList,
  },
  async mounted() {
    this.getAccountNinjas("cheap");
  },
  data() {
    return {
      title:
        "ShopNick.Online | Shop Nick Ninja School Online Tự Động - Shop Mua Bán Acc Ninja School Online Giá Rẻ của TeaMobi Uy Tín Nhất MXH",
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
          content: "/images/banners/ninja-cheap-blue.png",
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
<style lang="scss" scoped>
#home-page {
  max-width: 1400px !important;
}
</style>