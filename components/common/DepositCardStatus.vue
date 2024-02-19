<template>
  <div class="info-content">
    <p>
      <span class="text-main text-18-700"><u>Lưu ý:</u></span>
    </p>
    <p>
      <span style="font-size: 16px"
        >Nạp thẻ&nbsp;không trừ chiết khấu,&nbsp;<strong
          ><span style="color: #e74c3c">100k Card = 100k Shop.</span></strong
        ></span
      >
    </p>
    <p>
      <span style="font-size: 16px"
        >Thẻ nạp tự động
        <span style="color: #e74c3c"
          ><u><strong>SAI MỆNH GIÁ</strong></u></span
        ><strong>&nbsp;</strong>mất 100%&nbsp;giá trị vui lòng xem xét kĩ trước
        khi nạp</span
      >
    </p>

    <p>
      <span style="font-size: 16px"
        >Nếu Thẻ&nbsp;đúng nạp báo&nbsp;sai nhưng thẻ chưa sử dụng.
      </span>
    </p>

    <p>
      <span style="font-size: 16px"
        >=> Quý khách nạp lại bằng cách sửa số seri phía cuối cùng thành x hoặc
        y,z,...Rồi nạp lại</span
      >
    </p>
  </div>
</template>
<script>
import ButtonCoppy from "@/components/common/ButtonCoppy";
import AdminInbox from "@/components/common/client/AdminInbox";

export default {
  components: { ButtonCoppy, AdminInbox },
  props: {
    history: {
      type: Object,
      default: () => {},
    },
  },
};
</script>
<style lang="scss" scoped>
.info-content {
  min-height: 270px;
}
@media (max-width: 1263px) {
  .info-content {
    height: auto;
    min-height: 200px;
  }
}
</style>