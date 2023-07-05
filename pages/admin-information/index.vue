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
    >
      <template v-if="ready" #body>
        <div class="page-body mt-4">
          <AdminInformations />
        </div>
        <div class="page-body mt-4">
          <AccountNumbeAdmin />
        </div>
        <b-row class="mt-2">
          <b-col cols="6">
            <a href="https://zalo.me/0961646828" target="_blank">
              <div class="btn-buy-account-hover">
                <v-btn icon>
                  <v-icon>mdi-arrow-right-bold-circle-outline</v-icon>Inbox Zalo
                </v-btn>
              </div>
            </a>
          </b-col>
          <b-col cols="6">
            <div class="c-font-uppercase btnCheckAccount ajax">
              <a href="https://messenger.com/t/minh.docong.7" target="_blank">
                <div class="btn-buy-account-hover">
                  <v-btn icon>
                    <v-icon>mdi-arrow-right-bold-circle-outline</v-icon
                    >Messenger
                  </v-btn>
                </div>
              </a>
            </div>
          </b-col>
        </b-row>
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