<template>
  <div v-if="account" class="info-atm-momo">
    <VietQRMB :amount="amount" :addInfo="content">
      <template #info>
        <div>*Nếu QR lỗi, hãy chuyển khoản theo thông tin sau:</div>
        <img src="/icon/icon-next-right.gif" /> Ngân hàng:<span class="sms">
          MB Bank</span
        ><br />
        <img src="/icon/icon-next-right.gif" /> Số tài khoản:
        <span class="sms">
          MuaBanNick
          <ButtonCoppy content="MuaBanNick"></ButtonCoppy>
        </span>
        <br />
        <img src="/icon/icon-next-right.gif" /> Chủ tài khoản:<span class="sms">
          Đỗ Công Minh</span
        ><br />
        <img src="/icon/icon-next-right.gif" /> Số tiền:
        <span class="sms">{{ format_number(amount) }} Vnđ </span>
        <br />
        <img src="/icon/icon-next-right.gif" /> ND:
        <span class="sms">
          {{ content }}
          <ButtonCoppy :content="content"></ButtonCoppy
        ></span>
        <br />
      </template>
    </VietQRMB>

    <img src="/icon/icon-next-right.gif" /> Chuyển xong nhắn tin cho Admin nhận
    Nick:
    <GroupBtnInbox />
  </div>
</template>
<script>
import ButtonCoppy from "@/components/common/ButtonCoppy";
import GroupBtnInbox from "@/components/common/client/button/GroupBtnInbox";
import VietQRMB from "~/components/QR/VietQRMB.vue";

export default {
  components: { ButtonCoppy, GroupBtnInbox, VietQRMB },
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
  computed: {
    game() {
      switch (this.accountType) {
        case "ninja":
          return "Ninja";
        case "avatar":
          return "Avatar";
        case "Ngọc Rồng Online":
          return "NRO";
        default:
          return "";
      }
    },
    price() {
      return this.account.price;
    },
    amount() {
      return this.price;
    },
    content() {
      return `Mua Nick ${this.game} ${this.format_number(
        this.account.code
      )} & SĐT`;
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
