<template>
  <client-only>
    <v-navigation-drawer
      v-model="isShowMenuRight"
      :style="menuStyle"
      left
      clipped
      fixed
      app
    >
      <SideBarMenu @close="isShowMenuRight = false" />
    </v-navigation-drawer>
  </client-only>
</template>

<script>
import SideBarMenu from "@/components/pages/client/layout/SideBarMenu";

export default {
  components: { SideBarMenu },

  computed: {
    menuStyle() {
      const top = this.isMobile ? 60 : 137;
      const offset = this.isMobile ? 50 : 105;

      return {
        top: `${top}px`,
        width: "250px",
        textAlign: "left",
        minHeight: `calc(100% - ${offset}px)`,
        maxHeight: `calc(100% - 60px)`,
      };
    },
  },

  watch: {
    isMobile: {
      immediate: true,
      handler(val) {
        this.isShowMenuRight = !val;
      },
    },
  },
};
</script>
