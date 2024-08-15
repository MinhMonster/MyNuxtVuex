<template>
  <v-app :class="{ 'theme-dark': isThemeDark }">
    <AppBar />
    <v-main id="main" class="bg-website">
      <v-container
        class="client-main scroll-y"
        :style="styleMain"
        v-on:wheel="scroll()"
        v-on:scroll="scroll()"
      >
        <Nuxt />
      </v-container>
    </v-main>
    <MenuBottom />
    <MenuRight />
    <ModalLogin />

    <template v-if="isShowButton">
      <!-- <div class="change-theme">
        <BaseSvg name="theme-light-dark" @click="changeTheme()" />
      </div> -->
      <div class="next-top">
        <BaseSvg name="next-top" @click="nextTop()" />
      </div>
      <div class="next-bottom">
        <BaseSvg name="next-bottom" @click="nextBottom()" />
      </div>
    </template>
  </v-app>
</template>

<script>
import AppBar from "@/components/pages/client/layout/AppBar";
import MenuBottom from "@/components/pages/client/layout/MenuBottom";
import MenuRight from "@/components/pages/client/layout/MenuRight";
import ModalLogin from "@/components/pages/client/account/wallet/ModalLogin";
import { mapFields } from "vuex-map-fields";

import { mapState, mapActions } from "vuex";

export default {
  name: "ClientLayout",
  components: {
    AppBar,
    MenuBottom,
    MenuRight,
    ModalLogin,
  },
  data() {
    return {
      isShowButton: false,
    };
  },
  watch: {
    token: {
      async handler(newValue, oldValue) {
        if (!this.token && this.path.includes("/account/")) {
          this.$router.push("/");
        }
      },
    },
    path: {
      async handler(newValue, oldValue) {
        if (!this.token && this.path.includes("/account/")) {
          this.$router.push("/");
        }
      },
    },
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
      return "width: calc(100% - 10px) !important; margin-left: 5px; transition: margin-left 0.3s";
    },
    // isAvatar() {
    //   const path = this.$route.path;
    //   return path.includes("teamobi/avatar");
    // },
  },

  async mounted() {
    if (this.token) {
      await this.fetchUser();
    }
    this.$nextTick(function () {
      this.onResize();
    });
    window.addEventListener("resize", this.onResize);
  },
  destroyed() {
    window.removeEventListener("resize", this.onResize);
  },
  methods: {
    ...mapActions("home/users", ["fetchUser"]),
    // changeTheme() {
    //   this.isThemeDark = !this.isThemeDark;
    // },
    scroll() {
      if (!this.isShowButton) {
        this.isShowButton = true;
      }
    },
    nextTop() {
      const element = document.getElementById("home-page");
      element.scrollIntoView();
    },
    nextBottom() {
      const element = document.getElementById("next-bottom");
      element.scrollIntoView();
    },
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
}
// .change-theme,
.next-top,
.next-bottom {
  position: fixed;
  right: 30px;
  height: 30px;
  width: 30px;
  z-index: 10;
  svg {
    height: 26px;
    width: 26px;
    path {
      height: 26px;
      width: 26px;
    }
  }
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
// .change-theme {
//   bottom: 170px;
// }
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
      bottom: 50px;
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
      padding: 5px;
    }
    .btn-drop-menu-game.active {
      left: 30px;
    }
    .v-main__wrap {
      .container.client-main {
        top: 55px;
        bottom: 50px;
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
        bottom: 50px;

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
        // &.menu-game-active {
        //   #home-page {
        //     .page-body {
        //       &.full-screen {
        //         min-height: calc(100vh - 190px) !important;
        //         .page-info {
        //           min-height: calc(100vh - 170px) !important;
        //         }
        //       }
        //     }
        //   }
        // }
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
  background: #9f5424 !important;
  border-radius: 10px;
}

.bg-website::-webkit-scrollbar-track,
.container.client-main::-webkit-scrollbar-track {
  background: none !important;
}

.bg-website::-webkit-scrollbar,
.container.client-main::-webkit-scrollbar {
  width: 0px;
  direction: ltr;
}

@media (min-width: 678px) {
  .bg-website::-webkit-scrollbar,
  .container.client-main::-webkit-scrollbar {
    width: 5px;
  }
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
