<template>
  <div v-if="imageUrl" class="account-image">
    <AccountImageNinja
      v-if="account.account_type === 'ninja'"
      :account="account"
      :thumbnail="imageUrl"
    />
    <img
      v-else
      :src="imageUrl"
      alt="Ảnh tài khoản game"
      loading="lazy"
      width="300"
      height="200"
      :class="[
        `account-${account.account_type}`,
        {
          full: account?.is_full_image,
        },
      ]"
    />
  </div>
</template>

<script>
import AccountImageNinja from "@/components/common/client/account/AccountImageNinja";

export default {
  name: "AccountImage",
  components: { AccountImageNinja },
  props: {
    account: {
      type: Object,
      required: true,
    },
  },

  computed: {
    imageUrl() {
      const img = this.account?.thumbnail;
      if (!img) return null;

      // Nếu đã là URL đầy đủ (http/https)
      if (/^https?:\/\//.test(img)) {
        return img;
      }

      // Nếu là path tương đối
      return `${process.env.NUXT_PUBLIC_ASSET_URL}${img}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.account-image {
  position: relative;
  overflow: hidden;

  img {
    width: 106.7%;
    height: auto;
    display: block;
    &.account-avatar {
      @media (min-width: 600px) {
        height: 350px !important;
      }
    }
    &.full {
      width: 100% !important;
    }
  }
}
</style>
