<template>
  <client-only>
    <HomePage goBack reload @reload="fetchAccount()" table>
      <template v-if="account && account.ID" #body>
        <AccountDragonBallDetail :account="account" />
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
          <AccountDragonBallList />
        </div>
      </template>
    </HomePage>
  </client-only>
</template>

<script>
import HomePage from "@/components/pages/home/HomePage";
import AccountDragonBallDetail from "@/components/pages/client/game/dragon_balls/AccountDragonBallDetail";
import AccountDragonBallList from "@/components/pages/client/game/dragon_balls/AccountDragonBallList";

import { mapFields } from "vuex-map-fields";
import { mapActions } from "vuex";
import mixins from "@/mixins/index";

export default {
  mixins: [mixins],
  layout: "clientLayout",
  components: {
    HomePage,
    AccountDragonBallDetail,
    AccountDragonBallList,
  },

  computed: {
    ...mapFields("home/game/dragon_balls", {
      account: "accountDragonBall",
      accounts: "accountDragonBalls",
    }),
    accountId() {
      return this.$route.params.id;
    },
    title() {
      return `Mã Số: ${this.format_number(
        this.accountId
      )} - Nick Ngọc Rồng Online - ShopNick.Online`;
    },
  },
  mounted() {
    this.fetchAccount();
  },
  methods: {
    ...mapActions("home/game/dragon_balls", [
      "fetchAccountDragonBall",
      "resetQuery",
      "setQuery",
      "resetAccountDragonBalls",
      "fetchAccountDragonBalls",
    ]),

    async fetchAccount() {
      await this.fetchAccountDragonBall({
        params: {
          id: this.accountId,
        },
      });

      await this.resetQuery();
      await this.resetAccountDragonBalls();
      if (this.account) {
        await this.setQuery({
          perPage: 8,
          q: {
            giatien: this.account.price,
            id_other: this.account.ID,
          },
        });
        await this.fetchAccountDragonBalls();
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
        { property: "og:image", content: "/images/banners/ngocrong-blue.png" },
      ],
    };
  },
};
</script>