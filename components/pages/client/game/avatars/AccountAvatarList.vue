<template>
  <div
    v-if="isLoadingSearch"
    class="center mgt--50px mgb--50px loading-resoult"
  >
    <Loading></Loading>
  </div>
  <div v-else  id="list-avatar">
    <v-row class="text-center account">
      <AccountAvatarCard
        v-for="(avatar, index) in accountAvatars"
        :key="index"
        :account-avatar="avatar"
      ></AccountAvatarCard>
    </v-row>
    <div v-if="!accountAvatars.length" class="account-empty mt-4">
      <h1 class="text-center bold text-danger">
        Không tìm thấy Tài khoản nào!
      </h1>
    </div>
    <Pagination
      v-if="metaAvatars && metaAvatars.pages > 1"
      :meta="metaAvatars"
      @change="onChange"
    ></Pagination>
  </div>
</template>

<script>
import avatars_mixins from "@/mixins/avatars_mixins";
import AccountAvatarCard from "@/components/pages/client/game/avatars/AccountAvatarCard";
import Pagination from "@/components/global/molecules/common/Pagination";
import Loading from "@/components/global/molecules/common/Loading";

export default {
  mixins: [avatars_mixins],
  components: { AccountAvatarCard, Pagination, Loading },
};
</script>

<style lang="scss" scoped>
</style>
