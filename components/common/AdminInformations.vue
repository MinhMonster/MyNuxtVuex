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

    <!-- <p style="text-align: center">
      <a href="https://messenger.com/t/minh.docong.7" target="_blank"
        ><span style="color: #2980b9"
          ><strong><img src="/icon/icon-next-right.gif" /> </strong></span
        ><span style="color: #ff0033"><strong>FB Admin: Đỗ Minh</strong></span
        ><span style="color: 3893cd"> </span>
      </a>
      -
      <a href="https://zalo.me/0961646828" target="_blank"
        ><span style="color: #0099cc"
          ><strong>ZALO, SĐT: 0961.646.828</strong></span
        ></a
      >
    </p> -->
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