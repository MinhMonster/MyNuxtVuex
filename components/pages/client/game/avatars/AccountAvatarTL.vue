<template>
  <client-only>
    <div v-if="accountAvatar" class="fileItemWrapper">
      <img
        v-if="accountAvatar.images[0].includes('muabannick.pro')"
        :src="accountAvatar.images[0]"
        alt=""
        class="image-account"
        :class="{ full: accountAvatar.full }"
      />
      <img
        v-else
        :src="`https://muabannick.pro${accountAvatar.images[0]}`"
        alt=""
        class="image-account"
        :class="{ full: accountAvatar.full }"
      />
      <span class="account-cash-atm"
        ><v-btn icon>
          <v-icon>mdi-cart-variant</v-icon>
        </v-btn>
        {{ cash_atm(accountAvatar.price) }} ATM-MOMO</span
      >

      <span class="account-ingame">
        <v-btn icon>
          <v-icon>mdi-account</v-icon>
        </v-btn>
        {{ accountAvatar.inGame }}
      </span>
    </div>
  </client-only>
</template>
<script>
export default {
  components: {},
  props: {
    accountAvatar: {
      type: Object,
      default: () => {},
    },
  },
  mounted() {},

  computed: {},
  methods: {},
};
</script>
<style lang="scss" scoped>
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
    width: 120%;
    margin-left: -10%;
    height: 270px;
    &.full {
      width: 100%;
      margin-left: 0px;
    }
    // max-height: 200px;
  }
}
.account-ingame {
  right: 4px;
}
.account-cash-atm {
  left: 4px;
  font-size: 11px;
  font-weight: 700;
}
.account-ingame,
.account-cash-atm {
  position: absolute;
  top: 4px;
  font-size: 13px;
  font-weight: 450;
  width: auto !important;
  text-align: center;
  border-radius: 3px;
  padding: 0px 5px;
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
.account-tl {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 6px;
  font-size: 13px;
  font-weight: 450;
  width: 5.5% !important;
  height: 10% !important;
  text-align: center;
  border-radius: 3px;
  padding: 0px;
  color: #ffffff;
  background: #a21d0a;
}
</style>
