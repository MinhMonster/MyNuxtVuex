<template>
  <div
    v-if="isLoadingSearch"
    class="center mgt--50px mgb--50px loading-resoult"
  >
    <Loading></Loading>
  </div>
  <div v-else id="list-account">
    <v-row class="text-center account">
      <AccountCard
        v-for="(account, index) in accounts"
        :key="index"
        :account="account"
        :infoItems="getInfoItems(account)"
        :detailLink="`/teamobi/ngoc-rong/${account.code}`"
      >
        <template #image>
          <AccountDragonBallTL :account="account" />
        </template>
      </AccountCard>
    </v-row>
    <div v-if="!accounts.length" class="account-empty mt-4">
      <h1 class="text-center bold text-danger">
        Không tìm thấy Tài khoản nào!
      </h1>
    </div>
    <div class="btn-next-more mb-4 mt-4">
      <BaseSvg
        v-if="isShowNext && accounts.length && !isLoadingSearch"
        button
        name="skip"
        content="Xem Thêm Nick"
        variant="danger"
        class="flex mt-3 mb-1"
        @click="onChange()"
      />
    </div>
  </div>
</template>

<script>
import mixins from "@/mixins/dragon_balls";
import AccountCard from "@/components/common/client/account/AccountCard";
import AccountDragonBallTL from "@/components/pages/client/game/dragon_balls/AccountDragonBallTL";
import Pagination from "@/components/global/molecules/common/Pagination";
import Loading from "@/components/global/molecules/common/Loading";

export default {
  mixins: [mixins],
  components: { AccountCard, AccountDragonBallTL, Pagination, Loading },
  methods: {
    getInfoItems(account) {
      return [
        { label: "Mã Số", value: this.format_number(account.code) },
        { label: "Máy chủ", value: account.server + " Sao" },
        { label: "Hành tinh", value: account.planet },
      ];
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
