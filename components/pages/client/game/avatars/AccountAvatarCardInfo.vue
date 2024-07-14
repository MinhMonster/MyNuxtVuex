<template>
  <div :id="accountAvatar.ID" class="account-info">
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
  border-radius: 4px;
  ::v-deep {
    .fileItemWrapper {
      padding: 6px;
      padding-bottom: 0px;
    }
  }
}
</style>
