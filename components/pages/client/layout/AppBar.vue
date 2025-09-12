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
      <client-only>
        <div class="login-btn">
          <span @click="openMenu()"
            >{{ isLogin ? user.name : "Tài khoản" }}
          </span>
          <BaseSvg
            v-if="!showMenuRight"
            name="down"
            id="btn-down"
            title="Open"
            aria-label="Open"
          />
          <BaseSvg
            v-else
            name="up"
            id="btn-up"
            title="Close"
            aria-label="Close"
          />
        </div>
      </client-only>
    </div>
  </v-app-bar>
</template>

<script>
import { mapFields } from "vuex-map-fields";
import { mapActions } from "vuex";

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
    ...mapFields("global", {
      ready: "ready",
    }),
    ...mapFields("global", {
      showMenuRight: "showMenuRight",
      fixed: "fixed",
    }),
    isHome() {
      return this.$route.path == "/";
    },
    // isAdmin() {
    //   return this.user?.admin;
    // },
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
      if (this.isLogin && !this.isShow) {
        this.fetchUser();
      }
    },
    getLogo() {
      this.logo = this.isThemeDark
        ? "https://muabannick.pro/files/uploads/images/logo/logo_violet_gradian_min-1707200146.png"
        : this.isThemeRed
        ? "/images/logo-red.png"
        : "https://muabannick.pro/files/uploads/images/logo/logo_warning-min-1707200";
    },
  },
};
</script>
