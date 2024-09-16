<template>
  <div v-if="account" class="info-atm-momo">
    <div class="title text-center">HD Mua Nick = ATM - MOMO</div>
    <img src="/icon/icon-next-right.gif" /> Bạn Chuyển tiền cho Admin:<br />
    <img src="/icon/icon-next-right.gif" /> Số tiền:
    <span class="sms"
      >{{
        account.saleOff
          ? cash_atm(
              (account.giatien || account.price) * (1 - account.saleOff / 100)
            )
          : cash_atm(account.giatien || account.price)
      }}
    Vnđ </span
    ><br />
    <img src="/icon/icon-next-right.gif" /> ND:
    <span class="sms"
      >Mua Nick {{ accountType }} {{ format_number(account.ID) }} & SĐT
      <ButtonCoppy
        :content="`Mua Nick ${accountType} ${format_number(account.ID)} & SĐT`"
      ></ButtonCoppy></span
    ><br />
    <img src="/icon/icon-next-right.gif" /> Chuyển xong nhắn tin cho Admin nhận
    Nick:
    <AdminInbox />
  </div>
</template>
<script>
import ButtonCoppy from "@/components/common/ButtonCoppy";
import AdminInbox from "@/components/common/client/AdminInbox";

import mixins from "@/mixins/index";

export default {
  mixins: [mixins],
  components: { ButtonCoppy, AdminInbox },
  props: {
    account: {
      type: Object,
      default: () => {},
    },
    accountType: {
      type: String,
      default: "",
    },
  },
};
</script>
<style lang="scss" scoped>
.info-atm-momo {
  min-height: 195px;
  .title {
    font-size: 15px !important;
    font-weight: 500;
    margin-bottom: 10px;
  }
}
.sms {
  font-weight: 500;
  color: #f64e60;
}

.title {
  color: #561d00;
}
@media (max-width: 599px) {
  .info-atm-momo {
    height: auto;
    min-height: 150px !important;
  }
}
</style>