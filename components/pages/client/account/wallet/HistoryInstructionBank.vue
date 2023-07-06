<template>
  <div>
    <div id="next-top" class="title text-center">
      Hướng dẫn nạp tiền qua {{ history.walletType }}
    </div>
    <small id="fileHelp" class="form-text text-muted"
      >Hãy chuyển tiền cho Admin để
      <b-badge variant="success" class="text-white pd-5px">Hoàn thành</b-badge>
      giao dịch nạp tiền này.</small
    >
    <div class="info-atm-momo">
      <img src="/icon/icon-next-right.gif" /> Bạn Chuyển tiền cho Admin:<br />
      <img src="/icon/icon-next-right.gif" />
      {{ history.walletType }}:
      <span class="sms"
        >{{ numberWalletAdmin(history.walletType) }}
        <ButtonCoppy
          :content="numberWalletAdmin(history.walletType)"
        ></ButtonCoppy> </span
      ><br />
      <img src="/icon/icon-next-right.gif" /> Người nhận:
      <span class="sms">Đỗ Công Minh</span> <br />
      <img src="/icon/icon-next-right.gif" /> Nội dung:
      <span class="sms"
        >NAP MBN {{ user.id }}
        <ButtonCoppy :content="`NAP MBN ${user.id}`"></ButtonCoppy> </span
      ><br />
      <img src="/icon/icon-next-right.gif" /> Sau 5-30p khi bạn đã chuyển tiền
      cho Admin thành công nhưng vẫn chưa được cộng tiền trên Web thì hãy liên
      hệ cho Admin để xử lý:
      <AdminInbox />
    </div>
  </div>
</template>
<script>
import ButtonCoppy from "@/components/common/ButtonCoppy";
import AdminInbox from "@/components/common/client/AdminInbox";

import mixins from "@/mixins/index";

export default {
  mixins: [mixins],

  components: {
    ButtonCoppy,
    AdminInbox,
  },
  props: {
    history: {
      type: Object,
      default: () => {},
    },
    user: {
      type: Object,
      default: () => {},
    },
  },
};
</script>