<template>
  <div class="account-info">
    <AccountAvatarTL :account-avatar="accountAvatar" />
    <b-row class="account-body">
      <b-col cols="12"
        ><span class="account-thongtin break-line-1"
          >Thông tin: {{ accountAvatar.thongtin }}</span
        ></b-col
      >
      <b-col cols="3"
        ><span class="account-code"
          >Mã Số <br />{{ format_number(accountAvatar.ID) }}</span
        ></b-col
      >
      <b-col cols="3"
        ><span class="account-class"
          >Đất<br />
          {{ accountAvatar.dat }}</span
        ></b-col
      >
      <b-col cols="3"
        ><span class="account-server"
          >Gà <br />{{ accountAvatar.ga }}</span
        ></b-col
      >
      <b-col cols="3"
        ><span class="account-server"
          >Cá <br />{{ accountAvatar.ca }}</span
        ></b-col
      >
      <b-col cols="6"
        ><span class="account-cash"
          >{{ format_number(accountAvatar.price) }} Card</span
        ></b-col
      >
      <b-col cols="6">
        <nuxt-link :to="`/teamobi/avatar/${this.accountAvatar.ID}`">
          <span class="account-buy"> Xem Nick</span>
        </nuxt-link>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import mixins from "@/mixins/index";
import AccountAvatarTL from "@/components/pages/client/game/avatars/AccountAvatarTL";

export default {
  mixins: [mixins],
  name: "accountAvatarCardInfo",
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
// ::v-deep {
// @media (min-width: 1300px) {
//   .v-main__wrap .container {
//     max-width: 100% !important;
//   }
// }
// }
</style>
