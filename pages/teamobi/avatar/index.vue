<template>
  <client-only>
    <HomePage
      title="Nick Avatar Xứ Sở Diệu Kỳ"
      goBack
      reload
      @reload="reload()"
      notBoder
    >
      <template #body>
        <div class="mt-4">
          <AccountAvatarSearch @search="search()"></AccountAvatarSearch>
          <AccountAvatarList></AccountAvatarList>
        </div>
      </template>
    </HomePage>
  </client-only>
</template>

<script>
import HomePage from "@/components/pages/home/HomePage";
import { mapFields } from "vuex-map-fields";
import { mapActions } from "vuex";
import AccountAvatarSearch from "@/components/pages/client/game/avatars/AccountAvatarSearch";
import AccountAvatarList from "@/components/pages/client/game/avatars/AccountAvatarList";

export default {
  layout: "clientLayout",

  components: {
    HomePage,
    AccountAvatarSearch,
    AccountAvatarList,
  },
  computed: {
    ...mapFields("global", {
      isLoadingSearch: "isLoadingSearch",
    }),
  },
  async mounted() {
    await this.resetQuery();
    await this.resetAccountAvatars();
    await this.fetchAccountAvatars();
  },
  methods: {
    ...mapActions("home/game/avatars", [
      "resetQuery",
      "setQuery",
      "resetAccountAvatars",
      "fetchAccountAvatars",
    ]),
    async search() {
      this.isLoadingSearch = true;
      await this.resetAccountAvatars();
      await this.fetchAccountAvatars();
      setTimeout(() => {
        this.isLoadingSearch = false;
      }, 300);
    },
    async reload() {
      await this.resetQuery();
      await this.resetAccountAvatars();
      await this.fetchAccountAvatars();
    },
  },
  data() {
    return {
      title:
        "ShopNick.Online - Shop Nick Avatar SX Diệu Kỳ Tự Động - Shop Mua Bán Nick Avatar SX Diệu Kỳ VIP Giá Rẻ, Uy Tín Nhất MXH",
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
        { property: "og:description", content: this.title },
        {
          property: "og:image",
          content: "/images/banners/banner_avatar_min.jpg",
        },
        {
          property: "og:image:alt",
          content: "Shop Nick Avatar SX Diệu Kỳ VIP Giá RẺ",
        },
      ],
    };
  },
};
</script>
<style scoped>
#home-page {
  max-width: 1400px !important;
}
</style>