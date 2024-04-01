<template>
  <div class="account-info">
    <AccountAvatarTL :account-avatar="accountAvatar" />
    <v-row class="account-body">
      <v-col cols="12"
        ><span class="account-thongtin break-line-1">
          Thông tin:
          {{ accountAvatar.thongtin }}
        </span>
      </v-col>
      <v-col cols="3"
        ><span class="account-code"
          >Mã Số <br />{{ format_number(accountAvatar.ID) }}</span
        ></v-col
      >
      <v-col cols="3"
        ><span class="account-class"
          >Đất<br />
          {{ accountAvatar.dat }}</span
        ></v-col
      >
      <v-col cols="3"
        ><span class="account-server"
          >Gà <br />{{ accountAvatar.ga }}</span
        ></v-col
      >
      <v-col cols="3"
        ><span class="account-server"
          >Cá <br />{{ accountAvatar.ca }}</span
        ></v-col
      >
      <v-col cols="6"
        ><span class="account-cash"
          >{{ cash_atm(accountAvatar.price) }} Vnđ</span
        ></v-col
      >
      <v-col cols="6">
        <nuxt-link :to="`/teamobi/avatar/${accountAvatar.ID}`">
          <span class="account-buy"> Xem Nick</span>
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
    accountAvatar: {
      type: Object,
      default: () => {},
    },
  },
  created() {},

  computed: {},
  methods: {
    async viewAaccount() {
      await this.$router.push(`/teamobi/avatar/${this.accountAvatar.ID}`);
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
  border-radius: 4px;
  border: 1px solid #663019;
  text-align: center;
  overflow: hidden;
  ::v-deep {
    .fileItemWrapper {
      padding: 6px;
      img {
        border-radius: 4px;
      }
    }
  }

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
  // .account-thongtin {
  //   max-height: 30px;
  //   overflow: hidden;
  // }
  // .text-thongtin {
  //   width: 70px;
  //   max-height: 30px;
  //   display: -webkit-box !important;
  //   -webkit-line-clamp: 1 !important;
  //   -webkit-box-orient: vertical !important;
  //   overflow: hidden !important;
  //   text-overflow: ellipsis !important;
  //   word-break: break-word !important;
  // }
  // .full-info {
  //   width: calc(100% - 70px);
  //   text-align: left;
  //   max-height: 30px;
  //   overflow: hidden;
  // }
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
// ::v-deep {
// @media (min-width: 1300px) {
//   .v-main__wrap .container {
//     max-width: 100% !important;
//   }
// }
// }
</style>
