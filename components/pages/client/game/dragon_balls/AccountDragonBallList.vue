<template>
  <div>
    <v-row class="text-center account">
      <AccountDragonBallCard
        v-for="(account, index) in accountDragonBalls"
        :key="index"
        :account="account"
      ></AccountDragonBallCard>
    </v-row>
    <div v-if="isLoading" class="center mgt--50px mgb--50px">
      <Loading></Loading>
    </div>
    <div v-if="!accountDragonBalls.length" class="account-empty mt-4">
      <h1 class="text-center bold text-danger">
        Không tìm thấy Tài khoản nào!
      </h1>
    </div>
    <div class="btn-next-more">
      <BaseSvg
        v-if="isShowNext && accountDragonBalls.length && !isLoading"
        button
        name="skip"
        content="Xem Thêm Nick Ngọc Rồng"
        variant="danger"
        class="flex mt-3 mb-1"
        @click="onChange()"
      />
    </div>
  </div>
</template>

<script>
import { mapFields } from "vuex-map-fields";
import { mapActions } from "vuex";
import AccountDragonBallCard from "@/components/pages/client/game/dragon_balls/AccountDragonBallCard";
import Loading from "@/components/global/molecules/common/Loading";
export default {
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
</style>
