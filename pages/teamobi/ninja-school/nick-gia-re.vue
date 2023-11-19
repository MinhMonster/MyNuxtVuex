<template>
  <client-only>
    <HomePage
      title="Nick Ninja School Giá Rẻ"
      :loading="!ready"
      goBack
      reload
      @reload="reloadNinja('cheap')"
      notBoder
    >
      <template v-if="ready" #body>
        <div class="mt-4">
          <AccountNinjaSearch
            type="cheap"
            @search="searchNinjas()"
          ></AccountNinjaSearch>
          <AccountNinjaList type="cheap"></AccountNinjaList>
        </div>
      </template>
    </HomePage>
  </client-only>
</template>

<script>
import ninjas_mixins from "@/mixins/ninjas_mixins";
import HomePage from "@/components/pages/home/HomePage";

import AccountNinjaSearch from "@/components/pages/client/game/ninjas/AccountNinjaSearch";
import AccountNinjaList from "@/components/pages/client/game/ninjas/AccountNinjaList";

export default {
  layout: "clientLayout",
  mixins: [ninjas_mixins],

  components: {
    HomePage,
    AccountNinjaSearch,
    AccountNinjaList,
  },
  computed: {},
  async mounted() {
    this.getAccountNinjas("cheap");
  },
  methods: {},
  data() {
    return {
      title:
        "MuaBanNick.Pro - Hệ Thống Mua Bán Nick Ninja School Online Giá Rẻ Tự Động Game TeaMobile. Shop Mua Bán Nick Ninja School Giá Rẻ, Uy Tín Nhất MXH",
    };
  },
  head() {
    return {
      title: this.title,
      meta: [
        { hid: "description", name: "description", content: this.title },
        { property: "og:title", content: this.title },
        { property: "og:description", content: this.title },
        { property: 'og:image', content: '/banner.jfif' },
      ],
    };
  },
};
</script>