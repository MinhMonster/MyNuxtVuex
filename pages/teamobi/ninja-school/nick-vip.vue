<template>
  <client-only>
    <HomePage
      title="Nick Ninja School VIP"
      titleHead="Shop Bán Nick Ninja School VIP Uy Tín Nhất MXH"
      :loading="!ready"
      goBack
      reload
      @reload="reload()"
      notBoder
    >
      <template v-if="ready" #body>
        <div class="mt-4">
          <AccountNinjaSearch
            type="VIP"
            @search="search()"
          ></AccountNinjaSearch>
          <AccountNinjaList type="VIP"></AccountNinjaList>
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
  mounted() {
    this.reload();
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
    async reload() {
      this.ready = false;
      await this.resetQuery("VIP");
      await this.resetAccountNinjas();
      await this.fetchAccountNinjas();
      this.ready = true;
    },
  },
};
</script>