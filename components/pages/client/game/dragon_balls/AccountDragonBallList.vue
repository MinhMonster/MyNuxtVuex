<template>
  <div>
    <b-row class="text-center account">
      <AccountDragonBallCard
        v-for="(account, index) in accountDragonBalls"
        :key="index"
        :account="account"
      ></AccountDragonBallCard>
    </b-row>
    <div v-if="isLoading" class="center mgt--50px mgb--50px">
      <Loading></Loading>
    </div>
    <div v-if="!accountDragonBalls.length" class="account-empty mt-4">
      <h1 class="text-center bold text-danger">
        Không tìm thấy Tài khoản nào!
      </h1>
    </div>
    <v-btn
      v-if="isShowNext && accountDragonBalls.length && !isLoading"
      variant="danger"
      class="btn-next-more flex mt-3 mb-1"
      @click="onChange()"
    >
      <v-icon>mdi-skip-next</v-icon>
      Xem Thêm Nick Ngọc Rồng
    </v-btn>
  </div>
</template>

<script>
import { mapFields } from "vuex-map-fields";
import { mapActions } from "vuex";
import mixins from "@/mixins/index";
import AccountDragonBallCard from "@/components/pages/client/game/dragon_balls/AccountDragonBallCard";
import Loading from "@/components/global/molecules/common/Loading";
export default {
  name: "AccountAvatarList",
  mixins: [mixins],

  components: { AccountDragonBallCard, Loading },
  props: {
    query: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      isLoading: false,
    };
  },
  async mounted() {},
  computed: {
    ...mapFields("home/game/dragon_balls", {
      accountDragonBalls: "accountDragonBalls",
      page: "query.page",
      pages: "metaDragonBalls.pages",
    }),
    isShowNext() {
      return this.page < this.pages;
    },
  },
  methods: {
    ...mapActions("home/game/dragon_balls", [
      "fetchAccountDragonBalls",
      "setQuery",
      "resetQuery",
      "resetAccountDragonBalls",
    ]),
    async onChange() {
      this.isLoading = true;
      await this.setQuery({ page: this.page + 1 });
      await this.fetchAccountDragonBalls();
      this.isLoading = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.account {
  margin: -9px;
}
.btn-next-more {
  color: #ffffff;
  background: #a21d0a !important;
  text-align: center;
  margin: 0 auto;
}
</style>
