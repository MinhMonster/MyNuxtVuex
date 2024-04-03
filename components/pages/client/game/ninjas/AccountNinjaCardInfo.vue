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
      <v-col cols="6">
        <span v-if="accountNinja.saleOff" class="account-cash has-sale">
          <span class="bg-danger sale-off">
            {{ "-" + accountNinja.saleOff + "% " }}</span
          >
          <span class="text-center cash-sale">
            {{
              " " +
              cash_atm(accountNinja.giatien * (1 - accountNinja.saleOff / 100))
            }}
            Vnđ</span
          >
        </span>

        <span v-else class="account-cash">
          {{ cash_atm(accountNinja.giatien) }} Vnđ
        </span>
      </v-col>
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
.account-info {
  width: 100%;
  background: #ffefa3;
  border-radius: 5px;
  border: 1px solid #663019;
  text-align: center;

  .account-thongtin,
  .account-cash,
  .account-buy {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    background: #e28637;
    color: #ffcf9c;
    border: 1px solid #663019;
    font-size: 14px;
    font-weight: 500;
    border-radius: 3px;
    padding: 3px;
    line-height: 25px;
  }
  // .account-cash{
  //   background: #ffcf9c;
  //   color: #663019;
  // }

  .account-code,
  .account-class,
  .account-server {
    font-size: 11px;
    color: #663019;
    text-transform: uppercase;
    font-weight: 600;
    line-height: 1.42857143;
  }
}
.sale-off {
  width: 40px;
}
.cash-sale {
  width: calc(100% - 40px);
}
.bg-danger.sale-off {
  background: #a21d0a !important;
}
// .has-sale.account-cash {
//   justify-content: space-between;
// }
// ::v-deep {
// @media (min-width: 1300px) {
//   .v-main__wrap .container {
//     max-width: 100% !important;
//   }
// }
// }
</style>
