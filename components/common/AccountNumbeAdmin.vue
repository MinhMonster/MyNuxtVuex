<template>
  <div class="info-atm-momo">
    <div class="title text-center">Tài khoản Thanh Toán của Admin:</div>

    Chủ tài khoản: <span class="sms">Đỗ Công Minh</span>
    <br />

    <img src="/icon/icon-next-right.gif" /> Momo:
    <span class="sms">0961646828</span>
    <ButtonCoppy :content="`0961646828`"></ButtonCoppy><br />

    <img src="/icon/icon-next-right.gif" /> MB Bank:
    <span class="sms">8330105578888</span>
    <ButtonCoppy :content="'8330105578888'"></ButtonCoppy><br />

    <img src="/icon/icon-next-right.gif" /> VietinBank:
    <span class="sms">107006711803</span>
    <ButtonCoppy :content="'107006711803'"></ButtonCoppy><br />

    <img src="/icon/icon-next-right.gif" /> VietcomBank:
    <span class="sms">0541000311219</span>
    <ButtonCoppy :content="'0541000311219'"></ButtonCoppy><br />
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