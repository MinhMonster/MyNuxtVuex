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
        <v-icon v-if="!showMenuRight">mdi-menu-down</v-icon>
        <v-icon v-else>mdi-menu-up</v-icon>
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
      logo: require(`@/assets/images/png/logo_violet.png`),
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
        ? require(`@/assets/images/png/logo_violet.png`)
        : require(`@/assets/images/png/logo_warning.png`);
    },
  },
};
</script>