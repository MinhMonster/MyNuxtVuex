<template>
  <v-app dark id="admin">
    <client-only v-if="authenticated">
      <v-navigation-drawer
        style="
          top: 94px;
          min-height: calc(100% - 94px);
          height: calc(100% - 94px);
          width: 300px;
        "
        v-model="drawer"
        :mini-variant="miniVariant"
        :clipped="clipped"
        fixed
        app
      >
        <v-menu v-for="(text, index) in this.deverlopers" :key="index" offset-y>
          <template v-slot:activator="{ attrs }">
            <v-list class="" v-bind="attrs">
              <v-list-item
                :to="`/admin/deverlopers/${text.type}`"
                :class="[
                  $route.path.includes(`${text.ID}`) ? 'v-btn--active' : '',
                ]"
              >
                <v-list-item-action>
                  <v-icon> mdi-apps </v-icon>
                </v-list-item-action>

                <v-list-item-content>
                  <v-list-item-title>
                    {{ text.title }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list v-if="text.active">
                <v-list-item
                  v-for="item in text.sub_menu"
                  :key="item.title"
                  link
                  :to="item.link"
                  class="sub-menu"
                  router
                  exact
                  :class="[
                    $route.path.includes(`${item.ID}`) ? 'v-btn--active' : '',
                  ]"
                >
                  <v-list-item-action>
                    <v-icon>{{ item.icon }}</v-icon>
                  </v-list-item-action>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-list>
          </template>
        </v-menu>
      </v-navigation-drawer>
      <v-app-bar :clipped-left="clipped" :clipped-right="clipped" fixed app>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
        <!-- <v-btn icon @click.stop="miniVariant = !miniVariant">
          <v-icon>mdi-{{ `chevron-${miniVariant ? "right" : "left"}` }}</v-icon>
        </v-btn> -->

        <!-- <v-btn icon @click.stop="clipped = !clipped">
          <v-icon>mdi-application</v-icon>
        </v-btn> -->
        <v-btn icon @click.stop="fixed = !fixed">
          <v-icon>mdi-minus</v-icon>
        </v-btn>

        <!-- <v-toolbar-title>
          {{ title }}
          
        </v-toolbar-title> -->
        <v-spacer />
        <v-btn v-if="rightDrawer" icon>
          <v-icon>mdi-cursor-move</v-icon>: </v-btn
        ><br />
        <b-form-checkbox
          v-if="rightDrawer"
          v-model="checkedMove"
          name="check-button"
          switch
        >
        </b-form-checkbox>
        <v-btn v-if="rightDrawer" icon>
          <v-icon>mdi-pencil-box-multiple-outline</v-icon>:
        </v-btn>
        <b-form-checkbox
          v-if="rightDrawer"
          v-model="checkedEdit"
          name="check-button"
          switch
        >
        </b-form-checkbox>
        <v-btn color="red" icon @click="onLogout">
          <v-icon>mdi-power</v-icon>
        </v-btn>
        <v-btn v-if="menuLeft" icon @click.stop="rightDrawer = !rightDrawer">
          <v-icon>mdi-menu</v-icon>
        </v-btn>
      </v-app-bar>
      <v-sheet
        class="mx-auto"
        :clipped-left="clipped"
        :clipped-right="clipped"
        fixed
      >
        <v-slide-group multiple show-arrows>
          <v-slide-item>
            <v-btn icon to="/admin">
              <v-icon>mdi-home-circle</v-icon>
            </v-btn>
          </v-slide-item>
          <v-slide-item
            v-for="(item, i) in items"
            :key="i"
            v-slot="{ active, toggle }"
            :class="[$route.path.includes(`${item.to}`) ? 'v-btn--active' : '']"
          >
            <v-btn
              class="mx-2"
              :input-value="active"
              active-class=" white--text"
              depressed
              rounded
              @click="toggle"
              :to="item.to"
            >
              {{ item.title }}
            </v-btn>
          </v-slide-item>
        </v-slide-group>
      </v-sheet>
      <v-main class="bg-white" :style="styleMain">
        <v-container>
          <Nuxt />
        </v-container>
      </v-main>
      <v-navigation-drawer
        v-if="deverloper"
        style="
          top: 94px;
          min-height: calc(100% - 94px);
          height: calc(100% - 94px);
          width: 300px;
          direction: rtl;
          text-align: left;
        "
        v-model="rightDrawer"
        :right="right"
        :clipped="clipped"
        fixed
        app
      >
        <v-menu v-for="(text, index) in menuLeft.items" :key="index" offset-y>
          <template v-slot:activator="{ attrs }">
            <v-list class="" v-bind="attrs" style="direction: ltr">
              <v-list-item :to="`/admin/deverlopers/${text.ID}/show`">
                <v-list-item-content>
                  <v-list-item-title class="menu-show">
                    {{ text.title }}
                  </v-list-item-title>
                </v-list-item-content>
                <v-slide-item v-if="checkedEdit">
                  <v-btn icon :to="`/admin/deverlopers/${text.ID}/new`">
                    <v-icon> mdi-plus</v-icon>
                  </v-btn>
                </v-slide-item>
                <v-slide-item v-if="checkedEdit">
                  <v-btn icon :to="`/admin/deverlopers/${text.ID}/edit`">
                    <v-icon>mdi-pencil-box-multiple-outline</v-icon>
                  </v-btn>
                </v-slide-item>
              </v-list-item>
              <draggable
                v-model="text.items"
                ghost-class="ghost"
                @change="changeByDrag"
                handle=".handle"
                tag="div"
              >
                <div v-for="item in text.items" :key="item.title">
                  <v-list-item
                    link
                    :to="`/admin/deverlopers/${item.type}/${item.link}`"
                    router
                    exact
                  >
                    <v-list-item-content>
                      <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                    <v-slide-item v-if="checkedMove">
                      <v-btn icon>
                        <v-icon class="handle">mdi-cursor-move</v-icon>
                      </v-btn>
                    </v-slide-item>
                    <v-slide-item v-if="checkedEdit">
                      <v-btn icon :to="`/admin/deverlopers/${item.ID}/edit`">
                        <v-icon>mdi-pencil-box-multiple-outline</v-icon>
                      </v-btn>
                    </v-slide-item>
                  </v-list-item>
                </div>
              </draggable>
            </v-list>
          </template>
        </v-menu>
      </v-navigation-drawer>
      <v-footer :absolute="!fixed" app>
        <span>&copy; {{ new Date().getFullYear() }}</span>
      </v-footer>
    </client-only>
  </v-app>
