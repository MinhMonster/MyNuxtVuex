<template>
  <client-only>
    <HomePage
      title="Nick Ninja School VIP"
      :loading="!ready"
      goBack
      reload
      @reload="reloadNinja('VIP')"
      notBoder
    >
      <template v-if="ready" #body>
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
        "MuaBanNick.Pro - Shop Nick Ninja School Online Tự Động - Shop Mua Bán Nick Ninja School Online VIP Giá Rẻ, Uy Tín Nhất MXH",
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
        {
          property: "og:image",
          content: "/images/banners/banner_ninja_vip_min.jpg",
        },
        {
          property: "og:image:alt",
          content: "Shop Nick Ninja School Online VIP - NSO",
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