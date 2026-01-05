<template>
  <v-col v-if="account" cols="12" sm="6" md="4">
    <div :id="account.code" class="account-info">
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
            >Mã Số <br />{{ format_number(account.code) }}</span
          ></v-col
        >
        <v-col cols="3"
          ><span class="account-class"
            >Đất<br />
            {{ account.land }}</span
          ></v-col
        >
        <v-col cols="3"
          ><span class="account-server"
            >Gà <br />{{ account.pets }}</span
          ></v-col
        >
        <v-col cols="3"
          ><span class="account-server"
            >Cá <br />{{ account.fish }}</span
          ></v-col
        >
        <v-col cols="6">
          <span :class="['account-cash', { 'has-sale': hasDiscount }]">
            <template v-if="hasDiscount">
              <span class="bg-danger sale-off">
                -{{ account.active_discount }}%
              </span>
              <span class="cash-sale">
                {{ cash_atm(discountedPrice) }} Vnđ
              </span>
            </template>
            <template v-else>
              {{ cash_atm(account.selling_price) }} Vnđ
            </template>
          </span>
        </v-col>
        <v-col cols="6">
          <nuxt-link :to="`/teamobi/avatar/${account.code}`">
            <span class="account-buy">Xem Nick</span>
          </nuxt-link>
        </v-col>
      </v-row>
    </div>
  </v-col>
</template>

<script>
import AccountAvatarTL from "@/components/pages/client/game/avatars/AccountAvatarTL";

export default {
  components: { AccountAvatarTL },
  props: {
    account: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    hasDiscount() {
      return this.account?.active_discount > 0;
    },
    discountedPrice() {
      return (
        this.account.selling_price * (1 - this.account.active_discount / 100)
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.col-xl,
.col-xl-auto,
.col-xl-12,
.col-xl-11,
.col-xl-10,
.col-xl-9,
.col-xl-8,
.col-xl-7,
.col-xl-6,
.col-xl-5,
.col-xl-4,
.col-xl-3,
.col-xl-2,
.col-xl-1,
.col-lg,
.col-lg-auto,
.col-lg-12,
.col-lg-11,
.col-lg-10,
.col-lg-9,
.col-lg-8,
.col-lg-7,
.col-lg-6,
.col-lg-5,
.col-lg-4,
.col-lg-3,
.col-lg-2,
.col-lg-1,
.col-md,
.col-md-auto,
.col-md-12,
.col-md-11,
.col-md-10,
.col-md-9,
.col-md-8,
.col-md-7,
.col-md-6,
.col-md-5,
.col-md-4,
.col-md-3,
.col-md-2,
.col-md-1,
.col-sm,
.col-sm-auto,
.col-sm-12,
.col-sm-11,
.col-sm-10,
.col-sm-9,
.col-sm-8,
.col-sm-7,
.col-sm-6,
.col-sm-5,
.col-sm-4,
.col-sm-3,
.col-sm-2,
.col-sm-1,
.col,
.col-auto,
.col-12,
.col-11,
.col-10,
.col-9,
.col-8,
.col-7,
.col-6,
.col-5,
.col-4,
.col-3,
.col-2,
.col-1 {
  padding: 6px;
}

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
