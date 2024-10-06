<template>
  <div>
    <ModalNotification
      v-if="isNotification"
      ref="modal"
      :title="`Thông Báo`"
      size="md"
      @hide="onNotification = false"
    >
    </ModalNotification>
    <v-row class="hom-page">
      <v-col cols="12" id="home-left">
        <v-row style="margin: -15px">
          <v-col cols="12">
            <!-- <RunText v-if="isTablet" /> -->

            <HomeSlider />
          </v-col>
        </v-row>
        <div class="mt-3" id="dich-vu-game">
          <div class="title text-center text-underline">
            Danh Sách Đồ Ăn Vặt
          </div>
          <v-row class="text-center account mt-1 mb-1">
            <VueSlickCarousel
              v-if="isMobile"
              :initialSlide="0.5"
              :slidesToShow="1.5"
              :arrows="true"
              :rows="1"
              :dots="false"
              :rtl="false"
              :infinite="true"
              :draggable="true"
              :swipeToSlide="true"
              class="w-100 slick-product"
            >
              <div
                v-for="(product, index) in products"
                :key="index"
                :src="product.image"
                alt=""
                class="product-item"
                :class="{ skeleton: isSkeleton }"
                >
                <CardProduct :product="product" />
              </div>
            </VueSlickCarousel>
            <v-col
              v-else
              v-for="(product, index) in products"
              :key="index"
              cols="6"
              :sm="6"
              md="3"
              class="product-item"
              :class="{ skeleton: isSkeleton }"
            >
              <CardProduct :product="product"></CardProduct>
            </v-col>
          </v-row>
        </div>
      </v-col>

      <!-- <v-col
        v-if="!isTablet"
        cols="12"
        :sm="isTablet ? 12 : 4"
        md="4"
        lg="4"
        id="home-right"
      >
        <div
          class="mt--1 form-deposit-card"
          :style="{ height: heightHomeLeft + 'px' }"
        >
          <template><DepositCardForm /></template>
        </div>
      </v-col> -->
    </v-row>
  </div>
</template>

<script>
import GameCard from "@/components/pages/home/GameCard";
import ModalNotification from "@/components/pages/client/layout/ModalNotification";
// import FormLogin from "@/components/pages/client/login/FormLogin";
// import SideBarMenu from "@/components/pages/client/layout/SideBarMenu";
import HomeSlider from "@/components/pages/home/HomeSlider";
// import DepositCardForm from "@/components/pages/client/account/wallet/DepositCardForm";
import CardProduct from "@/components/common/products/CardProduct";

// import RunText from "@/components/global/molecules/common/template/RunText";
import { mapFields } from "vuex-map-fields";
import { mapState, mapActions } from "vuex";

export default {
  name: "HomeGame",

  components: {
    GameCard,
    ModalNotification,
    // FormLogin,
    // SideBarMenu,
    HomeSlider,
    CardProduct,
    // DepositCardForm,
    // RunText,
  },
  props: {
    query: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      onNotification: true,
    };
  },
  computed: {
    ...mapState("home/users", ["token", "user"]),
    ...mapFields("global", {
      isNotification: "isNotification",
    }),
    ...mapState("products", ["products", "isSkeleton"]),
    isShowHome() {
      return (
        !this.isNotification ||
        !this.isMobile ||
        (this.isMobile && this.isNotification && !this.onNotification)
      );
    },
  },
  async mounted() {
    await this.getNotification();
    await this.fetchProducts();
  },
  methods: {
    ...mapActions("global", ["getNotification"]),
    ...mapActions("products", ["fetchProducts"]),
  },
};
</script>

<style lang="scss" scoped>
// .form-deposit-card {
//   position: fixed;
//   width: calc(24% + 5px);
//   max-width: 300px;

//   @media (min-width: 876px) {
//     width: calc(25% + 10px);
//   }

//   @media (min-width: 978px) {
//     width: calc(25% + 15px);
//   }
// }
// @media (min-width: 768px) {
//   .form-deposit-card {
//     margin-left: 3%;
//   }
// }

.account {
  margin: -9px;
  cursor: pointer;
}
</style>
