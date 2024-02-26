<template>
  <div>
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
  async mounted() {},
  computed: {
    ...mapFields("home/game/avatars", {
      accountAvatars: "accountAvatars",
      page: "query.page",
      pages: "metaAvatars.pages",
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
