<template>
  <div class="info-product">
    <div class="image-product">
      <img
        v-if="product.avatar && product.avatar.includes('muabannick.pro')"
        :src="product.avatar"
        alt=""
        class="image-account"
      />
      <img v-else :src="`${product.avatar || imageEmpty}`" alt="" class="image-account" />
    </div>

    <div>
      <div class="title-product text-17-400 text-left mt-2">
        <span> {{ product.name }}</span>
      </div>
      <div
        class="price-product text-17-500 text-left text-yellow"
      >
        <span>{{ format_number(product.price) + " đ"}}</span>
      </div>

      <v-btn
        class="w-100 break-line-1 btn-main text-17-800 mt-2"
        :title="product.name"
      >
        <BaseSvg
          class="icon-menu"
          id="btn-change-theme"
          title="Giỏ Hàng"
          aria-label="Giỏ Hàng"
          name="cart"
        />
        Chọn Mua</v-btn
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
    };
  },
  props: {
    product: {
      type: Object,
      default: null,
    },
  },
  methods: {},
};
</script>

