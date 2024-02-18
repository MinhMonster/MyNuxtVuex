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
    <v-btn
      v-if="isShowNext && accountAvatars.length && !isLoading"
      variant="danger"
      class="btn-next-more flex mt-3 mb-1"
      @click="onChange()"
    >
      <v-icon>mdi-skip-next</v-icon>
      Xem Thêm Nick Avatar
    </v-btn>
  </div>
</template>

<script>
import { mapFields } from "vuex-map-fields";
import { mapActions } from "vuex";
import mixins from "@/mixins/index";
import AccountAvatarCard from "@/components/pages/client/game/avatars/AccountAvatarCard";
import Loading from "@/components/global/molecules/common/Loading";
export default {
  name: "AccountAvatarList",
  mixins: [mixins],

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
