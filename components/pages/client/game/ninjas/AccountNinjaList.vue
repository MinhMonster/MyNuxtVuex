<template>
  <div
    v-if="isLoadingSearch"
    class="center mgt--50px mgb--50px loading-resoult"
  >
    <Loading></Loading>
  </div>
  <div v-else>
    <v-row class="text-center account">
      <AccountCard
        v-for="(account, index) in accountNinjas"
        :key="index"
        :account="account"
        :infoItems="getInfoItems(account)"
        :detailLink="`/teamobi/ninja-school/${account.code}`"
      >
        <template #image>
          <AccountNinjaTL :account-ninja="account" />
        </template>
      </AccountCard>
    </v-row>
    <div v-if="isLoading" class="center mgt--50px mgb--50px">
      <Loading></Loading>
    </div>
    <div v-if="!accountNinjas.length" class="account-empty mt-4">
      <h1 class="text-center bold text-danger">
        Không tìm thấy Tài khoản nào!
      </h1>
    </div>
    <div class="btn-next-more mb-4 mt-4">
      <BaseSvg
        v-if="isShowNext && accountNinjas.length && !isLoading"
        button
        name="skip"
        :content="` Xem Thêm Nick Ninja ${
          type == 'cheap' ? 'Giá Rẻ' : type ?? ''
        }`"
        variant="danger"
        class="flex mt-3 mb-1 "
        @click="onChange()"
      />
    </div>
  </div>
</template>

<script>
import { mapFields } from "vuex-map-fields";
import { mapActions } from "vuex";
import AccountCard from "@/components/common/client/account/AccountCard";
import AccountNinjaTL from "@/components/pages/client/game/ninjas/AccountNinjaTL";
import Loading from "@/components/global/molecules/common/Loading";
export default {
  components: { AccountCard, Loading, AccountNinjaTL },
  props: {
    type: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      isLoading: false,
    };
  },
  // watch: {
  //   isLoadingSearch: {
  //     async handler(newValue, oldValue) {
  //       if (this.isMobile) {
  //         this.nextFormSearch();
  //       }
  //     },
  //   },
  // },
  computed: {
    ...mapFields("home/game/ninjas", {
      accountNinjas: "accountNinjas",
      page: "query.page",
      pages: "meta.pages",
    }),
    ...mapFields("global", {
      isLoadingSearch: "isLoadingSearch",
    }),
    isShowNext() {
      return this.page < this.pages;
    },
  },
  methods: {
    ...mapActions("home/game/ninjas", [
      "fetchAccountNinjas",
      "setQuery",
      "resetQuery",
      "resetAccountNinjas",
    ]),
    getInfoItems(account) {
      return [
        {
          key: "code",
          label: "Mã số",
          value: this.format_number(account.code),
        },
        {
          key: "class",
          label: "Lớp",
          value: this.classNinja(account.class),
        },
        {
          key: "server",
          label: "Máy chủ",
          value: this.serverNinja(account.server),
        },
      ];
    },
    async onChange() {
      this.isLoading = true;
      await this.setQuery({ page: this.page + 1 });
      await this.fetchAccountNinjas();
      this.isLoading = false;
    },
    // nextFormSearch() {
    //   const element = document.getElementById("resoults");
    //   if (element) {
    //     setTimeout(() => {
    //       element.scrollIntoView();
    //     }, 100);
    //   }
    // },
  },
};
</script>

<style lang="scss" scoped>
.account {
  margin: -9px;
}
</style>
