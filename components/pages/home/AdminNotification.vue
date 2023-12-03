<template>
  <client-only>
    <div class="thongbao">
      <!-- <p class="bold text-italic text-13-700">
        <a
          href="https://www.facebook.com/groups/ninjaschoolonlineteamobile"
          target="_blank"
          class="text-primary"
        >
          <span class="text-danger">*</span> Group mới
          <img src="/icon/icon-next-right.gif" /> Ninja School Online All Server
        </a>
      </p> -->
      <!-- <p class="bold text-italic text-13-700">
        <nuxt-link to="/teamobi/ninja-school" class="text-primary"
          >- Admin cập nhật Nick Mới hằng ngày
        </nuxt-link>
      </p> -->
      <p class="bold text-italic text-13-700">
        <nuxt-link to="/events/daily" class="text-primary"
          ><span class="text-danger">*</span>Tham gia Sự kiện hằng ngày <span class="text-danger">"Tại Đây"</span>
        </nuxt-link>
      </p>
      <p class="bold text-italic text-13-700">
        <nuxt-link to="/admin-information" class="text-success">
          <span class="text-danger">*</span> Giảm 20% tất cả Nick Trên Shop đến
          09/12
        </nuxt-link>
      </p>
      <p class="bold text-italic text-13-700 text-danger">
        <nuxt-link to="/account/wallet/deposit/card">
          - Nạp Thẻ, Mua Nick tự động không Chiết khấu.
        </nuxt-link>
      </p>

      <p class="bold text-italic text-13-700">
        <nuxt-link to="/account/wallet/deposit/vnd" class="text-primary"
          >- Hãy nạp tiền từ ATM-MOMO để được +20%
        </nuxt-link>
      </p>

      <p class="bold text-italic text-13-700">
        <a
          href="https://zalo.me/0961646828"
          target="_blank"
          class="text-primary"
        >
          - Mua Nick qua ATM-MOMO liên hệ Admin
        </a>
      </p>

      <AdminInbox />
    </div>
  </client-only>
</template>

<script>
import AdminInbox from "@/components/common/client/AdminInbox";
export default {
  components: {
    AdminInbox,
  },
};
</script>
<style lang="scss" scoped>
.thongbao {
  p {
    line-height: 35px;
    margin-bottom: 0 !important;
  }
}
::v-deep {
  .btn-buy-account-hover {
    padding: 0 !important;
  }
}
</style>
