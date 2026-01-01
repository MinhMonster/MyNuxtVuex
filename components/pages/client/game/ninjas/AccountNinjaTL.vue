<template>
  <client-only>
    <div v-if="accountNinja" class="image-card">
      <img
        v-if="accountNinja.images[0].includes('muabannick.pro')"
        :src="accountNinja.images[0]"
        alt=""
        class="image-ninja"
        :class="{ full: accountNinja.is_full_image }"
      />
      <img
        v-else
        :src="`https://muabannick.pro${accountNinja.images[0]}`"
        alt=""
        class="image-ninja"
        :class="{ full: accountNinja.is_full_image }"
      />
      <template v-if="!accountNinja.is_full_image">
        <span
          v-if="accountNinja.tl_1"
          class="account-tl bg-equip text-13-450"
          style="right: 24%; top: 19%"
          >{{ accountNinja.tl_1 }}</span
        >
        <span
          v-if="accountNinja.tl_2"
          class="account-tl bg-equip text-13-450"
          style="right: 24%; top: 30.5%"
          >{{ accountNinja.tl_2 }}</span
        >
        <span
          v-if="accountNinja.tl_3"
          class="account-tl bg-equip text-13-450"
          style="right: 24%; top: 42%"
          >{{ accountNinja.tl_3 }}</span
        >
        <span
          v-if="accountNinja.tl_4"
          class="account-tl bg-equip text-13-450"
          style="right: 24%; top: 53%"
          >{{ accountNinja.tl_4 }}</span
        >
        <span
          v-if="accountNinja.tl_5"
          class="account-tl bg-equip text-13-450"
          style="right: 24%; top: 64%"
          >{{ accountNinja.tl_5 }}</span
        >

        <span
          v-if="accountNinja.tl_6"
          class="account-tl bg-equip text-13-450"
          style="left: 25%; top: 19%"
          >{{ accountNinja.tl_6 }}</span
        >
        <span
          v-if="accountNinja.tl_7"
          class="account-tl bg-equip text-13-450"
          style="left: 25%; top: 30.5%"
          >{{ accountNinja.tl_7 }}</span
        >
        <span
          v-if="accountNinja.tl_8"
          class="account-tl bg-equip text-13-450"
          style="left: 25%; top: 42%"
          >{{ accountNinja.tl_8 }}</span
        >
        <span
          v-if="accountNinja.tl_9"
          class="account-tl bg-equip text-13-450"
          style="left: 25%; top: 53%"
          >{{ accountNinja.tl_9 }}</span
        >
        <span
          v-if="accountNinja.tl_10"
          class="account-tl bg-equip text-13-450"
          style="left: 25%; top: 64%"
          >{{ accountNinja.tl_10 }}</span
        >

        <span
          v-if="accountNinja.tl_11"
          class="account-tl bg-equip text-13-450"
          style="left: 44.5%; top: 62%"
          >{{ accountNinja.tl_11 }}</span
        >

        <span
          v-if="accountNinja.tl_12"
          class="account-tl bg-equip text-13-450"
          style="left: 56.5%; top: 62%"
          >{{ accountNinja.tl_12 }}</span
        >
        <span
          v-if="accountNinja.item_7"
          class="account-stick bg-equip text-13-450"
        >
          {{ accountNinja.item_7 }}
        </span>
        <span
          v-if="accountNinja.item_8"
          class="account-mask bg-equip text-13-450"
        >
          {{ accountNinja.item_8 }}
        </span>
        <span
          v-if="accountNinja.item_9"
          class="account-pet bg-equip text-13-450"
        >
          {{ accountNinja.item_9 }}
        </span>
        <span
          v-if="accountNinja.item_10"
          class="account-disguise-2 bg-equip text-13-450"
        >
          {{ accountNinja.item_10 }}
        </span>
        <span
          v-if="accountNinja.item_11"
          class="account-disguise bg-equip text-13-450"
        >
          {{ accountNinja.item_11 }}
        </span>
        <span
          v-if="accountNinja.item_12"
          class="account-clone bg-equip text-13-450"
        >
          {{ accountNinja.item_12 }}
        </span>
        <span v-if="accountNinja.item_13" class="account-mounts">
          <span class="mounts-info bg-equip text-13-450">
            {{ accountNinja.item_13 }}
          </span>
        </span>
        <span
          v-if="accountNinja.item_1"
          class="account-gem-3 bg-equip text-13-450"
        >
          {{ accountNinja.item_1 }}
        </span>
        <span
          v-if="accountNinja.item_2"
          class="account-gem-2 bg-equip text-13-450"
        >
          {{ accountNinja.item_2 }}
        </span>
        <span
          v-if="accountNinja.item_3"
          class="account-gem-1 bg-equip text-13-450"
        >
          {{ accountNinja.item_3 }}
        </span>
        <span
          v-if="accountNinja.item_4"
          class="account-book bg-equip text-13-450"
        >
          {{ accountNinja.item_4 }}
        </span>
        <span
          v-if="accountNinja.item_5"
          class="account-cake bg-equip text-13-450"
        >
          {{ accountNinja.item_5 }}
        </span>
        <span
          v-if="accountNinja.item_6"
          class="account-yen bg-equip text-13-450"
        >
          {{ accountNinja.item_6 }}
        </span>
        <span class="account-cash-atm text-bold">
          Lv: {{ accountNinja.level }}</span
        >
        <span class="account-server-number text-bold">
          Sv: {{ serverNinjaNumber(accountNinja.server) }}
        </span>

        <span class="account-ingame text-bold">
          @{{ accountNinja.character_name }}
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
  name: "AccountNinjaTL",
  components: {},
  props: {
    accountNinja: {
      type: Object,
      default: () => {},
    },
  },
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
  border-bottom: 1px solid #663019;

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

.account-server-number {
  left: calc(50% - 30px);
  min-width: 60px !important;
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
  color: #ffffff;
  background: #a21d0a;
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
    color: #ffffff;
    background: #a21d0a;
    border-radius: 3px;
    padding: 0px 5px;
    margin: 0 auto !important;
  }
}
.account-gem-3 {
  right: 4px;
  top: 19%;
}
.account-gem-2 {
  right: 4px;
  top: 30.5%;
}
.account-gem-1 {
  right: 4px;
  top: 42%;
}
.account-book {
  right: 4px;
  top: 53%;
}

.account-cake {
  right: 4px;
  top: 64%;
}

.account-yen {
  right: 4px;
  top: 75%;
}

.account-clone {
  left: 4px;
  top: 75%;
}
.account-stick {
  left: 4px;
  top: 19%;
}
.account-mask {
  left: 4px;
  top: 30.5%;
}
.account-pet {
  left: 4px;
  top: 42%;
}
.account-disguise-2 {
  left: 4px;
  top: 53%;
}
.account-disguise {
  left: 4px;
  top: 64%;
}
.bg-equip {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: auto !important;
  height: 10% !important;
  text-align: center;

  color: #ffffff;
  background: #a21d0a;
  padding: 0px 5px;
  border-radius: 3px;
}
</style>
