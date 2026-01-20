<template>
  <div
    v-if="isLoadingSearch"
    class="center mgt--50px mgb--50px loading-resoult"
  >
    <Loading></Loading>
  </div>
  <div v-else id="list-avatar">
    <v-row class="text-center account">
      <AccountCard
        v-for="(account, index) in accounts"
        :key="index"
        :account="account"
        :infoItems="getInfoItems(account)"
        :detailLink="`/teamobi/avatar/${account.code}`"
      >
        <template #image>
          <AccountAvatarTL :account="account" />
        </template>
    </AccountCard>
    </v-row>
    <div v-if="!accounts.length" class="account-empty mt-4">
      <h1 class="text-center bold text-danger">
        Không tìm thấy Tài khoản nào!
      </h1>
    </div>
    <Pagination
      v-if="meta && meta.pages > 1"
      :meta="meta"
      @change="onChange"
    ></Pagination>
  </div>
</template>

<script>
import avatars_mixins from "@/mixins/avatars_mixins";
import AccountCard from "@/components/common/client/account/AccountCard";
import AccountAvatarTL from "@/components/pages/client/game/avatars/AccountAvatarTL";
import Pagination from "@/components/global/molecules/common/Pagination";
import Loading from "@/components/global/molecules/common/Loading";

export default {
  mixins: [avatars_mixins],
  components: { AccountCard, AccountAvatarTL, Pagination, Loading },
  methods: {
    getInfoItems(account) {
      return [
        { label: "Mã Số", value: account.code },
        { label: "Đất", value: account.land },
        { label: "Gà", value: account.pets },
        { label: "Cá", value: account.fish },
      ];
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
