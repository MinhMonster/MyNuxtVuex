<template>
  <div>
    <div v-if="isLoading" class="center mgt--50px mgb--50px">
      <Loading></Loading>
    </div>
    <b-row class="text-center account">
      <GameCard
        v-for="(game, index) in gameList"
        :key="index"
        :game="game"
      ></GameCard>
    </b-row>

    <ModalPayload ref="modal" :title="`Thông Báo`">
      <template #content>
        <div class="page-body">
          <AdminNotification />
        </div>
      </template>
    </ModalPayload>
  </div>
</template>

<script>
import mixins from "@/mixins/index";
import GameCard from "@/components/pages/home/GameCard";
import ModalPayload from "@/components/common/ModalPayload";
import AdminNotification from "@/components/pages/home/AdminNotification";

import Loading from "@/components/global/molecules/common/Loading";
export default {
  name: "AccountNinjaList",
  mixins: [mixins],

  components: { GameCard, Loading, ModalPayload, AdminNotification },
  props: {
    query: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      isLoading: false,
      gameList: [
        {
          title: "Ninja School Online",
          path: "/teamobi/ninja-school",
          image: "https://muabannick.pro/images/banner/mua-nick-ninja.gif",
          numberAccount: "12209",
          sold: "12034",
        },
        {
          title: "Avatar XS.DKỳ",
          path: "/teamobi/avatar",
          image: "https://muabannick.pro/images/banner/mua-nick-avatar.jpg",
          numberAccount: "83",
          sold: "61",
        },
        {
          title: "Ngọc Rồng Online",
          path: "/teamobi/ngoc-rong",
          image: "https://muabannick.pro//images/banner/mua-nick-ngoc-rong.gif",
          numberAccount: "507",
          sold: "426",
        },
      ],
    };
  },
  async mounted() {
    this.$refs.modal.show();
  },
  computed: {
    nextPath(path) {
      this.$router.push(`${path}`);
    },
  },
  methods: {},
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
