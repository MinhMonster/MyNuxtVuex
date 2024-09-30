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
              :arrows="false"
              :rows="1"
              :dots="false"
              :rtl="false"
              :infinite="true"
              :draggable="true"
              :swipeToSlide="true"
              class="w-100 slick-product"
            >
              <div
                v-for="(game, index) in gameList"
                :key="index"
                :src="game.image"
                alt=""
                class="slider-item"
              >
                <div class="item-body">
                  <img
                    v-if="game.image.includes('muabannick.pro')"
                    :src="game.image"
                    alt=""
                    class="image-account"
                  />
                  <img
                    v-else
                    :src="`${game.image}`"
                    alt=""
                    class="image-account"
                  />
                  <div>
                    <div class="text-17-400 text-left pd-5px">{{ game.title }}</div>
                    <div class="text-17-500 text-left text-yellow pd-5px mt--5px ">500.000đ</div>

                    <v-btn
                      class="w-100 break-line-1 btn-main text-17-800"
                      :title="game.title"
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
              </div>
            </VueSlickCarousel>
            <GameCard
              v-else
              v-for="(game, index) in gameList"
              :key="index"
              :game="game"
            ></GameCard>
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
    isShowHome() {
      return (
        !this.isNotification ||
        !this.isMobile ||
        (this.isMobile && this.isNotification && !this.onNotification)
      );
    },
    gameList() {
      if (this.isDark) {
        return [
          {
            title: "Khô gà Lá chanh",
            path: "/teamobi/avatar",
            image: "/images/products/kho-ga-la-chanh.jpg",
            numberAccount: "90",
            sold: "69",
          },
          {
            title: "Khô heo Cháy tỏi",
            path: "/teamobi/ninja-school/nick-vip",
            image: "/images/products/kho-heo-chay-toi.jpg",
            numberAccount: "5245",
            sold: "5144",
          },
          {
            title: "Khô bò Xé sợi",
            path: "/teamobi/ninja-school/nick-gia-re",
            image: "/images/products/kho-bo-xe-soi.jpg",
            numberAccount: "7481",
            sold: "7185",
          },
          {
            title: "Mực hấp Nước dừa",
            path: "/teamobi/ngoc-rong",
            image: "/images/products/muc-hap-nuoc-dua.jpg",
            numberAccount: "515",
            sold: "438",
          },
          {
            title: "Combo Gà + Bò",
            path: "/events/daily",
            image: "/images/products/combo-ga-bo.jpg",
            numberAccount: "5245",
            sold: "5144",
          },
          {
            title: "Combo Vui Vẻ",
            path: "/g4m/dai-tay-du",
            image: "/images/products/combo-vui-ve.png",
            numberAccount: "90",
            sold: "69",
          },
          {
            title: "Combo Vui Vẻ",
            path: "/g4m/dai-tay-du",
            image: "/images/products/combo-cau-vong.jpg",
            numberAccount: "90",
            sold: "69",
          },
          {
            title: "Combo Vui Vẻ",
            path: "/g4m/dai-tay-du",
            image: "/images/products/combo-vui-ve.png",
            numberAccount: "90",
            sold: "69",
          },
        ];
      } else {
        return [
          {
            title: "Khô gà Lá chanh",
            path: "/teamobi/avatar",
            image: "/images/products/kho-ga-la-chanh.jpg",
            numberAccount: "90",
            sold: "69",
          },
          {
            title: "Khô heo Cháy tỏi",
            path: "/teamobi/ninja-school/nick-vip",
            image: "/images/products/kho-heo-chay-toi.jpg",

            numberAccount: "5245",
            sold: "5144",
          },
          {
            title: "Khô bò Xé sợi",
            path: "/teamobi/ninja-school/nick-gia-re",
            image: "/images/products/kho-bo-xe-soi.jpg",
            numberAccount: "7481",
            sold: "7185",
          },
          {
            title: "Mực hấp Nước dừa",
            path: "/teamobi/ngoc-rong",
            image: "/images/products/muc-hap-nuoc-dua.jpg",
            numberAccount: "515",
            sold: "438",
          },
          {
            title: "Combo Gà + Bò",
            path: "/events/daily",
            image: "/images/products/combo-ga-bo.jpg",
            numberAccount: "5245",
            sold: "5144",
          },
          {
            title: "Combo Vui Vẻ",
            path: "/g4m/dai-tay-du",
            image: "/images/products/combo-cau-vong.jpg",
            numberAccount: "90",
            sold: "69",
          },
          {
            title: "Combo Vui Vẻ",
            path: "/g4m/dai-tay-du",
            image: "/images/products/combo-vui-ve.png",
            numberAccount: "90",
            sold: "69",
          },
          {
            title: "Combo Vui Vẻ",
            path: "/g4m/dai-tay-du",
            image: "/images/products/combo-cau-vong.jpg",
            numberAccount: "90",
            sold: "69",
          },
          {
            title: "Combo Vui Vẻ",
            path: "/g4m/dai-tay-du",
            image: "/images/products/combo-vui-ve.png",
            numberAccount: "90",
            sold: "69",
          },
        ];
      }
    },
  },
  mounted() {
    this.getNotification();
  },
  methods: {
    ...mapActions("global", ["getNotification"]),
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
