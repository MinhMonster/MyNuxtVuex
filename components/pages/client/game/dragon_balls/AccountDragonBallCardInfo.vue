<template>
  <div class="account-info">
    <AccountDragonBallTL :account="account" />
    <v-row class="account-body">
      <v-col cols="12"
        ><span class="account-thongtin break-line-1"
          >S.Manh: {{ account.power }}, Đ.Tử: {{ account.practitioners }}</span
        ></v-col
      >
      <v-col cols="3">
        <span class="account-code">
          Mã Số <br />{{ format_number(account.ID) }}
        </span>
      </v-col>
      <v-col cols="3">
        <span class="account-server"
          >Server <br />{{ account.server }} Sao</span
        >
      </v-col>
      <v-col cols="6"
        ><span class="account-class"
          >Hành Tinh<br />
          {{ account.planet }}</span
        ></v-col
      >

      <v-col cols="6"
        ><span class="account-cash"
          >{{ format_number(account.price) }} Card</span
        ></v-col
      >
      <v-col cols="6">
        <nuxt-link :to="`/teamobi/ngoc-rong/${this.account.ID}`">
          <span class="account-buy"> Xem Nick</span>
        </nuxt-link>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import AccountDragonBallTL from "@/components/pages/client/game/dragon_balls/AccountDragonBallTL";

export default {
  components: { AccountDragonBallTL },
  props: {
    account: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    async viewAaccount() {
      await this.$router.push(`/teamobi/avatar/${this.account.ID}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.account-body {
  padding: 15px;
  .col-12,
  .col-6,
  .col-3 {
    padding: 3px;
    border-radius: 3px;
    width: 100%;
  }
}
</style>
