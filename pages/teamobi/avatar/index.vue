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

export default {
  layout: "clientLayout",

  components: {
    HomePage,
    AccountAvatarSearch,
    AccountAvatarList,
  },
  computed: {
    ...mapFields("global", {
      ready: "ready",
      isLoadingSearch: "isLoadingSearch",
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
      this.isLoadingSearch = true;
      await this.resetAccountAvatars();
      await this.fetchAccountAvatars();
      setTimeout(() => {
        this.isLoadingSearch = false;
      }, 300);
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
        "MuaBanNick.Pro - Shop Nick Avatar SX Diệu Kỳ (2x) - Shop Mua Bán Acc Avatar SX Diệu Kỳ (2x) VIP Giá Rẻ của TeaMobi Uy Tín Nhất MXH",
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
<style scoped>
#home-page {
  max-width: 1400px !important;
}
</style>