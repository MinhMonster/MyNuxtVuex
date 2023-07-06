<template>
  <client-only>
    <div class="thongbao">
      <p class="bold text-italic text-13-700">
        <nuxt-link to="/admin-information" class="text-success">
          <span class="text-danger">*</span> Giảm 10% tất cả&nbsp;Nick Trên Shop nhé AE
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

      <p class="bold text-italic text-13-700 text-danger">
        <span>- Shop tạm thời ngừng bán xu nhé AE</span>
      </p>
      <p class="bold text-italic text-13-700 text-danger">
        <nuxt-link to="/admin-information">
          - Bảo trì nạp thẻ, AE mua nick inbox Admin nhé!
        </nuxt-link>
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
