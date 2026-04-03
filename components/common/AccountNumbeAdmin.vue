<template>
  <div class="info-atm-momo">
    <div class="title text-center">Tài khoản Thanh Toán của Admin:</div>

    Chủ tài khoản: <span class="sms">Đỗ Công Minh</span>
    <br />
    <img src="/icon/icon-next-right.gif" /> MB Bank:
    <span class="sms">86812345678899</span>
    <ButtonCoppy :content="'86812345678899'"></ButtonCoppy><br />
  </div>
</template>
<script>
import ButtonCoppy from "@/components/common/ButtonCoppy";

export default {
  components: { ButtonCoppy },
};
</script>
<style lang="scss" scoped>
.info-atm-momo {
  // min-height: 195px;
  .title {
    font-size: 15px !important;
    font-weight: 500;
    margin-bottom: 10px;
  }
}
.sms {
  font-weight: 500;
  color: #b20000;
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
