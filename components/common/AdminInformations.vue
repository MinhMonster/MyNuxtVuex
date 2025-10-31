<template>
  <div class="info-atm-momo">
    <div class="title text-center">Thông tin liên hệ của Admin:</div>

    <img src="/icon/icon-next-right.gif" /> Zalo:
    <span class="sms">0961646828</span>
    <ButtonCoppy :content="`0961646828`"></ButtonCoppy><br />

    <img src="/icon/icon-next-right.gif" /> Messenger:
    <a href="https://messenger.com/t/minh.docong.7" target="_blank"
      ><span class="sms">Đỗ Minh</span></a
    >
    <ButtonCoppy
      :content="'https://messenger.com/t/minh.docong.7'"
    ></ButtonCoppy
    ><br />

    <img src="/icon/icon-next-right.gif" /> FaceBook:
    <a href="https://www.facebook.com/minh.docong.7" target="_blank"
      ><span class="sms">Đỗ Minh</span></a
    >

    <ButtonCoppy
      :content="'https://www.facebook.com/minh.docong.7'"
    ></ButtonCoppy
    ><br />
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
  }
}
</style>