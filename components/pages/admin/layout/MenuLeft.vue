<template>
  <v-navigation-drawer
    style="top: 94px; min-height: calc(100% - 94px); width: 300px"
    v-model="showMenuLeft"
    :mini-variant="miniVariant"
    :clipped="clipped"
    fixed
    app
  >
    <v-list dense>
      <template v-for="(menu, index) in menus">
        <!-- MENU CÓ SUB -->
        <v-list-group
          v-if="menu.sub_menus && menu.sub_menus.length"
          :key="'group-' + index"
          :value="isGroupActive(menu)"
          no-action
        >
          <template v-slot:activator>
            <v-list-item>
              <v-list-item-action>
                <v-icon>{{ menu.icon || "mdi-apps" }}</v-icon>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title>
                  {{ menu.title }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>

          <v-list-item
            v-for="subMenu in menu.sub_menus"
            :key="subMenu.title"
            :to="subMenu.to"
            router
            exact
            class="pl-8"
            :class="{ 'v-btn--active': $route.path.includes(subMenu.to) }"
          >
            <v-list-item-action>
              <v-icon small>{{ subMenu.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ subMenu.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>

        <!-- MENU KHÔNG SUB -->
        <v-list-item
          v-else
          :key="'item-' + index"
          :to="menu.to"
          router
          exact
          :class="{ 'v-btn--active': $route.path.includes(menu.to) }"
        >
          <v-list-item-action>
            <v-icon>{{ menu.icon || "mdi-apps" }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ menu.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { menus } from "@/utils/admin/configs";
import { mapFields } from "vuex-map-fields";
// import { createNamespacedHelpers } from "vuex";
// const { mapState, mapActions } = createNamespacedHelpers("admin/deverlopers");

export default {
  name: "MenuLeft",
  components: {},
  props: {},
  watch: {},
  data() {
    return {
      clipped: true,
      fixed: false,
      miniVariant: false,
      menus,
    };
  },
  async mounted() {
    // await this.get_deverlopers();
  },
  destroyed() {},
  unMounted() {},
  computed: {
    ...mapFields("admin/layout", {
      showMenuLeft: "showMenuLeft",
    }),
    // ...mapState(["deverlopers", "deverloper"]),
    menuLeft() {
      return _.cloneDeep(this.deverloper);
    },
  },
  methods: {
    // ...mapActions(["get_deverlopers"]),
    isGroupActive(menu) {
      return menu.sub_menus?.some((sub) => this.$route.path.includes(sub.to));
    },
  },
};
</script>
<style scoped lang="scss">
/* ===============================
   VARIABLES
================================ */
$bg-main: #343a40;
$bg-secondary: #1e1e1e;
$border-color: #2a2a2a;

$text-main: #e0e0e0;
$text-muted: #9e9e9e;

$primary: #1e88e5;
$primary-gradient: linear-gradient(90deg, #1976d2, #1e88e5);

$hover-bg: rgba(255, 255, 255, 0.06);
$submenu-active-bg: rgba(30, 136, 229, 0.25);

/* ===============================
   SIDEBAR
================================ */
.v-navigation-drawer {
  background: linear-gradient(180deg, $bg-secondary, $bg-main);
  border-right: 1px solid $border-color;
  color: $text-main;
}

/* ===============================
   LIST BASE
================================ */
.v-list {
  background: transparent !important;
  padding: 8px 0;
}

/* ===============================
   MENU ITEM
================================ */
.v-list-item {
  // border-radius: 8px;
  border-bottom: 1px solid #222 !important;
  margin: 4px 0px;
  min-height: 44px;
  transition: all 0.25s ease;

  &__action {
    min-width: 36px;

    i {
      font-size: 20px;
      color: $text-muted;
    }
  }

  &__title {
    font-size: 14px;
    font-weight: 500;
    color: $text-main;
  }

  &:hover {
    background: $hover-bg;
  }

  &.v-btn--active {
    background: $primary-gradient;
    box-shadow: 0 4px 12px rgba($primary, 0.35);

    .v-list-item__title,
    i {
      color: #fff !important;
    }
  }
}

/* ===============================
   LIST GROUP (MENU CHA)
================================ */
.v-list-group__header {
  border-bottom: 1px solid #222 !important;
  margin: 0 !important;
}
.v-list-item__action:first-child {
  margin-right: 0px !important;
}
.v-list-group {
  &.v-list-group--active {
    background: #222;
  }
  .v-list-item {
    border-bottom: none !important;
  }
  margin: 0;
  border-bottom: 1px solid #222 !important;

  &__header {
    margin: 4px 10px; // ❗ giống menu thường
    padding-left: 16px; // ❗ thẳng hàng icon
    border-radius: 8px;

    &:hover {
      background: $hover-bg;
    }

    .v-list-item__action {
      min-width: 36px;
    }

    .v-list-item__title {
      font-weight: 500;
    }

    &__append-icon i {
      color: #aaa;
      font-size: 18px;
    }
  }
  .v-list-item {
    padding: 0 !important;
  }

  /* ===============================
     SUB MENU ONLY
  ================================ */
  .v-list-group__items {
    .v-list-item {
      margin: 2px 18px 2px 0x; // ❗ thụt riêng sub

      padding: 0 50px !important;
      min-height: 38px;
      position: relative;

      i {
        font-size: 16px;
        color: lighten($text-muted, 10%);
      }

      /* DẤU CHẤM CHỈ CHO SUB */
      &::before {
        content: "";
        position: absolute;
        left: -14px;
        top: 50%;
        transform: translateY(-50%);
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #555;
      }

      &.v-btn--active {
        background: $submenu-active-bg;

        &::before {
          background: $primary;
        }
      }
    }
  }
}
/* ===============================
   MINI VARIANT SUPPORT
================================ */
.v-navigation-drawer--mini-variant {
  .v-list-item__title {
    display: none;
  }

  .v-list-item__action:first-child {
    justify-content: center;
    margin-right: 12px !important;
  }
}
</style>
