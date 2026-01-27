<template>
  <client-only>
    <AccountShow
      module="client/game/dragonBalls"
      title="Nick Ngọc Rồng"
      :id="accountCode"
      :imageComponent="AccountImage"
    />
  </client-only>
</template>

<script>
import AccountImage from "@/components/common/client/account/AccountImage";
import AccountShow from "@/components/common/client/account/AccountShow";

import clientCrud from "@/mixins/clientCrud";
import mixins from "@/mixins/index";

export default {
  layout: "clientLayout",
  mixins: [mixins, clientCrud],
  components: {
    AccountShow,
  },
  data() {
    return {
      AccountImage,
    };
  },
  computed: {
    accountCode() {
      return this.$route.params.code;
    },
    title() {
      return `Mã Số: ${this.format_number(
        this.accountCode
      )} - Nick Ngọc Rồng Online - MuaBanNick.Pro`;
    },
  },
  head() {
    return {
      title: this.title,
      meta: [
        { hid: "description", name: "description", content: this.title },
        { property: "og:title", content: this.title },
        { property: "og:description", content: this.title },
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
.title-category {
  margin: 0 -9px;
  margin-top: -9px;
  margin-bottom: 9px;
  height: 30px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  background: radial-gradient(
    circle at 50% 100%,
    #e28637,
    #9f5424 58%,
    #561d00 127%
  );
  .title {
    color: #ffefa3 !important;
  }
}
</style>
