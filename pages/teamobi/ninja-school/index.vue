<template>
  <client-only>
    <HomePage
      title="Nick Ninja School Online"
      :loading="!ready"
      goBack
      reload
      @reload="reloadNinja('')"
      notBoder
    >
      <template v-if="ready" #body>
        <div class="mt-4">
          <AccountNinjaSearch @search="searchNinjas()"></AccountNinjaSearch>
          <AccountNinjaList></AccountNinjaList>
        </div>
      </template>
    </HomePage>
  </client-only>
</template>

<script>
import HomePage from "@/components/pages/home/HomePage";
import AccountNinjaSearch from "@/components/pages/client/game/ninjas/AccountNinjaSearch";
import AccountNinjaList from "@/components/pages/client/game/ninjas/AccountNinjaList";
import ninjas_mixins from "@/mixins/ninjas_mixins";

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
    this.getAccountNinjas();
  },
  methods: {},
  data() {
    return {
      title:
        "MuaBanNick.Pro - Hệ Thống Mua Bán Nick Ninja School Online Tự Động Game TeaMobile. Shop Mua Bán Nick Ninja School Giá Rẻ, Uy Tín Nhất MXH",
    };
  },
  head() {
    return {
      title: this.title,
      meta: [
        { hid: "description", name: "description", content: this.title },
        { property: "og:title", content: this.title },
        { property: "og:description", content: this.title },
        { property: 'og:image', content: '/banner.jpg' },
      ],
    };
  },
};
</script>