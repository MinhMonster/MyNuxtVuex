<template>
  <v-app-bar :clipped-right="clipped" fixed app style="height: 50px">
    <div class="header-content">
      <div class="header-user">
        <div class="header-logo" @click="nextHome()">
          <img :src="logo" alt="Logo" />
        </div>
      </div>
    </div>

    <v-spacer />

    <div v-if="showMenuRight && isMobile" class="header-menu" @click.stop="showMenuRight = !showMenuRight">
      <div class="login-btn">
        <BaseSvg
          v-if="showMenuRight"
          name="close"
          id="btn-down"
          title="Đóng"
          aria-label="Đóng"
        />
      </div>
    </div>
  </v-app-bar>
</template>

<script>
import { mapFields } from "vuex-map-fields";
import { mapState, mapActions } from "vuex";

export default {
  name: "AppBar",
  data() {
    return {
      logo: "/mimifood.png",
      clipped: true,
      miniVariant: false,
    };
  },
  watch: {
    isDark: {
      async handler(newValue, oldValue) {
        this.getLogo();
      },
    },
  },
  computed: {
    ...mapState("home/users", ["token", "user"]),
    ...mapFields("global", {
      showMenuRight: "showMenuRight",
      fixed: "fixed",
    }),
    isHome() {
      return this.$route.path == "/";
    },
  },
  mounted() {
    this.getLogo();
  },
  methods: {
    nextHome() {
      if (!this.isHome) {
        this.$router.push("/");
      }
    },
    ...mapActions("home/users", ["logout", "fetchUser"]),
    openMenu() {
      if (this.token && !this.isShow) {
        this.fetchUser();
      }
    },
    getLogo() {
      this.logo ="/mimifood.png"
      // this.logo = this.isDark
      //   ? "https://shopnick.online/images/logo/logo.png"
      //   : "https://shopnick.online/images/logo/logo.png";
    },
  },
};
</script>
