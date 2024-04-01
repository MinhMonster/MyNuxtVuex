<template>
  <client-only>
    <HomePage
      title="Nick Ninja School VIP"
      goBack
      reload
      @reload="reloadNinja('VIP')"
      notBoder
    >
      <template #body>
        <div class="mt-4">
          <AccountNinjaSearch
            type="VIP"
            @search="searchNinjas()"
          ></AccountNinjaSearch>
          <AccountNinjaList type="VIP"></AccountNinjaList>
        </div>
      </template>
    </HomePage>
  </client-only>
</template>

<script>
import HomePage from "@/components/pages/home/HomePage";
import AccountNinjaSearch from "@/components/pages/client/game/ninjas/AccountNinjaSearch";
import AccountNinjaList from "@/components/pages/client/game/ninjas/AccountNinjaList";
import ninjas_mixins from "@/mixins/ninjas_mixins";

export default {
  layout: "clientLayout",
  mixins: [ninjas_mixins],

  components: {
    HomePage,
    AccountNinjaSearch,
    AccountNinjaList,
  },
  computed: {},
  async mounted() {
    this.getAccountNinjas("VIP");
  },
  data() {
    return {
      title:
        "ShopNick.Online | Shop Nick Ninja School Online Tự Động - Shop Mua Bán Acc Ninja School Online VIP Giá Rẻ của TeaMobi Uy Tín Nhất MXH",
      description:
        "WEB Mua Bán Nick Ninja School, Tài Khoản Ninja School, Dịch Vụ Game Ninja School, Shop Nick Ninja School, Shop Nick Nso, Mua Bán Acc Ninja School, Shop Acc Ninja School của TeaMobi - Uy Tín - Giá rẻ",
    };
  },
  head() {
    return {
      title: this.title,
      meta: [
        { hid: "description", name: "description", content: this.description },
        { property: "og:title", content: this.title },
        { property: "og:description", content: this.description },
        {
          property: "og:image",
          content: "/images/banners/ninja-vip-blue.png",
        },
        {
          property: "og:image:alt",
          content: "Shop Nick Ninja School Online VIP - NSO",
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