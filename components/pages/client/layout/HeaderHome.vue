<template>
  <client-only>
    <div class="home-header">
      <div class="header-content">
        <div class="header-user">
          <div class="header-logo" @click="nextHome()">
            <img
              :src="
                isThemeDark
                  ? 'https://muabannick.pro/files/uploads/images/logo/logo_violet_gradian_min-1707200146.png'
                  : 'https://muabannick.pro/files/uploads/images/logo/logo_warning-min-1707200029.png'
              "
              alt=""
            />
          </div>
          <!-- <RunText v-if="!isTablet" /> -->
          <SideBarHome></SideBarHome>
        </div>
      </div>
    </div>
  </client-only>
</template>

<script>
import { mapFields } from "vuex-map-fields";
import SideBarHome from "@/components/pages/client/layout/SideBarHome";
// import RunText from "@/components/global/molecules/common/template/RunText";

import mixins from "@/mixins/index";

export default {
  mixins: [mixins],
  components: {
    SideBarHome,
    // RunText,
  },
  props: {},
  computed: {
    ...mapFields("global", {
      ready: "ready",
      isThemeDark: "isThemeDark",
    }),
    isHome() {
      return this.$route.path == "/";
    },
  },
  mounted() {
    this.$nextTick(function () {
      this.onResize();
    });
    window.addEventListener("resize", this.onResize);
  },
  destroyed() {
    window.removeEventListener("resize", this.onResize);
  },
  methods: {
    nextHome() {
      if (this.isHome) {
        this.reset();
      } else {
        this.$router.push("/");
      }
    },
    async reset() {
      this.ready = false;
      setTimeout(() => {
        this.ready = true;
      }, 200);
    },
  },
};
</script>
<style lang="scss" scoped>
// ::v-deep {
//   .icon-account.v-btn--icon.v-size--default .v-icon {
//     height: 20px;
//     font-size: 20px;
//     width: 20px;
//   }o
// }
.home-header {
  height: 50px;
  flex-shrink: 0;
  // padding: 0 0.22rem;
}
.home-header .header-content {
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
  padding: 0 0.5rem;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
  /* background: radial-gradient(
    circle at 50% 100%,
    #7515f7,
    #3d058a 58%,
    #2a0062 127%
  ); */
  background: radial-gradient(
    circle at 50% 100%,
    #e28637,
    #9f5424 58%,
    #561d00 127%
  );
  // background-image: linear-gradient(180deg, #561d00, #9f5424 9%, #e28637 58%, #e28637) !important;
}
.home-header .header-user {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  // max-width: 1350px;
  // margin: 0 auto;
}

.home-header .header-logo img {
  width: 191.78px;
  height: 35px;
}
.home-header img {
  display: block;
}

.home-header .header-nav {
  display: flex;
  align-items: center;
  color: #fff;
  font-weight: 700;
  .user-name {
    color: #fff;
  }
}

.home-header .header-user .login-btn,
.home-header .header-user .withdraw-btn {
  font-weight: 500;
  color: #fff;
  margin-right: 0.2rem;
  box-shadow: 0 0.05rem 0.2rem 0 rgb(0 0 0 / 50%);
  /* background-image: linear-gradient(180deg,#8872c7,#6142bf 9%,#271170 58%,#4e23af); */
  background-image: linear-gradient(
    180deg,
    #e28637,
    #9f5424 9%,
    #561d00 58%,
    #9f5424
  );
}
.home-header .header-user .deposit-btn,
.home-header .header-user .register-btn {
  box-shadow: 0 0.05rem 0.2rem 0 rgb(0 0 0 / 49%);
  border: 1px solid #ffeb00;
  font-weight: 700;
  color: #000;
  /* background-image: linear-gradient(180deg,#fdffdb,#d9e254); */
  background-image: linear-gradient(180deg, #fdffdb, #ffcf9c);
}

.home-header .header-user .deposit-btn,
.home-header .header-user .login-btn,
.home-header .header-user .register-btn,
.home-header .header-user .withdraw-btn {
  position: relative;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 0.235rem;
  border-radius: 0.32rem;
  font-size: 12px;
}
.home-header .header-menu {
  width: 35px;
  height: 35px;
  margin-left: 0px;
}
.home-header .header-menu svg {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