</template>

<script>
// import api from "@/apis/modules/admin/index"
// import { mapFields } from "vuex-map-fields";

import { createNamespacedHelpers } from "vuex";
import draggable from "vuedraggable";

const { mapState, mapActions } = createNamespacedHelpers("admin/deverlopers");
const auth = createNamespacedHelpers("admin/auth");
const client = createNamespacedHelpers("home/users");

export default {
  name: "Adminlayout",
  components: {
    draggable,
  },
  data() {
    return {
      // menuLeft: [],
      is_show: false,
      checkedEdit: false,
      checkedMove: false,
      menus: [
        {
          active: false,
          icon: "mdi-apps",
          title: "menu1",
          sub_menu: [
            {
              icon: "mdi-apps",
              title: "sub 1",
              link: "/",
            },
            {
              icon: "mdi-apps",
              title: "sub 2",
              link: "/2",
            },
          ],
        },
        {
          active: false,
          icon: "mdi-apps",
          title: "menu2",
          sub_menu: [
            {
              icon: "mdi-apps",
              title: "sub 2-1",
              link: "/3",
            },
            {
              icon: "mdi-apps",
              title: "sub 2-2",
              link: "/4",
            },
          ],
        },
      ],
      clipped: true,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: "mdi-file-document-edit",
          title: "Dev",
          to: "/admin/deverlopers",
        },
        {
          icon: "mdi-file-document-edit",
          title: "Finances",
          to: "/admin/finances",
        },
        {
          icon: "mdi-playlist-edit",
          title: "Menus",
          to: "/admin/menus",
        },
        {
          icon: "mdi-file-document-edit",
          title: "Topics",
          to: "/admin/topics",
        },
        {
          icon: "mdi-image",
          title: "Medias",
          to: "/admin/medias",
        },
        {
          icon: "mdi-image",
          title: "Ninja",
          to: "/admin/game/ninjas",
        },
        {
          icon: "mdi-image",
          title: "Avatar",
          to: "/admin/game/avatars",
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Admin",
    };
  },
  async mounted() {
    if (!this.user || !this.user.admin) {
      this.$router.push("/404");
    } else if (this.authenticated === null || this.authenticated === false) {
      this.$router.push("/admin/login");
    } else {
      await this.get_deverlopers();
      const body = document.querySelector("body");
      if (body.clientWidth > 1000) {
        this.drawer = true;
        this.rightDrawer = true;
      }
    }

    this.$nextTick(function () {
      this.onResize();
    });
    window.addEventListener("resize", this.onResize);
  },

  computed: {
    ...mapState(["deverlopers", "deverloper"]),
    ...auth.mapState(["authenticated"]),
    ...client.mapState(["user"]),
    menuLeft() {
      return _.cloneDeep(this.deverloper);
    },
    is_game() {
      const path = this.$route.path;
      return (
        path.includes("game/ninjas") ||
        path.includes("game/ngocrongs") ||
        path.includes("game/avatars")
      );
    },
    styleMain() {
      if (!this.drawer && !this.rightDrawer) {
        return "padding: 94px 0px 36px";
      } else if (this.drawer && this.rightDrawer) {
        return "padding: 94px 300px 36px";
      } else if (!this.drawer && this.rightDrawer) {
        return "padding: 94px 300px 36px 0";
      } else {
        return "padding: 94px 0 36px 300px";
      }
    },
  },
  methods: {
    ...mapActions([
      "get_deverlopers",
      "changePositionItemDev",
      "updateDeverloper",
    ]),
    ...auth.mapActions(["logout"]),

    onLogout() {
      this.logout();
      this.$router.push("/admin/login");
    },
    showSubMenu(index) {
      this.is_show = !this.is_show;
      this.menus.active = false;
      if (this.menus[index].active) {
        for (let i = 0; i < this.menus.length; i++) {
          this.menus[i].active = false;
        }
      } else {
        for (let i = 0; i < this.menus.length; i++) {
          this.menus[i].active = false;
          this.menus[index].active = true;
        }
      }
    },
    async changeByDrag(event) {
      this.updatePosition(
        event.moved.element.ID,
        event.moved.newIndex,
        event.moved.element.level_2
      );
      await this.updateDeverloper(this.menuLeft);
    },
    updatePosition(id, newIndex, level_2) {
      const formData = new FormData();
      formData.append("id", id);
      formData.append("newIndex", newIndex);
      formData.append("item", level_2);

      this.changePositionItemDev(formData);
    },
    onResize() {
      if (this.is_game) {
        this.drawer = false;
        this.rightDrawer = false;
      }
    },
  },
};
</script>
<style >
@import "~/assets/css/admin-style.css";
@import "~/assets/css/mms-style.css";
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
</style>
