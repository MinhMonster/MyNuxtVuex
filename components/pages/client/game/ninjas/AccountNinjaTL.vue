<template>
  <client-only>
    <div v-if="accountNinja" class="image-card">
      <img
        v-if="accountNinja.hinhanh[0].includes('muabannick.pro')"
        :src="accountNinja.hinhanh[0]"
        alt=""
        class="image-ninja"
        :class="{ full: accountNinja.full }"
      />
      <img
        v-else
        :src="`https://muabannick.pro${accountNinja.hinhanh[0]}`"
        alt=""
        class="image-ninja"
        :class="{ full: accountNinja.full }"
      />
      <template v-if="!accountNinja.full">
        <span
          v-if="accountNinja.tl1"
          class="account-tl text-13-450"
          style="right: 24%; top: 19%"
          >{{ accountNinja.tl1 }}</span
        >
        <span
          v-if="accountNinja.tl2"
          class="account-tl text-13-450"
          style="right: 24%; top: 30.5%"
          >{{ accountNinja.tl2 }}</span
        >
        <span
          v-if="accountNinja.tl3"
          class="account-tl text-13-450"
          style="right: 24%; top: 42%"
          >{{ accountNinja.tl3 }}</span
        >
        <span
          v-if="accountNinja.tl4"
          class="account-tl text-13-450"
          style="right: 24%; top: 53%"
          >{{ accountNinja.tl4 }}</span
        >
        <span
          v-if="accountNinja.tl5"
          class="account-tl text-13-450"
          style="right: 24%; top: 64%"
          >{{ accountNinja.tl5 }}</span
        >

        <span
          v-if="accountNinja.tl6"
          class="account-tl text-13-450"
          style="left: 25%; top: 19%"
          >{{ accountNinja.tl6 }}</span
        >
        <span
          v-if="accountNinja.tl7"
          class="account-tl text-13-450"
          style="left: 25%; top: 30.5%"
          >{{ accountNinja.tl7 }}</span
        >
        <span
          v-if="accountNinja.tl8"
          class="account-tl text-13-450"
          style="left: 25%; top: 42%"
          >{{ accountNinja.tl8 }}</span
        >
        <span
          v-if="accountNinja.tl9"
          class="account-tl text-13-450"
          style="left: 25%; top: 53%"
          >{{ accountNinja.tl9 }}</span
        >
        <span
          v-if="accountNinja.tl10"
          class="account-tl text-13-450"
          style="left: 25%; top: 64%"
          >{{ accountNinja.tl10 }}</span
        >

        <span
          v-if="accountNinja.tl11"
          class="account-tl text-13-450"
          style="left: 44.5%; top: 62%"
          >{{ accountNinja.tl11 }}</span
        >

        <span
          v-if="accountNinja.eye"
          class="account-tl text-13-450"
          style="left: 56.5%; top: 62%"
          >{{ accountNinja.eye }}</span
        >
        <span v-if="accountNinja.disguise" class="account-disguise text-13-450">
          CT: {{ accountNinja.disguise }}
        </span>
        <span v-if="accountNinja.clone" class="account-clone text-13-450">
          {{ accountNinja.clone }}
        </span>
        <span v-if="accountNinja.mounts" class="account-mounts">
          <span class="mounts-info text-13-450">
            {{ accountNinja.mounts }}
          </span>
        </span>
        <span v-if="accountNinja.book" class="account-book text-13-450">
          {{ accountNinja.book !== 13 ? accountNinja.book : "max" }} sách
        </span>
        <span v-if="accountNinja.cake" class="account-cake text-13-450">
          {{ accountNinja.cake !== 20 ? accountNinja.cake : "max" }} bánh
        </span>
        <span v-if="accountNinja.yen" class="account-yen text-13-450">
          {{ accountNinja.yen }}
        </span>
        <span class="account-cash-atm text-13-450">
          Lv: {{ accountNinja.level }}</span
        >
        <span class="account-server-number">
          Sv: {{ serverNinjaNumber(accountNinja.server) }}
        </span>

        <span class="account-ingame text-13-450">
          @{{ accountNinja.ingame }}
        </span>
      </template>

      <!-- <span
        v-if="accountNinja.saleOff"
        class="account-cash-atm bg-none text-13-450"
      >
        <span class="bg-warning"> {{ "-" + accountNinja.saleOff + "% " }}</span>
        <span class="bg-danger text-white">
          {{
            " " +
            cash_atm(accountNinja.giatien * (1 - accountNinja.saleOff / 100))
          }}
          Vnđ</span
        >
      </span>
      <span v-else class="account-cash-atm text-13-450">
        {{ cash_atm(accountNinja.giatien) }} Vnđ</span
      >

      <span class="account-ingame text-13-450">
        @{{ accountNinja.ingame }}
      </span> -->
    </div>
  </client-only>
</template>
<script>
export default {
  name: "AccountNinjaCardInfo",
  components: {},
  props: {
    accountNinja: {
      type: Object,
      default: () => {}
    }
  }
};
</script>
<style lang="scss" scoped>
.image-card {
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

    &.full {
      width: 100%;
      margin-left: 0px;
    }
  }
}
.account-ingame {
  right: 4px;
}
.account-server-number,
.account-ingame,
.account-cash-atm {
  position: absolute;
  height: 13% !important;
  top: 4px;
  width: auto !important;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  padding: 0px 5px;
  background: #fff;
  color: #333;
  border: 1px solid #a4a4a4;
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

.account-server-number {
  left: calc(50% - 24px);
  min-width: 50px !important;
}

.account-cash-atm {
  &.bg-none {
    background: none !important;
    color: #333 !important;
    padding: 0px !important;
  }
  left: 4px;
  // font-size: 11px;
  font-weight: 700;
  span {
    padding: 0 5px;
    height: 100% !important;
    line-height: 100%;
    border-radius: 3px;
    display: flex;
    align-items: center;
  }
}

.account-tl {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 6px;
  width: 5.5% !important;
  height: 10% !important;
  text-align: center;
  border-radius: 3px;
  padding: 0px;
  background: #fff;
  color: #333;
  border: 1px solid #a4a4a4;
}

.account-mounts {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 89%;
  left: 0%;
  width: 100% !important;
  height: 10% !important;
  text-align: center;
  .mounts-info {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100% !important;
    background: #fff;
    color: #333;
    border: 1px solid #a4a4a4;
    border-radius: 3px;
    padding: 0px 5px;
    margin: 0 auto !important;
  }
}

.account-book {
  right: 4px;
  top: 53%;
}

.account-cake {
  right: 4px;
  top: 65%;
}

.account-yen {
  right: 4px;
  top: 77%;
}

.account-clone {
  left: 4px;
  top: 77%;
}
.account-disguise {
  left: 4px;
  top: 65%;
}

.account-yen,
.account-book,
.account-cake,
.account-clone,
.account-disguise {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: auto !important;
  height: 10% !important;
  text-align: center;

  background: #fff;
  color: #333;
  border: 1px solid #a4a4a4;
  padding: 0px 5px;
  border-radius: 3px;
}
</style>
