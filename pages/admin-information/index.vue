<template>
  <client-only>
    <HomePage
      title="Thông tin Admin"
      titleHead="Shop Mua Bán Nick Ninja School, Ngọc Rồng, Avatar Uy Tín Nhất MXH"
      :loading="!ready"
      full-screen
      goBack
      reload
      @reload="reload()"
      notBoder
    >
      <template v-if="ready" #body>
        <div class="page-body mt-4">
          <AdminInformations />
        </div>
        <div class="page-body mt-4">
          <AccountNumbeAdmin />
        </div>
      </template>
    </HomePage>
  </client-only>
</template>

<script>
import HomePage from "@/components/pages/home/HomePage";
import HistoryBuyAccount from "@/components/pages/home/HistoryBuyAccount";
import AccountNumbeAdmin from "@/components/common/AccountNumbeAdmin";
import AdminInformations from "@/components/common/AdminInformations";

import { mapFields } from "vuex-map-fields";

import { mapActions } from "vuex";
import HomeGame from "@/components/pages/home/HomeGame";
import Loading from "@/components/global/molecules/common/Loading";

export default {
  layout: "clientLayout",

  components: {
    HomePage,
    HomeGame,
    Loading,
    HistoryBuyAccount,
    AccountNumbeAdmin,
    AdminInformations,
  },
  computed: {
    ...mapFields("global", {
      ready: "ready",
    }),
  },
  async mounted() {
    this.reload();
  },
  methods: {
    async reload() {
      this.ready = false;
      setTimeout(() => {
        this.ready = true;
      }, 200);
    },
  },
};
</script>
<style lang="scss" scoped>
#home-page {
  max-width: 600px;
}
</style>