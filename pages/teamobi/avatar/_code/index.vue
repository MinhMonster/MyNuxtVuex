<template>
  <client-only>
    <AccountShow
      module="client/game/avatars"
      title="Nick Avatar DK"
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
      )} - Nick Avatar - MuaBanNick.Pro`;
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
          content: "/images/banners/banner_avatar_min.jpg",
        },
        {
          property: "og:image:alt",
          content: "Shop Nick Avatar SX Diệu Kỳ (2x) VIP Giá RẺ",
        },
      ],
    };
  },
};
</script>
