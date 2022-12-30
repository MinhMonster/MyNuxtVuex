<template>
  <v-app dark id="admin">
    <client-only>
      <v-navigation-drawer
        v-model="drawer"
        :mini-variant="miniVariant"
        :clipped="clipped"
        fixed
        app
      >
        <v-menu v-for="(text, index) in this.deverlopers" :key="index" offset-y>
          <template v-slot:activator="{ attrs }">
            <v-list class="" v-bind="attrs">
              <v-list-item :to="`/admin/deverlopers/${text.ID}/show`">
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
                >
                  <v-list-item-action>
                    <v-icon>{{ item.icon }}</v-icon>
                  </v-list-item-action>
                  <v-list-item-title v-text="item.title"></v-list-item-title>
                </v-list-item>
              </v-list>
            </v-list>
          </template>
        </v-menu>

        <v-list>
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :to="item.to"
            router
            exact
            :class="[
              $route.path.includes(`${item.to}`) ? 'v-list-item--active' : '',
            ]"
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-app-bar :clipped-left="clipped" fixed app>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
        <v-btn icon @click.stop="miniVariant = !miniVariant">
          <v-icon>mdi-{{ `chevron-${miniVariant ? "right" : "left"}` }}</v-icon>
        </v-btn>
        <v-btn icon @click.stop="clipped = !clipped">
          <v-icon>mdi-application</v-icon>
        </v-btn>
        <v-btn icon @click.stop="fixed = !fixed">
          <v-icon>mdi-minus</v-icon>
        </v-btn>
        <v-toolbar-title>{{ title }}</v-toolbar-title>
        <v-spacer />
        <v-btn icon @click.stop="rightDrawer = !rightDrawer">
          <v-icon>mdi-menu</v-icon>
        </v-btn>
      </v-app-bar>
      <v-main class="bg-default">
        <v-container>
          <Nuxt />
        </v-container>
      </v-main>
      <v-navigation-drawer
        v-model="rightDrawer"
        :right="right"
        :clipped="clipped"
        fixed
        app
      >
        <v-menu v-for="(text, index) in this.deverloper" :key="index" offset-y>
          <template v-slot:activator="{ attrs }">
            <v-list class="" v-bind="attrs">
              <v-list-item :to="`/admin/deverlopers/${text.ID}/show`" >
                

                <v-list-item-content >
                  <v-list-item-title class="menu-show">
                    {{ text.title }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <!-- <v-list v-if="text.items"> -->
              <v-list-item
                v-for="item in text.items"
                :key="item.title"
                link
                :to="`/admin/deverlopers/${item.ID}/view`"
                
                router
                exact
              >
              <v-list-item-content>
                <v-list-item-title v-text="item.title"></v-list-item-title>
              </v-list-item-content>
              </v-list-item>
              <!-- </v-list> -->
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
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("admin/deverlopers");
export default {
  name: "Adminlayout",
  data() {
    return {
      is_show: false,
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
      clipped: false,
      drawer: true,
      fixed: false,
      items: [
        {
          icon: "mdi-home-circle",
          title: "Admin",
          to: "/admin",
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
          icon: "mdi-file-document-edit",
          title: "Deverlopers",
          to: "/admin/deverlopers",
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: true,
      title: "Admin",
    };
  },
  async mounted() {
    await this.get_deverlopers();
    console.log(`tesy`);
  },

  computed: {
    ...mapState(["deverlopers", "deverloper"]),
  },
  methods: {
    ...mapActions(["get_deverlopers"]),

    showSubMenu(index) {
      this.is_show = !this.is_show;
      console.log(`active`, index);
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
  },
};
</script>
<style>
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
  padding: 0 16px;
}

#admin .sub-menu {
  margin-left: 50px;
}

#admin .v-navigation-drawer--mini-variant .sub-menu {
  margin-left: 0px;
}
#admin .menu-show{
  font-size: 20px;
  font-weight: 800;
}
</style>
