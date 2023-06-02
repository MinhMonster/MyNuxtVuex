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
    <v-main id="main" class="bg-website">
      <v-container
        class="client-main scroll-y"
        :class="{ 'menu-game-active': isMenuGame }"
        :style="styleMain"
      >
        <Nuxt />
      </v-container>
    </v-main>
    <MenuBottom></MenuBottom>
    <div class="next-top">
      <v-btn icon @click="nextTop()">
        <v-icon>mdi-arrow-up-bold-circle-outline</v-icon>
      </v-btn>
    </div>
    <div class="next-bottom">
      <v-btn icon @click="nextBottom()">
        <v-icon>mdi-arrow-down-bold-circle-outline</v-icon>
      </v-btn>
    </div>
  </v-app>
</template>

<script>
import HeaderHome from "@/components/pages/client/layout/HeaderHome";
import MenuGameHome from "@/components/pages/client/layout/MenuGameHome";
import MenuBottom from "@/components/pages/client/layout/MenuBottom";

import { mapState, mapActions } from "vuex";

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
    ...mapState("home/users", ["token"]),

    styleMain() {
      if (!this.isMenuGame) {
        return "width: calc(100% - 10px) !important; margin-left: 5px; transition: margin-left 0.3s";
      }
    },

    isScreenMobile() {
      const screenWidth = document.querySelector("body").clientWidth;
      if (screenWidth < 600) {
        return true;
      } else {
        return false;
      }
    },
  },
  async mounted() {
    if (this.token) {
      await this.fetchUser();
    }
    this.setScreenMobile(this.isScreenMobile);
  },
  methods: {
    ...mapActions("home/users", ["logout", "fetchUser"]),
    ...mapActions("global", ["setScreenMobile"]),

    nextTop() {
      const element = document.getElementById("home-page");
      element.scrollIntoView();
    },
    nextBottom() {
      const element = document.getElementById("next-bottom");
      element.scrollIntoView();
    },
    debounce() {
      console.log("t");
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep {
  #home-page,
  #account-slider {
    border-radius: 10px;
    max-width: 1350px;
    margin: 0 auto;
  }
  #home-page {
    .page-body {
      color: #000000;
      border: 1px solid #663019;
      background: #ffefa3;
      padding: 9px;
      border-radius: 10px;
    }
  }
  #account-slider {
    margin-top: 12px;
    color: #000000;
    border: 1px solid #663019;
    background: #ffefa3;
    padding: 12px;
  }
}
.next-top,
.next-bottom {
  position: fixed;
  right: 30px;
  height: 30px;
  width: 30px;
  z-index: 999;
  .v-btn--icon.v-size--default {
    background: radial-gradient(
      circle at 50% 100%,
      #e28637,
      #9f5424 58%,
      #561d00 127%
    );
  }
}
.next-top {
  bottom: 130px;
}
.next-bottom {
  bottom: 90px;
}
.theme--dark.v-application {
  background: radial-gradient(
    circle at 50% 100%,
    #e28637,
    #9f5424 58%,
    #561d00 127%
  );
  color: #ffffff;
  z-index: 2;
}
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
      right: 5px;
      position: fixed;
      width: calc(100% - 55px) !important;
      margin-left: 50px;
      max-width: 100% !important;
      border-radius: 10px;
      background: #ffcf9c;
      transition: margin-left 0.2s;
    }
  }
  @media (min-width: 340px) and (max-width: 399px) {
    .container.client-main {
      padding: 12px;
    }
    .v-main__wrap {
      .container.client-main {
        top: 55px;
        bottom: 60px;
        &.menu-game-active {
          padding: 6px;
          #home-page,
          #account-slider {
            padding: 9px;
          }
        }
      }
    }
  }
  @media (min-width: 400px) {
    .container.client-main {
      padding: 15px;
    }
    .btn-drop-menu-game.active {
      left: 30px;
    }
    .v-main__wrap {
      .container.client-main {
        top: 55px;
        bottom: 60px;
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

::v-deep {
  .slick-dots {
    bottom: 10px;
  }
  .slick-slide {
    padding: 6px;
    // border: 1px solid #663019;
    // height: calc(100% - 10px) !important;
    // border-radius: 3px !important;
  }
  @media (max-width: 400px) {
    .slick-slide {
      padding: 0px;
    }
    #home-page.page-body {
      padding: 6px;
    }
    #account-slider {
      padding: 9px;
    }
    .title-category {
      margin: 0 -9px !important;
      margin-top: -9px !important;
      margin-bottom: 9px !important;
    }
  }

  .slick-arrow,
  .slick-arrow:hover {
    z-index: 2;
    &.slick-next {
      right: 15px;
    }
    &.slick-prev {
      left: 15px;
    }

    &.slick-next,
    &.slick-prev,
    &.slick-prev::before,
    &.slick-next::before {
      color: #fff;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: radial-gradient(
        circle at 50% 100%,
        #e28637,
        #9f5424 58%,
        #561d00 127%
      );
    }
  }
}
::v-deep {
  #home-page {
    table.table {
      &.table-striped > tbody > tr:nth-of-type(odd) {
        color: #9f5424;
        border: 1px solid #663019;
        background: #ffcf9c;
      }
      thead {
        th {
          padding: 7.5px;
          &.trading-code {
            width: 10% !important;
            min-width: 60px;
            vertical-align: middle !important;
            text-align: center;
          }
          &.holder-action {
            width: 15% !important;
            min-width: 80px;
            vertical-align: middle !important;
            text-align: center;
          }
          &.info-history {
            width: 75% !important;
            min-width: 150px;
            vertical-align: middle !important;
            text-align: left;
          }
        }
      }
      tbody {
        tr {
          td {
            padding: 10px 3px;
            .col-sm-12,
            .col-md-6,
            .col-lg-3 {
              padding: 3px 15px;

            }
          }
        }
      }
    }
  }
}
</style>
