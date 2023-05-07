<template>
  <v-app>
    <HeaderHome></HeaderHome>
    <MenuGameHome v-if="isMenuGame"></MenuGameHome>
    <v-btn
      icon
      class="fixed btn-drop-menu-game"
      :class="{ active: isMenuGame }"
      @click="isMenuGame = !isMenuGame"
    >
      <v-icon v-if="isMenuGame">mdi-chevron-double-left</v-icon>
      <v-icon v-else>mdi-chevron-double-right</v-icon>
    </v-btn>
    <v-main class="bg-website">
      <v-container
        class="client-main scroll-y animate__backInLeft"
        :style="styleMain"
      >
        <Nuxt />
      </v-container>
    </v-main>
    <MenuBottom></MenuBottom>
  </v-app>
</template>

<script>
import HeaderHome from "@/components/pages/client/layout/HeaderHome";
import MenuGameHome from "@/components/pages/client/layout/MenuGameHome";

import MenuBottom from "@/components/pages/client/layout/MenuBottom";
export default {
  name: "ClientLayout",
  components: {
    HeaderHome,
    MenuGameHome,
    MenuBottom,
  },
  data() {
    return {
      isMenuGame: false,
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: "mdi-apps",
          title: "Welcome",
          to: "/",
        },
        {
          icon: "mdi-chart-bubble",
          title: "Inspire",
          to: "/inspire",
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Vuetify.js",
    };
  },
  computed: {
    // bodyWidth(){
    //   return document.querySelector("body").clientWidth;
    // },
    styleMain() {
      if (!this.isMenuGame) {
        return "width: calc(100% - 10px) !important; margin-left: 5px; transition: margin-left 0.3s";
      }
    },
  },
};
</script>
<style lang="scss" scoped>
// ::v-deep {

// }
.btn-drop-menu-game {
  height: 30px;
  width: 30px;
  z-index: 2;
  top: 45%;
  left: -30px;
  width: 50px;
  height: 50px;
  padding: 10px;
  border-radius: 50%;
  background-color: #333;
  opacity: 0.65;
  .v-icon {
    padding-left: 25px;
    font-size: 30px;
  }
  &.active {
    left: 20px;
  }
}
.bg-website {
  // background: #ffcf9c;
  background: #9f5424;
}
// @media (min-width: 1300px) {
::v-deep {
  .v-main__wrap {
    .container.client-main {
      top: 55px;
      bottom: 75px;
      position: fixed;
      width: calc(100% - 55px) !important;
      margin-left: 50px;
      max-width: 100% !important;
      border-radius: 10px;
      background: #ffcf9c;
      transition: margin-left 0.2s;
    }
  }
  @media (min-width: 340px) {
    .v-main__wrap {
      .container.client-main {
        top: 55px;
        bottom: 60px;
      }
    }
  }
  @media (min-width: 400px) {
    .btn-drop-menu-game.active {
      left: 30px;
    }
    .v-main__wrap {
      .container.client-main {
        width: calc(100% - 65px) !important;
        margin-left: 60px;
      }
    }
  }
  @media (min-width: 450px) {
    .btn-drop-menu-game.active {
      left: 40px;
    }
    .v-main__wrap {
      .container.client-main {
        width: calc(100% - 75px) !important;
        margin-left: 70px;
      }
    }
  }
}

// }

.container.client-main::-webkit-scrollbar-thumb {
  background: #ffcf9c !important;
  border-radius: 10px;
}

.container.client-main::-webkit-scrollbar-track {
  background: #9f5424 !important;
  border-radius: 10px;
}

.container.client-main::-webkit-scrollbar {
  width: 0px;
  direction: ltr;
}

// .v-application.v-application--is-ltr.theme--dark {
//   background: #9f5424 !important;
//   ::v-deep {
//     .home-header,
//     .home-header .header-content,
//     #menu,
//     .v-main, .container.client-main {
//       width: 1000px !important;
//     }
//   }
// }
</style>
