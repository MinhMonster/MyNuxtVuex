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
      <!-- <p class="bold text-italic text-13-700">
        <nuxt-link to="/events/daily" class="text-primary">
          <span class="text-danger">*</span>Tham gia Sự kiện hằng ngày
          <span class="text-danger">"Tại Đây"</span>
        </nuxt-link>
      </p> -->
      <p class="bold text-italic text-13-700">
        <nuxt-link to="/teamobi/avatar">
          <span class="text-danger">*</span> Cập nhật rất nhiều Nick Avatar,
          Ninja School
        </nuxt-link>
      </p>
      <p class="bold text-italic text-13-700">
        <nuxt-link to="/teamobi/ninja-school">
          <span class="text-danger">*</span> Giảm Giá tất cả Nick Ninja Trên
          Shop
        </nuxt-link>
      </p>
      <p class="bold text-italic text-13-700">
        - Nạp Thẻ, Mua Nick tự động không Chiết khấu.
      </p>

      <p class="bold text-italic text-13-700">
        - Hãy nạp tiền từ ATM-MOMO để được +20%
      </p>

      <p class="bold text-italic text-13-700 text-primary">
        <a href="https://zalo.me/0961646828" target="_blank">
          - Mua Xu Ninja, Nick qua ATM-MOMO liên hệ:
        </a>
      </p>
      <AdminInbox />
      <!-- <div class="h-line mgt-10px"></div> -->
      <!-- <div class="flex flex-center change-theme">
        <div class="base-dialog-name text-main bold">
          <span class="mr-1"> Giao Diện Sáng</span>
        </div>

        <v-switch
          v-model="isThemeDark"
          id="change-theme"
          title="Thay Đổi Giao Diện"
          aria-label="Thay Đổi Giao Diện"
          color="main"
          hide-details
        ></v-switch>
        <div class="ml-1 base-dialog-name text-main bold flex">
          <span>Giao Diện Tối</span>
        </div>
      </div> -->
    </div>
  </client-only>
</template>

<script>
import AdminInbox from "@/components/common/client/AdminInbox";
export default {
  components: {
    AdminInbox
  }
};
</script>
<style lang="scss" scoped>
.thongbao {
  p {
    line-height: 35px;
    margin-bottom: 0 !important;
  }
  .change-theme {
    max-width: 260px;
    margin: 10px auto;
  }
}
::v-deep {
  .btn-buy-account-hover {
    padding: 0 !important;
  }
}
</style>
