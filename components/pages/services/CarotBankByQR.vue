<template>
  <div>
    <div class="info-atm-momo">
      <span id="fileHelp" class="form-text text-muted"
        >Hãy chuyển tiền cho Admin để
        <v-btn color="success" class="pd-5px text-black btn-sm"
          >Hoàn thành</v-btn
        >
        giao dịch này.</span
      >
      <VietQRMB :accountNo="accountNo" :amount="amount" :addInfo="content">
        <template #info>
          <div>*Nếu QR lỗi, hãy chuyển khoản theo thông tin sau:</div>
          <img src="/icon/icon-next-right.gif" /> Ngân hàng:<span class="sms">
            MB Bank</span
          ><br />
          <img src="/icon/icon-next-right.gif" /> Số tài khoản:
          <span class="sms">
            {{ accountNo }}
            <ButtonCoppy :content="accountNo"></ButtonCoppy>
          </span>
          <br />
          <img src="/icon/icon-next-right.gif" /> Chủ tài khoản:<span
            class="sms"
          >
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
      <img src="/icon/icon-next-right.gif" /> Sau 30s-5p Admin sẽ nạp Lượng,
      Carot cho bạn.
      <br />
      <img src="/icon/icon-next-right.gif" /> Sau 5p khi bạn đã chuyển tiền cho
      Admin thành công nhưng vẫn chưa được xử lý thì hãy liên hệ cho Admin kèm
      bill chuyển tiền để được hỗ trợ:
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
    VietQRMB,
  },
  props: {
    history: {
      type: Object,
      default: () => {},
    },
    selected: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    ...mapState("home/users", ["user"]),
    content() {
      return `Carot  ${
        this.selected.card.label +
        " " +
        this.selected.game.subtext +
        " " +
        this.history.username +
        " " +
        this.selected.server.subtext
      } `;
    },
    amount() {
      return Number(this.selected.card.price);
    },
    accountNo() {
      return "MuaBanNick";
    },
  },
};
</script>
<style lang="scss" scoped>
div.info-atm-momo {
  border: none !important;
}
</style>
