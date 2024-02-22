<template>
  <v-app :class="{ 'theme-avatar': isAvatar, 'theme-dark': isThemeDark }">
    <AppBar />
    <!-- <MenuGameHome v-if="isMenuGame"></MenuGameHome>
    <v-btn
      icon
      class="fixed btn-drop-menu-game"
      :class="{ active: isMenuGame }"
      @click="isMenuGame = !isMenuGame"
    >
      <v-icon v-if="isMenuGame">mdi-chevron-double-left</v-icon>
      <v-icon v-else>mdi-chevron-double-right</v-icon>
    </v-btn> -->
    <v-main id="main" class="bg-website">
      <v-container
        class="client-main scroll-y"
        :class="{ 'menu-game-active': isMenuGame }"
        :style="styleMain"
        v-on:wheel="scroll()"
      >
        <Nuxt />
      </v-container>
    </v-main>
    <MenuBottom />
    <MenuRight />

    <template v-if="isShowButton">
      <div class="change-theme">
        <v-btn icon @click="changeTheme()">
          <v-icon>mdi-theme-light-dark</v-icon>
        </v-btn>
      </div>
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
    </template>
  </v-app>
</template>

<script>
import AppBar from "@/components/pages/client/layout/AppBar";

import MenuGameHome from "@/components/pages/client/layout/MenuGameHome";
import MenuBottom from "@/components/pages/client/layout/MenuBottom";
import MenuRight from "@/components/pages/client/layout/MenuRight";
import { mapFields } from "vuex-map-fields";

import { mapState, mapActions } from "vuex";

export default {
  name: "ClientLayout",
  components: {
    AppBar,
    MenuGameHome,
    MenuBottom,
    MenuRight,
  },
  data() {
    return {
      isMenuGame: false,
      clipped: false,
      drawer: false,
      fixed: false,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Vuetify.js",
      isShowButton: false,
    };
  },

  computed: {
    ...mapState("home/users", ["token"]),
    ...mapFields("global", {
      isThemeDark: "isThemeDark",
      showMenuRight: "showMenuRight",
    }),

    styleMain() {
      if (this.showMenuRight && !this.isMobile) {
        return "width: calc(100% - 260px) !important; margin-right: 250px; transition: margin-left 0.3s";
      }
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
    isAvatar() {
      const path = this.$route.path;
      return path.includes("teamobi/avatar");
    },
  },

  async mounted() {
    if (this.token) {
      await this.fetchUser();
    }
    this.$nextTick(function () {
      this.onResize();
    });
    window.addEventListener("resize", this.onResize);
    // this.setScreenMobile(this.isScreenMobile);
    // this.$nextTick(function () {
    //   this.nextPath();
    // });
    // window.addEventListener("click", this.nextPath());
  },
  destroyed() {
    window.removeEventListener("resize", this.onResize);
  },
  methods: {
    ...mapActions("home/users", ["logout", "fetchUser"]),
    ...mapActions("global", ["setScreenMobile", "setPath"]),
    changeTheme() {
      this.isThemeDark = !this.isThemeDark;
    },
    scroll() {
      if (!this.isShowButton) {
        this.isShowButton = true;
      }
      console.log("scroll");
    },
    nextTop() {
      const element = document.getElementById("home-page");
      element.scrollIntoView();
    },
    nextBottom() {
      const element = document.getElementById("next-bottom");
      element.scrollIntoView();
    },
    // nextPath() {
    //   const path = this.$route.path;
    //   this.setPath(path);
    // },
  },
};
</script>
<style lang="scss" scoped>
::v-deep {
  #home-page,
  #account-slider {
    border-radius: 10px;
    max-width: 1156px;
    margin: 0 auto;
  }
  #home-page {
    // height: calc(100vh - 145px);
    // top: 70px;
    // bottom: 60px;
    .page-body {
      // color: #000000;
      border: 1px solid #663019;
      background: #ffefa3;
      padding: 9px;
      border-radius: 4px;
      &.full-screen {
        min-height: calc(100vh - 145px);
        overflow: hidden;
        .page-info {
          min-height: calc(100vh - 165px);
        }
      }
      .tab-scroll-hidden::-webkit-scrollbar {
        width: 0px;
        direction: ltr;
      }
    }
  }
  #account-slider {
    margin-top: 12px;
    color: #000000;
    border: 1px solid #663019;
    background: #ffefa3;
    padding: 12px;
  }
  // .v-btn--icon.v-size--default {
  //   height: 30px;
  //   width: 30px;
  // }
}
.change-theme,
.next-top,
.next-bottom {
  position: fixed;
  right: 30px;
  height: 30px;
  width: 30px;
  z-index: 10;
  .v-btn--icon.v-size--default {
    height: 30px;
    width: 30px;
    background: radial-gradient(
      circle at 50% 100%,
      #e28637,
      #9f5424 58%,
      #561d00 127%
    );
  }
}
.change-theme {
  bottom: 170px;
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
  // position: fixed;
  // top: 50px;
  // bottom: 55px;
  // margin: 0 auto;
  // width: 100%;
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
      // height: calc(100vh - 115px);
      margin-left: 50px;
      max-width: 100% !important;
      border-radius: 4px;
      background: #ffcf9c;
      transition: margin-left 0.2s;
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
  @media (min-width: 340px) and (max-width: 399px) {
    .container.client-main {
      padding: 9px;
    }
    .v-main__wrap {
      .container.client-main {
        top: 55px;
        bottom: 60px;
        &.menu-game-active {
          padding: 3px;
          #home-page,
          #account-slider {
            padding: 3px;
            // .col-12 {
            //   padding: 12px !important;
            // }
          }
          .title-category {
            margin: 0 -9px !important;
            margin-top: -9px !important;
            margin-bottom: 9px !important;
          }
          #home-page {
            .page-body {
              padding: 6px;
              &.full-screen {
                min-height: calc(100vh - 128px);
                .page-info {
                  min-height: calc(100vh - 143px);
                }
              }
            }
          }
        }
        #home-page {
          .page-body {
            &.full-screen {
              min-height: calc(100vh - 134px);
              .page-info {
                min-height: calc(100vh - 155px);
                // .col-12 {
                //   padding: 12px;
                // }
              }
            }
          }
        }
      }
    }
  }
  @media (min-width: 300px) and (max-width: 499px) {
    .v-main__wrap {
      .container.client-main {
        &.menu-game-active {
          #home-page {
            .page-body {
              &.full-screen {
                min-height: calc(100vh - 190px) !important;
                .page-info {
                  min-height: calc(100vh - 170px) !important;
                }
              }
            }
          }
        }
        #home-page {
          .page-body {
            &.full-screen {
              min-height: calc(100vh - 200px) !important;
              .page-info {
                min-height: calc(100vh - 180px) !important;
              }
            }
          }
        }
      }
    }
  }
}

// }

.bg-website::-webkit-scrollbar-thumb,
.container.client-main::-webkit-scrollbar-thumb {
  background: #ffcf9c !important;
  border-radius: 10px;
}

.bg-website::-webkit-scrollbar-track,
.container.client-main::-webkit-scrollbar-track {
  background: #9f5424 !important;
  border-radius: 10px;
}

.bg-website::-webkit-scrollbar,
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
            width: 10% !important;
            min-width: 60px;
            vertical-align: middle !important;
            text-align: center;
          }
          &.info-history {
            width: 80% !important;
            min-width: 150px;
            vertical-align: middle !important;
            text-align: left;
          }
        }
      }
      tbody {
        tr {
          td {
            padding: 6px 3px;
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
