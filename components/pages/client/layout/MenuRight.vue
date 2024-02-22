<template>
  <v-navigation-drawer
    style="
      top: 50px;
      width: 250px;
      text-align: left;
      max-height: calc(100% - 50px);
    "
    :style="{
      minHeight: heightMenu,
    }"
    v-model="showMenuRight"
    :right="right"
    :clipped="clipped"
    fixed
    app
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
    this.$nextTick(function () {
      this.showMenuRight = false;
    });
  },
  computed: {
    ...mapState("home/users", ["token", "user"]),
    ...mapFields("global", {
      showMenuRight: "showMenuRight",
    }),
    heightMenu() {
      return this.isMobile ? `calc(100% - 50px)` : `calc(100% - 105px)`;
    },
  },
  methods:{
    closeMenuRight() {
      this.showMenuRight = false;
    }
  }
};
</script>