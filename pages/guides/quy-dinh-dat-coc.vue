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
        <DepositRegulations />
      </template></HomePage
    ></client-only
  >
</template>

<script>
import HomePage from "@/components/pages/home/HomePage";
import DepositRegulations from "@/components/pages/client/game/DepositRegulations";

import { mapFields } from "vuex-map-fields";

export default {
  layout: "clientLayout",

  components: {
    HomePage,
    DepositRegulations,
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
      }, 500);
    },
  },
  data() {
    return {
      title: "Quy định đặt cọc Mua Nick",
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
<style scoped>
#home-page {
  max-width: 800px;
}
</style>
