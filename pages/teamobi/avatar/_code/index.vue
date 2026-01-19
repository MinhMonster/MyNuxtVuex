<template>
  <client-only>
    <HomePage :loading="!ready" goBack reload @reload="fetchAccount()" table>
      <template v-if="account && account.id && ready" #body>
        <AccountAvatarDetail :account="account"></AccountAvatarDetail>
      </template>
      <template #table>
        <div class="page-body bg-none mt--2">
          <div class="title-category mt--2">
            <div class="title">
              <h2 class="text-center">Danh Sách Nick Gợi Ý</h2>
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
    ...mapFields("global", {
      ready: "ready",
    }),
    ...mapFields("home/game/avatars", {
      account: "account",
      accounts: "accounts",
    }),
    accountCode() {
      return this.$route.params.code;
    },
    title() {
      return `Mã Số: ${this.format_number(
        this.accountCode
      )} - Nick Avatar - MuaBanNick.Pro`;
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
      this.ready = false;

      await this.fetchAccountAvatar(this.accountCode);
      this.ready = true;

      await this.setQuery({ page: this.queryPage });
      await this.resetAccountAvatars();
      if (this.accountAvatar) {
        await this.setQuery({
          perPage: 9,
          q: {
            giatien: this.account.price,
            id_other: this.account.id,
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
          content: "/images/banners/banner_avatar_min.jpg",
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

