<template>
  <div class="flex cart-item">
    <BaseSvg
        class="close"
        color="red"
        id="btn-close-modal-header"
        title="Xóa"
        aria-label="Xóa"
        @click="deleteCart(index)"
        name="close"
      />
    <img
      :src="cart.avatar"
      class="size-[5rem] shrink-0 object-contain rounded-md"
      alt="Khô Bò Miếng Lớn Đặc Sản Tây Nguyên Thích Hợp Làm Quà Biếu, Tặng Loại 200G - 500G - 1000G  | BA THỨC FOOD - [500 Gram]"
      loading="lazy"
    />
    <div class="cart-info pd-lr-10px">

      <div>
        <p class="text-14-700 mb-1">{{ cart.name }}</p>
        <p class="text-13-500 text-gray">500 Gram</p>
      </div>

      <p class="flex mb-3">
        <span class="text-success text-14-700 mr-2"
          >{{ format_number(cart.price) }}₫</span
        ><span class="text-14-500 mr-2">415.000₫</span>
      </p>
      <div class="flex flex-between flex-center gap-3">
        <div class="flex quantity">
          <BaseSvg
            color="black"
            title="Giảm"
            aria-label="Giảm"
            name="reduce"
            :disabled="totalCart <= 1"
            @click="totalCart--"
          />
          <input
            min="1"
            max="1000"
            class="appearance-none focus-visible:outline-none w-35 text-sm font-bold text-center"
            type="tel"
            v-model="totalCart"
          />
          <BaseSvg
            color="black"
            title="Tăng"
            aria-label="Tăng"
            name="increase"
            :disabled="totalCart >= cart.quantity"
            @click="totalCart++"
          />
        </div>
        <div class="total-cash-product">
          <strong class="text-lg text-primary"
            >{{ format_number(cart.price * totalCart) }}₫</strong
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  watch: {
    totalCart: {
      async handler(newValue, oldValue) {
        this.setCart({
          index: this.index,
          value: { ...this.cart, total: _.cloneDeep(this.totalCart) },
        });
      },
    },
  },
  props: {
    index: {
      type: [String, Number],
      required: true,
    },
  },
  data() {
    return {
      dialog: false,
      totalCart: 1,
    };
  },
  computed: {
    ...mapGetters("carts", ["getCart"]),
    cart() {
      return this.getCart(this.index);
    },
  },
  methods: {
    ...mapActions("carts", [
      "setCart",
      "deleteCart",
    ]),
  },
  mounted() {
    this.totalCart = this.cart.total;
  },
};
</script>

