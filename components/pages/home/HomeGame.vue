<template>
  <div>
    <v-row class="hom-page">
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
        <div class="mt--1 home-user" :style="{ height: heightHomeLeft + 'px' }">
          <template v-if="token"><SideBarMenu /></template>
          <template v-else><FormLogin /></template>
        </div>
      </v-col>
    </v-row>

    <!-- <ModalPayload
      v-if="isNotification"
      ref="modal"
      :title="`Thông Báo`"
      size="md"
    >
      <template #content>
        <div class="page-body">
          <AdminNotification />
        </div>
      </template>
      <template #footer-button>
        <v-btn
          size="sm"
          color="warning"
          @click="setNotification(), $refs.modal.close()"
        >
          <span>Đóng 2 giờ</span>
        </v-btn>
      </template>
    </ModalPayload> -->
  </div>
</template>

<script>
import GameCard from "@/components/pages/home/GameCard";
// import ModalPayload from "@/components/common/ModalPayload";
// import AdminNotification from "@/components/pages/home/AdminNotification";
import FormLogin from "@/components/pages/client/login/FormLogin";
import SideBarMenu from "@/components/pages/client/layout/SideBarMenu";
import HomeSlider from "@/components/pages/home/HomeSlider";
// import RunText from "@/components/global/molecules/common/template/RunText";

// import { mapFields } from "vuex-map-fields";
import { mapState, mapActions } from "vuex";
export default {
  name: "HomeGame",

  components: {
    GameCard,
    // ModalPayload,
    // AdminNotification,
    FormLogin,
    SideBarMenu,
    HomeSlider,
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
      gameList: [
        {
          title: "Nick Ninja VIP",
          path: "/teamobi/ninja-school/nick-vip",
          image:
            "https://muabannick.pro/images/banners/banner_ninja_vip_min.jpg",
          numberAccount: "5245",
          sold: "5144",
        },
        {
          title: "Nick Ninja Giá Rẻ",
          path: "/teamobi/ninja-school/nick-gia-re",
          image:
            "https://muabannick.pro/images/banners/banner_ninja_cheap_min.jpg",
          numberAccount: "7481",
          sold: "7185",
        },
        {
          title: "Sự kiện Hằng ngày",
          path: "/events/daily",
          image:
            "https://muabannick.pro/images/banners/banner_daily_events_min.jpg",
          numberAccount: "5245",
          sold: "5144",
        },
        {
          title: "Avatar XS.DKỳ",
          path: "/teamobi/avatar",
          image: "https://muabannick.pro/images/banners/banner_avatar_min.jpg",
          numberAccount: "90",
          sold: "69",
        },
        {
          title: "Ngọc Rồng Online",
          path: "/teamobi/ngoc-rong",
          image: "https://muabannick.pro//images/banners/banner_nro_min.jpg",
          numberAccount: "515",
          sold: "438",
        },
        {
          title: "Đai Tây Du - G4M",
          path: "/g4m/dai-tay-du",
          image:
            "https://muabannick.pro/images/banners/banner_dai_tay_du_g4m_min.jpg",
          numberAccount: "90",
          sold: "69",
        },
      ],
    };
  },
  computed: {
    ...mapState("home/users", ["token", "user"]),
  },

};
</script>

<style lang="scss" scoped>
.home-user {
  position: fixed;
  width: calc(25% + 5px);
  max-width: 300px;

  @media (min-width: 876px) {
    width: calc(25% + 10px);
  }

  @media (min-width: 978px) {
    width: calc(25% + 15px);
  }
}
@media (min-width: 768px) {
  .hom-page {
    margin-left: 3%;
  }
}

.account {
  margin: -9px;
  cursor: pointer;
}
.btn-next-more {
  color: #ffffff;
  background: #a21d0a !important;
  text-align: center;
  margin: 0 auto;
}
</style>
