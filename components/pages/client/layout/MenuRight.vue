<template>
  <v-navigation-drawer
    style="
      top: 50px;
      width: 500px;
      max-width: 100%;
      text-align: left;
      max-height: calc(100% - 45px);
    "
    :style="{
      minHeight: heightMenu,
    }"
    v-model="showMenuRight"
    :right="right"
    :clipped="clipped"
    fixed
  >
    <SideBarMenu @close="showMenuRight = false"></SideBarMenu>
  </v-navigation-drawer>
</template>

<script>
import SideBarMenu from "@/components/pages/client/layout/SideBarMenu";
import { mapFields } from "vuex-map-fields";
import { mapState } from "vuex";

export default {
  components: {
    SideBarMenu,
  },

  data() {
    return {
      clipped: true,
      fixed: false,
      right: true,
    };
  },
  async mounted() {
    // if (this.isMobile) {
      this.showMenuRight = false;
    // } else {
    //   this.showMenuRight = true;
    // }
  },
  computed: {
    ...mapState("home/users", ["token", "user"]),
    ...mapFields("global", {
      showMenuRight: "showMenuRight",
    }),
    heightMenu() {
      return this.isMobile ? `calc(100% - 45px)` : `calc(100% - 95px)`;
    },
  },
  methods: {
    closeMenuRight() {
      this.showMenuRight = false;
    },
  },
};
</script>
