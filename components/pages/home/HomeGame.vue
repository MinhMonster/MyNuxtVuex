<template>
  <div>
    <b-row class="text-center account">
      <GameCard
        v-for="(game, index) in gameList"
        :key="index"
        :game="game"
      ></GameCard>
    </b-row>

    <ModalPayload
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
        <b-button
          size="sm"
          variant="warning"
          @click="setNotification(), $refs.modal.close()"
        >
          <span>Đóng 2 giờ</span>
        </b-button>
      </template>
    </ModalPayload>
  </div>
</template>

<script>
import mixins from "@/mixins/index";
import GameCard from "@/components/pages/home/GameCard";
import ModalPayload from "@/components/common/ModalPayload";
import AdminNotification from "@/components/pages/home/AdminNotification";

import { mapFields } from "vuex-map-fields";
import { mapState, mapActions } from "vuex";
export default {
  name: "AccountNinjaList",
  mixins: [mixins],

  components: { GameCard, ModalPayload, AdminNotification },
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
          image: "https://muabannick.pro/images/banner/mua-nick-ninja.gif",
          numberAccount: "5245",
          sold: "5144",
        },
        {
          title: "Nick Ninja Giá Rẻ",
          path: "/teamobi/ninja-school/nick-gia-re",
          image: "https://muabannick.pro/images/banner/mua-nick-ninja.gif",
          numberAccount: "7481",
          sold: "7185",
        },
        {
          title: "Avatar XS.DKỳ",
          path: "/teamobi/avatar",
          image: "https://muabannick.pro/images/banner/mua-nick-avatar.jpg",
          numberAccount: "90",
          sold: "69",
        },
        {
          title: "Đai Tây Du - G4M",
          path: "/g4m/dai-tay-du",
          image: "https://muabannick.pro/images/banner/dai-tay-du-g4m.png",
          numberAccount: "90",
          sold: "69",
        },
        {
          title: "Ngọc Rồng Online",
          path: "/teamobi/ngoc-rong",
          image: "https://muabannick.pro//images/banner/mua-nick-ngoc-rong.gif",
          numberAccount: "515",
          sold: "438",
        },
      ],
    };
  },
  async mounted() {
    await this.getNotification();
    if (this.isNotification) {
      this.$refs.modal.show();
    }
  },
  computed: {
    nextPath(path) {
      this.$router.push(`${path}`);
    },
    ...mapFields("global", {
      isNotification: "isNotification",
    }),
  },
  methods: {
    ...mapActions("global", ["setNotification", "getNotification"]),
  },
};
</script>

<style lang="scss" scoped>
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
