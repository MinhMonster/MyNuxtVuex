<template>
  <div>
    <ModalNotification
      v-if="isNotification"
      ref="modal"
      :title="`Thông Báo`"
      size="md"
      @hide="onNotification = false"
    />
    <HomeSlider />
    <MenuCard />
    <GameCards />
  </div>
</template>

<script>
import ModalNotification from "@/components/pages/client/layout/ModalNotification";
import HomeSlider from "@/components/pages/home/HomeSlider";
import MenuCard from "@/components/pages/home/MenuCard";
import GameCards from "@/components/pages/home/GameCards";

import { mapFields } from "vuex-map-fields";
import { mapActions } from "vuex";
export default {
  name: "HomeGame",

  components: {
    ModalNotification,
    HomeSlider,
    MenuCard,
    GameCards,
  },
  computed: {
    ...mapFields("global", {
      isNotification: "isNotification",
      onNotification: "onNotification",
    }),
  },
  mounted() {
    this.onNotification = true;
    this.getNotification();
  },
  methods: {
    ...mapActions("global", ["getNotification"]),
  },
};
</script>

<style lang="scss" scoped>
.account {
  margin: -9px;
  cursor: pointer;
}
</style>
