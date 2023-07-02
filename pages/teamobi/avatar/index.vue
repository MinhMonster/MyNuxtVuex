<template>
  <client-only>
    <HomePage
      title="Nick Avatar Xứ Sở Diệu Kỳ"
      :loading="!ready"
      goBack
      reload
      @reload="reload()"
      notBoder
    >
      <template v-if="ready" #body>
        <div class="mt-4">
          <AccountAvatarSearch @search="search()"></AccountAvatarSearch>
          <AccountAvatarList></AccountAvatarList>
        </div>
      </template>
    </HomePage>
  </client-only>
</template>

<script>
import HomePage from "@/components/pages/home/HomePage";

import { mapActions } from "vuex";
import AccountAvatarSearch from "@/components/pages/client/game/avatars/AccountAvatarSearch";
import AccountAvatarList from "@/components/pages/client/game/avatars/AccountAvatarList";
import Loading from "@/components/global/molecules/common/Loading";

export default {
  layout: "clientLayout",

  components: {
    HomePage,
    AccountAvatarSearch,
    AccountAvatarList,
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
    await this.resetAccountAvatars();
    await this.fetchAccountAvatars();
    this.ready = true;
  },
  methods: {
    ...mapActions("home/game/avatars", [
      "resetQuery",
      "setQuery",
      "resetAccountAvatars",
      "fetchAccountAvatars",
    ]),
    async search() {
      this.ready = false;
      await this.resetAccountAvatars();
      await this.fetchAccountAvatars();
      this.ready = true;
    },
    async reload() {
      this.ready = false;
      await this.resetQuery();
      await this.resetAccountAvatars();
      await this.fetchAccountAvatars();
      this.ready = true;
    },
  },
};
</script>