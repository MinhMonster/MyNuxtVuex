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

    <div class="header-menu" @click.stop="showMenuRight = !showMenuRight">
      <div class="login-btn">
        <span @click="openMenu()"
          >{{ user && token ? user.name : "Tài khoản" }}
        </span>
        <BaseSvg v-if="!showMenuRight" name="down" />
        <BaseSvg v-else name="up" />
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
      logo: "https://muabannick.pro/files/uploads/images/logo/logo_violet_gradian_min-1707200146.png",
      clipped: true,
      miniVariant: false,
    };
  },
  watch: {
    isThemeDark: {
      async handler(newValue, oldValue) {
        this.getLogo();
      },
    },
  },
  computed: {
    ...mapState("home/users", ["token", "user"]),

    ...mapFields("global", {
      ready: "ready",
      isThemeDark: "isThemeDark",
    }),
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
      if (this.isHome) {
        this.reset();
      } else {
        this.$router.push("/");
      }
    },
    async reset() {
      this.ready = false;
      setTimeout(() => {
        this.ready = true;
      }, 200);
    },
    ...mapActions("home/users", ["logout", "fetchUser"]),
    openMenu() {
      if (this.token && !this.isShow) {
        this.fetchUser();
      }
    },
    getLogo() {
      this.logo = this.isThemeDark
        ? "https://muabannick.pro/files/uploads/images/logo/logo_violet_gradian_min-1707200146.png"
        : "https://muabannick.pro/files/uploads/images/logo/logo_warning-min-1707200029.png";
    },
  },
};
</script>