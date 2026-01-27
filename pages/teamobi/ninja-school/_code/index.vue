<template>
  <client-only>
    <AccountShow
      module="client/game/ninjaSchools"
      title="Nick Ninja School"
      :id="accountCode"
    />
  </client-only>
</template>

<script>
import AccountShow from "@/components/common/client/account/AccountShow";

import clientCrud from "@/mixins/clientCrud";
import mixins from "@/mixins/index";

export default {
  layout: "clientLayout",
  mixins: [mixins, clientCrud],
  components: {
    AccountShow,
  },
  computed: {
    accountCode() {
      return this.$route.params.code;
    },
    title() {
      return `Mã Số: ${this.format_number(
        this.accountCode
      )} - Nick Ninja School Online - MuaBanNick.Pro`;
    },
  },
  head() {
    return {
      title: this.title,
      meta: [
        { hid: "description", name: "description", content: this.title },
        { property: "og:title", content: this.title },
        { property: "og:description", content: this.title },
        {
          property: "og:image",
          content: "/banner.jpg"
        },
        {
          property: "og:image:alt",
          content: "Shop Nick Ninja School Online VIP Giá RẺ"
        },
      ],
    };
  },
};
</script>
