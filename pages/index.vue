<template>
  <client-only>
    <HomePage
      title="Nick Ninja School Online"
      titleHead="Shop Mua Bán Nick Ninja School, Ngọc Rồng, Avatar Uy Tín Nhất MXH"
      :loading="!ready"
      goBack
      reload
      @reload="search()"
      notBoder
    >
      <template v-if="ready" #body>
        <div class="mt-4">
          <AccountNinjaSearch @search="search()"></AccountNinjaSearch>
          <AccountNinjaList></AccountNinjaList>
        </div>
      </template>
    </HomePage>
  </client-only>
</template>

<script>
import HomePage from "@/components/pages/home/HomePage";

import { mapActions } from "vuex";
import AccountNinjaSearch from "@/components/pages/client/game/ninjas/AccountNinjaSearch";
import AccountNinjaList from "@/components/pages/client/game/ninjas/AccountNinjaList";
import Loading from "@/components/global/molecules/common/Loading";

export default {
  layout: "clientLayout",

  components: {
    HomePage,
    AccountNinjaSearch,
    AccountNinjaList,
    Loading,
  },
  data() {
    return {
      ready: false,
    };
  },
  async mounted() {
    this.ready = false;
    await this.resetQuery();
    await this.resetAccountNinjas();
    await this.fetchAccountNinjas();
    this.ready = true;
  },
  methods: {
    ...mapActions("home/game/ninjas", [
      "resetQuery",
      "setQuery",
      "resetAccountNinjas",
      "fetchAccountNinjas",
    ]),
    async search() {
      this.ready = false;
      await this.resetAccountNinjas();
      await this.fetchAccountNinjas();
      this.ready = true;
    },
  },
};
</script>