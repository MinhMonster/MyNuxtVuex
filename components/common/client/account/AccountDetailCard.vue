<template>
  <client-only>
    <div v-if="account">
      <div v-if="isMobile" class="text-center text-danger bold">
        <BaseSvg name="next-bottom" />
        Xem thêm ảnh nick chi tiết ở bên dưới
        <BaseSvg name="next-bottom" />
      </div>
      <div class="title mb-3">
        <center>
          <h3>Thông tin chi tiết</h3>
        </center>
      </div>

      <AccountInfoTable :account="account" :account-infos="accountInfos" :isShow="false"/>
      <GroupBtnBuyAccount :account="account" :account-infos="accountInfos" />
    </div>
  </client-only>
</template>

<script>
import GroupBtnBuyAccount from "@/components/pages/client/game/GroupBtnBuyAccount";
import AccountInfoTable from "@/components/common/client/table/AccountInfoTable.vue";
export default {
  name: "AccountDetailCard",
  components: {
    GroupBtnBuyAccount,
    AccountInfoTable,
  },
  props: {
    account: {
      type: Object,
      default: () => {},
    },
    accountInfos: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  color: #1e5b7e;
}
</style>
