<template>
  <div>
    <v-row class="hom-page">
      <v-col cols="12" :sm="isTablet ? 12 : 8" md="8" lg="8" id="home-left">
        <v-row style="margin: -15px">
          <!-- <v-col cols="12">
            <div class="page-body">
              <a
                href="https://muabannick.pro"
                class="text-white content"
                target="_blank"
                title="MuaBanNick.Pro"
              >
                <b class="">Thông Báo:</b> <br />
                ⭐ Đây là Website thuộc MuaBanNick.Pro <br />
                ⭐ Đồng bộ tất cả Nick Game, Lịch Sử Giao Dịch...<br />
                ⭐ Các bạn có thể giao dịch thay cho: MuaBanNick.Pro<br />
              </a>
            </div>
          </v-col> -->
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
          <template><DepositCardForm /></template>
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
// import FormLogin from "@/components/pages/client/login/FormLogin";
// import SideBarMenu from "@/components/pages/client/layout/SideBarMenu";
import HomeSlider from "@/components/pages/home/HomeSlider";
import DepositCardForm from "@/components/pages/client/account/wallet/DepositCardForm";

// import RunText from "@/components/global/molecules/common/template/RunText";

// import { mapFields } from "vuex-map-fields";
import { mapState, mapActions } from "vuex";

export default {
  name: "HomeGame",

  components: {
    GameCard,
    // ModalPayload,
    // AdminNotification,
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
    gameList() {
      if (this.isDark) {
        return [
          {
            title: "Avatar XS.DKỳ",
            path: "/teamobi/avatar",
            image: "https://shopnick.online/images/banners/avatar.png",
            numberAccount: "90",
            sold: "69",
          },
          {
            title: "Nick Ninja VIP",
            path: "/teamobi/ninja-school/nick-vip",
            image: "https://shopnick.online/images/banners/ninja-vip.png",

            numberAccount: "5245",
            sold: "5144",
          },
          {
            title: "Nick Ninja Giá Rẻ",
            path: "/teamobi/ninja-school/nick-gia-re",
            image: "https://shopnick.online/images/banners/ninja-cheap.png",
            numberAccount: "7481",
            sold: "7185",
          },
          {
            title: "Ngọc Rồng Online",
            path: "/teamobi/ngoc-rong",
            image: "https://shopnick.online/images/banners/ngocrong.png",
            numberAccount: "515",
            sold: "438",
          },
          {
            title: "Sự kiện Hằng ngày",
            path: "/events/daily",
            image: "https://shopnick.online/images/banners/events.png",
            numberAccount: "5245",
            sold: "5144",
          },

          {
            title: "Đai Tây Du - G4M",
            path: "/g4m/dai-tay-du",
            image: "https://shopnick.online/images/banners/daitaydu.png",

            numberAccount: "90",
            sold: "69",
          },
        ];
      } else {
        return [
          {
            title: "Avatar XS.DKỳ",
            path: "/teamobi/avatar",
            image: "https://shopnick.online/images/banners/avatar-blue.png",
            numberAccount: "90",
            sold: "69",
          },
          {
            title: "Nick Ninja VIP",
            path: "/teamobi/ninja-school/nick-vip",
            image: "https://shopnick.online/images/banners/ninja-vip-blue.png",

            numberAccount: "5245",
            sold: "5144",
          },
          {
            title: "Nick Ninja Giá Rẻ",
            path: "/teamobi/ninja-school/nick-gia-re",
            image:
              "https://shopnick.online/images/banners/ninja-cheap-blue.png",
            numberAccount: "7481",
            sold: "7185",
          },
          {
            title: "Ngọc Rồng Online",
            path: "/teamobi/ngoc-rong",
            image: "https://shopnick.online/images/banners/ngocrong-blue.png",
            numberAccount: "515",
            sold: "438",
          },
          {
            title: "Sự kiện Hằng ngày",
            path: "/events/daily",
            image: "https://shopnick.online/images/banners/events-blue.png",
            numberAccount: "5245",
            sold: "5144",
          },
          {
            title: "Đai Tây Du - G4M",
            path: "/g4m/dai-tay-du",
            image: "https://shopnick.online/images/banners/daitaydu-blue.png",

            numberAccount: "90",
            sold: "69",
          },
        ];
      }
    },
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
