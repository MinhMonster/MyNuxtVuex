<template>
  <client-only>
    <div class="thongbao">
      <p class="bold text-italic text-13-700">
        <a
          href="https://www.facebook.com/groups/ninjaschoolonlineteamobile"
          target="_blank"
          class="text-primary"
        >
          <span class="text-danger">*</span> Group mới 
          <img src="/icon/icon-next-right.gif" /> Ninja School Online All Server
        </a>
      </p>
      <p class="bold text-italic text-13-700">
        <nuxt-link to="/admin-information" class="text-success">
          <span class="text-danger">*</span> Giảm 10% tất cả&nbsp;Nick Trên Shop
          đến 30/07
        </nuxt-link>
      </p>
      <p class="bold text-italic text-13-700 text-danger">
        <nuxt-link to="/account/wallet/deposit/card">
          - Nạp Thẻ, Mua Nick tự động 100% <br />
          - Nạp Thẻ tự động không mất Chiết khâu.
        </nuxt-link>
      </p>

      <p class="bold text-italic text-13-700">
        <nuxt-link to="/account/wallet/deposit/vnd" class="text-primary"
          >- Hãy nạp&nbsp;tiền từ ATM-MOMO để được +20%
        </nuxt-link>
      </p>

      <p class="bold text-italic text-13-700">
        <a
          href="https://zalo.me/0961646828"
          target="_blank"
          class="text-primary"
        >
          - Mua&nbsp;Nick qua atm, momo ib zalo&nbsp;Admin
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
  }
}
::v-deep {
  .btn-buy-account-hover {
    padding: 0 !important;
  }
}
</style>
