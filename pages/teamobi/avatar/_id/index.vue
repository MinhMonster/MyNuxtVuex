<template>
  <client-only>
    <HomePage
      :titleHead="`Mã Số: ${format_number(
        accountId
      )} - Nick Avatar Xứ Sở Diệu Kỳ`"
      :loading="!ready"
      goBack
      reload
      @reload="fetchAccount()"
      table
    >
      <template v-if="accountAvatar && accountAvatar.ID && ready" #body>
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
import mixins from "@/mixins/index";
import HomePage from "@/components/pages/home/HomePage";

import AccountAvatarDetail from "@/components/pages/client/game/avatars/AccountAvatarDetail";
import AccountAvatarList from "@/components/pages/client/game/avatars/AccountAvatarList";

import { mapFields } from "vuex-map-fields";
import { mapActions } from "vuex";

export default {
  layout: "clientLayout",
  mixins: [mixins],

  components: {
    HomePage,
    AccountAvatarDetail,
    AccountAvatarList,
  },
  data() {
    return {
      ready: false,
    };
  },
  computed: {
    ...mapFields("global", {
      screenMobile: "screenMobile",
    }),
    ...mapFields("home/game/avatars", {
      accountAvatar: "accountAvatar",
      accountAvatars: "accountAvatars",
    }),
    accountId() {
      return this.$route.params.id;
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

      await this.fetchAccountAvatar({
        params: {
          id: this.accountId,
        },
      });
      this.ready = true;

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
};
</script>
<style lang="scss" scoped>
.title-category {
  margin: 0 -9px;
  margin-top: -9px;
  margin-bottom: 9px;
  height: 30px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  background: radial-gradient(
    circle at 50% 100%,
    #e28637,
    #9f5424 58%,
    #561d00 127%
  );
  .title {
    color: #ffefa3 !important;
  }
}
</style>