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
          <div class="title text-center text-underline">Danh Sách Đồ Ăn Vặt</div>
          <v-row class="text-center account mb-1">
            <GameCard
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
            title: "Avatar XS.DKỳ",
            path: "/teamobi/avatar",
            image: "/images/products/kho-ga-la-chanh.jpg",
            numberAccount: "90",
            sold: "69",
          },
          {
            title: "Nick Ninja VIP",
            path: "/teamobi/ninja-school/nick-vip",
            image: "/images/products/kho-heo-chay-toi.jpg",
            numberAccount: "5245",
            sold: "5144",
          },
          {
            title: "Nick Ninja Giá Rẻ",
            path: "/teamobi/ninja-school/nick-gia-re",
            image: "/images/products/kho-bo-xe-soi.jpg",
            numberAccount: "7481",
            sold: "7185",
          },
          {
            title: "Ngọc Rồng Online",
            path: "/teamobi/ngoc-rong",
            image: "/images/products/muc-hap-nuoc-dua.jpg",
            numberAccount: "515",
            sold: "438",
          },
          {
            title: "Sự kiện Hằng ngày",
            path: "/events/daily",
            image: "/images/products/combo-ga-bo.jpg",
            numberAccount: "5245",
            sold: "5144",
          },
          {
            title: "Đai Tây Du - G4M",
            path: "/g4m/dai-tay-du",
            image: "/images/products/combo-vui-ve.png",
            numberAccount: "90",
            sold: "69",
          },
          {
            title: "Đai Tây Du - G4M",
            path: "/g4m/dai-tay-du",
            image: "/images/products/combo-cau-vong.jpg",
            numberAccount: "90",
            sold: "69",
          },
          {
            title: "Đai Tây Du - G4M",
            path: "/g4m/dai-tay-du",
            image: "/images/products/combo-vui-ve.png",
            numberAccount: "90",
            sold: "69",
          },
        ];
      } else {
        return [
          {
            title: "Avatar XS.DKỳ",
            path: "/teamobi/avatar",
            image: "/images/products/kho-ga-la-chanh.jpg",
            numberAccount: "90",
            sold: "69",
          },
          {
            title: "Nick Ninja VIP",
            path: "/teamobi/ninja-school/nick-vip",
            image: "/images/products/kho-heo-chay-toi.jpg",

            numberAccount: "5245",
            sold: "5144",
          },
          {
            title: "Nick Ninja Giá Rẻ",
            path: "/teamobi/ninja-school/nick-gia-re",
            image: "/images/products/kho-bo-xe-soi.jpg",
            numberAccount: "7481",
            sold: "7185",
          },
          {
            title: "Ngọc Rồng Online",
            path: "/teamobi/ngoc-rong",
            image: "/images/products/muc-hap-nuoc-dua.jpg",
            numberAccount: "515",
            sold: "438",
          },
          {
            title: "Sự kiện Hằng ngày",
            path: "/events/daily",
            image: "/images/products/combo-ga-bo.jpg",
            numberAccount: "5245",
            sold: "5144",
          },
          {
            title: "Đai Tây Du - G4M",
            path: "/g4m/dai-tay-du",
            image: "/images/products/combo-cau-vong.jpg",
            numberAccount: "90",
            sold: "69",
          },
          {
            title: "Đai Tây Du - G4M",
            path: "/g4m/dai-tay-du",
            image: "/images/products/combo-vui-ve.png",
            numberAccount: "90",
            sold: "69",
          },
          {
            title: "Đai Tây Du - G4M",
            path: "/g4m/dai-tay-du",
            image: "/images/products/combo-cau-vong.jpg",
            numberAccount: "90",
            sold: "69",
          },
          {
            title: "Đai Tây Du - G4M",
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
