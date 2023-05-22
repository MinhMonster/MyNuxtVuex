<template>
  <client-only>
    <div id="home-page">
      <AccountNinjaSearch></AccountNinjaSearch>
      <AccountNinjaList></AccountNinjaList>
      <!-- <Pagination
      v-if="metaNinjas"
      :meta="metaNinjas"
      @change="onPageChange"
    ></Pagination> -->
      <div id="next-bottom"></div>
    </div>
  </client-only>
</template>

<script>
import { mapActions } from "vuex";
import AccountNinjaSearch from "@/components/pages/client/game/ninjas/AccountNinjaSearch";
import AccountNinjaList from "@/components/pages/client/game/ninjas/AccountNinjaList";
// import Pagination from "@/components/global/molecules/common/Pagination";

export default {
  layout: "clientLayout",

  components: {
    AccountNinjaSearch,
    AccountNinjaList,
    // Pagination
  },
  async mounted() {
    await this.resetQuery();
    await this.resetAccountNinjas();
    this.fetchAccountNinjas();
  },
  methods: {
    ...mapActions("home/game/ninjas", [
      "resetQuery",
      "setQuery",
      "resetAccountNinjas",
      "fetchAccountNinjas",
    ]),
  },
};
</script>