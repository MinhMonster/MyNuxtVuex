<template>
  <client-only>
    <HomePage goBack reload @reload="fetchAccount()" table>
      <template v-if="accountAvatar && accountId == accountAvatar.ID" #body>
        <AccountAvatarDetail
          :account-avatar="accountAvatar"
        ></AccountAvatarDetail>
      </template>
      <template #table>
        <div class="page-body bg-none mt--2">
          <div class="title-category">
            <div data-v-53350ac5="" class="title">
              <center data-v-53350ac5="">
                <h3 data-v-53350ac5="">Danh Sách Nick Gợi Ý</h3>
              </center>
            </div>
          </div>
          <AccountAvatarList></AccountAvatarList>
        </div>
      </template>
    </HomePage>
  </client-only>
</template>

<script>
import HomePage from "@/components/pages/home/HomePage";

import AccountAvatarDetail from "@/components/pages/client/game/avatars/AccountAvatarDetail";
import AccountAvatarList from "@/components/pages/client/game/avatars/AccountAvatarList";

import { mapFields } from "vuex-map-fields";
import { mapActions } from "vuex";
import mixins from "@/mixins/index";

export default {
  mixins: [mixins],
  layout: "clientLayout",

  components: {
    HomePage,
    AccountAvatarDetail,
    AccountAvatarList,
  },
  computed: {
    ...mapFields("global", {}),
    ...mapFields("home/game/avatars", {
      accountAvatar: "accountAvatar",
      accountAvatars: "accountAvatars",
    }),
    accountId() {
      return this.$route.params.id;
    },
    title() {
      return `Mã Số: ${this.format_number(
        this.accountId
      )} - Nick Avatar - ShopNick.Online`;
    },
  },
  mounted() {
    this.fetchAccount();
  },
  methods: {
    ...mapActions("home/game/avatars", [
      "fetchAccountAvatar",
      "resetQuery",
      "setQuery",
      "resetAccountAvatars",
      "fetchAccountAvatars",
    ]),

    async fetchAccount() {
      await this.fetchAccountAvatar({
        params: {
          id: this.accountId,
        },
      });

      await this.resetQuery();
      await this.resetAccountAvatars();
      if (this.accountAvatar) {
        await this.setQuery({
          perPage: 8,
          q: {
            giatien: this.accountAvatar.price,
            id_other: this.accountAvatar.ID,
          },
        });
        await this.fetchAccountAvatars();
      }
    },
  },
  head() {
    return {
      title: this.title,
      meta: [
        { hid: "description", name: "description", content: this.title },
        { property: "og:title", content: this.title },
        { property: "og:description", content: this.title },
        {
          property: "og:image",
          content: "/images/banners/avatar-blue.png",
        },
        {
          property: "og:image:alt",
          content: "Shop Nick Avatar SX Diệu Kỳ (2x) VIP Giá RẺ",
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
