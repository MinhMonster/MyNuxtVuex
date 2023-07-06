<template>
  <div v-if="user" class="info-atm-momo">
    <div class="title text-center">HD Nạp Tiền = ATM - MOMO</div>
    <img src="/icon/icon-next-right.gif" /> Bạn Chuyển tiền cho Admin:<br />
    <img src="/icon/icon-next-right.gif" /> Nội dung:
    <span class="sms"
      >NAP MBN {{ user.id }}
      <ButtonCoppy :content="`NAP MBN ${user.id}`"></ButtonCoppy></span
    ><br />
    <img src="/icon/icon-next-right.gif" /> Bạn chuyển xong hãy tạo thông báo
    nạp tiền hoặc nhắn tin cho Admin:
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
    user: {
      type: Object,
      default: () => {},
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