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
      <v-btn class="close" color="red" icon @click="dialog = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-card-title class="title-modal text-menu-main">
        <span class="mdi mdi-cog-outline mr-1"></span> Cài đặt
      </v-card-title>
      <v-card-text style="height: 200px">
        <div class="base-dialog page-body">
          <div class="base-dialog-bg scroll-y">
            <ul class="base-dialog-list">
              <li class="base-dialog-item list-item-hot on">
                <span class="base-dialog-name text-main bold"
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
              <li class="base-dialog-item list-item-hot on">
                <span class="base-dialog-name text-main bold"
                  ><span class="mdi mdi-theme-light-dark mr-1"></span>Giao Diện
                  Tối </span
                ><i class="menu-active"></i>

                <v-switch
                  v-model="isThemeDark"
                  color="main"
                  hide-details
                ></v-switch>
              </li>
            </ul>
          </div>
        </div>
      </v-card-text>
      <!-- <v-card-actions class="text-right right">
        <v-btn color="red" class="text-white" @click="dialog = false">
          Đóng
        </v-btn>
      </v-card-actions> -->
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
      isThemeDark: "isThemeDark",
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
    ...mapActions("global", [
      "setNotification",
      "getNotification",
      "setThemeDark",
    ]),
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

</style>