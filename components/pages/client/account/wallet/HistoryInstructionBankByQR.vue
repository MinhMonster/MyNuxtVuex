<template>
  <div>
    <div class="info-atm-momo">
      <span id="fileHelp" class="form-text text-muted"
      >Hãy chuyển tiền cho Admin để
      <v-btn color="success" class="pd-5px text-black btn-sm">Hoàn thành</v-btn>
      giao dịch nạp tiền này.</span
    >
      <VietQRMB :amount="amount" :addInfo="content">
      <template #info>
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
        <img src="/icon/icon-next-right.gif" /> Nội dung:
        <span class="sms">
          {{ content }}
          <ButtonCoppy :content="content"></ButtonCoppy
        ></span>
        <br />
      </template>
    </VietQRMB>
      <img src="/icon/icon-next-right.gif" /> Sau 5-30p khi bạn đã chuyển tiền
      cho Admin thành công nhưng vẫn chưa được cộng tiền trên Web thì hãy liên
      hệ cho Admin để xử lý:
      <GroupBtnInbox />
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";

import ButtonCoppy from "@/components/common/ButtonCoppy";
import GroupBtnInbox from "@/components/common/client/button/GroupBtnInbox";
import VietQRMB from "~/components/QR/VietQRMB.vue";

export default {
  components: {
    ButtonCoppy,
    GroupBtnInbox,
    VietQRMB
  },
  props: {
    history: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    ...mapState("home/users", ["user"]),
    content() {
      return `NAP MBN ${this.user.id + " " + this.history.ID} `;
    },
    amount() {
      return this.history.moneyAmount;
    }
  },
};
</script>
<style lang="scss" scoped>
div.info-atm-momo {
  border: none !important;
}
</style>
