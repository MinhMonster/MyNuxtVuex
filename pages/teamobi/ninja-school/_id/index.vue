<template>
  <client-only>
    <HomePage :loading="!ready" goBack reload @reload="fetchAccount()" table>
      <template v-if="accountNinja && accountNinja.ID && ready" #body>
        <AccountNinjaDetail :account-ninja="accountNinja"></AccountNinjaDetail>
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
          <AccountNinjaList></AccountNinjaList>
        </div>
      </template>
    </HomePage>
  </client-only>
</template>

<script>
import HomePage from "@/components/pages/home/HomePage";
import AccountNinjaDetail from "@/components/pages/client/game/ninjas/AccountNinjaDetail";
import AccountNinjaList from "@/components/pages/client/game/ninjas/AccountNinjaList";

import { mapFields } from "vuex-map-fields";
import { mapActions } from "vuex";
import mixins from "@/mixins/index";

export default {
  mixins: [mixins],
  layout: "clientLayout",
  components: {
    HomePage,
    AccountNinjaDetail,
    AccountNinjaList,
  },
  computed: {
    ...mapFields("global", {
      screenMobile: "screenMobile",
      ready: "ready",
    }),
    ...mapFields("home/game/ninjas", {
      accountNinja: "accountNinja",
      accountNinjas: "accountNinjas",
    }),
    accountId() {
      return this.$route.params.id;
    },
    title() {
      return `Mã Số: ${this.format_number(
        this.accountId
      )} - Nick Ninja School Online - MuaBanNick.Pro`;
    },
    imagenHead() {
      return _.get(this.accountNinja, "hinhanh[0]", "/banner.jpg");
    },
  },
  async mounted() {
    await this.fetchAccount();
  },
  methods: {
    ...mapActions("home/game/ninjas", [
      "fetchAccountNinja",
      "resetQuery",
      "setQuery",
      "resetAccountNinjas",
      "fetchAccountNinjas",
    ]),

    async fetchAccount() {
      this.ready = false;

      await this.fetchAccountNinja({
        params: {
          id: this.accountId,
        },
      });
      this.ready = true;

      await this.resetQuery();
      await this.resetAccountNinjas();
      if (this.accountNinja) {
        await this.setQuery({
          perPage: 8,
          q: {
            giatien: this.accountNinja.giatien,
            id_other: this.accountNinja.ID,
          },
        });
        await this.fetchAccountNinjas();
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
          content: this.imagenHead,
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