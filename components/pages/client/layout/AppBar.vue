<template>
  <client-only>
    <v-app-bar
      :clipped-right="clipped"
      fixed
      :style="{ height: isMobile ? '60px' : '137px' }"
    >
      <div class="header-content w-100">
        <div class="header-user">
          <div class="header-logo" @click="nextHome()">
            <img :src="logo" alt="Logo" />
          </div>
          <v-spacer />
          <AccountMenu />
        </div>
      </div>
      <MenuBottom v-if="!isMobile" />
    </v-app-bar>
  </client-only>
</template>

<script>
import { mapFields } from "vuex-map-fields";
import MenuBottom from "@/components/pages/client/layout/MenuBottom";
import AccountMenu from "@/components/pages/client/layout/AccountMenu";

export default {
  name: "AppBar",
  components: { MenuBottom, AccountMenu },
  data() {
    return {
      logo: "https://muabannick.pro/files/uploads/images/logo/logo_violet_gradian_min-1707200146.png",
      clipped: true,
      miniVariant: false,
    };
  },
  computed: {
    ...mapFields("global", {
      ready: "ready",
    }),
    ...mapFields("global", {
      fixed: "fixed",
    }),
    isHome() {
      return this.$route.path == "/";
    },
    // isAdmin() {
    //   return this.user?.admin;
    // },
  },
  methods: {
    nextHome() {
      if (this.isHome) {
        this.reset();
      } else {
        this.$router.push("/");
      }
    },

    reset() {
      this.ready = false;
      setTimeout(() => {
        this.ready = true;
      }, 200);
    },
  },
};
</script>
