<template>
  <client-only>
    <HomePage
      title="Nick Ngọc Rồng Online"
      :loading="!ready"
      goBack
      reload
      @reload="search()"
      notBoder
    >
      <template v-if="ready" #body>
        <div class="mt-4">
          <AccountDragonBallSearch @search="search()"></AccountDragonBallSearch>
          <AccountDragonBallList></AccountDragonBallList>
        </div>
      </template>
    </HomePage>
  </client-only>
</template>

<script>
import HomePage from "@/components/pages/home/HomePage";

import { mapActions } from "vuex";
import AccountDragonBallSearch from "@/components/pages/client/game/dragon_balls/AccountDragonBallSearch";
import AccountDragonBallList from "@/components/pages/client/game/dragon_balls/AccountDragonBallList";
import Loading from "@/components/global/molecules/common/Loading";

export default {
  layout: "clientLayout",

  components: {
    HomePage,
    AccountDragonBallSearch,
    AccountDragonBallList,
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
    await this.resetAccountDragonBalls();
    await this.fetchAccountDragonBalls();
    this.ready = true;
  },
  methods: {
    ...mapActions("home/game/dragon_balls", [
      "resetQuery",
      "setQuery",
      "resetAccountDragonBalls",
      "fetchAccountDragonBalls",
    ]),
    async search() {
      this.ready = false;
      await this.resetAccountDragonBalls();
      await this.fetchAccountDragonBalls();
      this.ready = true;
    },
  },
};
</script>