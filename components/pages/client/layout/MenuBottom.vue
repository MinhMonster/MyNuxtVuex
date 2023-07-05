<template>
  <client-only>
    <div id="menu-bottom">
      <nuxt-link to="/admin-information"
        ><div class="footer_icon service">
          <v-btn icon class="icon-menu">
            <v-icon>mdi-shield-crown-outline</v-icon>
          </v-btn>
        </div>
        <span class="title-menu-buttom">Admin</span>
      </nuxt-link>

      <ModalGame />

      <div class="sub-menu-buttom" @click="nextHome()">
        <div class="footer_icon home">
          <div class="circle-menu">
            <div class="icon-wrap">
              <v-btn icon>
                <v-icon>mdi-home</v-icon>
              </v-btn>
            </div>
          </div>
        </div>
        <span class="title-menu-buttom">Trang chủ</span>
      </div>
      <div class="sub-menu-buttom" @click="nextWalletDeposit()">
        <div class="footer_icon deposit">
          <v-btn icon class="icon-menu">
            <v-icon>mdi-bank</v-icon>
          </v-btn>
        </div>
        <span class="title-menu-buttom">Nạp tiền</span>
      </div>
      <div class="sub-menu-buttom" @click="nextHistory()">
        <div class="footer_icon service">
          <v-btn icon class="icon-menu">
            <v-icon>mdi-history</v-icon>
          </v-btn>
        </div>
        <span class="title-menu-buttom">Lịch sử</span>
      </div>
    </div>
  </client-only>
</template>

<script>
import { mapFields } from "vuex-map-fields";
import ModalGame from "@/components/pages/client/layout/ModalGame";

import mixins from "@/mixins/index";
export default {
  mixins: [mixins],
  components: {
    ModalGame,
  },
  props: {},
  data() {
    return {
      showModalGame: false,
    };
  },
  computed: {
    ...mapFields("home/users", ["token", "user"]),
    ...mapFields("global", {
      ready: "ready",
    }),
    isHome() {
      return this.$route.path == "/";
    },
    isLogin() {
      const path = this.$route.path;
      return path.includes("login") || path.includes("register");
    },
  },
  methods: {
    nextProfile() {
      if (this.token) {
        this.$router.push("/account/profile");
      } else {
        this.disabledLogin();
      }
    },
    nextHistory() {
      if (this.token) {
        this.$router.push("/account/history");
      } else {
        this.disabledLogin();
      }
    },
    nextWalletDeposit() {
      if (this.token) {
        this.$router.push("/account/wallet/deposit/vnd");
      } else {
        this.disabledLogin();
      }
    },
    disabledLogin() {
      if (!this.isLogin) {
        this.$router.push("/login");
      } else {
        this.$swal.fire(
          "Bạn chưa đăng nhập",
          "Hãy đăng nhập hoặc đăng ký nếu chưa có tài khoản để sử dụng dịch vụ. <br/> Xin cảm ơn!"
        );
      }
    },

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
// #footer {
//   background: linear-gradient(180deg, #e28637, #9f5424 12%, #561d00);
// }
#menu-bottom {
  width: 100%;
  // max-width: 1350px;
  // margin: 0 auto;
  bottom: 0;
  position: fixed;
  z-index: 10;
  display: flex;
  justify-content: space-evenly;
  /* height: 1.2rem; */
  height: 70px;
  /* background: linear-gradient(180deg, #3f058d, #30046b 12%, #200347); */
  background: linear-gradient(180deg, #e28637, #9f5424 12%, #561d00);
}
@media (min-width: 340px) {
  #menu-bottom {
    height: 55px;
  }
}

#menu-bottom a,
#menu-bottom a .footer_icon,
#menu-bottom .sub-menu-buttom,
#menu-bottom .sub-menu-buttom .footer_icon {
  display: flex;
  align-items: center;
  cursor: pointer;
}

#menu-bottom a,
#menu-bottom .sub-menu-buttom {
  flex-direction: column;
  /* width: 1.1rem; */
  width: 20%;
  padding-top: 0.16rem;
  font-size: 24px;
  color: #ffcf9c;
  text-align: center;
}

#menu-bottom a .footer_icon,
#menu-bottom .sub-menu-buttom .footer_icon {
  position: relative;
  width: 0.46rem;
  height: 0.46rem;
  justify-content: center;
}

#menu-bottom a,
#menu-bottom a .footer_icon,
#menu-bottom .sub-menu-buttom,
#menu-bottom .sub-menu-buttom .footer_icon {
  display: flex;
  align-items: center;
}

#menu-bottom a.on,
#menu-bottom .sub-menu-buttom.on {
  color: #ffefa3;
}

#menu-bottom a .footer_icon button.icon-menu,
#menu-bottom .sub-menu-buttom .footer_icon button.icon-menu,
.title-menu-buttom {
  margin-top: 20px;
  color: #ffcf9c;
}

#menu-bottom a.on .footer_icon svg,
#menu-bottom .sub-menu-buttom.on .footer_icon svg {
  fill: #fefc7f;
}
#menu-bottom a .footer_icon svg,
#menu-bottom .sub-menu-buttom .footer_icon svg {
  display: block;
  width: 100%;
  height: 100%;
  fill: #9891b2;
}

.am-icon {
  fill: currentColor;
  background-size: cover;
  width: 0.44rem;
  height: 0.44rem;
}
#menu-bottom .circle-menu .icon-wrap svg {
  width: 0.48rem;
  height: 0.42rem;
}

#menu-bottom a span,
#menu-bottom .sub-menu-buttom span {
  width: 100%;
  overflow: hidden;
  margin-top: 22px;
  font-size: 13px;
  font-weight: 500;
}

#menu-bottom .circle-menu {
  position: absolute;
  left: -21px;
  top: -20px;
  width: 50px;
  height: 50px;
  padding: 10px;
  border-radius: 50%;
  background-color: #9f5424;
}

#menu-bottom .circle-menu .icon-wrap {
  margin-top: -5px;
  margin-left: -5px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  /* background: radial-gradient(circle at 50% 15%, #8a6ede, #2f215a 72%); */
  background: radial-gradient(circle at 50% 15%, #e28637, #9f5424 72%);
}

#menu-bottom .mdi.mdi-home {
  color: #ffefa3;
}

svg:not(:root) {
  overflow: hidden;
}
</style>
