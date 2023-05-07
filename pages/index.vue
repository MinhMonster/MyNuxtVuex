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
    </div>
  </client-only>
</template>

<script>
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
};
</script>