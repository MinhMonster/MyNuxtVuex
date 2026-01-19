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
        <div class="mt-3" id="account">
          <div class="title text-center text-underline">TÀI KHOẢN</div>
          <v-row class="text-center account mb-1">
            <AccountCard
              v-for="(game, index) in accountList"
              :key="index"
              :game="game"
            ></AccountCard>
          </v-row>
        </div>
        <!-- <div class="mt-3" id="service">
          <div class="title text-center text-underline">DỊCH VỤ</div>
          <v-row class="text-center account mb-1">
            <AccountCard
              v-for="(game, index) in serviceList"
              :key="index"
              :game="game"
            ></AccountCard>
          </v-row>
        </div> -->
        <div class="mt-3" id="dich-vu-game">
          <div class="title text-center text-underline">DỊCH VỤ GAME</div>
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
          <SideBarMenu />
        </div>
      </v-col> -->
    </v-row>
  </div>
</template>

<script>
import GameCard from "@/components/pages/home/GameCard";
import AccountCard from "@/components/pages/home/AccountCard";
import ModalNotification from "@/components/pages/client/layout/ModalNotification";
// import FormLogin from "@/components/pages/client/login/FormLogin";
// import SideBarMenu from "@/components/pages/client/layout/SideBarMenu";
import HomeSlider from "@/components/pages/home/HomeSlider";
import DepositCardForm from "@/components/pages/client/account/wallet/DepositCardForm";

// import RunText from "@/components/global/molecules/common/template/RunText";

import { mapFields } from "vuex-map-fields";
import { mapState, mapActions } from "vuex";
export default {
  name: "HomeGame",

  components: {
    GameCard,
    AccountCard,
    ModalNotification,
    // FormLogin,
    // SideBarMenu,
    HomeSlider,
    DepositCardForm,
    // RunText,
  },
  props: {
    query: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {};
  },
  computed: {
    ...mapState("home/users", ["token", "user"]),
    ...mapFields("global", {
      isNotification: "isNotification",
      onNotification: "onNotification",
    }),
    isShowHome() {
      return (
        !this.isNotification ||
        !this.isMobile ||
        (this.isMobile && this.isNotification && !this.onNotification)
      );
    },
    accountList() {
      return [
        {
          title: this.isLogin ? "Tài Khoản" : "Đăng Nhập",
          path: "/account/profile",
          image: this.isThemeRed
            ? this.isLogin
              ? "/images/banners/account-red.png"
              : "/images//banners/login-red.png"
            : this.isLogin
            ? "/images/banners/account.jpg"
            : "/images/banners/login.jpg",
        },

        {
          title: "Nạp Tiền từ ATM MOMO",
          path: "/account/wallet/deposits/bank",
          image: this.isThemeRed
            ? "/images/banners/top-up-red.png"
            : "/images/banners/top-up.png",
        },
        {
          title: "Nạp Tiền từ Thẻ Cào",
          path: "/account/wallet/deposits/card",
          image: this.isThemeRed
            ? "/images/banners/top-up-card-red.png"
            : "/images/banners/top-up-card.png",
        },
        {
          title: "Lịch Sử Mua Nick",
          path: "/account/purchases",
          image: this.isThemeRed
            ? "/images/banners/history-buy-account-red.png"
            : "/images/banners/history-buy-account.png",
        },
      ];
    },
    serviceList() {
      return [
        {
          title: "Cài đặt ChatGPT Plus",
          path: "/account/purchases",
          image: this.isThemeRed
            ? "/images/banners/history-buy-account-red.png"
            : "/images/banners/chatgpt.png",
        },
      ];
    },
    gameList() {
      return [
        // {
        //   title: "Shop Nick Mới",
        //   path: "https://shopnick.online",
        //   image:
        //     "https://muabannick.pro/images/banners/banner-shopnickonline.png",
        //   numberAccount: "90",
        //   sold: "69",
        //   target: true,
        // },
        {
          title: "Avatar XS.DKỳ",
          path: "/teamobi/avatar",
          image: this.isThemeDark
            ? "https://muabannick.pro/images/banners/banner_avatar_min.jpg"
            : this.isThemeRed
            ? "/images/banners/avatar-red.png"
            : "https://muabannick.pro/images/banners/banner_avatar_min.jpg",
        },
        {
          title: "Nick Ninja VIP",
          path: "/teamobi/ninja-school/nick-vip",
          image: this.isThemeDark
            ? "https://muabannick.pro/images/banners/banner_ninja_vip_min.jpg"
            : this.isThemeRed
            ? "/images/banners/ninja-vip-red.png"
            : "https://muabannick.pro/images/banners/banner_ninja_vip_min.jpg",
        },
        {
          title: "Nick Ninja Giá Rẻ",
          path: "/teamobi/ninja-school/nick-gia-re",
          image: this.isThemeDark
            ? "https://muabannick.pro/images/banners/banner_ninja_cheap_min.jpg"
            : this.isThemeRed
            ? "/images/banners/ninja-cheap-red.png"
            : "https://muabannick.pro/images/banners/banner_ninja_cheap_min.jpg",
        },
        {
          title: "Nạp Lượng, Carot",
          path: "/services/nap-luong-carot",
          image: "/images/banners/carot.png",
        },
        {
          title: "Bán Xu Ninja",
          path: "/services/mua-ban-xu-ninja-school",
          image: "/images/banners/xu-ninja.png",
        },

        // {
        //   title: "Sự kiện Hằng ngày",
        //   path: "/events/daily",
        //   image: this.isThemeDark
        //     ? "https://muabannick.pro/images/banners/banner_daily_events_min.jpg"
        //     : this.isThemeRed
        //     ? "/images/banners/event-red.png"
        //     : "https://muabannick.pro/images/banners/banner_daily_events_min.jpg",
        //   numberAccount: "5245",
        //   sold: "5144",
        // },

        // {
        //   title: "Ngọc Rồng Online",
        //   path: "/teamobi/ngoc-rong",
        //   image: this.isThemeDark
        //     ? "https://muabannick.pro//images/banners/banner_nro_min.jpg"
        //     : this.isThemeRed
        //     ? "/images/banners/ngoc-rong-red.png"
        //     : "https://muabannick.pro//images/banners/banner_nro_min.jpg",
        // },
        {
          title: "GD Trung Gian",
          path: "/services/giao-dich-trung-gian",
          image: "/images/banners/gdtg.png",
        },
      ];
    },
  },
  mounted() {
    this.onNotification = true;
    this.getNotification();
  },
  methods: {
    ...mapActions("global", ["getNotification"]),
  },
};
</script>

<style lang="scss" scoped>
.account {
  margin: -9px;
  cursor: pointer;
}
</style>
