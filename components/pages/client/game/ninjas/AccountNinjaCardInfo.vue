<template>
  <div class="account-info">
    <AccountNinjaTL :account-ninja="accountNinja" />
    <v-row class="account-body">
      <v-col cols="12"
        ><span class="account-thongtin break-line-1"
          >Lv: {{ accountNinja.level }}, {{ accountNinja.thongtin }}</span
        ></v-col
      >
      <v-col cols="3"
        ><span class="account-code"
          >Mã Số <br />{{ format_number(accountNinja.ID) }}</span
        ></v-col
      >
      <v-col cols="3"
        ><span class="account-class"
          >Lớp<br />
          {{ classNinja(accountNinja.class) }}</span
        ></v-col
      >
      <v-col cols="6"
        ><span class="account-server"
          >Máy chủ <br />{{ serverNinja(accountNinja.server) }}</span
        ></v-col
      >
      <v-col cols="6"
        ><span class="account-cash"
          >{{ cash_atm(accountNinja.giatien) }} Vnđ</span
        ></v-col
      >
      <v-col cols="6">
        <nuxt-link :to="`/teamobi/ninja-school/${this.accountNinja.ID}`">
          <span class="account-buy"> Xem Nick</span>
        </nuxt-link>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import AccountNinjaTL from "@/components/pages/client/game/ninjas/AccountNinjaTL";

export default {
  components: { AccountNinjaTL },
  props: {
    accountNinja: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    async viewAaccount() {
      await this.$router.push(`/teamobi/ninja-school/${this.accountNinja.ID}`);
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

// ::v-deep {
// @media (min-width: 1300px) {
//   .v-main__wrap .container {
//     max-width: 100% !important;
//   }
// }
// }


</style>
