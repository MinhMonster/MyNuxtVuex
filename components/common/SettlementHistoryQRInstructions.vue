<template>
  <div v-if="history" class="info-atm-momo">
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

    <img src="/icon/icon-next-right.gif" /> Chuyển xong nhắn tin cho Admin để xử
    lý GD:
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
    history: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    game() {
      switch (this.history.account_type) {
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
    amount() {
      return this.history.second_paid_amount;
    },
    content() {
      const accountCode = this.history.account_code;
      const historyId = this.history.id;
      switch (this.history.type) {
        case "installments":
          return `Thanh toan GD Tra gop #${historyId} Nick ${this.game} #${accountCode}`;
        case "deposit":
          return `Thanh toan GD Dat coc #${historyId} Nick ${this.game} #${accountCode}`;
        default:
          return `Thanh toan GD Mua Nick #${historyId} Nick ${this.game} #${accountCode}`;
      }
    },
  },
};
</script>
