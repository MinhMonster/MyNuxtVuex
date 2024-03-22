<template>
  <div v-if="isLoadingSearch" class="center mgt--50px mgb--50px loading-resoult">
    <Loading></Loading>
  </div>
  <div v-else>
    <v-row class="text-center account">
      <AccountAvatarCard
        v-for="(avatar, index) in accountAvatars"
        :key="index"
        :account-avatar="avatar"
      ></AccountAvatarCard>
    </v-row>
    <div v-if="isLoading" class="center mgt--50px mgb--50px">
      <Loading></Loading>
    </div>
    <div v-if="!accountAvatars.length" class="account-empty mt-4">
      <h1 class="text-center bold text-danger">
        Không tìm thấy Tài khoản nào!
      </h1>
    </div>
    <div class="btn-next-more">
      <BaseSvg
        v-if="isShowNext && accountAvatars.length && !isLoading"
        name="skip"
        button
        content="Xem Thêm Nick Avatar"
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
import AccountAvatarCard from "@/components/pages/client/game/avatars/AccountAvatarCard";
import Loading from "@/components/global/molecules/common/Loading";
export default {
  components: { AccountAvatarCard, Loading },
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
  computed: {
    ...mapFields("home/game/avatars", {
      accountAvatars: "accountAvatars",
      page: "query.page",
      pages: "metaAvatars.pages",
    }),
    ...mapFields("global", {
      isLoadingSearch: "isLoadingSearch",
    }),
    isShowNext() {
      return this.page < this.pages;
    },
  },
  methods: {
    ...mapActions("home/game/avatars", [
      "fetchAccountAvatars",
      "setQuery",
      "resetQuery",
      "resetAccountAvatars",
    ]),
    async onChange() {
      this.isLoading = true;
      await this.setQuery({ page: this.page + 1 });
      await this.fetchAccountAvatars();
      this.isLoading = false;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
