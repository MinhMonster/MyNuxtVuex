<template>
  <v-dialog v-model="dialog" scrollable max-width="500px" light>
    <template v-slot:activator="{ on, attrs }">
      <div v-bind="attrs" v-on="on" class="sub-menu-buttom">
        <div class="footer_icon Member">
          <v-btn icon class="icon-menu">
            <v-icon>mdi-cog-outline</v-icon>
          </v-btn>
        </div>
        <span class="title-menu-buttom">Cài Đặt</span>
      </div>
    </template>

    <v-card>
      <v-card-title class="title-modal text-menu-main">
        <span class="mdi mdi-cog-outline mr-1"></span> Cài đặt
      </v-card-title>
      <v-card-text style="height: 200px">
        <div class="setting page-body"> 
          <div class="setting-bg scroll-y">
            <ul class="setting-list">
              <li class="setting-item list-item-hot on">
                <span class="setting-name text-main bold"
                  ><span class="mdi mdi-bell-ring mr-1"></span>Thông báo
                  <span v-if="!isNotification" class="text-14-400"
                    >(Đã tắt trong 2 giờ)</span
                  ></span
                ><i class="menu-active"></i>

                <v-switch
                  :value="isNotification"
                  color="main"
                  hide-details
                  @click="setNotification(!isNotification)"
                ></v-switch>
              </li>
              <!-- <li class="setting-item list-item-hot on">
                <span class="setting-name text-main bold"
                  ><span class="mdi mdi-theme-light-dark mr-1"></span>Giao Diện
                  <span v-if="!isNotification" class="text-14-400"
                    >(Đã tắt trong 2 giờ)</span
                  ></span
                ><i class="menu-active"></i>

                <v-switch
                  :value="isNotification"
                  color="main"
                  hide-details
                  @click="setNotification(!isNotification)"
                ></v-switch>
              </li> -->
            </ul>
          </div>
        </div>
      </v-card-text>
      <v-card-actions class="text-right right">
        <v-btn color="red" class="text-white" @click="dialog = false">
          Đóng
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapFields } from "vuex-map-fields";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      dialog: false,
      menuOptions: [
        {
          title: "Nạp Thẻ Cào",
          path: "/account/wallet/deposit/card",
          image: "/icon/card-mobile.png",
        },
        {
          title: "Nạp Ví, ATM-MOMO",
          path: "/account/wallet/deposit/vnd",
          image: "/icon/icon-atm.png",
        },
      ],
    };
  },
  computed: {
    ...mapFields("home/users", ["token", "user"]),
    ...mapFields("global", {
      isNotification: "isNotification",
    }),
    isLogin() {
      const path = this.$route.path;
      return path.includes("login") || path.includes("register");
    },
  },
  methods: {
    nextPath(path) {
      this.$router.push(`${path}`);
      this.dialog = false;
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
    ...mapActions("global", ["setNotification", "getNotification"]),
  },
};
</script>
<style lang="scss" scoped>
.v-application {
  .v-input--selection-controls {
    margin-top: 0px;
    ::v-deep {
      label {
        margin-bottom: 0px !important;
      }
      .main--text {
        color: #9f5424 !important;
        caret-color: #9f5424 !important;
      }
    }
    &.main--text {
      color: #561d00;
    }
  }
}

.v-card.v-sheet.theme--dark {
  border: 1px solid #a4a4a4;
  /* border: 1px solid rgba(255, 255, 255, 0.12); */
}

/* .v-card.v-sheet.theme--dark {
  background: #fff !important;
} */
.v-card__title.title-modal {
  color: #663019;
  border-left: 2px solid #663019;
  border-right: 2px solid #663019;
  background: #e28637 url(https://muabannick.pro/images/header/bg_top.png)
    repeat-x;
  border-bottom: none;
  display: flex;
  justify-content: center;
  align-items: center;
}
.v-dialog--scrollable > .v-card > .v-card__text {
  position: relative;
  border: 2px solid #561d00;
  background: #ffcf9c;
  padding: 10px;
}
.v-dialog > .v-card > .v-card__actions {
  border: 2px solid #663019;
  background: #e28637;
  border-top: none;
  display: flex;
  flex-direction: row;
  justify-content: right;
  justify-content: end;
  align-content: flex-end;
}

#menu-bottom {
  width: 100%;
  bottom: 0;
  position: fixed;
  z-index: 10;
  display: flex;
  justify-content: space-evenly;
  height: 70px;
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

.setting {
  position: relative;
  // top: 50px;
  left: 0;
  // width: 50px;
  z-index: 10;
  height: 100%;

  min-height: calc(100% - 120px);

  overflow: hidden;
  padding: 5px;
  overflow-y: auto;
  overflow-x: hidden;
  // background: linear-gradient(180deg, #e28637, #9f5424 12%, #561d00);
  // background: #9f5424;

  .setting-icon {
    img {
      border-radius: 50%;
      height: 35px;
      width: 35px;
      margin-right: 10px;
    }

    .v-btn--icon.v-size--default i {
      height: 30px;
      width: 30px;
      line-height: 30px;
      font-size: 30px;
    }
  }
  .setting-name {
    font-size: 14px;
    color: #663019;
  }
  .setting-list {
    width: 100%;
    height: 100%;
    position: relative;
    padding-left: 10px !important;
    // margin-bottom: 70px;
  }
  .setting-item {
    cursor: pointer;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    position: relative;
    width: 100%;
    // margin-bottom: 20px;
    height: 50px;
  }
}
.setting .setting-bg {
  position: relative;
  flex-shrink: 0;
  width: 100%;
  min-height: calc(100% - 120px);
  align-items: center;
  text-align: center;
}

.setting .setting-bg::-webkit-scrollbar-thumb {
  background: #999999 !important;
  border-radius: 10px !important;
}
.setting .setting-bg::-webkit-scrollbar-track {
  background: #555555;
  border-radius: 10px;
}
.setting .setting-bg::-webkit-scrollbar {
  width: 0px;
  direction: ltr;
}
</style>