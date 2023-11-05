<template>
  <client-only>
    <HomePage
      :title="title"
      :loading="!ready"
      full-screen
      goBack
      reload
      @reload="reload()"
    >
      <template v-if="ready" #body>
        <div class="page-body no-border mt-4">
          <AdminInformations />
        </div>
        <div class="page-body no-border mt-4">
          <AccountNumbeAdmin />
        </div>
        <GroupBtnInbox />
      </template>
    </HomePage>
  </client-only>
</template>

<script>
import HomePage from "@/components/pages/home/HomePage";
import AccountNumbeAdmin from "@/components/common/AccountNumbeAdmin";
import AdminInformations from "@/components/common/AdminInformations";
import GroupBtnInbox from "@/components/common/client/button/GroupBtnInbox";

import { mapFields } from "vuex-map-fields";

import HomeGame from "@/components/pages/home/HomeGame";
import Loading from "@/components/global/molecules/common/Loading";

export default {
  layout: "clientLayout",

  components: {
    HomePage,
    HomeGame,
    Loading,
    AccountNumbeAdmin,
    AdminInformations,
    GroupBtnInbox,
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
  data() {
    return {
      title: "Thông tin Admin",
    };
  },
  head() {
    return {
      title: this.title,
      meta: [
        { hid: "description", name: "description", content: this.title },
        { property: "og:title", content: this.title },
        { property: "og:description", content: this.title },
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
#home-page {
  max-width: 600px;
  .no-border {
    border: none;
    ::v-deep {
      .info-atm-momo {
        min-height: 50px !important;
      }
    }
  }
}
</style>