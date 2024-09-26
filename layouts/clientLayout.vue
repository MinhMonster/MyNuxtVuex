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
    <!-- <MenuRight /> -->
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
// import MenuRight from "@/components/pages/client/layout/MenuRight";
import ModalLogin from "@/components/pages/client/account/wallet/ModalLogin";
import { mapFields } from "vuex-map-fields";

import { mapState, mapActions } from "vuex";

export default {
  name: "ClientLayout",
  components: {
    AppBar,
    MenuBottom,
    // MenuRight,
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
        this.nextTop();
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
      // showMenuRight: "showMenuRight",
    }),

    styleMain() {
      // if (this.showMenuRight && !this.isMobile) {
      //   return "width: calc(100% - 260px) !important; margin-right: 250px; transition: margin-left 0.3s";
      // }
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
    // max-width: 1400px;
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

      background: #fff;
      transition: margin-left 0.2s;
      background-size: cover;
      background-image: url("https://shopnick.online/images/bg/blue/bg.jpg");
      @media (max-width: 599px) {
        background-image: url("https://shopnick.online/images/bg/blue/bg-mb.png");
      }
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
</style>
