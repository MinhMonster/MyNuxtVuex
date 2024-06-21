<template>
  <div>
    <ModalNotification
      ref="modal"
      :title="`Thông Báo`"
      size="md"
      @hide="onNotification = false"
    >
    </ModalNotification>
    <v-row v-if="isShowHome" class="hom-page">
      <v-col cols="12" :sm="isTablet ? 12 : 8" md="8" lg="8" id="home-left">
        <v-row style="margin: -15px">
          <v-col cols="12">
            <!-- <RunText v-if="isTablet" /> -->

            <HomeSlider />
          </v-col>
        </v-row>
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

      <v-col
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
          <template
            ><DepositCardForm
          /></template>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import GameCard from "@/components/pages/home/GameCard";
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
    ModalNotification,
    // FormLogin,
    // SideBarMenu,
    HomeSlider,
    DepositCardForm
    // RunText,
  },
  props: {
    query: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      gameList: [
        {
          title: "Shop Nick Mới",
          path: "https://shopnick.online",
          image:
            "https://muabannick.pro/images/banners/banner-shopnickonline.png",
          numberAccount: "90",
          sold: "69",
          target: true
        },
        {
          title: "Avatar XS.DKỳ",
          path: "/teamobi/avatar",
          image: "https://muabannick.pro/images/banners/banner_avatar_min.jpg",
          numberAccount: "90",
          sold: "69"
        },
        {
          title: "Nick Ninja VIP",
          path: "/teamobi/ninja-school/nick-vip",
          image:
            "https://muabannick.pro/images/banners/banner_ninja_vip_min.jpg",
          numberAccount: "5245",
          sold: "5144"
        },
        {
          title: "Nick Ninja Giá Rẻ",
          path: "/teamobi/ninja-school/nick-gia-re",
          image:
            "https://muabannick.pro/images/banners/banner_ninja_cheap_min.jpg",
          numberAccount: "7481",
          sold: "7185"
        },

        {
          title: "Sự kiện Hằng ngày",
          path: "/events/daily",
          image:
            "https://muabannick.pro/images/banners/banner_daily_events_min.jpg",
          numberAccount: "5245",
          sold: "5144"
        },

        {
          title: "Ngọc Rồng Online",
          path: "/teamobi/ngoc-rong",
          image: "https://muabannick.pro//images/banners/banner_nro_min.jpg",
          numberAccount: "515",
          sold: "438"
        }
      ]
    };
  },
  computed: {
    ...mapState("home/users", ["token", "user"]),
    ...mapFields("global", {
      // isNotification: "isNotification",
      onNotification: "onNotification"
    }),
    isShowHome() {
      return (
        // !this.isNotification ||
        !this.isMobile ||
        (this.isMobile &&
          // this.isNotification &&
          !this.onNotification)
      );
    }
  },
  mounted() {
    this.onNotification = true;
    // this.getNotification();
  },
  methods: {
    // ...mapActions("global", ["getNotification"]),
  }
};
</script>

<style lang="scss" scoped>
.account {
  margin: -9px;
  cursor: pointer;
}
</style>
