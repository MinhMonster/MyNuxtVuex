<template>
  <v-col v-if="account" cols="12" sm="6" md="6" lg="4">
    <div class="account-info">
      <AccountNinjaTL :account-ninja="account" />
      <v-row class="account-body">
        <v-col cols="12">
          <span class="account-thongtin break-line-1">
            Lv: {{ account.level }}, {{ account.thongtin }}
          </span>
        </v-col>

        <v-col v-for="item in infoItems" :key="item.key" :cols="item.cols">
          <span class="account-meta">
            {{ item.label }}<br />
            {{ item.value }}
          </span>
        </v-col>
        <v-col cols="6">
          <span class="account-cash" :class="{ 'has-sale': hasDiscount }">
            <template v-if="hasDiscount">
              <span class="bg-danger sale-off">
                -{{ account.active_discount }}%
              </span>
              <span class="cash-sale"> {{ finalPrice }} Vnđ </span>
            </template>

            <template v-else> {{ finalPrice }} Vnđ </template>
          </span>
        </v-col>
        <v-col cols="6">
          <nuxt-link :to="detailLink">
            <span class="account-buy">Xem Nick</span>
          </nuxt-link>
        </v-col>
      </v-row>
    </div>
  </v-col>
</template>

<script>
import AccountNinjaTL from "@/components/pages/client/game/ninjas/AccountNinjaTL";

export default {
  name: "AccountNinjaCard",

  components: {
    AccountNinjaTL,
  },

  props: {
    account: {
      type: Object,
      required: true,
    },
  },

  computed: {
    hasDiscount() {
      return this.account.active_discount > 0;
    },

    finalPrice() {
      return this.format_number(this.account.price);
    },

    detailLink() {
      return `/teamobi/ninja-school/${this.account.id}`;
    },

    infoItems() {
      return [
        {
          key: "code",
          cols: 3,
          label: "Mã số",
          value: this.format_number(this.account.id),
        },
        {
          key: "class",
          cols: 3,
          label: "Lớp",
          value: this.classNinja(this.account.class),
        },
        {
          key: "server",
          cols: 6,
          label: "Máy chủ",
          value: this.serverNinja(this.account.server),
        },
      ];
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
.account-body {
  padding: 15px;

  :deep(.v-col) {
    padding: 3px;
    border-radius: 3px;
  }
}

.account-info {
  width: 100%;
  background: #ffefa3;
  border-radius: 5px;
  border: 1px solid #663019;
  text-align: center;
  overflow: hidden;

  .account-thongtin,
  .account-cash,
  .account-buy {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 3px;
    font-size: 14px;
    font-weight: 500;
    line-height: 25px;
    color: #ffcf9c;
    background: #e28637;
    border: 1px solid #663019;
    border-radius: 3px;
    cursor: pointer;
  }

  .account-meta {
    font-size: 11px;
    font-weight: 600;
    color: #663019;
    text-transform: uppercase;
    line-height: 1.4;
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
</style>
