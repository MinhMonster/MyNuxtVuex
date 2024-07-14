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
          <AccountAvatarSearch></AccountAvatarSearch>
          <AccountAvatarList></AccountAvatarList>
        </div>
      </template>
    </HomePage>
  </client-only>
</template>

<script>
import avatars_mixins from "@/mixins/avatars_mixins";
import HomePage from "@/components/pages/home/HomePage";
import AccountAvatarSearch from "@/components/pages/client/game/avatars/AccountAvatarSearch";
import AccountAvatarList from "@/components/pages/client/game/avatars/AccountAvatarList";

export default {
  layout: "clientLayout",
  mixins: [avatars_mixins],
  components: {
    HomePage,
    AccountAvatarSearch,
    AccountAvatarList,
  },

  async mounted() {
    await this.reload();
    this.nextAvatarId();
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
