<template>
  <div class="info-content">
    <p>
      <span class="text-main text-18-700"><u>Ghi chú:</u></span>
    </p>
    <p>
      <span style="font-size: 16px"
        >Nạp thẻ tự động không trừ chiết khấu.<br />
        <span class="bold text-danger"
          >Ví dụ: nạp 100k Card = 100k Shop.</span
        ></span
      >
    </p>
    <p>
      <span style="font-size: 16px"
        >Thẻ nạp tự động
        <span class="bold text-danger"><u>SAI MỆNH GIÁ</u></span
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

import mixins from "@/mixins/index";

export default {
  mixins: [mixins],
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