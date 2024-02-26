<template>
  <client-only>
    <HomePage
      title="Nick Avatar Xứ Sở Diệu Kỳ"
      :loading="!ready"
      goBack
      reload
      @reload="reload()"
      notBoder
    >
      <template v-if="ready" #body>
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
import Loading from "@/components/global/molecules/common/Loading";

export default {
  layout: "clientLayout",

  components: {
    HomePage,
    AccountAvatarSearch,
    AccountAvatarList,
    Loading,
  },
  computed: {
    ...mapFields("global", {
      ready: "ready",
    }),
  },
  async mounted() {
    this.ready = false;
    await this.resetQuery();
    await this.resetAccountAvatars();
    await this.fetchAccountAvatars();
    this.ready = true;
  },
  methods: {
    ...mapActions("home/game/avatars", [
      "resetQuery",
      "setQuery",
      "resetAccountAvatars",
      "fetchAccountAvatars",
    ]),
    async search() {
      this.ready = false;
      await this.resetAccountAvatars();
      await this.fetchAccountAvatars();
      this.ready = true;
    },
    async reload() {
      this.ready = false;
      await this.resetQuery();
      await this.resetAccountAvatars();
      await this.fetchAccountAvatars();
      this.ready = true;
    },
  },
  data() {
    return {
      title:
        "MuaBanNick.Pro - Shop Nick Avatar SX Diệu Kỳ Tự Động - Shop Mua Bán Nick Avatar SX Diệu Kỳ VIP Giá Rẻ, Uy Tín Nhất MXH",
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