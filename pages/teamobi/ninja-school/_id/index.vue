<template>
  <client-only>
    <div id="home-page" class="account-detail">
      <AccountNinjaDetail :account-ninja="accountNinja"></AccountNinjaDetail>
      <div id="next-bottom"></div>
    </div>
  </client-only>
</template>

<script>
import { mapFields } from "vuex-map-fields";
import { mapActions } from "vuex";
import AccountNinjaDetail from "@/components/pages/client/game/ninjas/AccountNinjaDetail";
export default {
  layout: "clientLayout",

  components: {
    AccountNinjaDetail,
  },
  computed: {
    ...mapFields("home/game/ninjas", {
      accountNinja: "accountNinja",
    }),
    accountId() {
      return this.$route.params.id;
    },
  },
  mounted() {
    this.fetchAccountNinja({
      params: {
        id: this.accountId,
      },
    });
  },
  methods: {
    ...mapActions("home/game/ninjas", ["fetchAccountNinja"]),
  },
};
</script>
<style lang="scss" scoped>
#home-page {
  color: #000000;
  border: 1px solid #663019;
  background: #ffefa3;
  padding: 12px;
}
</style>