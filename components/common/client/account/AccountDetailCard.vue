<template>
  <client-only>
    <div v-if="account">
      <div v-if="isMobile" class="text-center text-danger bold">
        <BaseSvg name="next-bottom" />
        Xem thêm ảnh nick chi tiết ở bên dưới
        <BaseSvg name="next-bottom" />
      </div>
      <div class="title">
        <center>
          <h3>Thông tin chi tiết</h3>
        </center>
      </div>

      <AccountInfoTable :account="account" :items="items" />
      <GroupBtnBuyAccount :account="account" account-type="ninja" />
    </div>
  </client-only>
</template>

<script>
import GroupBtnBuyAccount from "@/components/pages/client/game/GroupBtnBuyAccount";
import AccountInfoTable from "@/components/common/client/table/AccountInfoTable.vue";
export default {
  components: {
    GroupBtnBuyAccount,
    AccountInfoTable,
  },
  props: {
    account: {
      type: Object,
      default: () => {},
    },
    items: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  color: #1e5b7e;
  margin-bottom: 10px;
}
</style>
