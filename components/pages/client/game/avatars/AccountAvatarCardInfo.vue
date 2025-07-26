<template>
  <div :id="account.id" class="account-info">
    <AccountAvatarTL :account="account" />
    <v-row class="account-body">
      <v-col cols="12">
        <span class="account-thongtin break-line-1">
          <div class="flex flex-center">
            <span class="mr-1">Thông tin: </span
            ><span v-html="account.description"></span>
          </div>
        </span>
      </v-col>
      <v-col cols="3"
        ><span class="account-code"
          >Mã Số <br />{{ format_number(account.id) }}</span
        ></v-col
      >
      <v-col cols="3"
        ><span class="account-class"
          >Đất<br />
          {{ account.land }}</span
        ></v-col
      >
      <v-col cols="3"
        ><span class="account-server">Gà <br />{{ account.pets }}</span></v-col
      >
      <v-col cols="3"
        ><span class="account-server">Cá <br />{{ account.fish }}</span></v-col
      >
      <v-col cols="6">
        <span :class="['account-cash', { 'has-sale': hasDiscount }]">
          <template v-if="hasDiscount">
            <span class="bg-danger sale-off"> -{{ account.active_discount }}% </span>
            <span class="cash-sale"> {{ cash_atm(discountedPrice) }} Vnđ </span>
          </template>
          <template v-else> {{ cash_atm(account.selling_price) }} Vnđ </template>
        </span>
      </v-col>
      <v-col cols="6">
        <nuxt-link :to="`/teamobi/avatar/${account.id}`">
          <span class="account-buy">Xem Nick</span>
        </nuxt-link>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import AccountAvatarTL from "@/components/pages/client/game/avatars/AccountAvatarTL";

export default {
  components: { AccountAvatarTL },
  props: {
    account: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    hasDiscount() {
      return this.account?.active_discount > 0;
    },
    discountedPrice() {
      return this.account.selling_price * (1 - this.account.active_discount / 100);
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep {
  .v-application p {
    margin-bottom: 0px !important;
  }
}
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
  border-radius: 4px;
  border: 1px solid #663019;
  text-align: center;
  overflow: hidden;

  ::v-deep {
    .fileItemWrapper {
      padding: 6px;
      img {
        border-radius: 7px;
      }
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

  .account-thongtin,
  .account-cash,
  .account-buy {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #e28637;
    color: #ffcf9c;
    border: 1px solid #663019;
    font-size: 14px;
    font-weight: 500;
    border-radius: 3px;
    padding: 3px;
    line-height: 25px;
    text-align: center;
  }

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
</style>
