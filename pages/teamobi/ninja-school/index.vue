<template>
  <client-only>
    <HomePage
      title="Nick Ninja School Online"
      titleHead="Shop Bán Nick Ninja School Giá Rẻ Uy Tín Nhất MXH"
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
};
</script>