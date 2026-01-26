<template>
  <client-only>
    <div id="list-account">
      <v-row class="text-center account">
        <AccountCard
          v-for="(account, index) in dataSource"
          :key="index"
          :account="account"
          :infoItems="getInfoItems(account)"
          :detailLink="`${stateQueryPath}/${account.code}`"
        >
          <template #image>
            <slot name="image" :account="account" />
          </template>
        </AccountCard>
      </v-row>
      <div
        v-if="!isLoadingSearch && !dataSource.length"
        class="account-empty mt-4"
      >
        <h1 class="text-center bold text-danger">
          Không tìm thấy Tài khoản nào!
        </h1>
      </div>
      <div
        v-if="isLoadingSearch"
        class="center mgt--50px mgb--50px loading-resoult"
      >
        <Loading></Loading>
      </div>
      <div v-else class="btn-next-more mb-4 mt-4">
        <BaseSvg
          v-if="isShowNext && dataSource.length && !isLoadingSearch"
          button
          name="skip"
          content="Xem Thêm Nick"
          variant="danger"
          class="flex mt-3 mb-1"
          @click="loadNextPage()"
        />
      </div>
    </div>
  </client-only>
</template>

<script>
import mixins from "@/mixins/dragon_balls";
import clientCrud from "@/mixins/clientCrud";
import AccountCard from "@/components/common/client/account/AccountCard";
import Loading from "@/components/global/molecules/common/Loading";

export default {
  mixins: [mixins, clientCrud],
  components: { AccountCard, Loading },
  props: {
    params: {
      type: Array,
      default: () => [],
      require: false,
    },
  },
  async created() {
    await this.storeDispatch("passDataFromQuery", {
      stateName: this.storeQueryItems,
      query: this.$route.query,
    });
    await this.resetQueryItems();
    await this.storeDispatch("clearResponse", this.storeQueryItems);
    this.fetchDataIndex();
  },
  methods: {
    getInfoItems(account) {
      return this.storeGetter("getInfoItems")(account);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
