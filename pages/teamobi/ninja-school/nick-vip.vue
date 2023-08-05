<template>
  <client-only>
    <HomePage
      title="Nick Ninja School VIP"
      titleHead="Shop Bán Nick Ninja School VIP Uy Tín Nhất MXH"
      :loading="!ready"
      goBack
      reload
      @reload="reloadNinja('VIP')"
      notBoder
    >
      <template v-if="ready" #body>
        <div class="mt-4">
          <AccountNinjaSearch
            type="VIP"
            @search="searchNinjas()"
          ></AccountNinjaSearch>
          <AccountNinjaList type="VIP"></AccountNinjaList>
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
    this.getAccountNinjas("VIP");
  },
  methods: {},
};
</script>