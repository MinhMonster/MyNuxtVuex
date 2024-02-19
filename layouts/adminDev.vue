<!-- <template>
  <v-app dark id="admin">
    <client-only v-if="authenticated">
      <MenuLeft />
      <AppBar />
      <MenuRow />
      <v-main class="bg-white" :style="styleMain">
        <v-container>
          <Nuxt />
        </v-container>
      </v-main>
      <MenuRight />
      <v-footer :absolute="!fixed" app>
        <span>&copy; {{ new Date().getFullYear() }}</span>
      </v-footer>
    </client-only>
  </v-app>
</template>

<script>
import { mapFields } from "vuex-map-fields";
import { createNamespacedHelpers } from "vuex";
import MenuRow from "@/components/pages/admin/layout/MenuRow";
import MenuLeft from "@/components/pages/admin/layout/MenuLeft";
import MenuRight from "@/components/pages/admin/layout/MenuRight";
import AppBar from "@/components/pages/admin/layout/AppBar";

const { mapState } = createNamespacedHelpers("admin/deverlopers");
const auth = createNamespacedHelpers("admin/auth");
const client = createNamespacedHelpers("home/users");

export default {
  name: "Adminlayout",
  middleware: ["authentication"],
  components: {
    MenuRow,
    MenuLeft,
    MenuRight,
    AppBar,
  },
  data() {
    return {
      clipped: true,
      miniVariant: false,
      title: "Admin",
    };
  },

  computed: {
    ...mapFields("admin/layout", {
      showMenuLeft: "showMenuLeft",
      showMenuRight: "showMenuRight",
      fixed: "fixed",
    }),
    ...mapState(["deverlopers", "deverloper"]),
    ...auth.mapState(["authenticated"]),
    ...client.mapState(["user"]),
    is_game() {
      return (
        this.path.includes("game/ninjas") ||
        this.path.includes("game/ngocrongs") ||
        this.path.includes("game/avatars")
      );
    },
    styleMain() {
      if (!this.showMenuLeft && !this.showMenuRight) {
        return "padding: 94px 0px 36px";
      } else if (this.showMenuLeft && this.showMenuRight) {
        return "padding: 94px 300px 36px";
      } else if (!this.showMenuLeft && this.showMenuRight) {
        return "padding: 94px 300px 36px 0";
      } else {
        return "padding: 94px 0 36px 300px";
      }
    },
  },
  watch: {
    path: {
      handler(newValue, oldValue) {
        this.onChangePath();
      },
    },
    authenticated: {
      handler(newValue, oldValue) {
        this.checkLogin();
      },
    },
  },
  async mounted() {
    // if (!this.user || !this.user.admin) {
    //   this.$router.push("/404");
    // } else

    await this.checkLogin();

    this.$nextTick(function () {
      this.onChangePath();
    });
  },
  destroyed() {},
  unMounted() {},
  methods: {
    onChangePath() {
      if (this.is_game) {
        const body = document.querySelector("body");
        if (body.clientWidth > 1000) {
          this.showMenuLeft = true;
          this.showMenuRight = true;
        }
        this.showMenuLeft = false;
        this.showMenuRight = false;
      }
    },
    checkLogin() {
      if (!this.authenticated) {
        this.$router.push("/admin/login");
      }
    },
  },
  head() {
    return {
      title: "Administrator",
      link: [{ rel: "icon", type: "image/x-icon", href: "/setting.ico" }],
    };
  },
};
</script>
<style >
.bg-default {
  background: #f0f2f5;
  color: #333;
}
#admin input {
  border: 1px solid #ccc;
  color: #333;
  padding-left: 10px;
  height: 40px;
  /* margin-top: 10px; */
}

#admin label {
  color: #a4a4a4;
  padding-left: 10px;
}
#admin.v-application .primary--text {
  color: #333 !important;
  caret-color: #333 !important;
}

#admin.v-application .primary--text {
  font-size: 20px;
}

#admin .v-text-field__slot {
  /* margin-top: 10px; */
}
#admin .v-text-field .v-label--active {
  max-width: 100%;
  transform: translateY(-20px) scale(0.8);
  pointer-events: auto;
}

#admin .v-input__control {
  /* margin-bottom: 10px; */
}

#admin .quillWrapper {
  margin: 30px 0;
}

#admin #body-admin {
  padding: 0 0px;
}

#admin .sub-menu {
  margin-left: 50px;
}

#admin .v-navigation-drawer--mini-variant .sub-menu {
  margin-left: 0px;
}
#admin .menu-show {
  font-size: 20px;
  font-weight: 800;
}
#admin .v-list.v-sheet.theme--dark {
  color: #dadada;
  padding: 0px;
  /* padding-left: 20px; */
  cursor: pointer;
  font-size: 18px;
  border-bottom: 1px solid #4f4f4f;
  border-bottom: 1px solid #000000;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
body::-webkit-scrollbar-thumb,
#admin .tab-pane.tab-scroll.scroll-y::-webkit-scrollbar-thumb,
#admin .v-navigation-drawer__content::-webkit-scrollbar-thumb {
  background: #999999;
  border-radius: 10px;
}

#admin .tab-pane.tab-scroll.scroll-y::-webkit-scrollbar-track,
#admin .v-navigation-drawer__content::-webkit-scrollbar-track {
  background: #555555;
  border-radius: 10px;
}

body::-webkit-scrollbar-track {
  background: #555555;
}

body::-webkit-scrollbar,
#admin .v-navigation-drawer__content::-webkit-scrollbar {
  width: 12px;
  direction: ltr;
}

#admin
  .v-navigation-drawer.v-navigation-drawer--fixed.v-navigation-drawer--open.theme--dark,
#admin
  .v-navigation-drawer.v-navigation-drawer--clipped.v-navigation-drawer--fixed.v-navigation-drawer--is-mobile.v-navigation-drawer--open.theme--dark {
  min-height: calc(100% - 94px);
}
#admin .v-sheet.theme--dark.v-toolbar.v-app-bar.v-app-bar--fixed {
  margin-right: 0px;
  left: 0px;
  right: 0px;
}

#admin .mx-auto.v-sheet.theme--dark {
  height: 40px;
  padding: 5px;
  margin-top: 54px;
  z-index: 6;
  width: 100%;
  position: fixed;
}
.handle {
  cursor: move;
}

html {
  overflow-y: auto;
}
</style> -->
