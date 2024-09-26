<template>
  <client-only>
    <HomePage
      title="Nick Ninja School Online"
      :loading="!ready"
      goBack
      reload
      @reload="reloadNinja('')"
      notBoder
    >
      <template v-if="ready" #body>
        <div class="mt-4">
          <AccountNinjaSearch @search="searchNinjas()"></AccountNinjaSearch>
          <AccountNinjaList></AccountNinjaList>
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
  async mounted() {
    this.getAccountNinjas();
  },
  data() {
    return {
      title:
        "MuaBanNick.Pro - Shop Nick Ninja School Online Tự Động - Shop Mua Bán Nick Ninja School Online VIP Giá Rẻ, Uy Tín Nhất MXH",
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
        { property: "og:image", content: "/banner.jpg" },
        {
          property: "og:image:alt",
          content: "Shop Nick Ninja School Online VIP  Giá Rẻ - NSO",
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