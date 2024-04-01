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
      logo: "https://shopnick.online/images/logo/logo.png",
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
      this.logo = this.isDark
        ? "https://shopnick.online/images/logo/logo.png"
        : "https://shopnick.online/images/logo/logo.png";
    },
  },
};
</script>