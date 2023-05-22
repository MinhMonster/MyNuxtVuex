<template>
  <div class="account-info">
    <div class="fileItemWrapper">
      <img
        v-if="accountNinja.hinhanh[0].includes('muabannick.pro')"
        :src="accountNinja.hinhanh[0]"
        alt=""
        class="image-ninja"
      />
      <img
        v-else
        :src="`https://muabannick.pro${accountNinja.hinhanh[0]}`"
        alt=""
        class="image-ninja"
      />
      <span class="account-cash-atm"
        ><v-btn icon>
          <v-icon>mdi-cart-variant</v-icon>
        </v-btn>
        {{ cash_atm(accountNinja.giatien) }} ATM-MOMO</span
      >
      <span class="account-ingame">
        <v-btn icon>
          <v-icon>mdi-account</v-icon>
        </v-btn>
        {{ accountNinja.ingame }}
      </span>
    </div>
    <b-row class="account-body">
      <b-col cols="12"
        ><span class="account-thongtin break-line-1"
          >Lv: {{ accountNinja.level }}, {{ accountNinja.thongtin }}</span
        ></b-col
      >
      <b-col cols="3"
        ><span class="account-code"
          >Mã Số <br />{{ format_number(accountNinja.ID) }}</span
        ></b-col
      >
      <b-col cols="3"
        ><span class="account-class"
          >Class<br />
          {{ classNinja(accountNinja.class) }}</span
        ></b-col
      >
      <b-col cols="6"
        ><span class="account-server"
          >Server <br />{{ serverNinja(accountNinja.server) }}</span
        ></b-col
      >
      <b-col cols="6"
        ><span class="account-cash"
          >{{ format_number(accountNinja.giatien) }} Card</span
        ></b-col
      >
      <b-col cols="6">
        <nuxt-link :to="`/teamobi/ninja-school/${this.accountNinja.ID}`">
          <span class="account-buy"> Xem Nick</span>
        </nuxt-link>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import mixins from "@/mixins/index";

export default {
  mixins: [mixins],
  name: "AccountNinjaCardInfo",
  components: {},
  props: {
    accountNinja: {
      type: Object,
      default: () => {},
    },
  },
  created() {},

  computed: {},
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
  .account-ingame,
  .account-cash-atm {
    position: absolute;
    top: 6px;
    font-size: 13px;
    font-weight: 450;
    width: auto !important;
    text-align: center;
    border-radius: 3px;
    padding: 1px 5px 1px 5px;
    color: #ffffff;
    background: #a21d0a;
    .v-btn--icon.v-size--default {
      height: 20px;
      width: 20px;
      margin: 0 -5px;
      i {
        height: 15px;
        width: 15px;
        line-height: 15px;
        font-size: 14px;
      }
    }
  }
  .account-ingame {
    right: 6px;
  }
  .account-cash-atm {
    left: 6px;
    font-size: 11px;
    font-weight: 700;
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

.fileItemWrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: flex-start;
  // height: 100%;
  overflow: hidden;
  // border-radius: 5px;

  img {
    width: 108%;
    // max-height: 200px;
  }
}
</style>
