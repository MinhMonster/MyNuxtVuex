<template>
  <client-only>
    <HomePage :loading="!ready" goBack reload @reload="fetchAccount()" table>
      <template v-if="account && ready" #body>
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

import mixins from "@/mixins/index";
import dragon_balls from "@/mixins/dragon_balls";

export default {
  mixins: [mixins, dragon_balls],
  layout: "clientLayout",
  components: {
    HomePage,
    AccountDragonBallDetail,
    AccountDragonBallList,
  },

  computed: {
    accountCode() {
      return this.$route.params.code;
    },
    title() {
      return `Mã Số: ${this.format_number(
        this.accountCode
      )} - Nick Ngọc Rồng Online - MuaBanNick.Pro`;
    },
  },
  mounted() {
    this.fetchAccount();
  },
  methods: {

    async fetchAccount() {
      this.ready = false;

      await this.fetchAccountDragonBall(this.accountCode);
      this.ready = true;

      await this.resetQuery();
      await this.resetAccountDragonBalls();
      if (this.account) {
        await this.setQuery({
          perPage: 8,
          q: {
            giatien: this.account.price,
            id_other: this.account.code,
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
      ],
    };
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
