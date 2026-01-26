<template>
  <div v-if="imageUrl" class="account-image">
    <img
      :src="imageUrl"
      alt="Ảnh tài khoản game"
      loading="lazy"
      width="300"
      height="200"
    />
  </div>
</template>

<script>
export default {
  name: "AccountImage",

  props: {
    account: {
      type: Object,
      required: true,
    },
  },

  computed: {
    imageUrl() {
      const img = this.account?.images?.[0];
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
    object-fit: cover;
  }
}
</style>
