<template>
  <client-only>
    <div v-if="accountNinja" class="fileItemWrapper">
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
      <span
        v-if="accountNinja.tl1"
        class="account-tl"
        style="right: 24%; top: 19%"
        >{{ accountNinja.tl1 }}</span
      >
      <span
        v-if="accountNinja.tl2"
        class="account-tl"
        style="right: 24%; top: 30.5%"
        >{{ accountNinja.tl2 }}</span
      >
      <span
        v-if="accountNinja.tl3"
        class="account-tl"
        style="right: 24%; top: 42%"
        >{{ accountNinja.tl3 }}</span
      >
      <span
        v-if="accountNinja.tl4"
        class="account-tl"
        style="right: 24%; top: 53%"
        >{{ accountNinja.tl4 }}</span
      >
      <span
        v-if="accountNinja.tl5"
        class="account-tl"
        style="right: 24%; top: 64%"
        >{{ accountNinja.tl5 }}</span
      >

      <span
        v-if="accountNinja.tl6"
        class="account-tl"
        style="left: 25%; top: 19%"
        >{{ accountNinja.tl6 }}</span
      >
      <span
        v-if="accountNinja.tl7"
        class="account-tl"
        style="left: 25%; top: 30.5%"
        >{{ accountNinja.tl7 }}</span
      >
      <span
        v-if="accountNinja.tl8"
        class="account-tl"
        style="left: 25%; top: 42%"
        >{{ accountNinja.tl8 }}</span
      >
      <span
        v-if="accountNinja.tl9"
        class="account-tl"
        style="left: 25%; top: 53%"
        >{{ accountNinja.tl9 }}</span
      >
      <span
        v-if="accountNinja.tl10"
        class="account-tl"
        style="left: 25%; top: 64%"
        >{{ accountNinja.tl10 }}</span
      >

      <span
        v-if="accountNinja.tl11"
        class="account-tl"
        style="left: 44.5%; top: 62%"
        >{{ accountNinja.tl11 }}</span
      >

      <span
        v-if="accountNinja.tl12"
        class="account-tl"
        style="left: 56.5%; top: 62%"
        >{{ accountNinja.tl12 }}</span
      >
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
  </client-only>
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
    width: 108%;
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
  height: 13% !important;
  top: 4px;
  font-size: 13px;
  font-weight: 450;
  width: auto !important;
  display: flex;
  align-items: center;
  justify-content: center;
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
